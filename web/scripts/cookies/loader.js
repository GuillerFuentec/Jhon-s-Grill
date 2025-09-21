import { COOKIE_CONFIG } from "./config.js";

// Inyecta scripts solo si hay consentimiento para la categoría.
export async function loadByConsent(consent) {
  const cats = consent?.categories || {};
  // Analítica
  if (cats.analytics) {
    await loadAnalytics();
  }
  // Rendimiento
  if (cats.performance) {
    await loadPerformance();
  }
  // Marketing
  if (cats.marketing) {
    await loadMarketing();
  }
}

async function loadAnalytics() {
  const p = COOKIE_CONFIG.analytics.provider;
  if (p === "plausible" && COOKIE_CONFIG.analytics.plausibleDomain) {
    const s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", COOKIE_CONFIG.analytics.plausibleDomain);
    s.src = "https://plausible.io/js/plausible.js";
    document.head.appendChild(s);
  } else if (p === "ga4" && COOKIE_CONFIG.analytics.gaMeasurementId) {
    // Consent mode: por defecto denegado; lo actualizamos abajo.
    const mid = COOKIE_CONFIG.analytics.gaMeasurementId;
    const gtag = document.createElement("script");
    gtag.async = true;
    gtag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(mid)}`;
    document.head.appendChild(gtag);
    await waitScript(gtag);

    window.dataLayer = window.dataLayer || [];
    function g(){window.dataLayer.push(arguments);}
    g("js", new Date());
    // Modo consent
    g("consent", "default", { ad_storage: "denied", analytics_storage: "denied" });
    g("config", mid, { anonymize_ip: true });
    // Permite analítica (sin ads) cuando el usuario acepta analytics
    g("consent", "update", { analytics_storage: "granted" });
    window.gtag = g;
  }
}

async function loadPerformance() {
  if (!COOKIE_CONFIG.performance.enableWebVitals) return;
  // Carga dinámica de web-vitals ESM
  try {
    const { onCLS, onFID, onLCP } = await import("https://unpkg.com/web-vitals@4?module");
    const send = (name, metric) => {
      // Envía a Plausible (custom events) o GA4 si están cargados
      if (window.plausible) {
        window.plausible(`WebVital:${name}`, { props: { value: metric.value } });
      } else if (window.gtag) {
        window.gtag("event", `web_vital_${name.toLowerCase()}`, { value: metric.value });
      } else {
        // fallback: log
        console.info("[web-vitals]", name, metric.value);
      }
    };
    onCLS((m) => send("CLS", m));
    onFID((m) => send("FID", m));
    onLCP((m) => send("LCP", m));
  } catch (e) {
    console.warn("No se pudo cargar web-vitals:", e);
  }
}

async function loadMarketing() {
  const id = COOKIE_CONFIG.marketing.facebookPixelId;
  if (!id) return;
  // Facebook Pixel
  !(function(f,b,e,v,n,t,s){
    if(f.fbq)return; n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version="2.0";
    n.queue=[]; t=b.createElement(e); t.async=!0; t.src=v;
    s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", id);
  window.fbq("track", "PageView");
}

function waitScript(el) {
  return new Promise((res, rej) => {
    el.addEventListener("load", res, { once: true });
    el.addEventListener("error", rej, { once: true });
  });
}