import { gsap, ScrollTrigger } from "../vendor";

function initSectionAnimations() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupAnimations);
  } else {
    setupAnimations();
  }
}

function setupAnimations() {
  const sections = document.querySelectorAll(".animate-section");

  if (sections.length === 0) {
    console.warn("No sections with .animate-section class found.");
    return;
  }

  sections.forEach((section, index) => {
    const heading = section.querySelector(".section-heading");
    const content = section.querySelector(".section-content");
    const image = section.querySelector(".section-image");
    const items = section.querySelectorAll(".section-item");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none none",
        markers: false,
      },
    });

    if (heading) {
      tl.from(heading, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    if (content) {
      tl.from(
        content,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    if (image) {
      tl.from(
        image,
        {
          x: index % 2 === 0 ? 50 : -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    if (items.length > 0) {
      tl.from(
        items,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }
  });

  animateFadeInElements();
}

function animateFadeInElements() {
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length === 0) return;

  fadeElements.forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
}

export { initSectionAnimations };
