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
})();
