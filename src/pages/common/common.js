import { gsap } from "../../vendor";

(function () {
  function init() {
    console.log("Common animations initialized");

    animateNavigation();
    animateFooter();
    setupScrollToTop();
  }

  function animateNavigation() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const logo = navbar.querySelector(".navbar-logo");
    const navLinks = navbar.querySelectorAll(".nav-link");
    const navCta = navbar.querySelector(".navbar-cta");

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.5 },
    });

    tl.from(logo, { y: -20, opacity: 0 })
      .from(navLinks, { y: -20, opacity: 0, stagger: 0.1 }, "-=0.3")
      .from(navCta, { y: -20, opacity: 0 }, "-=0.2");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        gsap.to(navbar, {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          height: "70px",
          duration: 0.3,
        });
      } else {
        gsap.to(navbar, {
          backgroundColor: "transparent",
          boxShadow: "none",
          height: "90px",
          duration: 0.3,
        });
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          color: "#4a90e2",
          duration: 0.3,
        });
      });

      link.addEventListener("mouseleave", () => {
        if (!link.classList.contains("active")) {
          gsap.to(link, {
            color: "#333",
            duration: 0.3,
          });
        }
      });
    });
  }

  function animateFooter() {
    const footer = document.querySelector(".footer");
    if (!footer) return;

    gsap.from(footer, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });

    const footerLinks = footer.querySelectorAll(".footer-link");

    footerLinks.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          x: 5,
          color: "#4a90e2",
          duration: 0.3,
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          x: 0,
          color: "#666",
          duration: 0.3,
        });
      });
    });
  }

  /**
   * Setup scroll to top button
   */
  function setupScrollToTop() {
    const scrollTopBtn = document.querySelector(".scroll-to-top");
    if (!scrollTopBtn) return;

    gsap.set(scrollTopBtn, { opacity: 0, display: "none" });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        gsap.to(scrollTopBtn, {
          opacity: 1,
          display: "block",
          duration: 0.3,
        });
      } else {
        gsap.to(scrollTopBtn, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            scrollTopBtn.style.display = "none";
          },
        });
      }
    });

    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();

      gsap.to(window, {
        scrollTo: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
