import { gsap, SplitType } from "../vendor";

function initTextAnimations() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupTextAnimations);
  } else {
    setupTextAnimations();
  }
}

function setupTextAnimations() {
  animateHeadings();
  animateParagraphs();
}

function animateHeadings() {
  const headings = document.querySelectorAll(
    ".animate-text h1, .animate-text h2, .animate-text h3"
  );

  headings.forEach((heading) => {
    const split = new SplitType(heading, { types: "chars, words" });

    gsap.from(split.chars, {
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
}

function animateParagraphs() {
  const paragraphs = document.querySelectorAll(".animate-text p");

  paragraphs.forEach((paragraph) => {
    const split = new SplitType(paragraph, { types: "lines" });

    gsap.from(split.lines, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: paragraph,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
}

export { initTextAnimations };
