import { COOKIE_CONFIG } from "./config.js";

// Utilidades de cookie y localStorage
const daysToSeconds = (d) => d * 24 * 60 * 60;

export function setCookie(name, value, maxAgeDays) {
  const encoded = encodeURIComponent(value);
  const parts = [
    `${name}=${encoded}`,
    `Path=/`,
    `Max-Age=${daysToSeconds(maxAgeDays)}`,
    `SameSite=Lax`
  ];
  // Solo marca Secure si estás en https (en local http puede romper).
  if (location.protocol === "https:") parts.push("Secure");
  document.cookie = parts.join("; ");
}

export function getCookie(name) {
  return document.cookie
    .split("; ")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => (k === name ? decodeURIComponent(v) : acc), null);
}

export function removeCookie(name) {
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function readConsent() {
  try {
    const raw = getCookie(COOKIE_CONFIG.cookieName) || localStorage.getItem(COOKIE_CONFIG.cookieName);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveConsent(consent) {
  const json = JSON.stringify(consent);
  setCookie(COOKIE_CONFIG.cookieName, json, COOKIE_CONFIG.cookieMaxAgeDays);
  try { localStorage.setItem(COOKIE_CONFIG.cookieName, json); } catch {}
}

export function defaultConsent() {
  // necesarias siempre activas; el resto off por defecto
  return {
    version: 1,
    lang: COOKIE_CONFIG.defaultLang,
    categories: {
      necessary: true,
      analytics: false,
      performance: false,
      marketing: false
    },
    timestamp: Date.now()
  };
}