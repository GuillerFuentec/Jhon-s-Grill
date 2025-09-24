(function initVideo() {
  const section = document.getElementById("video");
  const video = document.getElementById("promoVideo");
  const playBtn = document.getElementById("playFallbackBtn");
  const downloadLink = document.getElementById("videoDownloadLink");

  // 1) Obtener la ruta real desde el link "descarga el video"
  const mp4Src = downloadLink?.getAttribute("href");
  if (!mp4Src) {
    console.warn("[video] No se encontró el href del link de descarga.");
    return;
  }

  // 2) Asegurar que haya una <source> única MP4
  function addMp4Source() {
    if (!video.querySelector('source[type="video/mp4"]')) {
      const s = document.createElement("source");
      s.type = "video/mp4";
      s.src = mp4Src;
      video.appendChild(s);
    }
    video.load();
  }

  // 3) Autoplay seguro
  function tryAutoplay() {
    const play = video.play();
    if (play && typeof play.then === "function") {
      play
        .then(() => {
          playBtn.classList.add("hidden");
        })
        .catch(() => {
          playBtn.classList.remove("hidden");
        });
    }
  }

  playBtn.addEventListener("click", () => {
    playBtn.classList.add("hidden");
    video.play().catch(() => {
      video.muted = false; // habilita sonido tras interacción
      video.play().catch(() => playBtn.classList.remove("hidden"));
    });
  });

  // 4) Lazy-init al entrar al viewport
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      addMp4Source();
      video.addEventListener("loadedmetadata", tryAutoplay, { once: true });
      io.disconnect();
    },
    { rootMargin: "200px" }
  );

  io.observe(video);
})();
