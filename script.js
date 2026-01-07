/* ===============================
   GLOBAL ELEMENTS
================================ */
const loader = document.querySelector(".intro-loader");
const profileLeft = document.querySelector(".profile-left");
const profileRight = document.querySelector(".profile-right");
const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero-title");
const scrollIndicator = document.querySelector(".scroll-indicator");
const revealItems = document.querySelectorAll(".reveal");


/* ===============================
   INTRO LOADER & PROFILE ENTRANCE
================================ */
window.addEventListener("load", () => {
  setTimeout(() => {
    loader?.classList.add("hide");
  }, 2800);

  profileLeft?.classList.add("slide-left");
  profileRight?.classList.add("slide-right");
});


/* ===============================
   SCROLL HANDLER (OPTIMIZED)
================================ */
let lastScrollY = 0;
let ticking = false;
let blurTimeout;

function onScroll() {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(updateOnScroll);
    ticking = true;
  }
}

function updateOnScroll() {
  const scrollY = lastScrollY;
  const windowHeight = window.innerHeight;

  /* === PARALLAX HERO === */
  if (hero) {
    hero.style.setProperty(
      "--parallax-offset",
      `${scrollY * 0.4}px`
    );
  }

  /* === HERO TITLE FADE === */
  if (heroTitle) {
    heroTitle.style.opacity = Math.max(1 - scrollY / 320, 0);
    heroTitle.style.transform = `translateY(${scrollY * 0.25}px)`;
  }

  /* === SCROLL INDICATOR === */
  if (scrollIndicator) {
    if (scrollY > 80) {
      scrollIndicator.style.opacity = "0";
      scrollIndicator.style.pointerEvents = "none";
    } else {
      scrollIndicator.style.opacity = "1";
      scrollIndicator.style.pointerEvents = "auto";
    }
  }

  /* === SCROLL REVEAL === */
  revealItems.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const revealPoint = 120;

    if (top < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });

  /* === MOTION BLUR (SUBTLE) === */
  const speed = Math.abs(scrollY - lastScrollY);

  if (speed > 25) {
    document.body.classList.add("motion-blur");
    clearTimeout(blurTimeout);

    blurTimeout = setTimeout(() => {
      document.body.classList.remove("motion-blur");
    }, 160);
  }

  ticking = false;
}

window.addEventListener("scroll", onScroll);
updateOnScroll();