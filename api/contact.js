/**
 * POST /api/contact  —  Vercel Edge Function
 *
 * Cloudflare'daki sitelerde ayni isi functions/api/contact.js yapiyor; emke Vercel'de
 * oldugu icin ayni mantigin Vercel karsiligi. Ayarlar ortam degiskenlerinden gelir:
 *
 *   TURNSTILE_SECRET   zorunlu   Cloudflare Turnstile gizli anahtari
 *   RESEND_API_KEY     zorunlu   Resend anahtari (teslimat)
 *   FORM_TO            zorunlu   hedef kutu, "info@emke.app"
 *   FORM_FROM          zorunlu   dogrulanmis gonderen, "emke Website <emke@forms.karimer.com>"
 *   FORM_ENDPOINT      ops.      FormSubmit yedegi
 *   FORM_SUBJECT       ops.      konu onu
 *
 * Hedef adres sayfada DURMAZ. Bota hata gostermeyiz: honeypot, zaman tuzagi ve link
 * yigini { ok: true } doner ki bot neyin tetikledigini anlayip ayar yapamasin.
 */

export const config = { runtime: "edge" };

const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const CALL_TIMEOUT_MS = 8000;
const MIN_ELAPSED_MS = 4000;
const MAX_ELAPSED_MS = 6 * 60 * 60 * 1000;
const MIN_MESSAGE = 20;
const INTERNAL_FIELDS = new Set(["turnstile_token", "elapsed_ms", "website-url", "website_url"]);

export default async function handler(request) {
  if (request.method === "GET") {
    return json({
      ok: true,
      configured: {
        turnstile: Boolean(env("TURNSTILE_SECRET")),
        resend: Boolean(env("RESEND_API_KEY")),
        to: Boolean(env("FORM_TO")),
        from: Boolean(env("FORM_FROM")),
        fallback_endpoint: Boolean(env("FORM_ENDPOINT")),
      },
    });
  }
  if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  try {
    return await handle(request);
  } catch (err) {
    return json({ ok: false, error: "server_error", detail: String((err && err.stack) || err).slice(0, 400) });
  }
}

async function handle(request) {
  const ip = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "";

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }
  if (!data || typeof data !== "object") return json({ ok: false, error: "bad_request" }, 400);

  // 1) Honeypot.
  if (str(data["website-url"]) !== "" || str(data.website_url) !== "" || str(data.website) !== "") {
    return json({ ok: true });
  }

  // 2) Zaman tuzagi.
  const elapsed = Number(data.elapsed_ms);
  if (!Number.isFinite(elapsed) || elapsed < MIN_ELAPSED_MS || elapsed > MAX_ELAPSED_MS) {
    return json({ ok: true });
  }

  // 3) Turnstile. Sayfayi hic acmadan buraya POST atan bot burada durur.
  const secret = env("TURNSTILE_SECRET");
  if (!secret) return json({ ok: false, error: "server_not_configured" });
  if (!(await verifyTurnstile(secret, str(data.turnstile_token), ip))) {
    return json({ ok: false, error: "verification_failed" }, 403);
  }

  // 4) Alan kontrolu.
  const name = str(data.name);
  const email = str(data.email);
  const message = str(data.message);
  if (name.length < 2) return json({ ok: false, error: "missing_fields", field: "name" }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return json({ ok: false, error: "bad_email" }, 400);
  }
  if (message.length < MIN_MESSAGE) return json({ ok: false, error: "message_too_short" }, 400);

  // 5) Link yigini.
  if (message.split("http").length - 1 > 2) return json({ ok: true });

  const fields = [];
  for (const [k, v] of Object.entries(data)) {
    if (INTERNAL_FIELDS.has(k) || k === "website" || k.startsWith("_")) continue;
    const val = Array.isArray(v) ? v.join(", ") : str(v).slice(0, 5000);
    if (val) fields.push([k, val]);
  }
  const subject = (env("FORM_SUBJECT") || "New inquiry from emke.app") + " — " + (name || email);

  const viaResend = await sendViaResend({ subject, fields, replyTo: email });
  if (viaResend.ok) return json({ ok: true });

  const viaFormSubmit = await sendViaFormSubmit(request, { subject, fields, replyTo: email });
  if (viaFormSubmit.ok) return json({ ok: true, via: "fallback" });

  return json({ ok: false, error: "delivery_failed", detail: viaResend.detail || viaFormSubmit.detail });
}

async function sendViaResend({ subject, fields, replyTo }) {
  const key = env("RESEND_API_KEY");
  const to = env("FORM_TO");
  const from = env("FORM_FROM");
  if (!key || !to || !from) return { ok: false, detail: "resend_not_configured" };

  const rows = fields
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6b7280;font-size:12px;vertical-align:top;white-space:nowrap">${esc(
          k
        )}</td><td style="padding:6px 0;color:#0a1229;white-space:pre-wrap">${esc(v)}</td></tr>`
    )
    .join("");

  try {
    const r = await timedFetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: replyTo,
        subject,
        text: fields.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html:
          `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;line-height:1.7;max-width:640px">` +
          `<table style="border-collapse:collapse;width:100%">${rows}</table></div>`,
      }),
    });
    if (r.ok) return { ok: true };
    return { ok: false, detail: "resend_" + r.status + " " + (await r.text().catch(() => "")).slice(0, 200) };
  } catch (e) {
    return { ok: false, detail: "resend_unreachable " + String(e && e.name) };
  }
}

async function sendViaFormSubmit(request, { subject, fields, replyTo }) {
  const endpoint = env("FORM_ENDPOINT");
  if (!endpoint) return { ok: false, detail: "no_fallback" };
  const payload = Object.fromEntries(fields);
  payload._template = "table";
  payload._captcha = "false";
  payload._replyto = replyTo;
  payload._subject = subject;

  // FormSubmit, Origin basligi tasimayan istekleri reddeder.
  const origin = new URL(request.url).origin;
  try {
    const r = await timedFetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin + "/",
      },
      body: JSON.stringify(payload),
    });
    const raw = await r.text().catch(() => "");
    if (!r.ok) return { ok: false, detail: "formsubmit_" + r.status };
    let body = {};
    try {
      body = JSON.parse(raw);
    } catch {}
    if (String(body.success) !== "true") return { ok: false, detail: "formsubmit_rejected" };
    return { ok: true };
  } catch {
    return { ok: false, detail: "formsubmit_unreachable" };
  }
}

async function verifyTurnstile(secret, token, ip) {
  if (!token) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const r = await timedFetch(TURNSTILE_VERIFY, { method: "POST", body: form });
    const j = await r.json();
    return j.success === true;
  } catch {
    return false;
  }
}

async function timedFetch(url, init) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CALL_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

function env(k) {
  return (typeof process !== "undefined" && process.env && process.env[k]) || "";
}

function str(v) {
  return (v == null ? "" : String(v)).trim();
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
