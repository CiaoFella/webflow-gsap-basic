import { gsap } from "../vendor";

function initHeroAnimation() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupAnimation);
  } else {
    setupAnimation();
  }
}

function setupAnimation() {
  const heroSection = document.querySelector(".hero-section");

  if (!heroSection) {
    console.warn("Hero section not found. Check your class names.");
    return;
  }

  const heroTitle = heroSection.querySelector(".hero-title");
  const heroSubtitle = heroSection.querySelector(".hero-subtitle");
  const heroButton = heroSection.querySelector(".hero-button");
  const heroImage = heroSection.querySelector(".hero-image");

  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.8,
    },
  });

  tl.from(heroTitle, {
    y: 50,
    opacity: 0,
    duration: 1,
  })
    .from(
      heroSubtitle,
      {
        y: 30,
        opacity: 0,
      },
      "-=0.6"
    )
    .from(
      heroButton,
      {
        y: 20,
        opacity: 0,
      },
      "-=0.4"
    )
    .from(
      heroImage,
      {
        x: 50,
        opacity: 0,
        duration: 1.2,
      },
      "-=0.8"
    );

  return tl;
}

export { initHeroAnimation };
