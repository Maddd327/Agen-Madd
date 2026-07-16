/**
 * Shared project-detail behavior: lightweight reveal, accessible Swiper
 * controls, on-demand lightbox, compact header, and back-to-top control.
 */
(function () {
  "use strict";

  const doc = document;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  doc.documentElement.classList.add("project-details-js");

  function initReveal() {
    const items = Array.from(doc.querySelectorAll("[data-project-reveal]"));
    if (!items.length) return;

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 }
    );

    items.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.94 && bounds.bottom > 0) {
        item.classList.add("is-visible");
        return;
      }
      observer.observe(item);
    });
  }

  function formatSlideNumber(value) {
    return String(value).padStart(2, "0");
  }

  function initGalleries() {
    const galleries = doc.querySelectorAll("[data-project-gallery]");
    if (!galleries.length || typeof window.Swiper !== "function") return;

    galleries.forEach((gallery) => {
      const shell = gallery.closest(".project-gallery-shell");
      const slides = gallery.querySelectorAll(".swiper-slide");
      const status = shell?.previousElementSibling?.querySelector("[data-gallery-status]");
      const previous = shell?.querySelector(".swiper-button-prev");
      const next = shell?.querySelector(".swiper-button-next");
      const pagination = shell?.querySelector(".swiper-pagination");

      const swiper = new window.Swiper(gallery, {
        speed: reducedMotion.matches ? 0 : 620,
        rewind: slides.length > 1,
        grabCursor: slides.length > 1,
        watchOverflow: true,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        a11y: {
          enabled: true,
          prevSlideMessage: "Previous project image",
          nextSlideMessage: "Next project image",
          firstSlideMessage: "This is the first project image",
          lastSlideMessage: "This is the last project image",
          paginationBulletMessage: "Go to project image {{index}}",
        },
        navigation: {
          prevEl: previous,
          nextEl: next,
        },
        pagination: {
          el: pagination,
          clickable: true,
        },
      });

      const updateStatus = () => {
        if (!status) return;
        status.textContent = `${formatSlideNumber(swiper.realIndex + 1)} / ${formatSlideNumber(slides.length)}`;
      };

      updateStatus();
      swiper.on("slideChange", updateStatus);
    });
  }

  function initLightbox() {
    if (typeof window.GLightbox !== "function") return;

    const supportedMedia = /\.(?:avif|gif|jpe?g|png|webp|mp4|webm)$/i;
    const mediaLinks = Array.from(doc.querySelectorAll(".project-gallery__link")).filter((link) => {
      try {
        const url = new URL(link.getAttribute("href"), window.location.href);
        return supportedMedia.test(url.pathname);
      } catch (_error) {
        return false;
      }
    });

    if (!mediaLinks.length) return;

    mediaLinks.forEach((link) => link.classList.add("project-gallery__media"));

    window.GLightbox({
      // The generated class is only applied to a real media extension, so a
      // complete HTML project page can never enter the media viewer.
      selector: ".project-gallery__media",
      touchNavigation: true,
      loop: false,
      zoomable: true,
      draggable: true,
      openEffect: reducedMotion.matches ? "none" : "fade",
      closeEffect: reducedMotion.matches ? "none" : "fade",
    });
  }

  function initScrollUi() {
    const header = doc.querySelector("[data-project-header]");
    const backToTop = doc.querySelector("[data-project-back-to-top]");
    if (!header && !backToTop) return;

    let frame = 0;
    const update = () => {
      const isScrolled = window.scrollY > 36;
      header?.classList.toggle("is-scrolled", isScrolled);
      backToTop?.classList.toggle("is-visible", window.scrollY > 520);
      frame = 0;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!frame) frame = window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    backToTop?.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    });

    update();
  }

  function init() {
    initReveal();
    initGalleries();
    initLightbox();
    initScrollUi();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
