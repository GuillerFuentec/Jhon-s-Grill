# Jhon's Grill – guía de personalización

Este sitio está configurado para que la información clave se gestione desde [`config.js`](./config.js). Cualquier cambio de dominio, datos de contacto o rutas debe realizarse allí para que se propague automáticamente a metadatos, schema, sitemap y elementos visuales.

## Configuración principal

Abre `config.js` y actualiza los campos:

- `domain`: URL pública del sitio.
- `companyName`, `tagline`, `contactEmail`, `phone`.
- `address`, `geo`, `openingHours`, `servesCuisine`, `priceRange`.
- `menuUrl`, `reservationUrl`, `orderUrl`.
- `social`: enlaces a redes oficiales.
- `media.logo`, `media.ogDefault`, `media.icons` (favicon SVG, tamaños remotos o personalizados).
- `analytics`: establece `plausibleDomain` o `ga4` si activas analítica; déjalo en `null` para deshabilitar.
- `routes`: lista de páginas para el sitemap.

Si algún valor requerido está vacío, verás avisos en la consola del navegador para ayudarte a detectarlo.

## Actualizar contenido

Cada página define sus metadatos mediante `window.__PAGE_META__` (título, descripción, ruta y navegación activa). Los fragmentos de cabecera y pie están documentados en `public/partials/`. El archivo [`public/scripts/site.js`](public/scripts/site.js) rellena automáticamente los elementos marcados con atributos `data-config` (logo, teléfonos, horarios, redes, etc.), por lo que no es necesario duplicar strings en el HTML.

## SEO y datos estructurados

- [`public/scripts/seo/head.js`](public/scripts/seo/head.js) genera títulos, descripciones, canonicals, OpenGraph/Twitter Cards, verificación y enlaces hreflang (si se definen varios locales en `config.js`).
- [`public/scripts/seo/schema.js`](public/scripts/seo/schema.js) construye el JSON-LD para WebSite, Restaurant, Breadcrumbs y los objetos específicos que declare cada página.
- Ejecuta `npm run build:seo` para regenerar `public/sitemap.xml` después de modificar las rutas.
- `public/robots.txt` y `public/site.webmanifest` utilizan los activos definidos en `config.js`. Los íconos por defecto apuntan a
  recursos SVG/PNG alojados externamente para evitar binarios en el repositorio; cámbialos por tus URLs públicas cuando dispongas
  de tus propios íconos.

## Cookies y consentimiento

El gestor en `scripts/cookies/` se alimenta también de `config.js`. No cargará scripts de analítica ni marketing hasta que el usuario dé su consentimiento y respeta la señal "Do Not Track".

## Desarrollo

```bash
npm install
npm run dev
# o
npm run build:seo
```

`npm run dev` levanta un servidor estático (Live Server) en el puerto 8080. Asegúrate de ejecutar `npm run build:seo` siempre que añadas o elimines páginas.
