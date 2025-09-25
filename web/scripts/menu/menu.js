// type="module"
const API_URL = "../public/api/manifest.json";

/* Utils */
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function priceToText(p = {}) {
  const parts = [];
  if (typeof p.single === "number")
    parts.push(`${usd.format(p.single)} (single)`);
  if (typeof p.platter === "number")
    parts.push(`${usd.format(p.platter)} (platter)`);
  return parts.length ? parts.join(" â€¢ ") : "";
}

/* DOM targets */
const menuSection =
  document.querySelector("#menu .container") ||
  document.querySelector("#menu") ||
  document.body;
let navWrap = menuSection.querySelector("[data-menu-nav]");
let gridWrap = menuSection.querySelector("[data-menu-grid]");

function ensureContainers() {
  if (!navWrap) {
    navWrap = document.createElement("div");
    navWrap.setAttribute("data-menu-nav", "");
    navWrap.className = "flex overflow-x-auto pb-4 mb-8";
    menuSection.insertBefore(
      navWrap,
      menuSection.firstElementChild?.nextElementSibling ||
        menuSection.firstChild
    );
  }
  if (!gridWrap) {
    gridWrap = document.createElement("div");
    gridWrap.setAttribute("data-menu-grid", "");
    gridWrap.className =
      "menu-category grid md:grid-cols-2 lg:grid-cols-3 gap-8";
    menuSection.appendChild(gridWrap);
  }
}

function setActive(btn, group) {
  group.forEach((b) => b.classList.remove("bg-red-600", "text-white"));
  group.forEach((b) => b.classList.add("bg-white", "text-red-600"));
  btn.classList.remove("bg-white", "text-red-600");
  btn.classList.add("bg-red-600", "text-white");
}

function makeImg(srcPrimary, srcFallback, alt) {
  const img = document.createElement("img");
  const placeholder = "https://via.placeholder.com/640x360?text=Photo";
  img.loading = "lazy";
  img.decoding = "async";
  img.alt = alt || "";
  img.className = "menu-img w-full h-full object-cover";
  // Prefer the local image; fall back to the network image, otherwise show a placeholder
  img.src = srcPrimary || srcFallback || placeholder;
  img.onerror = () => {
    if (img.src !== srcFallback && srcFallback) {
      img.src = srcFallback;
    } else if (img.src !== placeholder) {
      img.src = placeholder;
    }
  };
  return img;
}

function renderCards(items = []) {
  gridWrap.innerHTML = "";
  items.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "menu-item bg-white rounded-lg overflow-hidden shadow-lg";
    card.setAttribute("data-aos", "fade-up");
    if (i) card.setAttribute("data-aos-delay", String(i * 100));

    const media = document.createElement("div");
    media.className = "h-48 overflow-hidden";
    media.appendChild(makeImg(item.imgUrl, item.imgNetUrl, item.name));

    const body = document.createElement("div");
    body.className = "p-6";

    const h3 = document.createElement("h3");
    h3.className = "text-xl font-bold text-red-600 mb-2";
    h3.textContent = item.name;

    const desc = document.createElement("p");
    desc.className = "text-gray-600 mb-4";
    desc.textContent = item.description || "";

    const priceText = priceToText(item.price);
    const priceEl = document.createElement("p");
    if (priceText) {
      priceEl.className = "text-gray-800 font-bold text-lg";
      priceEl.textContent = priceText;
    }

    body.appendChild(h3);
    body.appendChild(desc);
    if (priceText) body.appendChild(priceEl);

    card.appendChild(media);
    card.appendChild(body);
    gridWrap.appendChild(card);
  });

  if (window.AOS?.refresh) AOS.refresh();
}

function renderNav(categories, data) {
  navWrap.innerHTML = "";
  const row = document.createElement("div");
  row.className = "flex space-x-2";
  navWrap.appendChild(row);

  const buttons = categories.map((cat, idx) => {
    const b = document.createElement("button");
    b.className =
      "menu-category-btn px-4 py-2 rounded-full font-medium whitespace-nowrap " +
      (idx === 0 ? "bg-red-600 text-white" : "bg-white text-red-600");
    b.dataset.category = slug(cat);
    b.textContent = cat;
    b.addEventListener("click", () => {
      setActive(b, buttons);
      renderCards(data[cat]);
    });
    row.appendChild(b);
    return b;
  });

  if (categories.length) renderCards(data[categories[0]]);
}

/* Init */
(async function initMenu() {
  try {
    ensureContainers();

    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const categories = Object.keys(data).filter(
      (k) => k.toLowerCase() !== "currency"
    );

    categories.forEach((cat) => {
      data[cat] = (data[cat] || []).filter((it) => it && it.name && it.price);
    });

    renderNav(categories, data);
  } catch (err) {
    console.error("Menu loader error:", err);
    ensureContainers();
    gridWrap.innerHTML = `
      <div class="text-center col-span-full text-red-600">
        We couldn't load the menu. Please refresh the page.
      </div>
    `;
  }
})();


