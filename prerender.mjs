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

// JSON-LD for blog posts: BlogPosting always, FAQPage when the post declares `faq`.
const jsonLd = (route, url) => {
  const p = route.post
  if (!p) return ''
  const graph = [
    {
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      image: 'https://www.emke.app/trackr-logo.png',
      datePublished: `${p.date}T09:00:00Z`,
      dateModified: `${p.updated || p.date}T09:00:00Z`,
      inLanguage: 'en',
      author: { '@type': 'Organization', name: 'EMKE', url: 'https://www.emke.app/' },
      publisher: {
        '@type': 'Organization',
        name: 'EMKE',
        logo: { '@type': 'ImageObject', url: 'https://www.emke.app/trackr-logo.png' },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
  ]
  if (p.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
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
