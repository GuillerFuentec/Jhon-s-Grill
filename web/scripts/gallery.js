const GALLERY_DIR = "../public/spot/";
const MANIFEST = GALLERY_DIR + "manifest.json";
const MAX_PROBE = 30;
const EXTS = ["jpg", "jpeg", "png", "webp", "avif"];
const AUTOPLAY_MS = 4000;

const el = (id) => document.getElementById(id);

const state = {
  images: [],
  index: 0,
  timer: null,
  touching: false,
  touchStartX: 0,
  touchDeltaX: 0
};

function setHidden(node, hidden) {
  if (!node) return;
  node.classList.toggle("hidden", hidden);
}

async function tryFetchJson(url) {
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function probeImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    const done = (ok) => resolve(ok ? url : null);
    img.onload = () => done(true);
    img.onerror = () => done(false);
    img.src = url + (url.includes("?") ? "&" : "?") + "_=" + Date.now();
  });
}

async function discoverImages() {
  // 1) Try manifest.json (list of relative paths or filenames)
  const manifest = await tryFetchJson(MANIFEST);
  if (Array.isArray(manifest) && manifest.length) {
    return manifest.map((x) =>
      x.startsWith("./") || x.startsWith("/") ? x : GALLERY_DIR + x
    );
  }

  // 2) Probe files 1..MAX_PROBE with common extensions
  const found = [];
  for (let i = 1; i <= MAX_PROBE; i++) {
    let hit = null;
    // Try 1.jpg, 01.jpg, 001.jpg
    const bases = [String(i), String(i).padStart(2, "0"), String(i).padStart(3, "0")];
    for (const base of bases) {
      for (const ext of EXTS) {
        const url = `${GALLERY_DIR}${base}.${ext}`;
        // eslint-disable-next-line no-await-in-loop
        const ok = await probeImage(url);
        if (ok) {
          hit = ok;
          break;
        }
      }
      if (hit) break;
    }
    if (hit) found.push(hit);
  }
  return found;
}

function buildSlides(urls) {
  const track = el("galleryTrack");
  track.innerHTML = "";
  urls.forEach((src) => {
    const li = document.createElement("li");
    li.className = "min-w-full h-80 md:h-[28rem] relative bg-gray-200";
    li.innerHTML = `
      <img src="${src}" alt="Restaurant highlight"
           class="w-full h-full object-cover block" loading="lazy">
    `;
    track.appendChild(li);
  });
}

function buildDots(count) {
  const dots = el("galleryDots");
  dots.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const b = document.createElement("button");
    b.className =
      "h-2.5 w-2.5 rounded-full bg-gray-300 hover:bg-gray-400 transition";
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => goTo(i, true));
    dots.appendChild(b);
  }
  updateDots();
}

function updateDots() {
  const dots = [...el("galleryDots").children];
  dots.forEach((d, i) => {
    d.className =
      "h-2.5 w-2.5 rounded-full transition " +
      (i === state.index ? "bg-yellow-500" : "bg-gray-300 hover:bg-gray-400");
  });
}

function applyTransform() {
  const track = el("galleryTrack");
  track.style.transform = `translateX(-${state.index * 100}%)`;
  updateDots();
}

function prev() {
  state.index = (state.index - 1 + state.images.length) % state.images.length;
  applyTransform();
}

function next() {
  state.index = (state.index + 1) % state.images.length;
  applyTransform();
}

function goTo(i, stop) {
  state.index = Math.max(0, Math.min(i, state.images.length - 1));
  applyTransform();
  if (stop) stopAuto();
}

function startAuto() {
  stopAuto();
  if (state.images.length <= 1) return;
  state.timer = setInterval(next, AUTOPLAY_MS);
}

function stopAuto() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

function bindControls() {
  el("galleryPrev")?.addEventListener("click", () => goTo((state.index - 1 + state.images.length) % state.images.length, true));
  el("galleryNext")?.addEventListener("click", () => goTo((state.index + 1) % state.images.length, true));

  const root = el("galleryCarousel");
  root.addEventListener("mouseenter", stopAuto);
  root.addEventListener("mouseleave", startAuto);

  // Swipe tÃ¡ctil
  root.addEventListener("touchstart", (e) => {
    state.touching = true;
    state.touchStartX = e.touches[0].clientX;
    state.touchDeltaX = 0;
    stopAuto();
  }, { passive: true });

  root.addEventListener("touchmove", (e) => {
    if (!state.touching) return;
    state.touchDeltaX = e.touches[0].clientX - state.touchStartX;
  }, { passive: true });

  root.addEventListener("touchend", () => {
    if (!state.touching) return;
    const dx = state.touchDeltaX;
    state.touching = false;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    startAuto();
  });
}

async function bootstrapGallery() {
  const urls = await discoverImages();
  state.images = urls;

  const empty = !urls || urls.length === 0;
  setHidden(el("galleryEmptyMsg"), !empty);
  setHidden(el("galleryCarousel"), empty);
  if (empty) return;

  buildSlides(urls);
  buildDots(urls.length);
  bindControls();
  state.index = 0;
  applyTransform();
  startAuto();
}

bootstrapGallery();

