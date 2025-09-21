import cfg, { required } from "../../config.js";

const policyRoute = cfg.routes?.find?.((route) => route.path.includes("politica-de-cookies"));

const analyticsProvider = (() => {
  const analytics = cfg.analytics || {};
  if (analytics.plausibleDomain) {
    return {
      provider: "plausible",
      plausibleDomain: analytics.plausibleDomain,
      gaMeasurementId: null
    };
  }
  if (analytics.ga4) {
    return {
      provider: "ga4",
      plausibleDomain: null,
      gaMeasurementId: analytics.ga4
    };
  }
  return {
    provider: null,
    plausibleDomain: null,
    gaMeasurementId: null
  };
})();

// Configuración central del sistema de cookies
export const COOKIE_CONFIG = {
  appName: required(cfg, "companyName"),
  policyUrl: policyRoute?.path || "/politica-de-cookies.html",
  cookieName: "site_consent",
  cookieMaxAgeDays: 180, // ~6 meses
  defaultLang: cfg.defaultLocale || "es",
  // Si el navegador envía Do Not Track (1), tratamos como rechazo por defecto.
  respectDNT: true,

  // Selecciona UN proveedor de analítica o deja ambos en null para no cargar nada.
  analytics: analyticsProvider,

  marketing: {
    facebookPixelId: cfg.marketing?.facebookPixelId || null
  },

  performance: {
    enableWebVitals: true // miden CLS/LCP/FID y envían a analítica si existe
  },

  // Textos (ES/EN). Puedes ampliar idiomas.
  i18n: {
    es: {
      title: "Usamos cookies",
      desc:
        "Utilizamos cookies para mejorar la funcionalidad, medir el rendimiento y, con tu permiso, fines de marketing. " +
        "Puedes aceptar todas, rechazarlas o personalizar.",
      actions: {
        acceptAll: "Aceptar todo",
        rejectAll: "Rechazar todo",
        save: "Guardar selección",
        settings: "Configurar",
        policy: "Política de cookies"
      },
      cats: {
        necessary: {
          label: "Necesarias",
          desc:
            "Imprescindibles para el funcionamiento básico (seguridad, balanceo, preferencias esenciales)."
        },
        analytics: {
          label: "Analíticas",
          desc:
            "Ayudan a entender el uso del sitio (páginas vistas, eventos). No recopilamos PII."
        },
        performance: {
          label: "Rendimiento",
          desc:
            "Métricas de Web Vitals para optimizar tiempos de carga y fluidez."
        },
        marketing: {
          label: "Marketing",
          desc:
            "Etiquetas publicitarias para medir campañas. Solo se cargan si consientes."
        }
      }
    },
    en: {
      title: "We use cookies",
      desc:
        "We use cookies to improve functionality, measure performance, and for marketing (with your consent). " +
        "Accept all, reject all, or customize.",
      actions: {
        acceptAll: "Accept all",
        rejectAll: "Reject all",
        save: "Save choices",
        settings: "Settings",
        policy: "Cookie policy"
      },
      cats: {
        necessary: {
          label: "Necessary",
          desc:
            "Essential for basic operation (security, balancing, essential prefs)."
        },
        analytics: {
          label: "Analytics",
          desc:
            "Helps understand site usage (pageviews, events). We do not collect PII."
        },
        performance: {
          label: "Performance",
          desc:
            "Web Vitals to improve loading and smoothness."
        },
        marketing: {
          label: "Marketing",
          desc:
            "Ad tags for campaign measurement. Loaded only with consent."
        }
      }
    }
  }
};