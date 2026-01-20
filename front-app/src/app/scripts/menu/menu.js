'use client';

import { useState, useEffect } from 'react';

/* Utils */
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function priceToText(p = {}) {
  const parts = [];
  if (typeof p.single === "number")
    parts.push(`${usd.format(p.single)} (single)`);
  if (typeof p.platter === "number")
    parts.push(`${usd.format(p.platter)} (platter)`);
  return parts.length ? parts.join(" - ") : "";
}

function MenuImage({ srcPrimary, srcFallback, alt }) {
  const [src, setSrc] = useState(srcPrimary || srcFallback || "https://via.placeholder.com/640x360?text=Photo");

  const handleError = () => {
    if (src !== srcFallback && srcFallback) {
      setSrc(srcFallback);
    } else if (src !== "https://via.placeholder.com/640x360?text=Photo") {
      setSrc("https://via.placeholder.com/640x360?text=Photo");
    }
  };

  return (
    <img
      loading="lazy"
      decoding="async"
      alt={alt || ""}
      className="menu-img w-full h-full object-cover"
      src={src}
      onError={handleError}
    />
  );
}

function MenuCard({ item, index }) {
  return (
    <div
      className="menu-item bg-white rounded-lg overflow-hidden shadow-lg"
      data-aos="fade-up"
      data-aos-delay={index ? index * 100 : 0}
    >
      <div className="h-48 overflow-hidden">
        <MenuImage
          srcPrimary={item.imgUrl}
          srcFallback={item.imgNetUrl}
          alt={item.name}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-red-600 mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-4">{item.description || ""}</p>
        {priceToText(item.price) && (
          <p className="text-gray-800 font-bold text-lg">
            {priceToText(item.price)}
          </p>
        )}
      </div>
    </div>
  );
}

function MenuNav({ categories, data, activeCategory, setActiveCategory }) {
  return (
    <div className="flex overflow-x-auto pb-4 mb-8">
      <div className="flex space-x-2">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            className={`menu-category-btn px-4 py-2 rounded-full font-medium whitespace-nowrap ${
              activeCategory === cat
                ? "bg-red-600 text-white"
                : "bg-white text-red-600"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

function MenuGrid({ items }) {
  return (
    <div className="menu-category grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <MenuCard key={item.name} item={item} index={i} />
      ))}
    </div>
  );
}

export function Menu({ apiUrl = "/api/manifest.json" }) {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(apiUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const menuData = await res.json();

        const cats = Object.keys(menuData).filter(
          (k) => k.toLowerCase() !== "currency"
        );

        cats.forEach((cat) => {
          menuData[cat] = (menuData[cat] || []).filter(
            (it) => it && it.name && it.price
          );
        });

        setData(menuData);
        setCategories(cats);
        if (cats.length) setActiveCategory(cats[0]);
      } catch (err) {
        console.error("Menu loader error:", err);
        setError("We couldn't load the menu. Please refresh the page.");
      }
    }

    fetchMenu();
  }, [apiUrl]);

  if (error) {
    return (
      <div className="text-center col-span-full text-red-600">
        {error}
      </div>
    );
  }

  if (!data || !activeCategory) {
    return <div>Loading menu...</div>;
  }

  return (
    <div>
      <MenuNav
        categories={categories}
        data={data}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <MenuGrid items={data[activeCategory] || []} />
    </div>
  );
}

// Hook for custom usage
export function useMenu(apiUrl = "/api/manifest.json") {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(apiUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const menuData = await res.json();

        const cats = Object.keys(menuData).filter(
          (k) => k.toLowerCase() !== "currency"
        );

        cats.forEach((cat) => {
          menuData[cat] = (menuData[cat] || []).filter(
            (it) => it && it.name && it.price
          );
        });

        setData(menuData);
        setCategories(cats);
        if (cats.length) setActiveCategory(cats[0]);
      } catch (err) {
        console.error("Menu loader error:", err);
        setError("We couldn't load the menu. Please refresh the page.");
      }
    }

    fetchMenu();
  }, [apiUrl]);

  return {
    data,
    categories,
    activeCategory,
    setActiveCategory,
    error,
    items: data ? data[activeCategory] || [] : [],
  };
}

export { MenuNav, MenuGrid, MenuCard, MenuImage };


