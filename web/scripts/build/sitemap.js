#!/usr/bin/env node
const fs = require("fs/promises");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const root = path.resolve(__dirname, "..", "..");
  const configUrl = pathToFileURL(path.join(root, "config.js"));
  const { default: cfg } = await import(configUrl.href);

  if (!cfg?.domain) {
    console.error("[sitemap] Config sin dominio. Define config.domain");
    process.exit(1);
  }

  const routes = Array.isArray(cfg.routes) ? cfg.routes : [];
  if (routes.length === 0) {
    console.warn("[sitemap] No hay rutas en config.routes");
  }

  const now = new Date().toISOString();

  const toUrl = (routePath) => new URL(routePath || "/", cfg.domain).href;

  const items = routes.map((route) => {
    const loc = toUrl(route.path || "/");
    const priority = route.priority ?? 0.5;
    const changefreq = route.changefreq || "monthly";
    const lastmod = route.lastmod || now;
    return `    <url>\n      <loc>${loc}</loc>\n      <changefreq>${changefreq}</changefreq>\n      <priority>${priority}</priority>\n      <lastmod>${lastmod}</lastmod>\n    </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items.join("\n")}\n</urlset>\n`;

  const outputPath = path.join(root, "public", "sitemap.xml");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, xml, "utf8");
  console.log(`[sitemap] Generado ${outputPath}`);
})();
