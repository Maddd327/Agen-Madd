(function() {
  "use strict";

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    let ticking = false;
    el.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        listener();
        ticking = false;
      });
    }, { passive: true })
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  // The cinematic opening, configured typewriter, and dynamic Skills progress
  // are initialized by portfolio-enhancements.js.

  /**
   * Porfolio isotope and filter (FIX layout rusak karena lazy-load)
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {

   let portfolioIsotope = new Isotope(portfolioContainer, {
  itemSelector: '.portfolio-item',
  layoutMode: 'masonry',
  percentPosition: true,
  masonry: {
    columnWidth: '.portfolio-item'
  }
});

      const relayout = () => {
        portfolioIsotope.layout();
        if (window.AOS) AOS.refresh();
      };

      // relayout tiap gambar selesai load
      const imgs = portfolioContainer.querySelectorAll('img');
      imgs.forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', relayout, { once: true });
          img.addEventListener('error', relayout, { once: true });
        }
      });

      // jaga-jaga
      setTimeout(relayout, 200);

      portfolioIsotope.on('arrangeComplete', relayout);

      let portfolioFilters = select('#portfolio-flters [data-filter]', true);

      on('click', '#portfolio-flters [data-filter]', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
          el.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('filter-active');
        this.setAttribute('aria-pressed', 'true');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  const stopPortfolioPreviews = () => {
    document.dispatchEvent(new CustomEvent('portfolio:stop-previews'));
  };

  // One media-only viewer. Project HTML and external sites use normal links.
  ['open', 'close', 'slide_changed'].forEach(evt => {
    portfolioLightbox.on(evt, stopPortfolioPreviews);
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: prefersReducedMotion ? 0 : 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: prefersReducedMotion
    })
  });

})()
