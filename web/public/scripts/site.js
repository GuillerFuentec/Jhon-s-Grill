import cfg, { required } from "/config.js";

const getValue = (path) => {
  if (!path) return undefined;
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), cfg);
};

const formatAddress = () => {
  const { street, locality, region, postalCode, country } = cfg.address || {};
  return [street, `${locality || ""}, ${region || ""} ${postalCode || ""}`.trim(), country].filter(Boolean).join("\n");
};

const updateDatasetElements = () => {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const value = getValue(el.dataset.config);
    if (value === undefined || value === null || value === "") {
      console.warn(`[ui] Falta dato de config para ${el.dataset.config}`);
      return;
    }
    if (el.dataset.configTarget) {
      el.setAttribute(el.dataset.configTarget, value);
    } else if (el.tagName === "IMG") {
      el.setAttribute("src", value);
    } else {
      el.textContent = value;
    }
  });
};

const updatePhones = () => {
  document.querySelectorAll("[data-config-tel]").forEach((el) => {
    const path = el.dataset.configTel || "phone";
    const phone = getValue(path);
    if (!phone) return;
    const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
    el.textContent = phone;
    el.setAttribute("href", telHref);
  });
};

const updateEmails = () => {
  document.querySelectorAll("[data-config-email]").forEach((el) => {
    const path = el.dataset.configEmail || "contactEmail";
    const email = getValue(path);
    if (!email) return;
    el.textContent = email;
    el.setAttribute("href", `mailto:${email}`);
  });
};

const updateAddressBlocks = () => {
  document.querySelectorAll("[data-config-address]").forEach((el) => {
    el.textContent = formatAddress();
  });
};

const updateHours = () => {
  const hours = Array.isArray(cfg.openingHours) ? cfg.openingHours : [];
  document.querySelectorAll("[data-config-hours]").forEach((el) => {
    el.innerHTML = "";
    hours.forEach((item) => {
      const row = document.createElement("tr");
      const [dayPart, timePart] = item.split(" ");
      const dayCell = document.createElement("td");
      dayCell.textContent = dayPart.replace(/-/g, " a ");
      const timeCell = document.createElement("td");
      timeCell.textContent = timePart ? timePart.replace(/-/g, " a ") : "";
      row.appendChild(dayCell);
      row.appendChild(timeCell);
      el.appendChild(row);
    });
  });
};

const updateSocial = () => {
  const socials = cfg.social || {};
  const entries = Object.entries(socials).filter(([, url]) => !!url);
  document.querySelectorAll("[data-config-social]").forEach((el) => {
    el.innerHTML = "";
    entries.forEach(([network, url]) => {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.className = "badge";
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.textContent = network.charAt(0).toUpperCase() + network.slice(1);
      el.appendChild(anchor);
    });
  });
};

const updateLogo = () => {
  document.querySelectorAll("[data-config-logo]").forEach((img) => {
    const logo = required(cfg, "media.logo");
    img.setAttribute("src", logo);
    img.setAttribute("alt", `${required(cfg, "companyName")} logo`);
  });
};

const updateYear = () => {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-config-year]").forEach((el) => {
    el.textContent = `${year}`;
  });
};

const updateMapEmbeds = () => {
  const geo = cfg.geo || {};
  if (!geo.lat || !geo.lng) return;
  document.querySelectorAll("[data-config-map]").forEach((frame) => {
    const query = encodeURIComponent(`${cfg.companyName} ${cfg.address?.street || ""}`.trim());
    frame.src = `https://www.google.com/maps?q=${query}&hl=${cfg.defaultLocale || "es"}&t=m&z=15&output=embed`;
  });
};

const updateLinks = () => {
  document.querySelectorAll("[data-config-url]").forEach((el) => {
    const path = el.dataset.configUrl;
    const url = getValue(path);
    if (!url) return;
    el.setAttribute("href", url);
  });
};

const highlightCurrentNav = () => {
  const current = window.__PAGE_META__?.nav;
  if (!current) return;
  const navLink = document.querySelector(`[data-nav='${current}']`);
  if (navLink) {
    navLink.setAttribute("aria-current", "page");
  }
};

const init = () => {
  updateDatasetElements();
  updatePhones();
  updateEmails();
  updateAddressBlocks();
  updateHours();
  updateSocial();
  updateLogo();
  updateYear();
  updateMapEmbeds();
  updateLinks();
  highlightCurrentNav();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
