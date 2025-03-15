import { gsap, ScrollTrigger } from "../../vendor";

(function () {
  function init() {
    console.log("Home page animations initialized");

    animateHero();
    animateFeatures();
    animateTestimonials();
  }

  function animateHero() {
    const heroSection = document.querySelector(".home-hero");
    if (!heroSection) return;

    const heroTitle = heroSection.querySelector(".hero-title");
    const heroSubtitle = heroSection.querySelector(".hero-subtitle");
    const heroButton = heroSection.querySelector(".hero-button");
    const heroImage = heroSection.querySelector(".hero-image");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    tl.from(heroTitle, { y: 50, opacity: 0, duration: 1 })
      .from(heroSubtitle, { y: 30, opacity: 0 }, "-=0.6")
      .from(heroButton, { y: 20, opacity: 0 }, "-=0.4")
      .from(heroImage, { x: 50, opacity: 0, duration: 1.2 }, "-=0.8");
  }

  function animateFeatures() {
    const featuresSection = document.querySelector(".home-features");
    if (!featuresSection) return;

    const featuresTitle = featuresSection.querySelector(".section-title");
    const featuresItems = featuresSection.querySelectorAll(".feature-item");

    gsap.from(featuresTitle, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: featuresTitle,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(featuresItems, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      scrollTrigger: {
        trigger: featuresSection,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }

  function animateTestimonials() {
    const testimonialsSection = document.querySelector(".home-testimonials");
    if (!testimonialsSection) return;

    const testimonialsTitle =
      testimonialsSection.querySelector(".section-title");
    const testimonialCards =
      testimonialsSection.querySelectorAll(".testimonial-card");

    gsap.from(testimonialsTitle, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: testimonialsTitle,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(testimonialCards, {
      scale: 0.9,
      opacity: 0,
      stagger: 0.2,
      duration: 0.7,
      scrollTrigger: {
        trigger: testimonialsSection,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
