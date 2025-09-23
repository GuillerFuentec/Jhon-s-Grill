// type="module"
const API_URL = '../public/api/manifest.json';

/* Utils */
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function priceToText(p = {}) {
  const parts = [];
  if (typeof p.single === 'number') parts.push(`${usd.format(p.single)} (single)`);
  if (typeof p.platter === 'number') parts.push(`${usd.format(p.platter)} (platter)`);
  // Si solo viene uno de los dos, se muestra solo ese.
  return parts.length ? parts.join(' • ') : '';
}

/* DOM targets (el script crea contenedores si no existen) */
const menuSection = document.querySelector('#menu .container') || document.querySelector('#menu') || document.body;
let navWrap = menuSection.querySelector('[data-menu-nav]');
let gridWrap = menuSection.querySelector('[data-menu-grid]');

// Si hay contenido manual, lo limpiamos para inyectar dinámicamente
function ensureContainers() {
  if (!navWrap) {
    navWrap = document.createElement('div');
    navWrap.setAttribute('data-menu-nav', '');
    navWrap.className = 'flex overflow-x-auto pb-4 mb-8';
    // insertamos al inicio del container de la sección
    menuSection.insertBefore(navWrap, menuSection.firstElementChild?.nextElementSibling || menuSection.firstChild);
  }
  if (!gridWrap) {
    gridWrap = document.createElement('div');
    gridWrap.setAttribute('data-menu-grid', '');
    gridWrap.className = 'menu-category grid md:grid-cols-2 lg:grid-cols-3 gap-8';
    menuSection.appendChild(gridWrap);
  }
}

function setActive(btn, group) {
  group.forEach(b => b.classList.remove('bg-red-600','text-white'));
  group.forEach(b => b.classList.add('bg-white','text-red-600'));
  btn.classList.remove('bg-white','text-red-600');
  btn.classList.add('bg-red-600','text-white');
}

function renderCards(items = []) {
  gridWrap.innerHTML = '';
  items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'menu-item bg-white rounded-lg overflow-hidden shadow-lg';
    card.setAttribute('data-aos','fade-up');
    if (i) card.setAttribute('data-aos-delay', String(i * 100));

    const img = item.imgUrl || 'https://via.placeholder.com/640x360?text=Photo';
    const priceText = priceToText(item.price);

    card.innerHTML = `
      <div class="h-48 overflow-hidden">
        <img src="${img}" alt="${item.name}" class="menu-img w-full h-full object-cover" />
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold text-red-600 mb-2">${item.name}</h3>
        <p class="text-gray-600 mb-4">${item.description || ''}</p>
        ${priceText ? `<p class="text-gray-800 font-bold text-lg">${priceText}</p>` : ''}
      </div>
    `;
    gridWrap.appendChild(card);
  });

  // Si usas AOS, refresca para animar los nuevos nodos
  if (window.AOS?.refresh) AOS.refresh();
}

function renderNav(categories, data) {
  navWrap.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'flex space-x-2';
  navWrap.appendChild(row);

  const buttons = categories.map((cat, idx) => {
    const b = document.createElement('button');
    b.className = 'menu-category-btn px-4 py-2 rounded-full font-medium whitespace-nowrap ' +
                  (idx === 0 ? 'bg-red-600 text-white' : 'bg-white text-red-600');
    b.dataset.category = slug(cat);
    b.textContent = cat;
    b.addEventListener('click', () => {
      setActive(b, buttons);
      renderCards(data[cat]);
    });
    row.appendChild(b);
    return b;
  });

  // Render inicial: primera categoría
  if (categories.length) renderCards(data[categories[0]]);
}

/* Init */
(async function initMenu() {
  try {
    ensureContainers();

    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Tomamos categorías de primer nivel (excepto currency)
    const categories = Object.keys(data).filter(k => k.toLowerCase() !== 'currency');

    // Validación mínima: que cada item tenga name y price
    categories.forEach(cat => {
      data[cat] = (data[cat] || []).filter(it => it && it.name && it.price);
    });

    renderNav(categories, data);
  } catch (err) {
    console.error('Menu loader error:', err);
    // Fallback visual
    ensureContainers();
    gridWrap.innerHTML = `
      <div class="text-center col-span-full text-red-600">
        No se pudo cargar el menú. Intenta recargar la página.
      </div>
    `;
  }
})();

