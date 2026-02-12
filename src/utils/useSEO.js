import { useEffect } from "react";

const BASE_URL = "https://www.aquadeb.be";
const DEFAULT_IMAGE = "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766673668/aquadeb_cgzzsg.png";

const ensureTag = (selector, createFn, update) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = createFn();
    document.head.appendChild(el);
  }
  update(el);
};

const setMeta = (name, content, isProperty = false) => {
  if (!content) return;
  const attr = isProperty ? "property" : "name";
  ensureTag(`meta[${attr}="${name}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, name);
    return m;
  }, (el) => el.setAttribute("content", content));
};

const setLink = (rel, href) => {
  if (!href) return;
  ensureTag(`link[rel="${rel}"]`, () => {
    const l = document.createElement("link");
    l.setAttribute("rel", rel);
    return l;
  }, (el) => el.setAttribute("href", href));
};

const setJsonLd = (data) => {
  ensureTag('script[data-seo-schema="localbusiness"]', () => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-seo-schema", "localbusiness");
    return s;
  }, (el) => {
    el.textContent = JSON.stringify(data);
  });
};

export default function useSEO({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_IMAGE,
  type = "website",
}) {
  useEffect(() => {
    if (!title) return;
    document.title = title;

    const canonicalUrl = `${BASE_URL}${path}`;

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", type, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
    setLink("canonical", canonicalUrl);

    setJsonLd({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "AquaDeb",
      image: ogImage,
      url: canonicalUrl,
      telephone: "+32 493 41 52 83",
      areaServed: "Belgique",
      openingHours: "Mo-Su 00:00-23:59",
      description,
      serviceType: title,
    });
  }, [title, description, path, ogImage, type]);
}

export { BASE_URL, DEFAULT_IMAGE };
