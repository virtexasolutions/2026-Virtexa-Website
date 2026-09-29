import { postPath, posts } from "@/lib/blog";
import { solutionPath, solutions } from "@/lib/solutions";

export type PrerenderRoute = {
  path: string;
  /** Omit a route from sitemap.xml (it is still prerendered). */
  sitemap?: boolean;
  /** ISO date of the last meaningful content change, for sitemap.xml. */
  lastmod?: string;
};

/** Rendered to dist/404.html, which the host serves for unknown URLs. */
export const NOT_FOUND_PATH = "/404";

/** Every public page. Each is prerendered to static HTML and listed in sitemap.xml. */
export function prerenderRoutes(): PrerenderRoute[] {
  return [
    { path: "/" },
    ...solutions.map((s) => ({ path: solutionPath(s) })),
    {
      path: "/blog",
      lastmod: posts[0] ? (posts[0].updated ?? posts[0].date) : undefined,
    },
    ...posts.map((p) => ({ path: postPath(p), lastmod: p.updated ?? p.date })),
    { path: "/founders" },
    { path: "/privacy" },
    { path: "/terms" },
  ];
}
