import fs from "node:fs";
import path from "node:path";
import type { Logger, Plugin } from "vite";
import {
  BLOG_DESCRIPTION,
  BLOG_PATH,
  BLOG_TITLE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  blogStructuredData,
  buildPosts,
  formatPostDate,
  postPath,
  postStructuredData,
  type BlogPost,
} from "./src/lib/blog-core";

const CONTENT_DIR = "src/content/blog";

type Page = {
  path: string;
  title: string;
  description: string;
  type: "website" | "article";
  image?: string;
  structuredData: object;
  body: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readPosts(root: string) {
  const dir = path.join(root, CONTENT_DIR);
  if (!fs.existsSync(dir)) return [];
  const files: Record<string, string> = {};
  for (const name of fs.readdirSync(dir)) {
    if (name.endsWith(".md")) {
      files[`${CONTENT_DIR}/${name}`] = fs.readFileSync(
        path.join(dir, name),
        "utf8",
      );
    }
  }
  return buildPosts(files);
}

/** Sets a `<meta>`/`<link>` attribute in the template, adding the tag if absent. */
function setTag(html: string, match: RegExp, tag: string) {
  return match.test(html)
    ? html.replace(match, tag)
    : html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderPage(template: string, page: Page) {
  const url = absoluteUrl(page.path);
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${title}</title>`,
  );

  const tags: [RegExp, string][] = [
    [
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${description}" />`,
    ],
    [
      /<link\s+rel="canonical"[\s\S]*?\/>/,
      `<link rel="canonical" href="${url}" />`,
    ],
    [
      /<meta\s+property="og:title"[\s\S]*?\/>/,
      `<meta property="og:title" content="${title}" />`,
    ],
    [
      /<meta\s+property="og:description"[\s\S]*?\/>/,
      `<meta property="og:description" content="${description}" />`,
    ],
    [
      /<meta\s+property="og:type"[\s\S]*?\/>/,
      `<meta property="og:type" content="${page.type}" />`,
    ],
    [
      /<meta\s+property="og:url"[\s\S]*?\/>/,
      `<meta property="og:url" content="${url}" />`,
    ],
    [
      /<meta\s+name="twitter:title"[\s\S]*?\/>/,
      `<meta name="twitter:title" content="${title}" />`,
    ],
    [
      /<meta\s+name="twitter:description"[\s\S]*?\/>/,
      `<meta name="twitter:description" content="${description}" />`,
    ],
  ];
  if (page.image) {
    const image = escapeHtml(absoluteUrl(page.image));
    tags.push(
      [
        /<meta\s+property="og:image"[\s\S]*?\/>/,
        `<meta property="og:image" content="${image}" />`,
      ],
      [
        /<meta\s+name="twitter:image"[\s\S]*?\/>/,
        `<meta name="twitter:image" content="${image}" />`,
      ],
    );
  }
  for (const [match, tag] of tags) html = setTag(html, match, tag);

  // "<" is escaped so post text can never close the script tag early.
  const jsonLd = JSON.stringify(page.structuredData).replace(/</g, "\\u003c");
  html = html.replace(
    "</head>",
    `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`,
  );

  // Crawlers get the full content without running JS; React replaces it on load.
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${page.body}</div>`,
  );
}

function postBody(post: BlogPost) {
  return `<main class="container mx-auto max-w-3xl px-4 pt-12 pb-20"><nav><a href="${BLOG_PATH}">All articles</a></nav><article class="mt-8"><header><h1 class="text-4xl font-bold">${escapeHtml(post.title)}</h1><p class="mt-4 text-sm text-muted-foreground">By ${escapeHtml(post.author)} · <time datetime="${post.date}">${formatPostDate(post.date)}</time> · ${post.readingMinutes} min read</p></header><div class="blog-prose mt-10">${post.html}</div></article></main>`;
}

function indexBody(posts: BlogPost[]) {
  const items = posts
    .map(
      (post) =>
        `<li><article><h2><a href="${postPath(post)}">${escapeHtml(post.title)}</a></h2><p><time datetime="${post.date}">${formatPostDate(post.date)}</time></p><p>${escapeHtml(post.description)}</p></article></li>`,
    )
    .join("");
  return `<main class="container mx-auto max-w-3xl px-4 pt-12 pb-20"><h1 class="text-4xl font-bold">Blog</h1><p>${escapeHtml(BLOG_DESCRIPTION)}</p><ul>${items}</ul></main>`;
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

function sitemapEntries(posts: BlogPost[]) {
  const newest = posts[0];
  const entries = [
    {
      loc: absoluteUrl(BLOG_PATH),
      lastmod: newest ? (newest.updated ?? newest.date) : undefined,
      changefreq: "weekly",
      priority: "0.7",
    },
    ...posts.map((post) => ({
      loc: absoluteUrl(postPath(post)),
      lastmod: post.updated ?? post.date,
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];
  return entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ""}    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>\n`,
    )
    .join("");
}

function writeFile(file: string, contents: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

/**
 * After `vite build`, writes a static HTML file for /blog and every post (with
 * the right title, meta tags, JSON-LD and article content baked in), adds the
 * blog URLs to sitemap.xml, and generates an RSS feed at /blog/rss.xml.
 */
export default function blogPlugin(): Plugin {
  let root = process.cwd();
  let outDir = "dist";
  let logger: Logger | undefined;

  return {
    name: "virtexa-blog",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
      logger = config.logger;
    },
    closeBundle() {
      const posts = readPosts(root);
      const template = fs.readFileSync(path.join(outDir, "index.html"), "utf8");

      const pages: Page[] = [
        {
          path: BLOG_PATH,
          title: BLOG_TITLE,
          description: BLOG_DESCRIPTION,
          type: "website",
          structuredData: blogStructuredData(posts),
          body: indexBody(posts),
        },
        ...posts.map((post) => ({
          path: postPath(post),
          title: `${post.title} | ${SITE_NAME}`,
          description: post.description,
          type: "article" as const,
          image: post.image,
          structuredData: postStructuredData(post),
          body: postBody(post),
        })),
      ];
      for (const page of pages) {
        writeFile(
          path.join(outDir, page.path, "index.html"),
          renderPage(template, page),
        );
      }

      writeFile(path.join(outDir, BLOG_PATH, "rss.xml"), rss(posts));

      const sitemapFile = path.join(outDir, "sitemap.xml");
      if (fs.existsSync(sitemapFile)) {
        const sitemap = fs.readFileSync(sitemapFile, "utf8");
        writeFile(
          sitemapFile,
          sitemap.replace("</urlset>", `${sitemapEntries(posts)}</urlset>`),
        );
      }

      logger?.info(
        `Prerendered ${pages.length} blog page(s) for ${SITE_URL}${BLOG_PATH}`,
      );
    },
  };
}
