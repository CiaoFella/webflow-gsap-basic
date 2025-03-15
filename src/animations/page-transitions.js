import { gsap } from "../vendor";

const OVERLAY_ID = "transition-overlay";

function initPageTransitions() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupTransitions);
  } else {
    setupTransitions();
  }
}

function setupTransitions() {
  createOverlay();

  const internalLinks = Array.from(document.querySelectorAll("a")).filter(
    (link) => {
      if (!link.href) return false;

      try {
        const url = new URL(link.href);
        return (
          url.origin === window.location.origin &&
          !link.hasAttribute("data-no-transition")
        );
      } catch (e) {
        return false;
      }
    }
  );

  internalLinks.forEach((link) => {
    link.addEventListener("click", handleLinkClick);
  });

  animatePageIn();
}

function createOverlay() {
  if (document.getElementById(OVERLAY_ID)) return;

  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "#000";
  overlay.style.zIndex = "9999";
  overlay.style.pointerEvents = "none";
  overlay.style.opacity = "0";

  document.body.appendChild(overlay);
}

function handleLinkClick(e) {
  const link = e.currentTarget;
  const targetUrl = link.href;

  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  if (link.hash && link.pathname === window.location.pathname) return;

  e.preventDefault();

  animatePageOut().then(() => {
    window.location.href = targetUrl;
  });
}

function animatePageIn() {
  const overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) return Promise.resolve();

  return gsap.to(overlay, {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    onComplete: () => {
      const content = document.querySelector("main") || document.body;
      gsap.from(content, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all",
      });
    },
  });
}

function animatePageOut() {
  const overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) return Promise.resolve();

  const content = document.querySelector("main") || document.body;
  gsap.to(content, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power3.in",
  });

  return gsap.to(overlay, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.in",
  });
}

export { initPageTransitions };
