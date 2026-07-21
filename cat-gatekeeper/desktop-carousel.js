(() => {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    const slides = carousel.querySelector(".screenshot-slides");
    const inputs = Array.from(carousel.querySelectorAll('input[type="radio"]'));

    if (!slides || inputs.length < 2) return;

    const startSlide = Number.parseInt(carousel.dataset.startSlide, 10);
    if (startSlide >= 1 && startSlide <= inputs.length) {
      inputs[startSlide - 1].checked = true;
    }

    slides.setAttribute("role", "button");
    slides.setAttribute("tabindex", "0");

    const next = () => {
      const currentIndex = inputs.findIndex((input) => input.checked);
      inputs[(currentIndex + 1) % inputs.length].checked = true;
    };

    slides.addEventListener("click", next);
    slides.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        next();
      }
    });
  });

  const featureVideos = document.querySelectorAll(".custom-cat-feature-card video");

  const playFeatureVideos = () => {
    featureVideos.forEach((video) => {
      video.muted = true;
      video.playsInline = true;
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(() => {});
      }
    });
  };

  if (featureVideos.length > 0) {
    playFeatureVideos();
    window.addEventListener("pageshow", playFeatureVideos);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        playFeatureVideos();
      }
    });
  }

  document.querySelectorAll("[data-community-cat-marquee]").forEach((marquee) => {
    const track = marquee.querySelector(".community-cat-track");
    const sourceSet = track?.querySelector(".community-cat-set");

    if (!track || !sourceSet) return;

    for (let copyIndex = 1; copyIndex < 4; copyIndex += 1) {
      const clone = sourceSet.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("img").forEach((image) => {
        image.alt = "";
      });
      track.append(clone);
    }

    marquee.classList.add("is-ready");
  });
})();
