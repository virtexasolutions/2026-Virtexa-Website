import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { Logger, Plugin } from "vite";
import {
  BLOG_DESCRIPTION,
  BLOG_PATH,
  BLOG_TITLE,
  SITE_URL,
  absoluteUrl,
  postPath,
  type BlogPost,
} from "./src/lib/blog-core";
// Mirrors PageSeo (src/lib/usePageSeo.ts) and PrerenderRoute (src/lib/routes.ts),
// which can't be imported here because they use the app's "@/" path alias.
type PageSeo = {
  title: string;
  description: string;
  path: string;
  structuredData?: object;
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
};
type PrerenderRoute = { path: string; sitemap?: boolean; lastmod?: string };

type ServerEntry = {
  render: (url: string) => { html: string; seo?: PageSeo };
  prerenderRoutes: () => PrerenderRoute[];
  NOT_FOUND_PATH: string;
  posts: BlogPost[];
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Replaces a `<meta>`/`<link>` tag in the template, adding it if absent. */
function setTag(html: string, match: RegExp, tag: string) {
  return match.test(html)
    ? html.replace(match, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

const tagPattern = (attr: string, value: string) =>
  new RegExp(`<(?:meta|link)\\s+${attr}="${value}"[^>]*?/?>`);

function renderPage(template: string, body: string, seo: PageSeo) {
  const url = absoluteUrl(seo.path);
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${title}</title>`,
  );

  const tags: [RegExp, string][] = [
    [
      tagPattern("name", "description"),
      `<meta name="description" content="${description}" />`,
    ],
    [
      tagPattern("property", "og:title"),
      `<meta property="og:title" content="${title}" />`,
    ],
    [
      tagPattern("property", "og:description"),
      `<meta property="og:description" content="${description}" />`,
    ],
    [
      tagPattern("property", "og:type"),
      `<meta property="og:type" content="${seo.type ?? "website"}" />`,
    ],
    [
      tagPattern("property", "og:url"),
      `<meta property="og:url" content="${url}" />`,
    ],
    [
      tagPattern("name", "twitter:title"),
      `<meta name="twitter:title" content="${title}" />`,
    ],
    [
      tagPattern("name", "twitter:description"),
      `<meta name="twitter:description" content="${description}" />`,
    ],
  ];
  if (seo.image) {
    const image = escapeHtml(absoluteUrl(seo.image));
    tags.push(
      [
        tagPattern("property", "og:image"),
        `<meta property="og:image" content="${image}" />`,
      ],
      [
        tagPattern("name", "twitter:image"),
        `<meta name="twitter:image" content="${image}" />`,
      ],
    );
  }
  for (const [match, tag] of tags) html = setTag(html, match, tag);

  if (seo.noindex) {
    html = html.replace(tagPattern("rel", "canonical"), "");
    html = setTag(
      html,
      tagPattern("name", "robots"),
      '<meta name="robots" content="noindex" />',
    );
  } else {
    html = setTag(
      html,
      tagPattern("rel", "canonical"),
      `<link rel="canonical" href="${url}" />`,
    );
  }

  if (seo.structuredData) {
    // "<" is escaped so page text can never close the script tag early.
    const jsonLd = JSON.stringify(seo.structuredData).replace(/</g, "\\u003c");
    html = html.replace(
      "</head>",
      `    <script type="application/ld+json" data-prerendered>${jsonLd}</script>\n  </head>`,
    );
  }

  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function sitemap(routes: PrerenderRoute[]) {
  const urls = routes
    .filter((route) => route.sitemap !== false)
    .map(
      (route) =>
        `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>\n${route.lastmod ? `    <lastmod>${route.lastmod}</lastmod>\n` : ""}  </url>\n`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>\n`;
}

function rss(posts: BlogPost[]) {
  const items = posts
    .map((post) => {
      const url = absoluteUrl(postPath(post));
      return `    <item>
      <title>${escapeHtml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeHtml(post.description)}</description>
      <pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(BLOG_TITLE)}</title>
    <link>${absoluteUrl(BLOG_PATH)}</link>
    <description>${escapeHtml(BLOG_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${absoluteUrl(`${BLOG_PATH}/rss.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}

function writeFile(file: string, contents: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

/**
 * Runs during the server build (`vite build --ssr src/entry-server.tsx`, the
 * second step of `npm run build`). It renders every route from
 * src/lib/routes.ts to static HTML in the client build (dist/), with that
 * page's title, meta tags, canonical URL and JSON-LD, so search engines and
 * link previews see the full page without running JavaScript. It also writes
 * dist/404.html, dist/sitemap.xml and the blog RSS feed.
 */
export default function prerenderPlugin({
  clientOutDir = "dist",
} = {}): Plugin {
  let ssrOutDir = "";
  let clientDir = "";
  let logger: Logger | undefined;

  return {
    name: "virtexa-prerender",
    apply: (config) => Boolean(config.build?.ssr),
    configResolved(config) {
      ssrOutDir = path.resolve(config.root, config.build.outDir);
      clientDir = path.resolve(config.root, clientOutDir);
      logger = config.logger;
    },
    async closeBundle() {
      const entry: ServerEntry = await import(
        pathToFileURL(path.join(ssrOutDir, "entry-server.js")).href
      );
      const template = fs.readFileSync(
        path.join(clientDir, "index.html"),
        "utf8",
      );

      const render = (url: string) => {
        const { html, seo } = entry.render(url);
        if (!seo) throw new Error(`Page ${url} does not call usePageSeo`);
        return renderPage(template, html, seo);
      };

      const routes = entry.prerenderRoutes();
      for (const route of routes) {
        const file =
          route.path === "/"
            ? "index.html"
            : path.join(route.path, "index.html");
        writeFile(path.join(clientDir, file), render(route.path));
      }
      writeFile(path.join(clientDir, "404.html"), render(entry.NOT_FOUND_PATH));
      writeFile(path.join(clientDir, "sitemap.xml"), sitemap(routes));
      writeFile(path.join(clientDir, BLOG_PATH, "rss.xml"), rss(entry.posts));

      fs.rmSync(ssrOutDir, { recursive: true, force: true });
      logger?.info(
        `Prerendered ${routes.length} pages and 404.html for ${SITE_URL}`,
      );
    },
  };
}
