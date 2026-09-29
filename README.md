# vibe-template

A React + TypeScript template powered by Vite, Tailwind CSS, and shadcn/ui components.

## Requirements

- Node.js 18+ (LTS recommended)
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Available scripts

- `npm run dev` - start Vite in development mode
- `npm run build` - create a production build
- `npm run build:dev` - create a development-mode build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks
- `npm run test` - run Vitest tests once
- `npm run test:watch` - run Vitest in watch mode

## Verification commands

Use these to verify repository health:

```bash
npm run lint
npm run test
npm run build
npx tsc --noEmit
```

## Lockfile policy

This repository does not track `package-lock.json`.

## Blog

Blog posts live in `src/content/blog` as Markdown files. Each file becomes a
page at `/blog/<slug>`, where the slug is the file name without its date
prefix (`2026-09-29-my-post.md` becomes `/blog/my-post`).

Start each post with frontmatter:

```md
---
title: Speed to Lead in Real Estate: Why the First Response Wins
description: One or two sentences for search results and link previews (aim for under 160 characters).
date: 2026-09-29
updated: 2026-10-15 # optional, when the post was last meaningfully revised
author: Virtexa Solutions # optional, defaults to Virtexa Solutions
tags: [Lead Response, Real Estate]
image: https://example.com/share-image.png # optional social share image
draft: true # optional, hides the post
---

Post body in Markdown. Use `##` for section headings (the title is the page's only `#`).
```

`npm run build` prerenders `/blog` and every post to static HTML with its own
title, meta description, canonical URL, Open Graph tags, and `BlogPosting`
structured data. It also adds the blog URLs to `sitemap.xml` and writes an RSS
feed to `/blog/rss.xml`. `npm run test` checks every post's metadata and
internal `/blog/...` links.
