// Prerenders each route into dist/<route>/index.html after `vite build`.
// Run via the build script: vite build && vite build --ssr src/entry-server.jsx --outDir dist-ssr && node prerender.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const template = readFileSync(join(root, 'dist/index.html'), 'utf-8')
const { render } = await import('./dist-ssr/entry-server.js')

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
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

for (const route of routes) {
  const appHtml = render(route.path)
  const url = 'https://www.emke.app' + (route.path === '/' ? '/' : route.path)

  let html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(`<title>${BASE_TITLE}</title>`, `<title>${esc(route.title).replace(/&quot;/g, '"')}</title>`)
    .replace(`<link rel="canonical" href="https://www.emke.app/" />`, `<link rel="canonical" href="${url}" />`)
    .replace(`<meta property="og:url" content="https://www.emke.app/" />`, `<meta property="og:url" content="${url}" />`)
    .replace(`<meta property="og:title" content="EMKE — Track Your Evolution" />`, `<meta property="og:title" content="${esc(route.title)}" />`)
    .replace(`<meta name="twitter:title" content="EMKE — Track Your Evolution" />`, `<meta name="twitter:title" content="${esc(route.title)}" />`)
    .replaceAll(`content="${BASE_DESC}"`, `content="${esc(route.desc)}"`)

  const outDir = route.path === '/' ? join(root, 'dist') : join(root, 'dist', route.path.slice(1))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
  console.log(`prerendered ${route.path} -> ${join(outDir, 'index.html').replace(root + '/', '')}`)
}

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('prerender complete:', routes.length, 'routes')
