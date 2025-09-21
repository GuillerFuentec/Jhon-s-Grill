import { COOKIE_CONFIG } from "./config.js";
import { saveConsent, defaultConsent } from "./storage.js";
import { loadByConsent } from "./loader.js";

const qs = (sel, root=document) => root.querySelector(sel);

export function makeBanner(consent, onChange) {
  const lang = navigator.language?.startsWith("en") ? "en" : COOKIE_CONFIG.defaultLang;
  const t = COOKIE_CONFIG.i18n[lang] || COOKIE_CONFIG.i18n.es;

  // UI
  const wrap = document.createElement("div");
  wrap.id = "cookie-banner";
  wrap.setAttribute("role", "dialog");
  wrap.setAttribute("aria-modal", "true");
  wrap.setAttribute("aria-label", t.title);
  wrap.innerHTML = `
    <style>
      #cookie-banner{position:fixed;inset:auto 0 0 0;background:#111;color:#fff;
        padding:16px;display:flex;gap:16px;align-items:flex-start;z-index:2147483647;
        box-shadow:0 -8px 24px rgba(0,0,0,.25);font:14px/1.4 system-ui,Segoe UI,Roboto,Helvetica,Arial}
      #cookie-banner .txt{flex:1;min-width:0}
      #cookie-banner h2{margin:0 0 6px;font-size:16px}
      #cookie-banner p{margin:0 0 8px;color:#ddd}
      #cookie-banner .cats{display:grid;grid-template-columns:1fr;gap:6px;margin:8px 0}
      #cookie-banner .cat{background:#1c1c1c;border-radius:8px;padding:8px}
      #cookie-banner .cat label{display:flex;justify-content:space-between;align-items:center;gap:12px}
      #cookie-banner .cat small{display:block;color:#aaa;margin-top:4px}
      #cookie-banner .actions{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}
      #cookie-banner button{border:0;border-radius:8px;padding:10px 14px;cursor:pointer}
      #cookie-banner .primary{background:#22c55e;color:#071b0c;font-weight:600}
      #cookie-banner .ghost{background:#222;color:#eee}
      #cookie-banner a{color:#93c5fd;text-decoration:underline}
      @media(min-width:720px){
        #cookie-banner{padding:18px 24px}
        #cookie-banner .cats{grid-template-columns:repeat(2,1fr)}
      }
    </style>
    <div class="txt">
      <h2>${t.title}</h2>
      <p>${t.desc} <a href="${COOKIE_CONFIG.policyUrl}" target="_blank" rel="noopener">${t.actions.policy}</a></p>
      <div class="cats" role="group" aria-label="Categorías de cookies">
        ${renderCat("necessary", t, true, true)}
        ${renderCat("analytics", t, consent.categories.analytics)}
        ${renderCat("performance", t, consent.categories.performance)}
        ${renderCat("marketing", t, consent.categories.marketing)}
      </div>
    </div>
    <div class="actions">
      <button class="ghost reject">${t.actions.rejectAll}</button>
      <button class="ghost save">${t.actions.save}</button>
      <button class="primary accept">${t.actions.acceptAll}</button>
    </div>
  `;

  // Comportamiento
  const state = structuredClone(consent);

  const setToggle = (key, val) => {
    if (key === "necessary") return; // no se puede desactivar
    state.categories[key] = !!val;
  };

  wrap.addEventListener("change", (ev) => {
    const el = ev.target;
    if (el && el.dataset && el.dataset.cat) {
      setToggle(el.dataset.cat, el.checked);
    }
  });

  qs(".accept", wrap).addEventListener("click", async () => {
    state.categories.analytics = true;
    state.categories.performance = true;
    state.categories.marketing = true;
    finalize();
  });

  qs(".reject", wrap).addEventListener("click", async () => {
    state.categories.analytics = false;
    state.categories.performance = false;
    state.categories.marketing = false;
    finalize();
  });

  qs(".save", wrap).addEventListener("click", async () => {
    finalize();
  });

  function finalize() {
    state.lang = lang;
    state.timestamp = Date.now();
    saveConsent(state);
    document.body.removeChild(wrap);
    onChange?.(state);
    // Cargar scripts permitidos
    loadByConsent(state);
  }

  // focus inicial
  setTimeout(() => qs(".accept", wrap)?.focus(), 0);

  return wrap;
}

function renderCat(key, t, checked=false, locked=false) {
  const meta = t.cats[key];
  const disabledAttr = locked ? "disabled" : "";
  const checkedAttr = checked ? "checked" : "";
  const lockNote = locked ? `<small>(${t.cats.necessary.label})</small>` : "";
  return `
    <div class="cat">
      <label>
        <span><strong>${meta.label}</strong>${lockNote}<br><small>${meta.desc}</small></span>
        <input type="checkbox" data-cat="${key}" ${checkedAttr} ${disabledAttr} aria-label="${meta.label}" />
      </label>
    </div>`;
}

export function openBanner(existing, onChange) {
  const consent = existing ?? defaultConsent();
  const el = makeBanner(consent, onChange);
  document.body.appendChild(el);
}