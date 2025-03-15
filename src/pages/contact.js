/**
 * Contact page animations
 * This file contains animations specific to the contact page
 */
import { gsap } from "../vendor";

// Self-executing function to avoid global scope pollution
(function () {
  // Initialize when DOM is ready
  function init() {
    console.log("Contact page animations initialized");

    // Initialize animations
    animateHeader();
    animateForm();
    animateMap();
  }

  /**
   * Animate header section
   */
  function animateHeader() {
    const headerSection = document.querySelector(".contact-header");
    if (!headerSection) return;

    const headerTitle = headerSection.querySelector(".header-title");
    const headerSubtitle = headerSection.querySelector(".header-subtitle");

    // Create timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    // Add animations
    tl.from(headerTitle, { y: 50, opacity: 0, duration: 1 }).from(
      headerSubtitle,
      { y: 30, opacity: 0 },
      "-=0.6"
    );
  }

  /**
   * Animate contact form
   */
  function animateForm() {
    const formSection = document.querySelector(".contact-form");
    if (!formSection) return;

    const formTitle = formSection.querySelector(".form-title");
    const formFields = formSection.querySelectorAll("input, textarea, select");
    const formButton = formSection.querySelector('button[type="submit"]');

    // Create timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.6 },
      delay: 0.2,
    });

    // Add animations
    tl.from(formTitle, { y: 30, opacity: 0 })
      .from(
        formFields,
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
        },
        "-=0.3"
      )
      .from(
        formButton,
        {
          y: 20,
          opacity: 0,
          scale: 0.9,
        },
        "-=0.2"
      );

    // Add focus and blur animations for form fields
    formFields.forEach((field) => {
      field.addEventListener("focus", () => {
        gsap.to(field, {
          borderColor: "#4a90e2",
          boxShadow: "0 0 8px rgba(74, 144, 226, 0.3)",
          duration: 0.3,
        });
      });

      field.addEventListener("blur", () => {
        gsap.to(field, {
          borderColor: field.value ? "#4a90e2" : "#ddd",
          boxShadow: "none",
          duration: 0.3,
        });
      });
    });
  }

  /**
   * Animate map section
   */
  function animateMap() {
    const mapSection = document.querySelector(".contact-map");
    if (!mapSection) return;

    const mapTitle = mapSection.querySelector(".map-title");
    const mapContainer = mapSection.querySelector(".map-container");
    const mapInfo = mapSection.querySelector(".map-info");

    // Create timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
      delay: 0.5,
    });

    // Add animations
    tl.from(mapTitle, { y: 30, opacity: 0 })
      .from(
        mapContainer,
        {
          y: 30,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      )
      .from(
        mapInfo,
        {
          x: 30,
          opacity: 0,
        },
        "-=0.6"
      );
  }

  // Check if document is already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
