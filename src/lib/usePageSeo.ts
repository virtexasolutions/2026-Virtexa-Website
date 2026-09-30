import { useEffect } from "react";
import { ORGANIZATION_ID, SITE_URL } from "@/lib/blog-core";

export { ORGANIZATION_ID, SITE_URL };

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  structuredData?: object;
  /** Open Graph type; defaults to "website". */
  type?: "website" | "article";
  /** Absolute or root-relative social share image. */
  image?: string;
  /** Ask search engines not to index the page (e.g. the 404 page). */
  noindex?: boolean;
};

// During the build-time prerender (src/entry-server.tsx), effects never run,
// so the page's SEO settings are recorded here during render instead.
let renderedSeo: PageSeo | undefined;

export function takeRenderedSeo() {
  const seo = renderedSeo;
  renderedSeo = undefined;
  return seo;
}

function setMeta(selector: string, attr: string, key: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  const previous = el?.getAttribute(attr);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    const [name, keyValue] = key.split("=");
    el.setAttribute(name, keyValue);
    document.head.appendChild(el);
  }
  const target = el;
  target.setAttribute(attr, value);
  return () => {
    if (previous != null) target.setAttribute(attr, previous);
    else target.remove();
  };
}

/**
 * Sets the page title, description, canonical URL and social tags for a route,
 * optionally injecting JSON-LD structured data, and restores the previous
 * values on unmount. The same settings are baked into the prerendered HTML.
 */
export function usePageSeo(seo: PageSeo) {
  if (import.meta.env.SSR) renderedSeo = seo;

  const {
    title,
    description,
    path,
    structuredData,
    type = "website",
    image,
    noindex = false,
  } = seo;

  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const previousTitle = document.title;
    document.title = title;

    // The prerendered HTML already carries this page's JSON-LD; drop it so it
    // is not duplicated below or left behind after client-side navigation.
    document.head
      .querySelectorAll("script[data-prerendered]")
      .forEach((el) => el.remove());

    const restores = [
      setMeta(
        'meta[name="description"]',
        "content",
        "name=description",
        description,
      ),
      setMeta(
        'meta[property="og:title"]',
        "content",
        "property=og:title",
        title,
      ),
      setMeta(
        'meta[property="og:description"]',
        "content",
        "property=og:description",
        description,
      ),
      setMeta('meta[property="og:url"]', "content", "property=og:url", url),
      setMeta('meta[property="og:type"]', "content", "property=og:type", type),
      setMeta(
        'meta[name="twitter:title"]',
        "content",
        "name=twitter:title",
        title,
      ),
      setMeta(
        'meta[name="twitter:description"]',
        "content",
        "name=twitter:description",
        description,
      ),
    ];
    if (image) {
      const imageUrl = /^https?:\/\//.test(image) ? image : SITE_URL + image;
      restores.push(
        setMeta(
          'meta[property="og:image"]',
          "content",
          "property=og:image",
          imageUrl,
        ),
        setMeta(
          'meta[name="twitter:image"]',
          "content",
          "name=twitter:image",
          imageUrl,
        ),
      );
    }
    // A noindex page (the 404 page) must not declare a canonical URL.
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (noindex) {
      canonical?.remove();
      restores.push(
        setMeta('meta[name="robots"]', "content", "name=robots", "noindex"),
        () => {
          if (canonical) document.head.appendChild(canonical);
        },
      );
    } else {
      restores.push(
        setMeta('link[rel="canonical"]', "href", "rel=canonical", url),
      );
    }

    let script: HTMLScriptElement | undefined;
    if (structuredData) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Start each page at the top, unless the URL targets a section.
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
      script?.remove();
    };
  }, [title, description, path, structuredData, type, image, noindex]);
}
