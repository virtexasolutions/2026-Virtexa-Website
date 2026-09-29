import { marked } from "marked";

/*
 * Framework-free blog helpers shared by the React app (src/lib/blog.ts) and
 * the build-time prerender plugin (vite-plugin-blog.ts). Keep this file free
 * of browser- and Vite-only APIs so it runs in Node too.
 */

export const SITE_URL = "https://virtexasolutions.com";
export const SITE_NAME = "Virtexa Solutions";
export const BLOG_PATH = "/blog";
export const BLOG_TITLE = "Blog | Virtexa Solutions";
export const BLOG_DESCRIPTION =
  "Practical guides on AI voice agents, lead response, and automation for real estate agents, teams, and brokerages, from the team at Virtexa Solutions.";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD) the post was published. */
  date: string;
  /** ISO date (YYYY-MM-DD) the post was last meaningfully updated. */
  updated?: string;
  author: string;
  tags: string[];
  /** Optional absolute or root-relative URL of a social share image. */
  image?: string;
  draft: boolean;
  readingMinutes: number;
  html: string;
};

const REQUIRED_FIELDS = ["title", "description", "date"] as const;

/**
 * Parses a small YAML-like frontmatter block: `key: value` lines, with
 * `[a, b]` lists and optional surrounding quotes. That is all posts need, and
 * it avoids pulling a YAML parser into the browser bundle.
 */
export function parseFrontmatter(raw: string): {
  data: Record<string, string | string[]>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string | string[]> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z][\w-]*)\s*:\s*(.*)$/.exec(line.trim());
    if (!kv) continue;
    const value = kv[2].trim();
    data[kv[1]] =
      value.startsWith("[") && value.endsWith("]")
        ? value
            .slice(1, -1)
            .split(",")
            .map((item) => unquote(item.trim()))
            .filter(Boolean)
        : unquote(value);
  }
  return { data, body: match[2] };
}

function unquote(value: string) {
  return /^(["']).*\1$/.test(value) ? value.slice(1, -1) : value;
}

/** Turns `path/to/2026-10-01-my-post.md` or `my-post.md` into `my-post`. */
export function slugFromPath(path: string) {
  return path
    .split("/")
    .pop()!
    .replace(/\.md$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

export function parsePost(path: string, raw: string): BlogPost {
  const { data, body } = parseFrontmatter(raw);
  for (const field of REQUIRED_FIELDS) {
    if (typeof data[field] !== "string" || !data[field]) {
      throw new Error(`Blog post ${path} is missing "${field}" in frontmatter`);
    }
  }
  const str = (key: string) =>
    typeof data[key] === "string" ? (data[key] as string) : undefined;
  const tags = data.tags;
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    slug: str("slug") ?? slugFromPath(path),
    title: str("title")!,
    description: str("description")!,
    date: str("date")!,
    updated: str("updated"),
    author: str("author") ?? SITE_NAME,
    tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
    image: str("image"),
    draft: str("draft") === "true",
    readingMinutes: Math.max(1, Math.round(words / 225)),
    html: marked.parse(body, { async: false }) as string,
  };
}

/** Parses, drops drafts, and sorts newest first. */
export function buildPosts(files: Record<string, string>): BlogPost[] {
  const posts = Object.entries(files)
    .map(([path, raw]) => parsePost(path, raw))
    .filter((post) => !post.draft);

  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) {
      throw new Error(`Duplicate blog post slug "${post.slug}"`);
    }
    seen.add(post.slug);
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function postPath(post: Pick<BlogPost, "slug">) {
  return `${BLOG_PATH}/${post.slug}`;
}

export function absoluteUrl(pathOrUrl: string) {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

export function formatPostDate(iso: string) {
  // Parse as UTC so the displayed day never shifts with the viewer's timezone.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const publisher = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
};

export function postStructuredData(post: BlogPost) {
  const url = absoluteUrl(postPath(post));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        author:
          post.author === SITE_NAME
            ? publisher
            : { "@type": "Person", name: post.author },
        publisher,
        keywords: post.tags.join(", "),
        ...(post.image ? { image: absoluteUrl(post.image) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl(BLOG_PATH),
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

export function blogStructuredData(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: absoluteUrl(BLOG_PATH),
    publisher,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(postPath(post)),
      datePublished: post.date,
    })),
  };
}
