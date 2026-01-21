// packages/lib/loader/boot.js
(function () {
  const BOOT_MARK = 'data-boot-loaded';
  if (document.documentElement.hasAttribute(BOOT_MARK)) return;
  document.documentElement.setAttribute(BOOT_MARK, '1');

  const ctx = {
    loaded: new Set(),
    // Estos alias están pensados para que el public sea raíz del sitio
    aliases: { '~/': '/', '~scripts/': '/scripts/', '~styles/': '/styles/', '@/': '/src/' },
    cdn: {}
  };

  const norm = (p) => p.replace(/\\/g, '/');

  const resolveAlias = (url) => {
    for (const [k, v] of Object.entries(ctx.aliases)) {
      if (url.startsWith(k)) return url.replace(k, v);
    }
    return url;
  };

  function resolveEntry(entry) {
    if (!entry) return null;
    if (entry.startsWith('cdn:')) {
      const key = entry.slice(4).trim();
      const mapped = ctx.cdn[key];
      return mapped ? mapped : null;
    }
    return resolveAlias(entry);
  }

  function loadCSS(href, attrs = {}) {
    const url = resolveEntry(href);
    if (!url || ctx.loaded.has('css:' + url)) return Promise.resolve();
    return new Promise((res, rej) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
      link.onload = () => { ctx.loaded.add('css:' + url); res(); };
      link.onerror = () => rej(new Error('CSS load failed: ' + url));
      document.head.appendChild(link);
    });
  }

  function loadJS(src, { module = true, attrs = {} } = {}) {
    const url = resolveEntry(src);
    if (!url || ctx.loaded.has('js:' + url)) return Promise.resolve();
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      if (module) s.type = 'module';
      s.src = url;
      Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
      s.onload = () => { ctx.loaded.add('js:' + url); res(); };
      s.onerror = () => rej(new Error('JS load failed: ' + url));
      document.head.appendChild(s);
    });
  }

  async function fetchJSON(url) {
    const r = await fetch(url, { credentials: 'same-origin', cache: 'no-cache' });
    if (!r.ok) throw new Error('Cannot load ' + url);
    return r.json();
  }

  function parseList(val) {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return val.split(',').map(s => s.trim()).filter(Boolean);
    return [];
  }

  async function run() {
    // `imports.json` debe estar en web/public/imports.json
    let manifest = {};
    try { manifest = await fetchJSON('/imports.json'); } catch (e) { /* opcional */ }

    if (manifest.aliases) Object.assign(ctx.aliases, manifest.aliases);
    if (manifest.cdn) Object.assign(ctx.cdn, manifest.cdn);

    const autoload = manifest.autoload || {};
    const pageCfg = (manifest.pages && manifest.pages[location.pathname]) || {};

    // Declarativos (opcionales)
    const rootEl = document.documentElement;
    const dataCss = parseList(rootEl.getAttribute('data-import-css') || document.body?.getAttribute?.('data-import-css'));
    const dataJs  = parseList(rootEl.getAttribute('data-import-js')  || document.body?.getAttribute?.('data-import-js'));

    // Orden de carga
    const cssGlobal = parseList(autoload.css);
    const cssPage   = parseList(pageCfg.css);
    const cdnGlobal = parseList(autoload.cdn);
    const cdnPage   = parseList(pageCfg.cdn);
    const jsGlobal  = parseList(autoload.js);
    const jsPage    = parseList(pageCfg.js);

    // CSS
    for (const href of [...cssGlobal, ...cssPage, ...dataCss]) await loadCSS(href);

    // CDN
    for (const entry of [...cdnGlobal, ...cdnPage]) {
      const u = resolveEntry(entry);
      if (!u) continue;
      if (/\.(css)(\?|#|$)/i.test(u)) await loadCSS(u);
      else await loadJS(u, { module: false });
    }

    // JS
    for (const src of [...jsGlobal, ...jsPage, ...dataJs]) await loadJS(src, { module: true });

    // API mínima
    window.ResourceLoader = {
      loadCSS, loadJS, resolve: resolveEntry,
      aliases: { ...ctx.aliases }, cdn: { ...ctx.cdn }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
