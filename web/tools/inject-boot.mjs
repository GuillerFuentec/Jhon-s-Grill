import { promises as fs } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __file = fileURLToPath(import.meta.url);
const __dir = dirname(__file);

const WEB_DIR = resolve(__dir, "..");
const PKG_DIR = resolve(WEB_DIR, "..", "packages");

const FILES = [
  "lib/loader/boot.js",
  "scripts/config/apply-config.js",
  "config.js",
];

async function ensureDirForFile(path) {
  await fs.mkdir(dirname(path), { recursive: true });
}

async function pathExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

function resolvePath(root, relative) {
  return join(root, ...relative.split("/"));
}

async function pickSource(relative) {
  const candidates = [resolvePath(PKG_DIR, relative), resolvePath(WEB_DIR, relative)];
  for (const candidate of candidates) {
    if (await pathExists(candidate)) {
      return candidate;
    }
  }
  return null;
}

async function copyIfNeeded(relative) {
  const dest = resolvePath(WEB_DIR, relative);
  const src = await pickSource(relative);
  if (!src) {
    console.warn(`Skipping ${relative} (source not found).`);
    return;
  }
  if (dest === src) {
    return;
  }
  await ensureDirForFile(dest);
  await fs.copyFile(src, dest);
  console.log(`Copied ${relative}`);
}

const EXCLUDE = new Set(["node_modules", "dist", ".git", "public"]);

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (EXCLUDE.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      yield full;
    }
  }
}

function inject(html) {
  const bootTag = `<script src="/lib/loader/boot.js" defer></script>`;
  const applyTag = `<script type="module" src="/scripts/config/apply-config.js"></script>`;

  const hasBoot = html.includes("/lib/loader/boot.js");
  const hasApply = html.includes("/scripts/config/apply-config.js");

  if (hasBoot && hasApply) return html;

  const block = [
    hasBoot ? "" : `  ${bootTag}`,
    hasApply ? "" : `  ${applyTag}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (!block) return html;

  const injection = `${block}\n`;

  if (html.includes("</head>")) {
    return html.replace("</head>", `${injection}</head>`);
  }
  const bodyMatch = html.match(/<body[^>]*>/i);
  if (bodyMatch) {
    return html.replace(bodyMatch[0], `${bodyMatch[0]}\n${injection}`);
  }
  return `${injection}${html}`;
}

(async () => {
  for (const file of FILES) {
    await copyIfNeeded(file);
  }

  let patched = 0;
  for await (const file of walk(WEB_DIR)) {
    const html = await fs.readFile(file, "utf8");
    const updated = inject(html);
    if (updated !== html) {
      await fs.writeFile(file, updated, "utf8");
      patched++;
      console.log(`Injected -> ${file}`);
    }
  }

  if (patched === 0) {
    console.log("No HTML updates were required.");
  } else {
    console.log(`Injection complete: ${patched} file(s) updated.`);
  }
})();
