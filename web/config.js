/**
 * Configuración global legible por el cliente.
 * Utilízala como fuente única de verdad para dominio, marca y datos estructurados.
 * TODO: Actualiza los valores marcados antes de publicar si cambian datos reales del negocio.
 */
const required = (obj, path) => {
  const parts = path.split('.');
  let ref = obj;
  for (const part of parts) {
    if (ref && Object.prototype.hasOwnProperty.call(ref, part)) {
      ref = ref[part];
    } else {
      console.warn(`[config] Falta la clave obligatoria "${path}"`);
      return undefined;
    }
  }
  if (ref === undefined || ref === null || ref === '') {
    console.warn(`[config] Valor vacío en la clave "${path}"`);
  }
  return ref;
};

const config = {
  domain: "https://www.jhonsgrill.com",
  companyName: "Jhon's Grill",
  tagline: "Parrilla mexicana auténtica en tu ciudad",
  contactEmail: "hola@jhonsgrill.com",
  phone: "+52 55 5555 5555",
  address: {
    street: "Av. México 123, Gasolinera El Sol",
    locality: "Ciudad de México",
    region: "CDMX",
    postalCode: "01000",
    country: "MX"
  },
  geo: { lat: 19.4326, lng: -99.1332 },
  openingHours: [
    "Mo-Th 11:00-22:00",
    "Fr-Sa 11:00-23:30",
    "Su 11:00-21:00"
  ],
  servesCuisine: ["Mexican", "Grill"],
  priceRange: "$$",
  menuUrl: "https://www.jhonsgrill.com/menu.html",
  reservationUrl: "https://www.jhonsgrill.com/reservas.html",
  orderUrl: "https://wa.me/5255555555555",
  social: {
    facebook: "https://www.facebook.com/jhonsgrill",
    instagram: "https://www.instagram.com/jhonsgrill",
    x: "https://twitter.com/jhonsgrill"
  },
  media: {
    logo: "/assets/logo.svg",
    ogDefault: "https://images.placeholders.dev/?width=1200&height=630&text=Jhon%27s%20Grill&bg=0ea5e9&color=0f172a",
    icons: {
      faviconSvg: "/assets/logo.svg",
      favicon32: "https://images.placeholders.dev/?width=32&height=32&text=JG&bg=0ea5e9&color=0f172a",
      favicon16: "https://images.placeholders.dev/?width=16&height=16&text=JG&bg=0ea5e9&color=0f172a",
      appleTouch: "https://images.placeholders.dev/?width=180&height=180&text=JG&bg=0f172a&color=f8fafc",
      maskIcon: "/assets/logo.svg",
      maskIconColor: "#0f172a",
      msTileImage: "https://images.placeholders.dev/?width=150&height=150&text=JG&bg=0ea5e9&color=0f172a",
      msTileColor: "#0f172a"
    }
  },
  locales: ["es"],
  defaultLocale: "es",
  verification: {
    google: "",
    bing: ""
  },
  analytics: {
    plausibleDomain: null, // TODO: Define dominio si activas Plausible (sin protocolo)
    ga4: null // TODO: Define ID GA4 (formato G-XXXXXX) si usas Google Analytics
  },
  marketing: {
    facebookPixelId: null
  },
  routes: [
    { path: "/", priority: 1.0, changefreq: "weekly", lastmod: "" },
    { path: "/menu.html", priority: 0.9, changefreq: "weekly", lastmod: "" },
    { path: "/reservas.html", priority: 0.9, changefreq: "weekly", lastmod: "" },
    { path: "/contacto.html", priority: 0.8, changefreq: "monthly", lastmod: "" },
    { path: "/nosotros.html", priority: 0.7, changefreq: "yearly", lastmod: "" },
    { path: "/info.html", priority: 0.6, changefreq: "monthly", lastmod: "" },
    { path: "/politica-de-privacidad.html", priority: 0.5, changefreq: "yearly", lastmod: "" },
    { path: "/politica-de-cookies.html", priority: 0.5, changefreq: "yearly", lastmod: "" }
  ]
};

export default config;
export { required };
