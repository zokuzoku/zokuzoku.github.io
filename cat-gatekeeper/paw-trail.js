(() => {
  const sectionKickers = document.querySelectorAll(".section-kicker");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (sectionKickers.length && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.55 });

    sectionKickers.forEach((kicker) => observer.observe(kicker));
  } else {
    sectionKickers.forEach((kicker) => kicker.classList.add("is-visible"));
  }

  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (reduceMotion) return;

  let lastX = 0;
  let lastY = 0;
  let lastStamp = 0;
  let step = 0;

  function addPaw(x, y) {
    const paw = document.createElement("span");
    paw.className = "paw-trail";
    paw.style.left = `${x}px`;
    paw.style.top = `${y}px`;
    paw.style.setProperty("--paw-rotation", `${step % 2 === 0 ? -18 : 18}deg`);
    document.body.appendChild(paw);
    step += 1;

    window.setTimeout(() => {
      paw.remove();
    }, 900);
  }

  window.addEventListener("pointermove", (event) => {
    const now = performance.now();
    const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);

    if (now - lastStamp < 90 || distance < 34) return;

    lastX = event.clientX;
    lastY = event.clientY;
    lastStamp = now;
    addPaw(event.clientX, event.clientY);
  }, { passive: true });
})();
