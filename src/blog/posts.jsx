import React from 'react'

// Blog registry — the single source of truth for the EMKE blog.
//
// To publish a post, append an object here. Everything else is automatic:
// it appears on /blog, gets its own prerendered /blog/<slug> page with meta
// tags, shows the Blog link in the navbar, and is added to sitemap.xml at
// build time. While this list is empty, /blog is prerendered with noindex
// and the navbar hides the Blog link.
//
// Shape:
// {
//   slug: 'url-safe-slug',            // becomes /blog/<slug>
//   title: 'Post Title',              // page <title> + card heading
//   description: 'One-two sentences', // meta description + card text
//   date: '2026-07-10',               // YYYY-MM-DD, also sitemap lastmod
//   readingMinutes: 6,
//   body: (
//     <>
//       <p>Paragraphs as JSX. Use h2/h3 for sections.</p>
//     </>
//   ),
// }

export const posts = []
