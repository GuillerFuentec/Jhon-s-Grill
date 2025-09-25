// packages/tools/apply-config.js
// 1) Carga la config: window.config → /config.js (ESM) → /config.json
async function loadConfig() {
  if (window.config && typeof window.config === "object") return window.config;

  try {
    const m = await import("/config.js"); // ← servimos desde web/public/config.js
    if (m && (m.config || m.default)) return m.config || m.default;
  } catch (_) {}

  try {
    const res = await fetch("/config.json", { cache: "no-store" });
    if (res.ok) return await res.json();
  } catch (_) {}

  return {};
}

const toText = (v) =>
  v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);

function render(cfg, scope = document) {
  // por id
  for (const [key, val] of Object.entries(cfg)) {
    const el = document.getElementById(key);
    if (el) el.textContent = toText(val);
  }
  // por data-key (repetibles)
  scope.querySelectorAll?.("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (key in cfg) el.textContent = toText(cfg[key]);
  });
}

function observe(cfg) {
  const obs = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        const el = node;
        if (el.id && el.id in cfg) el.textContent = toText(cfg[el.id]);
        render(cfg, el);
      }
    }
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
  return obs;
}

function exposeHotUpdate(cfg) {
  window.applyRuntimeConfig = (newCfg = {}) => {
    Object.assign(cfg, newCfg);
    render(cfg, document);
  };
}

(async () => {
  const cfg = await loadConfig();
  const apply = () => render(cfg, document);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply, { once: true });
  } else {
    apply();
  }
  observe(cfg);
  exposeHotUpdate(cfg);
})();
