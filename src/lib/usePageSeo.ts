import { useEffect } from "react";

export const SITE_URL = "https://virtexasolutions.com";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  structuredData?: object;
};

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
  };
}

/**
 * Sets the page title, description, canonical URL and social tags for a
 * client-rendered route, optionally injecting JSON-LD structured data, and
 * restores the defaults from index.html on unmount.
 */
export function usePageSeo({
  title,
  description,
  path,
  structuredData,
}: PageSeo) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const previousTitle = document.title;
    document.title = title;

    const restores = [
      setMeta(
        'meta[name="description"]',
        "content",
        "name=description",
        description,
      ),
      setMeta('link[rel="canonical"]', "href", "rel=canonical", url),
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

    let script: HTMLScriptElement | undefined;
    if (structuredData) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
      script?.remove();
    };
  }, [title, description, path, structuredData]);
}
