(() => {
  const noticeKicker = document.querySelector(".notice-kicker");

  if (noticeKicker && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;

      noticeKicker.classList.add("is-visible");
      observer.disconnect();
    }, { threshold: 0.55 });

    observer.observe(noticeKicker);
  } else if (noticeKicker) {
    noticeKicker.classList.add("is-visible");
  }

  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
