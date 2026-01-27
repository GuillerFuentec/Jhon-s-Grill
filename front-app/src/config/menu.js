"use client";

const MENU_CACHE_KEY = 'restaurant_menu_cache';
const CACHE_EXPIRY_KEY = 'restaurant_menu_expiry';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export async function getCachedMenu(apiUrl = "/api/manifest.json") {
  const now = Date.now();

  // Check if we have cached data and it's not expired
  const cachedData = localStorage.getItem(MENU_CACHE_KEY);
  const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

  if (cachedData && cacheExpiry && now < parseInt(cacheExpiry)) {
    try {
      return JSON.parse(cachedData);
    } catch (error) {
      console.error('Error parsing cached menu data:', error);
      // If parsing fails, proceed to fetch fresh data
    }
  }

  // Fetch fresh data
  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const menuData = await res.json();

    // Process the data (same as in menu.js)
    const cats = Object.keys(menuData).filter(
      (k) => k.toLowerCase() !== "currency",
    );

    cats.forEach((cat) => {
      menuData[cat] = (menuData[cat] || []).filter(
        (it) => it && it.name && it.price,
      );
    });

    // Cache the processed data
    localStorage.setItem(MENU_CACHE_KEY, JSON.stringify(menuData));
    localStorage.setItem(CACHE_EXPIRY_KEY, (now + CACHE_DURATION).toString());

    return menuData;
  } catch (error) {
    console.error('Error fetching menu:', error);
    // If fetch fails and we have stale cache, return it
    if (cachedData) {
      try {
        return JSON.parse(cachedData);
      } catch (error) {
        console.error('Error parsing stale cached menu data:', error);
      }
    }
    throw error;
  }
}

export function clearMenuCache() {
  localStorage.removeItem(MENU_CACHE_KEY);
  localStorage.removeItem(CACHE_EXPIRY_KEY);
}