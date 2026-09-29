/* eslint-disable react-refresh/only-export-components -- build-time entry, never hot-reloaded */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";
import { takeRenderedSeo } from "@/lib/usePageSeo";

export { prerenderRoutes, NOT_FOUND_PATH } from "@/lib/routes";
export { posts } from "@/lib/blog";

/** Renders one route to HTML for the build-time prerender (vite-plugin-prerender.ts). */
export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
  );
  return { html, seo: takeRenderedSeo() };
}
