import { COOKIE_CONFIG } from "./config.js";
import { readConsent, defaultConsent } from "./storage.js";
import { openBanner } from "./banner.js";
import { loadByConsent } from "./loader.js";

(function init() {
  const dntEnabled = navigator.doNotTrack === "1" || window.doNotTrack === "1";
  let consent = readConsent();

  // Si DNT y se respeta, forzar rechazo (excepto necesarias)
  if (!consent && COOKIE_CONFIG.respectDNT && dntEnabled) {
    consent = defaultConsent();
    consent.categories.analytics = false;
    consent.categories.performance = false;
    consent.categories.marketing = false;
  }

  // Cargar banner HTML si no hay consentimiento
  if (!consent) {
    loadHTMLBanner();
  } else {
    // Ya hay consentimiento: cargar lo permitido
    loadByConsent(consent);
  }

  // API pública
  const listeners = { change: [] };
  window.CookieConsent = {
    get: () => readConsent(),
    set: (prefs) => {
      openBanner(prefs || readConsent() || defaultConsent(), (c) => {
        window.CookieConsent._emit("change", c);
      });
    },
    open: () => openBanner(readConsent() || defaultConsent(), (c)=> window.CookieConsent._emit("change", c)),
    close: () => {
      const el = document.getElementById("cookie-banner");
      if (el) el.style.display = 'none';
      const elEn = document.getElementById("cookie-banner-en");
      if (elEn) elEn.style.display = 'none';
    },
    on: (evt, fn) => {
      if (!listeners[evt]) listeners[evt] = [];
      listeners[evt].push(fn);
    },
    _emit: (evt, payload) => {
      (listeners[evt] || []).forEach((fn) => { try { fn(payload); } catch {} });
    }
  };

  // Función para cargar el banner HTML
  async function loadHTMLBanner() {
    try {
      const response = await fetch('/scripts/cookies/banner-html.html');
      const bannerHTML = await response.text();
      
      // Crear un contenedor temporal
      const temp = document.createElement('div');
      temp.innerHTML = bannerHTML;
      
      // Añadir al body
      while (temp.firstChild) {
        document.body.appendChild(temp.firstChild);
      }
    } catch (error) {
      console.warn('No se pudo cargar el banner HTML:', error);
      // Fallback: mostrar banner JS
      window.addEventListener("DOMContentLoaded", () => {
        openBanner(null, (c) => {
          window.CookieConsent._emit("change", c);
        });
      });
    }
  }
})();