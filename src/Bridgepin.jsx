import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, MotionConfig, useInView, AnimatePresence } from 'framer-motion';

// Until the Shopify App Store listing is approved the primary action is a launch email.
// When the listing is live, put its URL here and the buttons switch on their own.
const APP_STORE_LISTING = '';
const LAUNCH_MAIL =
  'mailto:info@emke.app?subject=Bridgepin%20launch&body=Tell%20me%20when%20Bridgepin%20is%20live%20on%20the%20Shopify%20App%20Store.%0A%0AMy%20store%3A%20';
const PRIMARY_HREF = APP_STORE_LISTING || LAUNCH_MAIL;
const PRIMARY_LABEL = APP_STORE_LISTING ? 'Install from the Shopify App Store' : 'Email me on launch day';

const EASE = [0.22, 1, 0.36, 1];

// A bridge pin seen from above: the dark head with its pale dot. Used wherever a list needs a mark.
const Pin = ({ on = false, className = '' }) => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className={`shrink-0 ${className}`} width="16" height="16">
    <circle cx="8" cy="8" r="6.5" fill={on ? '#22c55e' : '#52525b'} />
    <circle cx="8" cy="8" r="2" fill={on ? '#052e16' : '#d4d4d8'} />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" width="18" height="18" className="transition-transform duration-300 group-hover:translate-x-1">
    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Rise = ({ children, delay = 0, className = '', as = 'div' }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
};

const PrimaryButton = ({ className = '' }) => (
  <a
    href={PRIMARY_HREF}
    {...(APP_STORE_LISTING ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className={`group inline-flex items-center gap-2.5 rounded-lg bg-green-500 px-5 py-3 text-[17px] font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400 ${className}`}
  >
    {PRIMARY_LABEL}
    <Arrow />
  </a>
);

const TextLink = ({ href, children }) => (
  <a
    href={href}
    className="group relative inline-block text-[17px] font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
  >
    {children}
    <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
  </a>
);

/* ---------- Hero: one guitar, two shelves ---------- */

const IDLE = { shopify: 1, reverb: 1, log: [], busy: false, sold: null };

const StockDemo = () => {
  const [s, setS] = useState(IDLE);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const sell = (side) => {
    if (s.sold) return;
    if (side === 'shopify') {
      setS({ shopify: 0, reverb: 1, busy: true, sold: 'shopify', log: [['Now', 'Sold in your store. Shopify stock 1 to 0.']] });
      later(() => setS((p) => ({ ...p, reverb: 0, busy: false, log: [...p.log, ['Right away', 'Bridgepin ends the Reverb listing.']] })), 1100);
    } else {
      setS({ shopify: 1, reverb: 0, busy: true, sold: 'reverb', log: [['Now', 'Sold on Reverb. The listing ends by itself.']] });
      later(() => setS((p) => ({ ...p, shopify: 0, busy: false, log: [...p.log, ['Within five minutes', 'Shopify stock set to 0. The order appears in Shopify.']] })), 1700);
    }
  };
  const reset = () => { timers.current.forEach(clearTimeout); setS(IDLE); };

  const Shelf = ({ name, qty, side, endedLabel }) => (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-zinc-900 px-4 py-4">
      <div>
        <div className="text-[14px] text-zinc-400">{name}</div>
        <div className="mt-0.5 flex items-baseline gap-2">
          <motion.span key={qty} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }} className="text-[30px] font-semibold leading-none text-white tabular-nums">{qty}</motion.span>
          <span className="text-[15px] text-zinc-300">{qty === 1 ? 'in stock' : endedLabel}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => sell(side)}
        disabled={!!s.sold}
        className="rounded-lg bg-white px-4 py-2.5 text-[15px] font-semibold text-black transition-transform duration-200 enabled:hover:-translate-y-0.5 enabled:active:translate-y-0 disabled:bg-zinc-800 disabled:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
      >
        {s.sold === side ? 'Sold' : 'Sell it here'}
      </button>
    </div>
  );

  return (
    <div data-ui className="w-full max-w-[460px] rounded-lg bg-black p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <img src="/bridgepin-icon.png" alt="" width="256" height="256" className="h-9 w-9 rounded-lg" />
        <div>
          <div className="text-[16px] font-semibold text-white">Gibson Les Paul Standard 60s</div>
          <div className="text-[14px] text-zinc-400">Used, excellent. SKU GIBLP001. One on hand.</div>
        </div>
      </div>
      <div className="mt-5 space-y-2.5">
        <Shelf name="Your Shopify store" qty={s.shopify} side="shopify" endedLabel="sold out" />
        <Shelf name="Your Reverb shop" qty={s.reverb} side="reverb" endedLabel="listing ended" />
      </div>
      <div className="mt-5 min-h-[112px]" aria-live="polite">
        <div className="text-[14px] text-zinc-400">Sync log</div>
        {s.log.length === 0 && <p className="mt-2 text-[15px] text-zinc-300">Sell the guitar on either side and watch the other one.</p>}
        <ul className="mt-2 space-y-2">
          <AnimatePresence>
            {s.log.map(([when, what]) => (
              <motion.li key={what} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="flex gap-2.5 text-[15px] text-zinc-100">
                <Pin on className="mt-[3px]" />
                <span><span className="text-zinc-400">{when}.</span> {what}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <button
        type="button"
        onClick={reset}
        className={`mt-2 text-[15px] font-semibold text-white underline decoration-zinc-600 underline-offset-4 transition-opacity duration-200 hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400 ${s.sold && !s.busy ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        tabIndex={s.sold && !s.busy ? 0 : -1}
      >
        Put it back on the wall
      </button>
    </div>
  );
};

const MaskLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay, ease: EASE }}>
      {children}
    </motion.span>
  </span>
);

const Hero = () => (
  <section className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-2">
    <div className="order-2 flex flex-col justify-center bg-black px-6 pb-14 pt-12 lg:order-1 lg:px-[max(2.5rem,calc((100vw-1240px)/2))] lg:pb-16 lg:pt-28">
      <h1 className="text-[clamp(30px,4.6vw,46px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white">
        <MaskLine delay={0.15}>Bridgepin: Reverb sync</MaskLine>{' '}
        <MaskLine delay={0.26}>for Shopify stores</MaskLine>
      </h1>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75, ease: EASE }}>
        <p className="mt-6 max-w-[46ch] text-[18px] leading-[1.55] text-zinc-100">
          Sell the same guitar in two places without selling it twice. Bridgepin links your Shopify products to your Reverb listings by SKU and keeps stock, orders, and tracking numbers matched.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <PrimaryButton />
          <TextLink href="#pricing">$39 a month, 14 days free</TextLink>
        </div>
      </motion.div>
    </div>
    <div className="order-1 flex items-center justify-center bg-zinc-900 px-5 pb-10 pt-28 lg:order-2 lg:px-10 lg:pt-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: EASE }} className="flex w-full justify-center">
        <StockDemo />
      </motion.div>
    </div>
  </section>
);

/* ---------- The shop wall ---------- */

const Wall = () => (
  <section aria-labelledby="bp-why" className="px-6 pt-24 lg:px-10 lg:pt-28">
    <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 lg:grid-cols-12">
      <Rise className="overflow-hidden rounded-lg lg:col-span-7">
        <motion.img
          src="/bridgepin/shop-wall.webp" alt="Used electric and acoustic guitars hanging on the wall of a small guitar shop" width="1536" height="1024" loading="lazy"
          className="block h-auto w-full" initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }}
        />
      </Rise>
      <div className="lg:col-span-5">
        <Rise as="h2" delay={0.08} className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-white" >
          <span id="bp-why">There is one of each</span>
        </Rise>
        <Rise as="p" delay={0.16} className="mt-5 text-[18px] leading-[1.6] text-zinc-100">
          Most of what hangs on a gear shop wall exists once. The moment it sells on your site it has to leave Reverb, and the moment it sells on Reverb it has to leave your site. Bridgepin does that part so nobody has to remember.
        </Rise>
      </div>
    </div>
  </section>
);

/* ---------- Features: small proof beside text ---------- */

const LogProof = () => (
  <div data-ui className="space-y-2.5 p-5 text-[15px]">
    {[
      ['10:42', 'Shopify stock 3 to 2', 'Reverb set to 2'],
      ['10:47', 'Reverb stock 2 to 1', 'Shopify set to 1'],
      ['11:03', 'Shopify stock 1 to 0', 'Reverb listing ended'],
    ].map(([t, a, b]) => (
      <div key={t} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 rounded-lg bg-black px-3.5 py-2.5">
        <span className="tabular-nums text-zinc-400">{t}</span>
        <span className="text-zinc-100">{a}</span>
        <span className="w-full pl-[52px] text-green-400 sm:ml-auto sm:w-auto sm:pl-0 sm:text-right">{b}</span>
      </div>
    ))}
  </div>
);

const RetryProof = () => (
  <div data-ui className="space-y-2.5 p-5 text-[15px]">
    <div className="rounded-lg bg-black px-3.5 py-3">
      <div className="flex flex-col gap-x-3 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="text-zinc-100">Push to Reverb failed</span>
        <span className="text-amber-400">Waiting, 6 on hold</span>
      </div>
      <div className="mt-1 text-zinc-400">Reverb did not answer. Trying again on the next check.</div>
    </div>
    <div className="rounded-lg bg-black px-3.5 py-3">
      <div className="flex flex-col gap-x-3 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="text-zinc-100">Reverb sold one meanwhile</span>
        <span className="text-green-400">Both sides now 5</span>
      </div>
      <div className="mt-1 text-zinc-400">The sale is applied on top of the waiting change. Nothing is counted twice.</div>
    </div>
  </div>
);

const Shot = ({ src, alt, w, h }) => (
  <div className="overflow-hidden p-3 sm:p-5">
    <img src={src} alt={alt} width={w} height={h} loading="lazy" className="block h-auto w-[640px] max-w-none rounded-lg sm:w-full" />
  </div>
);

const FEATURES = [
  {
    title: 'Linked by SKU',
    proof: <Shot src="/bridgepin/ui-sku.webp" alt="Bridgepin linked SKUs table with two Shopify products matched to Reverb listings" w="1390" h="276" />,
    body: [
      'One button matches every Shopify variant to the Reverb listing with the same SKU. A manual form covers the ones whose SKUs differ.',
      'If the two counts disagree on the first link, nothing is overwritten. You choose Keep Shopify or Keep Reverb for that row.',
    ],
  },
  {
    title: 'Stock that moves both ways',
    proof: <LogProof />,
    body: [
      'A change in Shopify reaches Reverb right away. Reverb is checked every five minutes and its sales are written back to your Shopify location.',
      'When stock reaches zero the Reverb listing ends, which is what a single used piece needs.',
    ],
  },
  {
    title: 'Reverb drafts from your catalog',
    proof: <Shot src="/bridgepin/ui-draft.webp" alt="Bridgepin new Reverb draft form filled in from a Shopify product: title, make and model" w="1390" h="326" />,
    body: [
      'Pick a Shopify product, choose a condition, and Bridgepin opens a Reverb draft with the title, make, model, photos, description, SKU, and price filled in.',
      'You publish it on Reverb when it looks right.',
    ],
  },
  {
    title: 'One location, one price rule',
    proof: <Shot src="/bridgepin/ui-settings.webp" alt="Bridgepin settings: choosing the Shopify inventory location that feeds Reverb" w="1390" h="244" />,
    body: [
      'Choose the Shopify location whose quantities feed Reverb. Stock in other locations is left alone.',
      'If your Reverb price should sit above or below your store price, set a percentage once and drafts and price changes follow it.',
    ],
  },
  {
    title: 'Failures wait, then finish',
    proof: <RetryProof />,
    body: [
      'An update that fails is kept and tried again on every check until it lands. A sale that happens in between is added to it, so nothing is counted twice.',
      'Every stock change and every order is written to a sync log you can read.',
    ],
  },
];

const Features = () => (
  <section aria-labelledby="bp-features" className="px-6 pt-32 lg:px-10 lg:pt-48">
    <div className="mx-auto max-w-[1240px]">
      <Rise as="h2" className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
        <span id="bp-features">What it does all day</span>
      </Rise>
      <div className="mt-16 space-y-20 lg:space-y-28">
        {FEATURES.map((f) => (
          <div key={f.title} className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-10">
            <Rise className="overflow-hidden rounded-lg bg-zinc-900 transition-transform duration-300 hover:-translate-y-1 lg:col-span-7">
              {f.proof}
            </Rise>
            <div className="lg:col-span-5">
              <Rise as="h3" delay={0.07} className="text-[24px] font-semibold leading-[1.2] text-white">{f.title}</Rise>
              {f.body.map((p, i) => (
                <Rise as="p" key={i} delay={0.14 + i * 0.07} className="mt-3.5 text-[17px] leading-[1.6] text-zinc-100">{p}</Rise>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Showcase: one order, three states ---------- */

const OrderRow = ({ place, number, status, tone, children }) => (
  <div data-ui className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg bg-zinc-900 px-5 py-4 text-[15px]">
    <span className="w-[76px] text-zinc-400">{place}</span>
    <span className="font-semibold tabular-nums text-white">{number}</span>
    <span className="text-zinc-100">Gibson Les Paul Standard 60s</span>
    <span className="tabular-nums text-zinc-100">$2,098.95</span>
    <span className={`ml-auto ${tone}`}>{status}</span>
    {children}
  </div>
);

const Orders = () => {
  const [shipped, setShipped] = useState(false);
  return (
    <section aria-labelledby="bp-orders" className="px-6 pt-32 lg:px-10 lg:pt-48">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Rise as="h2" className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
            <span id="bp-orders">One Reverb order</span>
          </Rise>
          <Rise as="p" delay={0.08} className="mt-5 text-[17px] leading-[1.6] text-zinc-100">
            A paid Reverb order arrives in Shopify with the buyer, the address, and the tax, so it ships from the same screen as everything else. An order you already shipped with a Reverb label comes in fulfilled, carrying its tracking number.
          </Rise>
          <Rise delay={0.16} className="mt-8 overflow-hidden rounded-lg">
            <img src="/bridgepin/packing.webp" alt="Hands closing a cardboard shipping box on a workbench, a guitar case and a tape gun beside it" width="1536" height="1024" loading="lazy" className="block h-auto w-full" />
          </Rise>
        </div>
        <div className="space-y-9 lg:col-span-8">
          <Rise>
            <OrderRow place="Reverb" number="48213" status="Paid" tone="text-zinc-100" />
            <p className="mt-2.5 text-[17px] text-zinc-400">Paid. A buyer checks out on Reverb.</p>
          </Rise>
          <Rise delay={0.08}>
            <OrderRow place="Shopify" number="RV 48213" status={shipped ? 'Fulfilled' : 'Unfulfilled'} tone={shipped ? 'text-green-400' : 'text-amber-400'}>
              <button
                type="button"
                onClick={() => setShipped((v) => !v)}
                className="rounded-lg bg-white px-3.5 py-2 text-[15px] font-semibold text-black transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-400"
              >
                {shipped ? 'Undo' : 'Ship it'}
              </button>
            </OrderRow>
            <p className="mt-2.5 text-[17px] text-zinc-400">Imported. Within five minutes it is a Shopify order. Ship it here to see the last step.</p>
          </Rise>
          <Rise delay={0.16}>
            <motion.div animate={{ opacity: shipped ? 1 : 0.6 }} transition={{ duration: 0.4 }}>
              <OrderRow place="Reverb" number="48213" status={shipped ? 'Shipped, 1Z 999 AA1 01 2345 6784' : 'Waiting for tracking'} tone={shipped ? 'text-green-400' : 'text-zinc-400'} />
            </motion.div>
            <p className="mt-2.5 text-[17px] text-zinc-400">Shipped. The tracking number from Shopify goes back to the Reverb order.</p>
          </Rise>
        </div>
      </div>
    </section>
  );
};

/* ---------- Setup: pinned fragment, changing state ---------- */

const STEPS = [
  { line: 'First, install it from the Shopify App Store.', note: 'You approve one plan on a Shopify screen. The first 14 days are free.' },
  { line: 'Then paste your Reverb token.', note: 'It is a personal access token from your Reverb account, under My Profile, API & Integrations. Bridgepin stores it encrypted.' },
  { line: 'Last, pick a location and link your SKUs.', note: 'Choose the Shopify location that feeds Reverb and press Auto link. Syncing starts with the first linked pair.' },
];

const StageState = ({ step }) => {
  if (step === 0) return (
    <div>
      <div className="text-[15px] text-zinc-400">Approve subscription</div>
      <div className="mt-3 rounded-lg bg-zinc-900 p-5">
        <div className="text-[17px] font-semibold text-white">Reverb Sync</div>
        <div className="mt-1 text-[15px] text-zinc-100">$39.00 USD every 30 days</div>
        <div className="mt-1 text-[15px] text-green-400">14 day free trial</div>
      </div>
      <div className="mt-4 inline-block rounded-lg bg-white px-4 py-2.5 text-[15px] font-semibold text-black">Approve</div>
    </div>
  );
  if (step === 1) return (
    <div>
      <div className="text-[15px] text-zinc-400">Connect Reverb</div>
      <div className="mt-3 rounded-lg bg-zinc-900 p-5">
        <div className="text-[15px] text-zinc-100">Personal access token</div>
        <div className="mt-2 rounded-lg bg-black px-3.5 py-3 text-[17px] tracking-[0.2em] text-zinc-100">••••••••••••••••••••</div>
      </div>
      <div className="mt-4 flex items-center gap-2.5 text-[15px] text-green-400"><Pin on />Connected to your Reverb shop</div>
    </div>
  );
  return (
    <div>
      <div className="text-[15px] text-zinc-400">Settings and SKU links</div>
      <div className="mt-3 rounded-lg bg-zinc-900 p-5">
        <div className="text-[15px] text-zinc-100">Inventory location</div>
        <div className="mt-2 flex items-center gap-2.5 text-[16px] text-white"><Pin on />Shop location</div>
        <div className="mt-1.5 flex items-center gap-2.5 text-[16px] text-zinc-400"><Pin />Warehouse</div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="rounded-lg bg-white px-4 py-2.5 text-[15px] font-semibold text-black">Auto link by SKU</span>
        <span className="text-[15px] text-green-400">42 linked, 3 need a choice</span>
      </div>
    </div>
  );
};

const Step = ({ i, active, onActive, children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => { if (inView) onActive(i); }, [inView, i, onActive]);
  return (
    <div ref={ref} className="flex flex-col justify-center pt-12 lg:min-h-[56vh] lg:pt-0">
      <p className={`text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-white transition-colors duration-300 lg:text-[28px] ${active ? '' : 'lg:text-zinc-400'}`}>{children[0]}</p>
      <p className={`mt-3 max-w-[44ch] text-[17px] leading-[1.6] text-zinc-100 transition-colors duration-300 ${active ? '' : 'lg:text-zinc-400'}`}>{children[1]}</p>
      <div data-ui className="mt-5 rounded-lg bg-zinc-950 p-5 ring-1 ring-inset ring-zinc-800 lg:hidden"><StageState step={i} /></div>
    </div>
  );
};

const Setup = () => {
  const [step, setStep] = useState(0);
  return (
    <section aria-labelledby="bp-setup" className="px-6 pt-32 lg:px-10 lg:pt-48">
      <div className="mx-auto max-w-[1240px]">
        <Rise as="h2" className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
          <span id="bp-setup">Set up in three steps</span>
        </Rise>
        <div className="grid grid-cols-1 gap-x-10 lg:mt-6 lg:grid-cols-12">
          <div className="sticky top-[16vh] order-2 hidden self-start lg:col-span-6 lg:col-start-7 lg:block">
            <div data-ui className="min-h-[330px] rounded-lg bg-zinc-950 p-8 ring-1 ring-inset ring-zinc-800">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease: EASE }}>
                  <StageState step={step} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="order-1 lg:col-span-5">
            {STEPS.map((st, i) => (
              <Step key={i} i={i} active={step === i} onActive={setStep}>{[st.line, st.note]}</Step>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- Walkthrough clip ---------- */

const Walkthrough = () => (
  <section aria-labelledby="bp-video" className="px-6 pt-24 lg:px-10 lg:pt-32">
    <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Rise as="h2" className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
          <span id="bp-video">Watch it run</span>
        </Rise>
        <Rise as="p" delay={0.08} className="mt-5 text-[17px] leading-[1.6] text-zinc-100">
          A 77 second recording inside a Shopify admin: connect, link, sync, then read the log. It plays without sound and every step is captioned.
        </Rise>
      </div>
      <Rise delay={0.1} className="overflow-hidden rounded-lg bg-zinc-900 lg:col-span-8">
        <video
          src="/bridgepin-screencast.mp4" poster="/bridgepin/screencast-poster.jpg" width="1920" height="1080"
          autoPlay muted loop playsInline controls preload="none"
          aria-label="Screen recording of Bridgepin inside a Shopify admin" className="block h-auto w-full"
        />
      </Rise>
    </div>
  </section>
);

/* ---------- Pricing: set like a menu ---------- */

const MenuRow = ({ name, price, note }) => (
  <div>
    <div className="flex items-baseline justify-between gap-6 text-[18px] text-white">
      <span className="font-semibold">{name}</span>
      <span className="tabular-nums">{price}</span>
    </div>
    <p className="mt-1 max-w-[38ch] text-[17px] leading-[1.5] text-zinc-400">{note}</p>
  </div>
);

const Pricing = () => (
  <section id="pricing" aria-labelledby="bp-pricing" className="scroll-mt-24 px-6 pt-32 lg:px-10 lg:pt-48">
    <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <Rise as="h2" className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
          <span id="bp-pricing">One plan</span>
        </Rise>
        <Rise delay={0.1} className="mt-8 w-[70%] overflow-hidden rounded-lg lg:w-[78%]">
          <img src="/bridgepin/counter.webp" alt="A used electric guitar lying on a shop counter with a blank paper price tag tied to it" width="1122" height="1402" loading="lazy" className="block h-auto w-full" />
        </Rise>
      </div>
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 sm:grid-cols-2 lg:col-span-8">
        <Rise>
          <h3 className="text-[24px] font-semibold text-white">Standard</h3>
          <div className="mt-6 space-y-[22px]">
            <MenuRow name="Every feature" price="$39 a month" note="Stock sync, order import, drafts, the price rule, and the sync log." />
            <MenuRow name="First 14 days" price="Free" note="Uninstall inside the trial and Shopify never bills you." />
          </div>
        </Rise>
        <Rise delay={0.08}>
          <h3 className="text-[24px] font-semibold text-white">Never charged</h3>
          <div className="mt-6 space-y-[22px]">
            <MenuRow name="Per order" price="$0" note="The price stays the same in a slow month and in December." />
            <MenuRow name="Per listing" price="$0" note="The price does not change with the size of your catalog." />
            <MenuRow name="Setup" price="$0" note="You paste one token. There is nothing to install on Reverb." />
          </div>
        </Rise>
        <Rise delay={0.14} className="sm:col-span-2">
          <p className="max-w-[60ch] text-[17px] leading-[1.6] text-zinc-100">
            Billing runs through your Shopify invoice, in US dollars, every 30 days. Reverb fees are between you and Reverb and do not change.
          </p>
        </Rise>
      </div>
    </div>
  </section>
);

/* ---------- FAQ: question index, one answer ---------- */

export const BRIDGEPIN_FAQ = [
  ['Where do I find the Reverb token?', 'In your Reverb account, open My Profile, then API & Integrations, and create a personal access token that can read and write listings and orders. Paste it into Bridgepin once.'],
  ['How fast does stock move?', 'A change in Shopify is sent to Reverb right away. Reverb has no instant notifications, so Bridgepin checks it every five minutes and writes any sale back to Shopify.'],
  ['What happens to a used piece with a quantity of one?', 'When it sells in your store, stock reaches zero and the Reverb listing ends. When it sells on Reverb, Shopify stock is set to zero on the next check.'],
  ['What if my counts differ when I first link a SKU?', 'Nothing is overwritten. The row shows both numbers and waits until you choose Keep Shopify or Keep Reverb.'],
  ['Will a Reverb order lower my Shopify stock twice?', 'No. The order is imported without touching inventory. The count changes once, through the stock sync.'],
  ['I ship some orders with Reverb labels. Is that a problem?', 'No. An order that is already shipped on Reverb comes into Shopify fulfilled, with the Reverb tracking number on it.'],
  ['What happens when I uninstall?', 'Your Reverb token, the connection, and the SKU links are deleted. Your Shopify products and your Reverb listings stay exactly as they are.'],
  ['Is Bridgepin made by Reverb?', 'No. Bridgepin is built by EMKE and is independent. It uses the public Reverb API with the token you provide.'],
];

const Faq = () => {
  const [sel, setSel] = useState(0);
  return (
    <section aria-labelledby="bp-faq" className="px-6 pt-32 lg:px-10 lg:pt-48">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-x-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Rise as="h2" className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
            <span id="bp-faq">Before you install</span>
          </Rise>
          <ul className="mt-8 space-y-1">
            {BRIDGEPIN_FAQ.map(([q, a], i) => (
              <Rise as="li" key={q} delay={i * 0.04}>
                <button
                  type="button"
                  onClick={() => setSel(i)} onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)}
                  aria-expanded={sel === i}
                  className={`flex w-full items-start gap-3 rounded-lg py-2.5 text-left text-[18px] leading-[1.35] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 ${sel === i ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
                >
                  <Pin on={sel === i} className="mt-[5px]" />
                  <span>{q}</span>
                </button>
                <div className={`pb-4 pl-7 text-[18px] leading-[1.55] text-zinc-100 lg:hidden ${sel === i ? 'block' : 'hidden'}`}>{a}</div>
              </Rise>
            ))}
          </ul>
        </div>
        <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
          <div className="sticky top-[120px] pt-[72px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p key={sel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="max-w-[32ch] text-[28px] leading-[1.3] text-white">
                {BRIDGEPIN_FAQ[sel][1]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- The name, and the close ---------- */

const Close = () => (
  <section aria-labelledby="bp-name" className="px-6 pb-28 pt-32 lg:px-10 lg:pb-40 lg:pt-48">
    <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Rise as="h2" className="text-[32px] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
          <span id="bp-name">About the name</span>
        </Rise>
        <Rise as="p" delay={0.08} className="mt-5 max-w-[40ch] text-[20px] leading-[1.5] text-zinc-100">
          A bridge pin is the small peg that holds a string in the bridge of an acoustic guitar. It does one job, and nothing stays in tune without it.
        </Rise>
        <Rise as="p" delay={0.16} className="mt-8 max-w-[36ch] text-[20px] leading-[1.5] text-white">
          {APP_STORE_LISTING
            ? 'Bridgepin is live on the Shopify App Store. The first 14 days cost nothing.'
            : 'Bridgepin is in Shopify App Store review right now. We will write to you once, on the day it goes live.'}
        </Rise>
        <Rise delay={0.24} className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
          <PrimaryButton />
          <TextLink href="mailto:info@emke.app">Ask a question first</TextLink>
        </Rise>
      </div>
      <Rise delay={0.1} className="overflow-hidden rounded-lg lg:col-span-7">
        <motion.img
          src="/bridgepin/bridge-pins.webp" alt="Close view of six bridge pins holding the strings in the bridge of an acoustic guitar" width="1536" height="1024" loading="lazy"
          className="block h-auto w-full" initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE }}
        />
      </Rise>
    </div>
    <div className="mx-auto mt-24 max-w-[1240px] text-[14px] leading-[1.6] text-zinc-400">
      <p>
        Built by EMKE. Reverb is a trademark of Reverb.com LLC and Shopify is a trademark of Shopify Inc. Bridgepin is independent and is not endorsed by either.{' '}
        <a href="https://reverb.emke.app/privacy" className="text-zinc-100 underline decoration-zinc-600 underline-offset-4 hover:decoration-white">Bridgepin privacy policy</a>.{' '}
        <Link to="/contact" className="text-zinc-100 underline decoration-zinc-600 underline-offset-4 hover:decoration-white">Contact</Link>.
      </p>
    </div>
  </section>
);

export default function BridgepinPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-black [&_h2]:[text-wrap:balance] [&_h3]:[text-wrap:balance] [&_p]:[text-wrap:pretty]">
        <Hero />
        <Wall />
        <Features />
        <Orders />
        <Setup />
        <Walkthrough />
        <Pricing />
        <Faq />
        <Close />
      </div>
    </MotionConfig>
  );
}
