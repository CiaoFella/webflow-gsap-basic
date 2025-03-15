/**
 * Portfolio page animations
 * This file contains animations specific to the portfolio page
 */
import { gsap, ScrollTrigger } from "../vendor";

// Self-executing function to avoid global scope pollution
(function () {
  // Initialize when DOM is ready
  function init() {
    console.log("Portfolio page animations initialized");

    // Initialize animations
    animateHeader();
    animatePortfolioGrid();
    animateFilters();
  }

  /**
   * Animate header section
   */
  function animateHeader() {
    const headerSection = document.querySelector(".portfolio-header");
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
   * Animate portfolio grid
   */
  function animatePortfolioGrid() {
    const portfolioGrid = document.querySelector(".portfolio-grid");
    if (!portfolioGrid) return;

    const portfolioItems = portfolioGrid.querySelectorAll(".portfolio-item");

    // Create staggered animation for portfolio items
    gsap.from(portfolioItems, {
      y: 100,
      opacity: 0,
      stagger: {
        amount: 0.6,
        grid: "auto",
        from: "start",
      },
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: portfolioGrid,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });

    // Add hover animations for portfolio items
    portfolioItems.forEach((item) => {
      const overlay = item.querySelector(".portfolio-overlay");
      const title = item.querySelector(".portfolio-title");
      const category = item.querySelector(".portfolio-category");

      // Create hover timeline
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(overlay, {
          opacity: 1,
          duration: 0.3,
        })
        .from(
          title,
          {
            y: 20,
            opacity: 0,
            duration: 0.3,
          },
          "-=0.1"
        )
        .from(
          category,
          {
            y: 10,
            opacity: 0,
            duration: 0.3,
          },
          "-=0.2"
        );

      // Add event listeners
      item.addEventListener("mouseenter", () => hoverTl.play());
      item.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  }

  /**
   * Animate portfolio filters
   */
  function animateFilters() {
    const filtersSection = document.querySelector(".portfolio-filters");
    if (!filtersSection) return;

    const filterButtons = filtersSection.querySelectorAll(".filter-button");

    // Animate filter buttons
    gsap.from(filterButtons, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.3,
    });

    // Add click animation for filter buttons
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        // Get filter value
        const filterValue = button.getAttribute("data-filter");

        // Get all portfolio items
        const portfolioItems = document.querySelectorAll(".portfolio-item");

        // Filter items
        portfolioItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");

          if (filterValue === "all" || itemCategory === filterValue) {
            // Show item
            gsap.to(item, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              clearProps: "transform",
            });
          } else {
            // Hide item
            gsap.to(item, {
              scale: 0.8,
              opacity: 0.2,
              duration: 0.5,
              ease: "power2.out",
            });
          }
        });
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
