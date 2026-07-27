// Prerenders each route into dist/<route>/index.html after `vite build`.
// Run via the build script: vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node prerender.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const template = readFileSync(join(root, 'dist/index.html'), 'utf-8')
const { render, posts } = await import('./dist-ssr/entry-server.js')

const BASE_TITLE = 'EMKE — Track Your Evolution | Apps by EMKE, home of Trackr'
const BASE_DESC =
  'EMKE builds apps for personal progress. Trackr, our first app, records weight with photos, tracks every exercise, and gives you an overall fitness score.'

const routes = [
  { path: '/', title: BASE_TITLE, desc: BASE_DESC },
  {
    path: '/apps',
    title: 'Our Apps — EMKE',
    desc: 'Explore the EMKE app portfolio. Trackr records weight with photos, tracks every exercise, and gives you an overall fitness score. More apps are on the way.',
  },
  {
    path: '/trackr',
    title: 'Trackr — Weight, Workout & Progress Tracker | EMKE',
    desc: 'Trackr records your weight with progress photos, logs every exercise and set, and turns it all into one overall fitness score. Available on the App Store.',
  },
  {
    path: '/vision',
    title: 'Our Vision — EMKE',
    desc: 'Why EMKE exists: apps that make personal progress visible. Track your evolution in fitness and beyond, one data point at a time.',
  },
  {
    path: '/contact',
    title: 'Contact — EMKE',
    desc: 'Get in touch with the EMKE team. Questions, feedback, or partnership ideas — reach us at info@emke.app.',
  },
  {
    path: '/support',
    title: 'Support — EMKE',
    desc: 'Need help with Trackr or another EMKE app? Find answers and contact support at info@emke.app.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — EMKE',
    desc: 'How EMKE apps collect, use, and protect your data. Read the full privacy policy for Trackr and other EMKE apps.',
  },
  {
    path: '/terms',
    title: 'Terms of Service — EMKE',
    desc: 'The terms of service for using Trackr and other EMKE apps.',
  },
  {
    path: '/blog',
    title: 'Blog — EMKE',
    desc: 'Notes on tracking progress, training smarter, and building better habits — from the team behind Trackr.',
    noindex: posts.length === 0,
  },
  ...posts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: `${p.title} — EMKE Blog`,
    desc: p.description,
    lastmod: p.date,
    post: p,
  })),
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Stable entity ids so every page points at the same Organization / WebSite / app node.
const ORG_ID = 'https://www.emke.app/#organization'
const SITE_ID = 'https://www.emke.app/#website'
const APP_ID = 'https://www.emke.app/trackr#app'
const APP_STORE_URL = 'https://apps.apple.com/app/id6759034748'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=app.emkellc.trackr'
const LOGO = 'https://www.emke.app/trackr-logo.png'

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'EMKE',
  legalName: 'Emke Seismic Isolation LLC',
  url: 'https://www.emke.app/',
  logo: { '@type': 'ImageObject', url: LOGO },
  description:
    'EMKE builds minimalist mobile apps for personal progress. Its first app, Trackr, records weight with progress photos, logs every exercise, and turns it into one overall fitness score.',
  email: 'info@emke.app',
  // One canonical spelling across every property; variants listed so they resolve
  // to the same person rather than looking like separate founders.
  founder: {
    '@type': 'Person',
    name: 'Kerim Efe Ozcanli',
    alternateName: ['Efe Ozcanli', 'Kerim Efe Özcanlı', 'Efe Özcanlı'],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@emke.app',
    telephone: '+1-775-770-0677',
    availableLanguage: ['English', 'Turkish'],
  },
  sameAs: [APP_STORE_URL, PLAY_STORE_URL],
}

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: 'https://www.emke.app/',
  name: 'EMKE',
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
}

// Facts mirror the live App Store listing (free, Health & Fitness, iOS 15.1+, rated 4+).
// aggregateRating is deliberately omitted: the real review count is too small to be meaningful.
const trackrApp = {
  '@type': 'MobileApplication',
  '@id': APP_ID,
  name: 'Trackr',
  alternateName: 'Trackr: Weight Loss Tracker',
  applicationCategory: 'HealthApplication',
  applicationSubCategory: 'Weight and workout tracking',
  operatingSystem: 'iOS 15.1 or later, Android',
  url: 'https://www.emke.app/trackr',
  image: LOGO,
  description:
    'Trackr records your weight together with progress photos, logs every exercise and set, and turns it all into one overall fitness score.',
  downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
  installUrl: [APP_STORE_URL, PLAY_STORE_URL],
  softwareVersion: '1.3.5',
  datePublished: '2026-03-17',
  contentRating: '4+',
  inLanguage: ['en', 'es', 'tr', 'de', 'fr'],
  publisher: { '@id': ORG_ID },
  author: { '@id': ORG_ID },
  featureList: [
    'Weight entries automatically paired with progress photos',
    'Side-by-side progress photo comparison over time',
    'Workout logging down to the individual set',
    'One overall fitness score combining weight and training',
    'Body measurement tracking',
    'Cloud backup with multi-device sync (Trackr Pro)',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    description: 'Free to download. Optional Trackr Pro subscription unlocks cloud backup, unlimited photo storage, and advanced analytics.',
  },
}

// Mirrors the FAQ rendered on /support — keep the two in sync when either changes.
const supportFaq = [
  ['How do I track my weight?', "Tap the '+' button on the home screen, enter your weight, and optionally add a photo. Your entry will appear on your timeline and charts immediately."],
  ['How do I take progress photos?', 'When adding a new entry, tap the camera icon to take a photo or choose one from your gallery. You can compare your photos side by side in the Timeline tab.'],
  ['How do I change the language?', 'Go to Profile, then Language, and select your preferred language. Trackr is available in English, Spanish, Turkish, German, and French.'],
  ['What is included in Trackr Pro?', 'Trackr Pro includes unlimited progress photo storage, cloud backup with multi-device sync, advanced body measurement tracking, detailed analytics, and priority support.'],
  ['How do I cancel my subscription?', "Open Settings on your device, tap your name, then Subscriptions, then Trackr, then Cancel Subscription. You'll keep Pro access until the end of your billing period."],
  ['Can I restore my purchases on a new device?', "Yes. Sign in with the same account you used to subscribe and your Pro status will be restored automatically. If it doesn't restore right away, go to Profile, then tap Restore Purchases."],
  ['How does cloud backup work?', 'Pro users can enable cloud backup in Profile, then Cloud Backup. Your data syncs automatically across all devices signed into the same account.'],
  ['Is my data private?', 'Yes. We never sell or share your personal data. Progress photos are stored locally on your device by default. Cloud data is encrypted with bank-level security.'],
  ['How do I delete my account?', 'Go to Profile, then Delete Account. This permanently removes all your data from our servers. This action cannot be undone.'],
  ['The app is not working properly. What should I do?', 'Try closing and reopening the app. If the issue persists, make sure you have the latest version installed. If you still need help, email support@emke.app with a description of the problem.'],
]

const faqPage = (id, pairs) => ({
  '@type': 'FAQPage',
  '@id': id,
  mainEntity: pairs.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
})

// JSON-LD: Organization + WebSite on every page, plus whatever that route is actually about.
const jsonLd = (route, url) => {
  const graph = [organization, website]
  const p = route.post

  if (route.path === '/' || route.path === '/trackr' || route.path === '/apps') {
    graph.push(route.path === '/trackr' ? { ...trackrApp, mainEntityOfPage: { '@type': 'WebPage', '@id': url } } : trackrApp)
  }
  if (route.path === '/support') {
    graph.push(faqPage(url + '#faq', supportFaq))
  }
  if (route.path === '/contact') {
    graph.push({ '@type': 'ContactPage', '@id': url, url, about: { '@id': ORG_ID } })
  }

  if (p) {
    graph.push({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      image: 'https://www.emke.app/trackr-logo.png',
      datePublished: `${p.date}T09:00:00Z`,
      dateModified: `${p.updated || p.date}T09:00:00Z`,
      inLanguage: 'en',
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    })
    if (p.faq?.length) {
      graph.push(faqPage(url + '#faq', p.faq.map((f) => [f.q, f.a])))
    }
  }

  const data = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  return `    <script type="application/ld+json">${data.replace(/</g, '\\u003c')}</script>\n`
}

for (const route of routes) {
  const appHtml = render(route.path)
  const url = 'https://www.emke.app' + (route.path === '/' ? '/' : route.path)

  let html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace('</title>', route.noindex ? '</title>\n    <meta name="robots" content="noindex" />' : '</title>')
    .replace(`<title>${BASE_TITLE}</title>`, `<title>${esc(route.title).replace(/&quot;/g, '"')}</title>`)
    .replace(`<link rel="canonical" href="https://www.emke.app/" />`, `<link rel="canonical" href="${url}" />`)
    .replace(`<meta property="og:url" content="https://www.emke.app/" />`, `<meta property="og:url" content="${url}" />`)
    .replace(`<meta property="og:title" content="EMKE — Track Your Evolution" />`, `<meta property="og:title" content="${esc(route.title)}" />`)
    .replace(`<meta name="twitter:title" content="EMKE — Track Your Evolution" />`, `<meta name="twitter:title" content="${esc(route.title)}" />`)
    .replaceAll(`content="${BASE_DESC}"`, `content="${esc(route.desc)}"`)
    .replace('  </head>', `${jsonLd(route, url)}  </head>`)

  const outDir = route.path === '/' ? join(root, 'dist') : join(root, 'dist', route.path.slice(1))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  console.log(`prerendered ${route.path} -> ${join(outDir, 'index.html').replace(root + '/', '')}`)
}

// Regenerate sitemap.xml from the same route list (noindex routes excluded).
const today = new Date().toISOString().slice(0, 10)
const sitemapEntries = routes
  .filter((r) => !r.noindex)
  .map((r) => {
    const url = 'https://www.emke.app' + (r.path === '/' ? '/' : r.path)
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${r.lastmod || today}</lastmod>\n  </url>`
  })
  .join('\n')
writeFileSync(
  join(root, 'dist/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
)
console.log('sitemap.xml written:', routes.filter((r) => !r.noindex).length, 'URLs')

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('prerender complete:', routes.length, 'routes')
