// packages/tools/inject-boot.mjs
import { promises as fs } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __file = fileURLToPath(import.meta.url);
const __dir = dirname(__file);

// Monorepo root: subir 2 niveles desde packages/tools/
const ROOT = join(__dir, "..", "..");
const WEB_DIR = join(ROOT, "web"); // ← tus .html están aquí
const PUBLIC_DIR = join(WEB_DIR, "public"); // assets públicos (imágenes, etc.)
const PKG = join(ROOT, "packages");

// Orígenes (packages)
const SRC_BOOT = join(PKG, "lib", "loader", "boot.js");
const SRC_APPLY = join(PKG, "tools", "apply-config.js");
const SRC_CONFIG = join(PKG, "lib", "config", "config.js");

// Destinos (RAÍZ web, no en public)
const DST_BOOT = join(WEB_DIR, "lib", "loader", "boot.js"); // /lib/loader/boot.js
const DST_APPLY = join(WEB_DIR, "scripts", "config", "apply-config.js"); // /scripts/config/apply-config.js
const DST_CONFIG = join(WEB_DIR, "config.js"); // /config.js

const EXCLUDE = new Set(["node_modules", "dist", ".git", "public"]); // no tocar /public

async function ensureDirForFile(p) {
  await fs.mkdir(dirname(p), { recursive: true });
}

async function copyFileSafe(src, dst) {
  await ensureDirForFile(dst);
  await fs.copyFile(src, dst);
  console.log("Copied:", src, "->", dst);
}

async function* walk(dir) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (EXCLUDE.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else if (e.isFile() && e.name.endsWith(".html")) {
      yield full;
    }
  }
}

function inject(html) {
  const bootTag = `<script src="/lib/loader/boot.js" defer></script>`;
  const applyTag = `<script type="module" src="/scripts/config/apply-config.js"></script>`;

  const hasBoot = html.includes("/lib/loader/boot.js");
  const hasApply = html.includes("/scripts/config/apply-config.js");

  // Nada que inyectar
  if (hasBoot && hasApply) return html;

  // Construir bloque solo con lo que falte
  const block =
    [hasBoot ? "" : `  ${bootTag}`, hasApply ? "" : `  ${applyTag}`]
      .filter(Boolean)
      .join("\n") + "\n";

  if (html.includes("</head>")) {
    return html.replace("</head>", `${block}</head>`);
  }
  if (/<body[^>]*>/i.test(html)) {
    return html.replace(/<body[^>]*>/i, (m) => `${m}\n${block}`);
  }
  return `${block}${html}`;
}

(async () => {
  // 1) Copiar a la RAÍZ web (coincide con rutas absolutas del navegador)
  await copyFileSafe(SRC_BOOT, DST_BOOT);
  await copyFileSafe(SRC_APPLY, DST_APPLY);
  await copyFileSafe(SRC_CONFIG, DST_CONFIG);

  // 2) Inyectar en TODAS las páginas HTML bajo /web (excluye /public)
  let count = 0;
  for await (const file of walk(WEB_DIR)) {
    const src = await fs.readFile(file, "utf8");
    const out = inject(src);
    if (out !== src) {
      await fs.writeFile(file, out, "utf8");
      count++;
      console.log("Injected ->", file);
    }
  }
  if (count === 0) {
    console.log("Nada que inyectar (o ya estaba inyectado).");
  } else {
    console.log(`Inyección completada: ${count} archivo(s).`);
  }
})();
