// @vitest-environment node
import { describe, expect, it } from "vitest";
import { NOT_FOUND_PATH, prerenderRoutes, render } from "@/entry-server";
import { faqs } from "@/lib/faqs";

const routes = prerenderRoutes();
const paths = new Set(routes.map((r) => r.path));

describe("prerendered pages", () => {
  it.each(routes.map((r) => r.path))("%s renders with SEO tags", (path) => {
    const { html, seo } = render(path);
    expect(seo?.path).toBe(path);
    expect(seo?.title.length).toBeGreaterThan(10);
    expect(seo?.description.length).toBeGreaterThan(50);
    expect(seo?.noindex).toBeFalsy();
    expect(html).toMatch(/<h1[\s>]/);
  });

  it("gives every page a unique title and description", () => {
    const seos = routes.map((r) => render(r.path).seo!);
    expect(new Set(seos.map((s) => s.title)).size).toBe(seos.length);
    expect(new Set(seos.map((s) => s.description)).size).toBe(seos.length);
  });

  it("puts every home page FAQ answer in the HTML", () => {
    const { html } = render("/");
    const escape = (text: string) =>
      text.replace(/&/g, "&amp;").replace(/'/g, "&#x27;");
    for (const faq of faqs) expect(html).toContain(escape(faq.a));
  });

  it("renders the home page stats marquee content once", () => {
    const { html } = render("/");
    expect(html.split("24/7/365").length - 1).toBe(1);
  });

  it("marks the 404 page noindex", () => {
    expect(render(NOT_FOUND_PATH).seo?.noindex).toBe(true);
  });

  it("only links internally to pages that exist", () => {
    const ids = new Map(
      routes.map((r) => {
        const { html } = render(r.path);
        return [
          r.path,
          new Set([...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1])),
        ];
      }),
    );
    for (const route of routes) {
      const { html } = render(route.path);
      for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
        if (href.startsWith("//")) continue;
        const [pathname, hash] = href.split("#");
        expect(paths, `${route.path} links to ${href}`).toContain(pathname);
        if (hash) {
          expect(ids.get(pathname), `${route.path} links to ${href}`).toContain(
            hash,
          );
        }
      }
    }
  });
});
