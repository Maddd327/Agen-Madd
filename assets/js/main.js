(function() {
  "use strict";

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
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
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
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
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

  /**
   * Preloader (FIX)
   * - angka 1% -> 90% -> 100%
   * - habis 100%: reveal buka dari tengah (class .reveal)
   * - remove preloader pakai timeout (biar ga nyangkut)
   */
  let preloader = select('#preloader');
  if (preloader) {
    const counterEl = preloader.querySelector('.loader-count');
    document.body.classList.add('preloading');

    let count = 1;
    let done = false;

    const setText = () => {
      if (counterEl) counterEl.textContent = count + '%';
    };
    setText();

    const animateCountTo = (target, duration, onDone) => {
      const start = count;
      const startTime = performance.now();

      const step = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        const next = Math.floor(start + (target - start) * t);

        if (next > count) count = next;
        setText();

        if (t < 1) requestAnimationFrame(step);
        else if (onDone) onDone();
      };

      requestAnimationFrame(step);
    };

    // awal: 1 -> 90 pelan
    animateCountTo(90, 1400);

    const finishPreloader = () => {
      if (done) return;
      done = true;

      // lanjut: 90 -> 100
      animateCountTo(100, 650, () => {
        preloader.classList.add('reveal');
        document.body.classList.remove('preloading');
        document.body.classList.add('loaded-pop');

        // REMOVE preloader setelah animasi panel selesai (tanpa nunggu animationend)
        window.setTimeout(() => {
          if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 950);
      });
    };

    // kalau load sudah kejadian (cache), langsung finish
    if (document.readyState === 'complete') {
      finishPreloader();
    } else {
      window.addEventListener('load', finishPreloader, { once: true });

      // fallback: kalau load lama/nyangkut, paksa selesai juga
      window.setTimeout(finishPreloader, 4000);
    }
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter (FIX layout rusak karena lazy-load)
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {

      // FIX: lazy-load bikin isotope salah hitung tinggi
      portfolioContainer.querySelectorAll('img[loading="lazy"]').forEach(img => {
        try { img.loading = 'eager'; } catch(e) {}
      });

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

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          relayout();
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

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * FIX: Stop audio/video supaya tidak numpuk saat GLightbox buka/tutup/pindah
   */
  const stopAllMedia = () => {
    // Pause semua video HTML5 (termasuk yang mungkin dibuat GLightbox)
    document.querySelectorAll('video').forEach(v => {
      try {
        v.pause();
        v.currentTime = 0;
        v.muted = true;
      } catch (e) {}
    });

    // Matikan semua iframe di dalam glightbox (external: tiktok / halaman lain)
    document.querySelectorAll('.glightbox-container iframe').forEach(f => {
      try {
        const src = f.getAttribute('src');
        if (src) f.setAttribute('src', '');
      } catch (e) {}
    });
  };

  // Matikan media saat buka / tutup / pindah slide
  ['open', 'close', 'slide_changed'].forEach(evt => {
    portfolioLightbox.on(evt, stopAllMedia);
    portfolioDetailsLightbox.on(evt, stopAllMedia);
  });

  // Optional: saat membuka details lightbox, unmute video yang sedang tampil
  portfolioDetailsLightbox.on('open', () => {
    setTimeout(() => {
      const v = document.querySelector('.glightbox-container video');
      if (v) v.muted = false;
    }, 200);
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Lightweight 3D tilt (no library)
   */
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  const tiltCards = document.querySelectorAll('.tilt-card');

  if (!isTouchDevice()) {
    tiltCards.forEach(card => {
      const maxRotate = 10; // derajat
      const maxTranslate = 6; // px

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const midX = rect.width / 2;
        const midY = rect.height / 2;

        const rotateY = ((x - midX) / midX) * maxRotate;
        const rotateX = -((y - midY) / midY) * maxRotate;

        const translateX = ((x - midX) / midX) * maxTranslate;
        const translateY = ((y - midY) / midY) * maxTranslate;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px)`;
      };

      const onLeave = () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  /**
   * Subtle parallax for About image (mouse)
   */
  const parImg = document.querySelector('.parallax-img');
  if (parImg && !isTouchDevice()) {
    const strength = 12;
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      parImg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()