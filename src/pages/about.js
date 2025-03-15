/**
 * About page animations
 * This file contains animations specific to the about page
 */
import { gsap, ScrollTrigger } from "../vendor";

// Self-executing function to avoid global scope pollution
(function () {
  // Initialize when DOM is ready
  function init() {
    console.log("About page animations initialized");

    // Initialize animations
    animateHeader();
    animateTeam();
    animateTimeline();
  }

  /**
   * Animate header section
   */
  function animateHeader() {
    const headerSection = document.querySelector(".about-header");
    if (!headerSection) return;

    const headerTitle = headerSection.querySelector(".header-title");
    const headerSubtitle = headerSection.querySelector(".header-subtitle");
    const headerImage = headerSection.querySelector(".header-image");

    // Create timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    // Add animations
    tl.from(headerTitle, { y: 50, opacity: 0, duration: 1 })
      .from(headerSubtitle, { y: 30, opacity: 0 }, "-=0.6")
      .from(headerImage, { scale: 0.9, opacity: 0, duration: 1 }, "-=0.4");
  }

  /**
   * Animate team section
   */
  function animateTeam() {
    const teamSection = document.querySelector(".about-team");
    if (!teamSection) return;

    const teamTitle = teamSection.querySelector(".section-title");
    const teamMembers = teamSection.querySelectorAll(".team-member");

    // Animate title
    gsap.from(teamTitle, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: teamTitle,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate team members with stagger
    gsap.from(teamMembers, {
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      scrollTrigger: {
        trigger: teamSection,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
  }

  /**
   * Animate timeline section
   */
  function animateTimeline() {
    const timelineSection = document.querySelector(".about-timeline");
    if (!timelineSection) return;

    const timelineTitle = timelineSection.querySelector(".section-title");
    const timelineItems = timelineSection.querySelectorAll(".timeline-item");

    // Animate title
    gsap.from(timelineTitle, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: timelineTitle,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate timeline items with stagger
    timelineItems.forEach((item, index) => {
      const direction = index % 2 === 0 ? -50 : 50;

      gsap.from(item, {
        x: direction,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }

  // Check if document is already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
