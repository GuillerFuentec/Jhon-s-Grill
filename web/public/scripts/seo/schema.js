import cfg, { required } from "/config.js";

const getDescription = () => document.querySelector("meta[name='description']")?.content || "";

const buildBreadcrumb = (canonical) => {
  const breadcrumb = window.__PAGE_BREADCRUMB__ || [];
  if (!Array.isArray(breadcrumb) || breadcrumb.length === 0) return null;
  const itemListElement = breadcrumb.map((item, index) => {
    const url = new URL(item.path || item.url || canonical, required(cfg, "domain")).href;
    return {
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: url
    };
  });
  if (itemListElement.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement
  };
};

const resolveToken = (value) => {
  if (typeof value === "string" && value.startsWith("cfg.")) {
    const raw = value.slice(4);
    const [pathPart, hashSuffix] = raw.split("#", 2);
    const base = pathPart
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), cfg);
    if (hashSuffix) {
      return `${base}#${hashSuffix}`;
    }
    return base;
  }
  if (Array.isArray(value)) {
    return value.map((item) => resolveToken(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolveToken(v)]));
  }
  return value;
};

const normalizeSchemaEntry = (entry) => {
  if (!entry) return null;
  if (Array.isArray(entry)) return entry.map(normalizeSchemaEntry).filter(Boolean);
  const enriched = resolveToken(entry);
  return {
    "@context": "https://schema.org",
    ...enriched
  };
};

export const buildStructuredData = (baseEntries = []) => {
  const page = window.__PAGE_META__ || {};
  const canonicalPath = page.canonical || page.path || window.location.pathname;
  const canonical = new URL(canonicalPath, required(cfg, "domain")).href;
  const entries = [...baseEntries];
  const websiteId = `${required(cfg, "domain")}#website`;
  const restaurantId = `${required(cfg, "domain")}#restaurant`;

  const webpage = {
    "@type": page.schemaType || "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: document.title,
    description: getDescription(),
    inLanguage: cfg.defaultLocale || "es",
    isPartOf: { "@id": websiteId }
  };
  entries.push(webpage);

  const breadcrumb = buildBreadcrumb(canonical);
  if (breadcrumb) entries.push(breadcrumb);

  const extra = window.__PAGE_SCHEMA__;
  if (extra) {
    const normalized = normalizeSchemaEntry(extra);
    if (Array.isArray(normalized)) {
      entries.push(...normalized);
    } else if (normalized) {
      entries.push(normalized);
    }
  }

  entries.forEach((entry) => {
    if (!entry["@context"]) {
      entry["@context"] = "https://schema.org";
    }
    if (entry["@type"] === "Restaurant" && !entry["@id"]) {
      entry["@id"] = restaurantId;
    }
    if (entry["@type"] === "WebSite" && !entry["@id"]) {
      entry["@id"] = websiteId;
    }
  });

  return entries;
};

export default buildStructuredData;
