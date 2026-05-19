const RESERVATION_URL = "";

const body = document.body;
const header = document.querySelector("[data-header]");
const progress = document.querySelector("[data-progress]");
const nav = document.querySelector("[data-nav]");
const menuButton = document.querySelector("[data-menu-button]");
const reserveLinks = document.querySelectorAll("[data-reserve]");
const lightbox = document.querySelector("[data-lightbox-modal]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

document.querySelector("[data-year]").textContent = new Date().getFullYear();

function updateChrome() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${progressValue}%`;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

updateChrome();
window.addEventListener("scroll", updateChrome, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Zavřít menu" : "Otevřít menu");
});

nav.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;
  body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Otevřít menu");
});

// Po vložení Notino profilu nastavte RESERVATION_URL na plnou URL adresu.
reserveLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!RESERVATION_URL) return;
    event.preventDefault();
    window.open(RESERVATION_URL, "_blank", "noopener,noreferrer");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.7 });

document.querySelectorAll("[data-count]").forEach((counter) => countObserver.observe(counter));

function animateCounter(counter) {
  const target = Number(counter.dataset.count);
  const duration = 850;
  const start = performance.now();

  function tick(now) {
    const progressValue = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progressValue, 3);
    counter.textContent = Math.round(target * eased);
    if (progressValue < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

window.addEventListener("scroll", () => {
  const offset = window.scrollY * -0.035;
  document.querySelectorAll("[data-parallax]").forEach((item) => {
    item.style.transform = `translate3d(0, ${offset}px, 0)`;
  });
}, { passive: true });

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = image ? image.alt : "Zvětšená beauty fotografie";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    body.classList.add("lightbox-open");
    lightboxClose.focus();
  });
});

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  body.classList.remove("lightbox-open");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});
