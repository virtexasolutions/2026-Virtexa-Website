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

Posts are prerendered and added to the sitemap automatically (see below), and
an RSS feed is written to `/blog/rss.xml`.

## Pages and SEO

`npm run build` runs two steps: the normal browser build, then a server build of
`src/entry-server.tsx` whose plugin (`vite-plugin-prerender.ts`) renders every
page to static HTML in `dist/`. Each page ships with its full content, title,
meta description, canonical URL, social tags and JSON-LD structured data, so
search engines and link previews don't need to run JavaScript. The build also
writes `dist/sitemap.xml` and `dist/404.html` (served by Vercel for unknown
URLs, with a real 404 status).

- Every page sets its SEO tags with `usePageSeo` (`src/lib/usePageSeo.ts`).
- Every public page is listed in `src/lib/routes.ts`. A new page needs a route
  in `src/App.tsx` and an entry there, or it will 404 in production.
- Service pages (`/solutions/<slug>`) are data in `src/lib/solutions.ts`.
- `npm run test` renders every page and checks that each has a unique title and
  description, and that every internal link and `#section` link exists.
