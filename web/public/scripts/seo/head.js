import cfg, { required } from "/config.js";

const seenLinks = new Set();

const ensureMetaName = (name, content) => {
  if (!content && content !== "") return;
  let meta = document.head.querySelector(`meta[name='${name}']`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const ensureMetaProp = (property, content) => {
  if (!content && content !== "") return;
  let meta = document.head.querySelector(`meta[property='${property}']`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const ensureLink = (rel, attrs = {}) => {
  const key = `${rel}:${JSON.stringify(attrs)}`;
  if (seenLinks.has(key)) return;
  const selectorParts = [`link[rel='${rel}']`];
  if (attrs.hreflang) selectorParts.push(`[hreflang='${attrs.hreflang}']`);
  if (attrs.as) selectorParts.push(`[as='${attrs.as}']`);
  if (attrs.sizes) selectorParts.push(`[sizes='${attrs.sizes}']`);
  let link = document.head.querySelector(selectorParts.join(""));
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      link.setAttribute(k, v);
    }
  });
  seenLinks.add(key);
  return link;
};

const absoluteUrl = (value) => {
  if (!value) return value;
  try {
    return new URL(value, required(cfg, "domain")).href;
  } catch (error) {
    console.warn(`[seo] URL inválida: ${value}`, error);
    return value;
  }
};

const addPreconnects = () => {
  const origins = new Set();
  const analytics = cfg.analytics || {};
  if (analytics.plausibleDomain) {
    origins.add("https://plausible.io");
  }
  if (analytics.ga4) {
    origins.add("https://www.googletagmanager.com");
  }
  origins.forEach((origin) => {
    ensureLink("preconnect", { href: origin, crossorigin: "" });
    ensureLink("dns-prefetch", { href: origin });
  });
};

const applyHreflang = (canonical) => {
  const locales = cfg.locales || [];
  if (!Array.isArray(locales) || locales.length <= 1) return;
  locales.forEach((locale) => {
    const href = canonical.replace(/(\.[^./?#]+)?$/, locale === cfg.defaultLocale ? "$1" : `${locale}$1`);
    ensureLink("alternate", { hreflang: locale, href });
  });
  ensureLink("alternate", { hreflang: "x-default", href: canonical });
};

const applyOpenGraph = (page) => {
  const company = required(cfg, "companyName");
  ensureMetaProp("og:site_name", company);
  ensureMetaProp("og:locale", `${(cfg.defaultLocale || "es").replace('-', '_')}`);
  ensureMetaName("twitter:card", "summary_large_image");
  if (cfg.social?.x) {
    ensureMetaName("twitter:site", cfg.social.x);
    ensureMetaName("twitter:creator", cfg.social.x);
  }
  const ogImage = absoluteUrl(required(cfg, "media.ogDefault"));
  ensureMetaProp("og:image", ogImage);
  ensureMetaName("twitter:image", ogImage);
  ensureMetaProp("og:image:width", "1200");
  ensureMetaProp("og:image:height", "630");
  if (page.title) {
    ensureMetaName("twitter:title", page.title);
  }
  if (page.description) {
    ensureMetaName("twitter:description", page.description);
  }
};

const injectFavicons = () => {
  const icons = cfg.media?.icons || {};
  if (icons.faviconSvg) {
    ensureLink("icon", { href: absoluteUrl(icons.faviconSvg), type: "image/svg+xml" });
  }
  if (icons.favicon32) {
    ensureLink("icon", { href: absoluteUrl(icons.favicon32), sizes: "32x32", type: "image/png" });
  }
  if (icons.favicon16) {
    ensureLink("icon", { href: absoluteUrl(icons.favicon16), sizes: "16x16", type: "image/png" });
  }
  if (icons.appleTouch) {
    ensureLink("apple-touch-icon", { href: absoluteUrl(icons.appleTouch) });
  }
  if (icons.maskIcon) {
    ensureLink("mask-icon", { href: absoluteUrl(icons.maskIcon), color: icons.maskIconColor || "#0f172a" });
  }
};

const injectManifest = () => {
  ensureLink("manifest", { href: "/site.webmanifest" });
  const icons = cfg.media?.icons || {};
  if (icons.msTileColor) {
    ensureMetaName("msapplication-TileColor", icons.msTileColor);
  }
  if (icons.msTileImage) {
    ensureMetaName("msapplication-TileImage", absoluteUrl(icons.msTileImage));
  }
};

export const applyHeadEnhancements = () => {
  const page = window.__PAGE_META__ || {};
  const canonicalPath = page.canonical || page.path || window.location.pathname;
  const canonical = new URL(canonicalPath, required(cfg, "domain")).href;
  const title = page.title ? `${page.title} · ${required(cfg, "companyName")}` : `${required(cfg, "companyName")} — ${required(cfg, "tagline")}`;
  document.title = title;
  ensureMetaName("description", page.description || `${required(cfg, "tagline")} en ${required(cfg, "address.locality")}. Reservas y pedidos online.`);
  ensureMetaName("viewport", "width=device-width, initial-scale=1");
  ensureMetaName("format-detection", "telephone=no");
  ensureMetaName("theme-color", "#0ea5e9");
  const canonicalLink = ensureLink("canonical", { href: canonical });
  if (canonicalLink?.href !== canonical) canonicalLink.href = canonical;
  if (cfg.verification?.google) ensureMetaName("google-site-verification", cfg.verification.google);
  if (cfg.verification?.bing) ensureMetaName("msvalidate.01", cfg.verification.bing);
  applyOpenGraph({ title, description: document.querySelector("meta[name='description']")?.content });
  ensureMetaProp("og:url", canonical);
  applyHreflang(canonical);
  addPreconnects();
  injectFavicons();
  injectManifest();
  document.documentElement.lang = cfg.defaultLocale || "es";
};

export const resolveImageAttrs = (src, width, height, alt = "") => {
  return {
    src,
    width,
    height,
    loading: "lazy",
    decoding: "async",
    alt,
  };
};

export default applyHeadEnhancements;
