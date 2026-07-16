(function() {
  'use strict';

  /*
   * Central project settings.
   * Keep the WhatsApp number in international format without +, spaces, or dashes.
   */
  const PORTFOLIO_CONFIG = Object.freeze({
    whatsappNumber: '62895806707860',
    videoObserverMargin: '260px 0px',
    aboutRevealStagger: Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--about-reveal-stagger')) || 85,
    aboutTiltMax: 4.2,
    aboutLabelShiftX: 10,
    aboutLabelShiftY: 8,
    skillTiltMax: 4,
    portfolioTiltMax: 4.5,
    openingStorageKey: 'madd-opening-seen-v1',
    openingDuration: 3000,
    returningOpeningDuration: 480
  });

  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;

  /*
   * Editable portfolio content. Keep skills, hero labels, opening copy, and
   * typewriter professions here so the same data is not repeated in markup.
   */
  const PORTFOLIO_CONTENT = {
    opening: {
      name: ['AHMAD', 'FARREL'],
      subtitle: 'CREATIVE VISUAL PORTFOLIO',
      label: 'MADD / OPENING 001'
    },
    professions: [
      'Video Editor',
      'Cinematographer',
      'Travel Content Creator',
      'Web Developer',
      'Visual Storyteller'
    ],
    heroLabels: [
      'Premiere Pro',
      'After Effects',
      'DaVinci Resolve',
      'Next.js',
      'Cinematography',
      'Travel Content'
    ],
    portfolioMedia: [
      { id: 'motion-graph', type: 'video', previewSrc: '', fullVideoSrc: '', pendingFullSource: 'aseet/aset project 2026/potrait main.mp4', fallbackText: 'Video coming soon' },
      { id: 'motion-x-mrbob', type: 'video', previewSrc: '', fullVideoSrc: '', pendingFullSource: 'aseet/aset project 2026/Motion X video mrbob.mp4', fallbackText: 'Video coming soon' },
      { id: 'internship-edit', type: 'video', previewSrc: 'assets/media/previews/internship-edit.webm', fullVideoSrc: '', pendingFullSource: 'aseet/magang vidoe/magang gbut.mp4', fallbackText: 'Full video coming soon' },
      { id: 'aila-travel', type: 'video', previewSrc: '', fullVideoSrc: '', pendingFullSource: 'aseet/aset project 2026/Content AILA travel.mp4', fallbackText: 'Video coming soon' },
      { id: 'konten-3d', type: 'video', previewSrc: '', fullVideoSrc: '', pendingFullSource: 'aseet/aset project 2026/konten 3D ubz.mp4', fallbackText: 'Video coming soon' },
      { id: '3d-book', type: 'video', previewSrc: '', fullVideoSrc: '', pendingFullSource: 'aseet/aset project 2026/3D book.mp4', fallbackText: 'Video coming soon' },
      { id: 'ranu-regulo', type: 'photo', detailUrl: 'ranuregulo.html' },
      { id: 'mt-arjuna', type: 'photo', detailUrl: 'Gn arjuno.html' },
      { id: 'mt-kelud', type: 'photo', detailUrl: 'gn kelud.html' },
      { id: 'bromo-photo-hunt', type: 'photo', detailUrl: 'bromo.html' },
      { id: 'cangar-photo-hunt', type: 'photo', detailUrl: 'cangar.html' },
      { id: 'cinematic-batu', type: 'video', previewSrc: 'assets/media/previews/cinematic-batu.webm', fullVideoSrc: '', pendingFullSource: 'aseet/aset project/CINEMATIC BATU.mp4', fallbackText: 'Full video coming soon' },
      { id: 'azel-photo-hunt', type: 'photo', detailUrl: 'kayra detail 2.html' },
      { id: 'photo-hunt-cbr', type: 'photo', detailUrl: 'karya detail cbr.html' },
      { id: 'after-effects-3d', type: 'video', previewSrc: 'assets/media/previews/after-effects-3d.webm', fullVideoSrc: '', pendingFullSource: 'aseet/aset project/finishkontennew_1.mp4', fallbackText: 'Full video coming soon' },
      { id: 'jadi-luka-amv', type: 'video', previewSrc: 'assets/media/previews/jadi-luka-amv.webm', fullVideoSrc: '', pendingFullSource: 'aseet/aset project/Jadi luka sore_3.mp4', fallbackText: 'Full video coming soon' },
      { id: 'website-agen-mad', type: 'web', detailUrl: 'https://maddd327.github.io/Agen-Madd/' },
      { id: 'cinematic-cbr', type: 'video', previewSrc: 'assets/media/previews/cinematic-cbr.webm', fullVideoSrc: '', pendingFullSource: 'aseet/aset project/cine cbri.mp4', fallbackText: 'Full video coming soon' }
    ],
    skills: [
      { id: 'motion-3d', name: '3D Motion', category: 'creative', percentage: 50, level: 'Developing', description: 'Exploring motion, depth, and animated visual composition.', focus: 'Motion, depth, and visual experimentation', icon: 'bx bx-cube-alt', relatedTools: ['After Effects', 'Blender'] },
      { id: 'cinematography', name: 'Cinematography', category: 'creative', percentage: 80, level: 'Proficient', description: 'Framing, camera movement, and visual storytelling for cinematic content.', focus: 'Framing, movement, and visual narrative', icon: 'bx bx-movie-play', relatedTools: ['Premiere Pro', 'DaVinci Resolve'] },
      { id: 'photo-videography', name: 'Photo / Videography', category: 'creative', percentage: 95, level: 'Advanced', description: 'Capturing clean visual moments across photography and video production.', focus: 'Shooting, composition, and production', icon: 'bx bx-camera-movie', relatedTools: ['Premiere Pro'] },
      { id: 'travel-content', name: 'Travel Content Creation', category: 'creative', percentage: 100, level: 'Advanced', description: 'Building place-driven stories for social media and portfolio content.', focus: 'Travel storytelling and short-form content', icon: 'bx bx-map-alt', relatedTools: ['Premiere Pro', 'CapCut'] },
      { id: 'html', name: 'HTML', category: 'development', percentage: 85, level: 'Proficient', description: 'Semantic structure and accessible content for responsive websites.', focus: 'Page structure and accessibility', icon: 'bx bxl-html5', relatedTools: ['CSS', 'JavaScript'] },
      { id: 'css', name: 'CSS', category: 'development', percentage: 85, level: 'Proficient', description: 'Responsive layouts, visual systems, and lightweight interface animation.', focus: 'Responsive design and visual polish', icon: 'bx bxl-css3', relatedTools: ['HTML', 'JavaScript'] },
      { id: 'javascript', name: 'JavaScript', category: 'development', percentage: 80, level: 'Proficient', description: 'Interactive front-end behavior using maintainable browser-native JavaScript.', focus: 'Interaction and interface logic', icon: 'bx bxl-javascript', relatedTools: ['HTML', 'CSS', 'Next.js'] },
      { id: 'nextjs', name: 'Next.js', category: 'development', percentage: 75, level: 'Intermediate', description: 'Component-based web experiences built with Next.js.', focus: 'Component-driven web development', icon: 'bx bx-code-curly', relatedTools: ['JavaScript', 'HTML', 'CSS'] },
      { id: 'java', name: 'Java', category: 'development', percentage: 75, level: 'Intermediate', description: 'Programming foundations and application logic using Java.', focus: 'Programming logic and application structure', icon: 'bx bxl-java', relatedTools: [] },
      { id: 'python', name: 'Python', category: 'development', percentage: 75, level: 'Intermediate', description: 'Programming fundamentals and practical problem solving with Python.', focus: 'Problem solving and scripting', icon: 'bx bxl-python', relatedTools: [] },
      { id: 'premiere-pro', name: 'Adobe Premiere Pro', category: 'tools', percentage: 90, level: 'Advanced', description: 'Video editing, timeline workflow, cinematic storytelling, and final delivery.', focus: 'Editing workflow and final delivery', icon: 'bx bx-film', relatedTools: ['After Effects', 'DaVinci Resolve'] },
      { id: 'after-effects', name: 'Adobe After Effects', category: 'tools', percentage: 95, level: 'Advanced', description: 'Motion graphics, compositing, visual effects, and animation.', focus: 'Motion graphics, compositing, and VFX', icon: 'bx bx-layer', relatedTools: ['Premiere Pro', 'Blender'] },
      { id: 'capcut', name: 'CapCut', category: 'tools', percentage: 90, level: 'Advanced', description: 'Fast editing, short-form content, captions, transitions, and social-media video.', focus: 'Fast social and short-form editing', icon: 'bx bx-cut', relatedTools: ['Premiere Pro'] },
      { id: 'davinci-resolve', name: 'DaVinci Resolve', category: 'tools', percentage: 70, level: 'Intermediate', description: 'Color correction and cinematic color grading.', focus: 'Color correction and grading', icon: 'bx bx-color-fill', relatedTools: ['Premiere Pro'] },
      { id: 'blender', name: 'Blender', category: 'tools', percentage: 60, level: 'Developing', description: 'Basic 3D modeling, scene creation, animation, and 3D experimentation.', focus: '3D scenes, modeling, and animation', icon: 'bx bx-cube', relatedTools: ['After Effects'] }
    ]
  };

  window.PORTFOLIO_CONTENT = PORTFOLIO_CONTENT;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mobileSkills = window.matchMedia('(max-width: 767.98px)');
  const requestFrame = window.requestAnimationFrame.bind(window);
  let typedInstance = null;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const setWhatsAppLinks = () => {
    const href = 'https://wa.me/' + PORTFOLIO_CONFIG.whatsappNumber;
    document.querySelectorAll('[data-whatsapp-link], a[href^="https://wa.me/"]').forEach((link) => {
      link.setAttribute('href', href);
    });
    const displayNumber = PORTFOLIO_CONFIG.whatsappNumber.startsWith('62')
      ? '0' + PORTFOLIO_CONFIG.whatsappNumber.slice(2)
      : '+' + PORTFOLIO_CONFIG.whatsappNumber;
    document.querySelectorAll('[data-whatsapp-display]').forEach((element) => {
      element.textContent = displayNumber;
    });
  };

  const renderHeroLabels = () => {
    const container = document.querySelector('[data-hero-labels]');
    if (!container) return;
    container.replaceChildren();
    PORTFOLIO_CONTENT.heroLabels.slice(0, 7).forEach((label) => {
      const chip = document.createElement('span');
      chip.className = 'hero-floating-label';
      chip.textContent = label;
      container.appendChild(chip);
    });
  };

  const initHeroParallax = () => {
    const hero = document.querySelector('.hero-home');
    if (!hero || !finePointer || reducedMotion) return;
    let pointer = null;
    let frameId = 0;

    const render = () => {
      frameId = 0;
      if (!pointer) return;
      const rect = hero.getBoundingClientRect();
      const normalizedX = clamp(((pointer.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const normalizedY = clamp(((pointer.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      hero.style.setProperty('--hero-bg-x', (normalizedX * -3).toFixed(2) + 'px');
      hero.style.setProperty('--hero-bg-y', (normalizedY * -2.5).toFixed(2) + 'px');
      hero.style.setProperty('--hero-decor-x', (normalizedX * 7).toFixed(2) + 'px');
      hero.style.setProperty('--hero-decor-y', (normalizedY * 5).toFixed(2) + 'px');
      hero.style.setProperty('--hero-copy-x', (normalizedX * 2.2).toFixed(2) + 'px');
      hero.style.setProperty('--hero-copy-y', (normalizedY * 1.8).toFixed(2) + 'px');
    };

    const reset = () => {
      pointer = null;
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      hero.classList.remove('is-parallax-active');
      ['--hero-bg-x', '--hero-bg-y', '--hero-decor-x', '--hero-decor-y', '--hero-copy-x', '--hero-copy-y']
        .forEach((property) => hero.style.setProperty(property, '0px'));
    };

    hero.addEventListener('pointerenter', () => hero.classList.add('is-parallax-active'));
    hero.addEventListener('pointermove', (event) => {
      pointer = event;
      if (!frameId) frameId = requestFrame(render);
    });
    hero.addEventListener('pointerleave', reset);
  };

  const initAnimationVisibility = () => {
    const sections = Array.from(document.querySelectorAll('.hero-home, .about-showcase, .skills-toolbox'));
    if (!sections.length) return;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-animation-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-animation-visible', entry.isIntersecting);
        if (!entry.target.classList.contains('hero-home') || !typedInstance) return;
        if (entry.isIntersecting && typeof typedInstance.start === 'function') typedInstance.start();
        if (!entry.isIntersecting && typeof typedInstance.stop === 'function') typedInstance.stop();
      });
    }, { threshold: 0.01, rootMargin: '80px 0px' });

    sections.forEach((section) => observer.observe(section));
  };

  const initTypewriter = () => {
    const target = document.querySelector('.hero-home .typed');
    if (!target || !PORTFOLIO_CONTENT.professions.length) return;

    target.textContent = PORTFOLIO_CONTENT.professions[0];
    if (reducedMotion || typeof window.Typed !== 'function') return;

    try {
      target.textContent = '';
      typedInstance = new window.Typed(target, {
        strings: PORTFOLIO_CONTENT.professions,
        loop: true,
        typeSpeed: 86,
        backSpeed: 42,
        backDelay: 1900,
        startDelay: 120
      });
      const hero = target.closest('.hero-home');
      if (hero && !hero.classList.contains('is-animation-visible') && typeof typedInstance.stop === 'function') {
        typedInstance.stop();
      }
    } catch (error) {
      target.textContent = PORTFOLIO_CONTENT.professions[0];
    }
  };

  const initOpening = () => {
    const opening = document.querySelector('#opening');
    const hero = document.querySelector('.hero-home');
    const openingName = opening ? opening.querySelector('.opening__name') : null;
    const heroName = hero ? hero.querySelector('.hero-home__name-primary') : null;
    let completed = false;
    let failsafeTimer = 0;
    let seenInSession = false;

    renderHeroLabels();

    if (opening) {
      const nameParts = opening.querySelectorAll('.opening__name span');
      nameParts.forEach((part, index) => {
        part.textContent = PORTFOLIO_CONTENT.opening.name[index] || '';
      });
      const label = opening.querySelector('.opening__label');
      const subtitle = opening.querySelector('.opening__subtitle');
      if (label) label.textContent = PORTFOLIO_CONTENT.opening.label;
      if (subtitle) subtitle.textContent = PORTFOLIO_CONTENT.opening.subtitle;
    }

    const finish = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(failsafeTimer);
      document.body.classList.remove('opening-active');
      if (hero) hero.classList.add('is-ready');
      if (opening) {
        opening.classList.add('is-exiting');
        window.setTimeout(() => opening.remove(), reducedMotion ? 0 : 380);
      }
      initTypewriter();
      document.dispatchEvent(new CustomEvent('portfolio:opening-complete', {
        detail: { firstVisit: !seenInSession }
      }));
    };

    if (!opening || !hero) {
      finish();
      return;
    }

    document.body.classList.add('opening-active');

    try {
      seenInSession = window.sessionStorage.getItem(PORTFOLIO_CONFIG.openingStorageKey) === 'true';
      window.sessionStorage.setItem(PORTFOLIO_CONFIG.openingStorageKey, 'true');
    } catch (error) {
      seenInSession = false;
    }

    failsafeTimer = window.setTimeout(finish, reducedMotion ? 360 : PORTFOLIO_CONFIG.openingDuration + 350);

    if (reducedMotion) {
      opening.classList.add('is-returning');
      window.setTimeout(finish, 140);
      return;
    }

    if (seenInSession) {
      opening.classList.add('is-returning');
      window.setTimeout(finish, PORTFOLIO_CONFIG.returningOpeningDuration);
      return;
    }

    requestFrame(() => opening.classList.add('is-full'));

    window.setTimeout(() => {
      if (completed || !openingName || !heroName || typeof openingName.animate !== 'function' || window.innerWidth < 768) {
        finish();
        return;
      }

      const sourceRect = openingName.getBoundingClientRect();
      const targetRect = heroName.getBoundingClientRect();
      const targetOutsideViewport = targetRect.bottom <= 0 || targetRect.top >= window.innerHeight;
      if (!sourceRect.width || !targetRect.width || targetOutsideViewport) {
        finish();
        return;
      }

      const handoff = document.createElement('span');
      const sourceStyle = window.getComputedStyle(openingName);
      handoff.className = 'opening__handoff';
      handoff.textContent = PORTFOLIO_CONTENT.opening.name.join(' ');
      handoff.style.left = sourceRect.left + 'px';
      handoff.style.top = sourceRect.top + 'px';
      handoff.style.fontSize = sourceStyle.fontSize;
      handoff.style.lineHeight = sourceStyle.lineHeight;
      document.body.appendChild(handoff);
      openingName.classList.add('is-handoff-source');
      opening.classList.add('is-exiting');

      const scale = Math.min(targetRect.width / sourceRect.width, targetRect.height / sourceRect.height);
      const movement = handoff.animate([
        { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
        { opacity: 0.88, transform: 'translate3d(' + (targetRect.left - sourceRect.left) + 'px, ' + (targetRect.top - sourceRect.top) + 'px, 0) scale(' + scale + ')' }
      ], {
        duration: 520,
        easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        fill: 'forwards'
      });

      movement.finished.catch(() => {}).finally(() => {
        handoff.remove();
        finish();
      });
    }, 2050);
  };

  const initTiltSurface = (surface, maxRotation) => {
    if (!surface || !finePointer || reducedMotion) return;

    let latestPointer = null;
    let frameId = 0;

    const render = () => {
      frameId = 0;
      if (!latestPointer) return;

      const rect = surface.getBoundingClientRect();
      const normalizedX = clamp(((latestPointer.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const normalizedY = clamp(((latestPointer.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      const xPercent = clamp(((latestPointer.clientX - rect.left) / rect.width) * 100, 0, 100);
      const yPercent = clamp(((latestPointer.clientY - rect.top) / rect.height) * 100, 0, 100);

      surface.style.setProperty('--tilt-x', (-normalizedY * maxRotation).toFixed(2) + 'deg');
      surface.style.setProperty('--tilt-y', (normalizedX * maxRotation).toFixed(2) + 'deg');
      surface.style.setProperty('--spotlight-x', xPercent.toFixed(1) + '%');
      surface.style.setProperty('--spotlight-y', yPercent.toFixed(1) + '%');
      surface.style.setProperty('--glare-x', xPercent.toFixed(1) + '%');
      surface.style.setProperty('--glare-y', yPercent.toFixed(1) + '%');
    };

    const reset = () => {
      latestPointer = null;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
      surface.classList.remove('is-tilting');
      surface.style.setProperty('--tilt-x', '0deg');
      surface.style.setProperty('--tilt-y', '0deg');
      surface.style.setProperty('--spotlight-x', '50%');
      surface.style.setProperty('--spotlight-y', '50%');
      surface.style.setProperty('--glare-x', '50%');
      surface.style.setProperty('--glare-y', '50%');
    };

    surface.addEventListener('pointerenter', () => surface.classList.add('is-tilting'));
    surface.addEventListener('pointermove', (event) => {
      latestPointer = event;
      if (!frameId) frameId = requestFrame(render);
    });
    surface.addEventListener('pointerleave', reset);
  };

  const initTiltEffects = () => {
    document.querySelectorAll('[data-skill-card]').forEach((card) => initTiltSurface(card, PORTFOLIO_CONFIG.skillTiltMax));
    document.querySelectorAll('.portfolio-wrap.tilt-card').forEach((card) => initTiltSurface(card, PORTFOLIO_CONFIG.portfolioTiltMax));
  };

  const initAboutDepth = () => {
    const composition = document.querySelector('[data-about-depth]');
    if (!composition || !finePointer || reducedMotion) return;

    const labels = Array.from(composition.querySelectorAll('.about-floating-skill[data-depth]'));
    let pointer = null;
    let frameId = 0;

    const render = () => {
      frameId = 0;
      if (!pointer) return;
      const rect = composition.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const normalizedX = clamp(((pointer.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const normalizedY = clamp(((pointer.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      const xPercent = clamp(((pointer.clientX - rect.left) / rect.width) * 100, 0, 100);
      const yPercent = clamp(((pointer.clientY - rect.top) / rect.height) * 100, 0, 100);

      composition.style.setProperty('--about-tilt-x', (-normalizedY * PORTFOLIO_CONFIG.aboutTiltMax).toFixed(2) + 'deg');
      composition.style.setProperty('--about-tilt-y', (normalizedX * PORTFOLIO_CONFIG.aboutTiltMax).toFixed(2) + 'deg');
      composition.style.setProperty('--about-glare-x', xPercent.toFixed(1) + '%');
      composition.style.setProperty('--about-glare-y', yPercent.toFixed(1) + '%');

      labels.forEach((label) => {
        const depth = clamp(Number.parseFloat(label.dataset.depth) || 28, 28, 42);
        const factor = depth / 42;
        label.style.setProperty('--about-label-x', (normalizedX * PORTFOLIO_CONFIG.aboutLabelShiftX * factor).toFixed(2) + 'px');
        label.style.setProperty('--about-label-y', (normalizedY * PORTFOLIO_CONFIG.aboutLabelShiftY * factor).toFixed(2) + 'px');
      });
    };

    const reset = () => {
      pointer = null;
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      composition.classList.remove('is-tilting');
      composition.style.setProperty('--about-tilt-x', '0deg');
      composition.style.setProperty('--about-tilt-y', '0deg');
      composition.style.setProperty('--about-glare-x', '50%');
      composition.style.setProperty('--about-glare-y', '50%');
      labels.forEach((label) => {
        label.style.setProperty('--about-label-x', '0px');
        label.style.setProperty('--about-label-y', '0px');
      });
    };

    composition.addEventListener('pointerenter', () => composition.classList.add('is-tilting'));
    composition.addEventListener('pointermove', (event) => {
      pointer = event;
      if (!frameId) frameId = requestFrame(render);
    });
    composition.addEventListener('pointerleave', reset);
  };

  const initHeroNameSweep = () => {
    const hero = document.querySelector('.hero-home');
    if (!hero || reducedMotion) return;
    document.addEventListener('portfolio:opening-complete', (event) => {
      if (!event.detail || !event.detail.firstVisit) return;
      window.setTimeout(() => {
        hero.classList.add('is-name-sweeping');
        window.setTimeout(() => hero.classList.remove('is-name-sweeping'), 1050);
      }, 430);
    }, { once: true });
  };

  const initNavigationRail = () => {
    const sections = Array.from(document.querySelectorAll('[data-nav-section][id]'));
    const links = Array.from(document.querySelectorAll('[data-nav-link][href^="#"]'));
    const progress = document.querySelector('[data-scroll-progress]');
    const rail = document.querySelector('.madd-nav-rail');
    const moreToggle = document.querySelector('[data-mobile-more-toggle]');
    const morePanel = document.querySelector('[data-mobile-more-panel]');
    if (!sections.length || !links.length) return;

    let frameId = 0;
    let closeTimer = 0;

    const sectionIdFromLink = (link) => {
      const href = link.getAttribute('href') || '';
      return href.charAt(0) === '#' ? href.slice(1) : '';
    };

    const closeMore = (restoreFocus) => {
      if (!moreToggle || !morePanel || morePanel.hidden) return;
      window.clearTimeout(closeTimer);
      moreToggle.setAttribute('aria-expanded', 'false');
      morePanel.classList.remove('is-open');
      closeTimer = window.setTimeout(() => {
        morePanel.hidden = true;
        if (restoreFocus) moreToggle.focus();
      }, reducedMotion ? 0 : 180);
    };

    const openMore = () => {
      if (!moreToggle || !morePanel) return;
      window.clearTimeout(closeTimer);
      morePanel.hidden = false;
      moreToggle.setAttribute('aria-expanded', 'true');
      requestFrame(() => morePanel.classList.add('is-open'));
      const firstLink = morePanel.querySelector('a[href]');
      if (firstLink) firstLink.focus();
    };

    const update = () => {
      frameId = 0;
      const viewportAnchor = window.innerHeight * 0.38;
      let activeId = sections[0].id;
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= viewportAnchor) activeId = section.id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        activeId = sections[sections.length - 1].id;
      }

      links.forEach((link) => {
        const active = sectionIdFromLink(link) === activeId;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });

      if (moreToggle && morePanel) {
        const currentMoreLink = Array.from(morePanel.querySelectorAll('[data-nav-link]'))
          .find((link) => sectionIdFromLink(link) === activeId);
        const moreActive = Boolean(currentMoreLink);
        moreToggle.classList.toggle('active', moreActive);
        if (moreActive) {
          moreToggle.setAttribute('aria-current', 'location');
          moreToggle.setAttribute('aria-label', 'More, current section: ' + currentMoreLink.textContent.trim());
        } else {
          moreToggle.removeAttribute('aria-current');
          moreToggle.setAttribute('aria-label', 'More');
        }
      }

      if (progress && rail) {
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        rail.style.setProperty('--madd-scroll-progress', clamp(window.scrollY / scrollable, 0, 1).toFixed(4));
      }
    };

    const requestUpdate = () => {
      if (!frameId) frameId = requestFrame(update);
    };

    const handleResize = () => {
      if (morePanel && moreToggle && window.innerWidth >= 768 && !morePanel.hidden) {
        const focusWasInPanel = morePanel.contains(document.activeElement);
        closeMore(false);
        if (focusWasInPanel) {
          window.setTimeout(() => {
            const currentRailLink = document.querySelector('.madd-nav-rail [aria-current="location"]');
            if (currentRailLink) currentRailLink.focus();
          }, reducedMotion ? 0 : 190);
        }
      }
      requestUpdate();
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('load', requestUpdate, { once: true });
    links.forEach((link) => link.addEventListener('click', () => {
      closeMore(Boolean(morePanel && morePanel.contains(link)));
    }));

    if (moreToggle && morePanel) {
      moreToggle.addEventListener('click', () => {
        if (morePanel.hidden) openMore();
        else closeMore(false);
      });
      document.addEventListener('pointerdown', (event) => {
        if (!morePanel.hidden && !morePanel.contains(event.target) && !moreToggle.contains(event.target)) closeMore(false);
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !morePanel.hidden) closeMore(true);
      });
    }
    update();
  };

  const countForSource = (source) => {
    if (source === 'skills') return document.querySelectorAll('[data-skill-card]').length;
    if (source === 'skill-categories') return document.querySelectorAll('[data-skill-filter]').length;
    return 0;
  };

  const animateCounter = (element, target) => {
    if (!element) return;
    element.textContent = String(target);
    if (reducedMotion || target <= 0) {
      return;
    }

    const duration = 680;
    let fallbackTimer = window.setTimeout(() => {
      element.textContent = String(target);
    }, duration + 180);

    requestFrame((start) => {
      element.textContent = '0';

      const tick = (now) => {
        const progress = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) {
          requestFrame(tick);
        } else {
          window.clearTimeout(fallbackTimer);
          fallbackTimer = 0;
          element.textContent = String(target);
        }
      };

      requestFrame(tick);
    });
  };

  const initAboutReveal = () => {
    const about = document.querySelector('.about-showcase');
    if (!about) return;

    const items = Array.from(about.querySelectorAll('[data-about-reveal]'));
    const counters = Array.from(about.querySelectorAll('[data-count-source]'));
    let countersStarted = false;

    items.forEach((item) => {
      const order = Math.max(1, Number.parseInt(item.dataset.revealOrder || '1', 10));
      item.style.setProperty('--about-delay', ((order - 1) * PORTFOLIO_CONFIG.aboutRevealStagger) + 'ms');
    });

    const reveal = () => {
      items.forEach((item) => item.classList.add('is-revealed'));
      if (!countersStarted) {
        countersStarted = true;
        counters.forEach((counter) => animateCounter(counter, countForSource(counter.dataset.countSource)));
      }
    };

    if (reducedMotion || !('IntersectionObserver' in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0] || !entries[0].isIntersecting) return;
      reveal();
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    observer.observe(about);
  };

  const renderSkills = () => {
    const grid = document.querySelector('[data-skills-grid]');
    const marqueeGroups = document.querySelectorAll('[data-skills-marquee]');
    if (!grid) return;

    const fragment = document.createDocumentFragment();
    PORTFOLIO_CONTENT.skills.forEach((skill, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.id = 'skill-card-' + skill.id;
      card.className = 'skill-card' + (index === 0 ? ' is-selected' : '');
      card.dataset.skillCard = '';
      card.dataset.skillId = skill.id;
      card.dataset.skillCategory = skill.category;
      card.dataset.skillName = skill.name;
      card.dataset.skillPercentage = String(skill.percentage);
      card.setAttribute('aria-pressed', String(index === 0));
      card.setAttribute('aria-controls', 'skills-detail');
      card.hidden = skill.category !== 'creative';

      const spotlight = document.createElement('span');
      spotlight.className = 'skill-card__spotlight';
      spotlight.setAttribute('aria-hidden', 'true');

      const number = document.createElement('span');
      number.className = 'skill-card__number';
      number.textContent = String(index + 1).padStart(2, '0');

      const icon = document.createElement('i');
      icon.className = skill.icon + ' skill-card__icon';
      icon.setAttribute('aria-hidden', 'true');

      const name = document.createElement('span');
      name.className = 'skill-card__name';
      name.textContent = skill.name;

      const category = document.createElement('span');
      category.className = 'skill-card__category';
      category.textContent = skill.category.charAt(0).toUpperCase() + skill.category.slice(1);

      const value = document.createElement('span');
      value.className = 'skill-card__value';
      value.textContent = skill.percentage + '%';

      const meter = document.createElement('span');
      meter.className = 'skill-card__meter progress';
      const progress = document.createElement('span');
      progress.className = 'skill-card__progress progress-bar';
      progress.setAttribute('role', 'progressbar');
      progress.setAttribute('aria-label', skill.name + ' proficiency');
      progress.setAttribute('aria-valuenow', String(skill.percentage));
      progress.setAttribute('aria-valuemin', '0');
      progress.setAttribute('aria-valuemax', '100');
      meter.appendChild(progress);

      card.append(spotlight, number, icon, name, category, value, meter);
      fragment.appendChild(card);
    });
    grid.replaceChildren(fragment);

    const marqueeNames = PORTFOLIO_CONTENT.skills
      .filter((skill) => skill.category === 'tools')
      .map((skill) => skill.name.replace('Adobe ', ''));
    marqueeGroups.forEach((group) => {
      group.replaceChildren();
      marqueeNames.forEach((name) => {
        const item = document.createElement('span');
        item.textContent = name;
        group.appendChild(item);
      });
    });
  };

  const initSkillProgress = (toolbox) => {
    const progressBars = Array.from(toolbox.querySelectorAll('.skill-card__progress'));
    if (!progressBars.length) return;

    const reveal = () => {
      progressBars.forEach((progress) => {
        progress.style.width = progress.getAttribute('aria-valuenow') + '%';
      });
    };

    if (reducedMotion || !('IntersectionObserver' in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0] || !entries[0].isIntersecting) return;
      reveal();
      observer.disconnect();
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    observer.observe(toolbox);
  };

  const initSkillsToolbox = () => {
    const toolbox = document.querySelector('.skills-toolbox');
    if (!toolbox) return;

    renderSkills();

    const tabs = Array.from(toolbox.querySelectorAll('[data-skill-filter]'));
    const cards = Array.from(toolbox.querySelectorAll('[data-skill-card]'));
    const panel = toolbox.querySelector('#skills-panel');
    const layout = toolbox.querySelector('.skills-toolbox__layout');
    const detail = toolbox.querySelector('#skills-detail');
    if (!tabs.length || !cards.length || !panel || !layout || !detail) return;

    const detailName = detail.querySelector('.skills-detail__name');
    const detailCategory = detail.querySelector('.skills-detail__category');
    const detailPercentage = detail.querySelector('.skills-detail__percentage');
    const detailLevel = detail.querySelector('.skills-detail__level');
    const detailFocus = detail.querySelector('.skills-detail__focus');
    const detailTools = detail.querySelector('.skills-detail__tools');
    const detailIcon = detail.querySelector('.skills-detail__icon i');
    const detailMeter = detail.querySelector('.skills-detail__meter span');
    const detailDescription = detail.querySelector('.skills-detail__description');
    let selectedCard = cards.find((card) => card.classList.contains('is-selected')) || cards[0];
    let detailAnimationTimer = 0;

    const placeDetail = () => {
      if (!selectedCard || !detail) return;
      if (mobileSkills.matches) {
        selectedCard.insertAdjacentElement('afterend', detail);
      } else {
        layout.appendChild(detail);
      }
    };

    const updateDetail = (card) => {
      if (!card) return;
      const skill = PORTFOLIO_CONTENT.skills.find((item) => item.id === card.dataset.skillId);
      if (!skill) return;
      const sourceIcon = card.querySelector('.skill-card__icon');

      const setField = (key, element, value) => {
        const wrapper = detail.querySelector('[data-skill-detail-field="' + key + '"]');
        const hasValue = value !== undefined && value !== null && String(value).trim() !== '';
        if (wrapper) wrapper.hidden = !hasValue;
        if (element) element.textContent = hasValue ? String(value) : '';
      };

      detailName.textContent = skill.name;
      setField('category', detailCategory, skill.category.charAt(0).toUpperCase() + skill.category.slice(1));
      setField('percentage', detailPercentage, skill.percentage + '%');
      setField('level', detailLevel, skill.level);
      setField('focus', detailFocus, skill.focus);
      setField('tools', detailTools, skill.relatedTools.join(', '));
      detailMeter.style.setProperty('--skill-level', skill.percentage + '%');

      if (sourceIcon && detailIcon) {
        detailIcon.className = Array.from(sourceIcon.classList)
          .filter((className) => className === 'bx' || className.indexOf('bx-') === 0)
          .join(' ');
      }

      if (skill.description) {
        detailDescription.textContent = skill.description;
        detailDescription.hidden = false;
      } else {
        detailDescription.textContent = '';
        detailDescription.hidden = true;
      }

      if (!reducedMotion) {
        detail.classList.remove('is-updating');
        window.clearTimeout(detailAnimationTimer);
        requestFrame(() => {
          detail.classList.add('is-updating');
          detailAnimationTimer = window.setTimeout(() => detail.classList.remove('is-updating'), 320);
        });
      }
    };

    const selectCard = (card) => {
      if (!card || card.hidden) return;
      selectedCard = card;
      cards.forEach((item) => {
        const selected = item === card;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      updateDetail(card);
      placeDetail();
    };

    const activateTab = (tab, moveFocus) => {
      const category = tab.dataset.skillFilter;
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });

      panel.setAttribute('aria-labelledby', tab.id);
      cards.forEach((card, index) => {
        const visible = card.dataset.skillCategory === category;
        card.hidden = !visible;
        if (visible && !reducedMotion) {
          card.classList.remove('is-entering');
          window.setTimeout(() => card.classList.add('is-entering'), index * 35);
        }
      });

      const firstVisible = cards.find((card) => !card.hidden);
      selectCard(firstVisible);
      if (moveFocus) tab.focus();
    };

    tabs.forEach((tab, tabIndex) => {
      tab.addEventListener('click', () => activateTab(tab, false));
      tab.addEventListener('keydown', (event) => {
        let nextIndex = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (tabIndex + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (tabIndex - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      });
    });

    cards.forEach((card) => {
      card.addEventListener('click', () => selectCard(card));
      card.addEventListener('focus', () => selectCard(card));
      if (finePointer) card.addEventListener('pointerenter', () => selectCard(card));
    });

    if (typeof mobileSkills.addEventListener === 'function') {
      mobileSkills.addEventListener('change', placeDetail);
    } else if (typeof mobileSkills.addListener === 'function') {
      mobileSkills.addListener(placeDetail);
    }

    updateDetail(selectedCard);
    placeDetail();
    initSkillProgress(toolbox);
  };

  const initResumeJourney = () => {
    const journey = document.querySelector('.resume-journey');
    if (!journey) return;

    const tabs = Array.from(journey.querySelectorAll('[data-resume-tab]'));
    const groups = Array.from(journey.querySelectorAll('[data-resume-group]'));
    const cards = Array.from(journey.querySelectorAll('[data-resume-card]'));
    const mobileResume = window.matchMedia('(max-width: 767.98px)');
    let activeCategory = 'education';

    groups.forEach((group) => {
      Array.from(group.querySelectorAll('[data-resume-card]')).forEach((card, index) => {
        card.style.setProperty('--resume-delay', (index * 72) + 'ms');
      });
    });

    cards.forEach((card) => {
      const details = card.querySelector('details');
      const summary = details ? details.querySelector('summary') : null;
      if (!details || !summary) return;
      details.addEventListener('toggle', () => {
        summary.setAttribute('aria-expanded', String(details.open));
        summary.textContent = details.open ? 'Hide details' : 'View details';
      });
    });

    const applyLayout = () => {
      groups.forEach((group) => {
        const visible = !mobileResume.matches || group.dataset.resumeGroup === activeCategory;
        group.hidden = !visible;
        group.setAttribute('aria-hidden', String(!visible));
      });
    };

    const activateTab = (tab, moveFocus) => {
      activeCategory = tab.dataset.resumeTab;
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
      });
      applyLayout();
      if (moveFocus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab, false));
      tab.addEventListener('keydown', (event) => {
        let nextIndex = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      });
    });

    if (typeof mobileResume.addEventListener === 'function') {
      mobileResume.addEventListener('change', applyLayout);
    } else if (typeof mobileResume.addListener === 'function') {
      mobileResume.addListener(applyLayout);
    }
    applyLayout();

    const reveal = () => journey.classList.add('is-visible');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      reveal();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0] || !entries[0].isIntersecting) return;
      reveal();
      observer.disconnect();
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    observer.observe(journey);
  };

  const applyPortfolioMediaConfig = () => {
    const mediaById = new Map(PORTFOLIO_CONTENT.portfolioMedia.map((item) => [item.id, item]));

    document.querySelectorAll('.portfolio-wrap[data-portfolio-id]').forEach((card) => {
      const media = mediaById.get(card.dataset.portfolioId);
      const links = card.querySelector('.portfolio-links');
      const titleElement = card.querySelector('.portfolio-info h3');
      let primary = card.querySelector('[data-portfolio-primary]');
      if (!media || !links || !primary) return;

      const title = titleElement ? titleElement.textContent.trim() : media.id;
      card.dataset.mediaType = media.type;

      const replacePrimary = (replacement) => {
        primary.replaceWith(replacement);
        primary = replacement;
      };

      if (media.type === 'video') {
        const playableSource = media.fullVideoSrc || media.previewSrc;
        card.classList.toggle('is-video-unavailable', !playableSource);
        card.dataset.fullVideoState = media.fullVideoSrc ? 'available' : (media.pendingFullSource ? 'lfs-pointer' : 'missing');
        if (media.previewSrc) card.dataset.previewVideo = media.previewSrc;
        else delete card.dataset.previewVideo;

        if (playableSource) {
          if (primary.tagName !== 'A') replacePrimary(document.createElement('a'));
          const previewOnly = !media.fullVideoSrc;
          primary.className = 'portfolio-lightbox portfolio-video-trigger';
          primary.href = playableSource;
          primary.dataset.portfolioPrimary = '';
          primary.dataset.glightbox = 'type: video';
          primary.dataset.gallery = 'portfolioGallery';
          primary.title = title + (previewOnly ? ' — 6-second preview' : ' — video');
          primary.setAttribute('aria-label', (previewOnly ? 'Play 6-second preview of ' : 'Play video ') + title);
          primary.innerHTML = '<i class="bx bx-play-circle" aria-hidden="true"></i><span class="portfolio-action-label">' + (previewOnly ? '6s Preview' : 'Play video') + '</span>';
        } else {
          if (primary.tagName !== 'SPAN') replacePrimary(document.createElement('span'));
          const fallbackText = media.fallbackText || 'Video coming soon';
          primary.className = 'portfolio-video-status';
          primary.dataset.portfolioPrimary = '';
          primary.setAttribute('aria-label', title + ' — ' + fallbackText);
          primary.innerHTML = '<i class="bx bx-time-five" aria-hidden="true"></i><span>' + fallbackText + '</span>';
        }
        return;
      }

      if (primary.tagName !== 'A' || !media.detailUrl) return;
      primary.href = media.detailUrl;
      primary.className = 'portfolio-project-link';
      primary.dataset.portfolioPrimary = '';
      primary.removeAttribute('data-glightbox');
      primary.removeAttribute('data-gallery');
      primary.setAttribute('aria-label', 'Open ' + title + (media.type === 'photo' ? ' project page' : ' website'));
      if (media.type === 'web') {
        primary.target = '_blank';
        primary.rel = 'noopener';
      } else {
        primary.removeAttribute('target');
        primary.removeAttribute('rel');
      }
    });
  };

  const initPortfolioPreviews = () => {
    const cards = Array.from(document.querySelectorAll('.portfolio-wrap[data-preview-video]'));
    if (!cards.length) return;

    const states = new Map();
    let activeState = null;
    let scrollFrame = 0;

    const updateButton = (state, playing) => {
      state.button.setAttribute('aria-pressed', String(playing));
      state.button.querySelector('i').className = playing ? 'bx bx-pause' : 'bx bx-play';
      state.button.querySelector('span').textContent = playing ? 'Pause' : 'Preview';
      state.button.setAttribute('aria-label', (playing ? 'Pause ' : '') + state.label);
    };

    const hydrate = (state) => {
      if (state.hydrated || state.invalid) return;
      state.hydrated = true;
      state.video.src = state.source;
    };

    const stop = (state, reset) => {
      if (!state) return;
      state.requested = false;
      try {
        state.video.pause();
        if (reset) state.video.currentTime = 0;
      } catch (error) {}
      state.video.classList.remove('is-playing');
      state.card.classList.remove('is-previewing');
      updateButton(state, false);
      if (activeState === state) activeState = null;
    };

    const play = (state) => {
      if (!state || state.invalid) return;
      if (activeState && activeState !== state) stop(activeState, true);

      hydrate(state);
      state.requested = true;
      activeState = state;
      state.video.muted = true;

      const playPromise = state.video.play();
      if (!playPromise || typeof playPromise.then !== 'function') return;

      playPromise.then(() => {
        if (!state.requested || activeState !== state) {
          stop(state, true);
          return;
        }
        state.video.classList.add('is-playing');
        state.card.classList.add('is-previewing');
        updateButton(state, true);
      }).catch(() => {
        stop(state, true);
        if (state.video.error) {
          state.invalid = true;
          state.button.disabled = true;
        }
      });
    };

    const stopAll = () => {
      states.forEach((state) => stop(state, true));
    };

    cards.forEach((card) => {
      const image = card.querySelector('img');
      const info = card.querySelector('.portfolio-info');
      const label = card.dataset.previewLabel || 'portfolio video preview';
      const video = document.createElement('video');
      const spotlight = document.createElement('span');
      const button = document.createElement('button');

      video.className = 'portfolio-preview__video';
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.loop = true;
      video.preload = 'none';
      video.tabIndex = -1;
      video.setAttribute('aria-hidden', 'true');
      if (image) video.poster = image.currentSrc || image.src;

      spotlight.className = 'portfolio-preview__spotlight';
      spotlight.setAttribute('aria-hidden', 'true');

      button.type = 'button';
      button.className = 'portfolio-preview__toggle';
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', label);
      button.innerHTML = '<i class="bx bx-play" aria-hidden="true"></i><span>Preview</span>';

      card.insertBefore(video, info || null);
      card.insertBefore(spotlight, info || null);
      card.insertBefore(button, info || null);

      const state = {
        card: card,
        video: video,
        button: button,
        source: card.dataset.previewVideo,
        label: label,
        hydrated: false,
        invalid: false,
        requested: false
      };

      states.set(card, state);

      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (activeState === state && !state.video.paused) {
          stop(state, true);
        } else {
          play(state);
        }
      });

      video.addEventListener('error', () => {
        state.invalid = true;
        stop(state, true);
        button.disabled = true;
        video.removeAttribute('src');
        const media = PORTFOLIO_CONTENT.portfolioMedia.find((item) => item.id === card.dataset.portfolioId);
        if (!media || !media.fullVideoSrc) {
          const primary = card.querySelector('a[data-portfolio-primary]');
          if (primary) {
            const statusFallback = document.createElement('span');
            statusFallback.className = 'portfolio-video-status';
            statusFallback.dataset.portfolioPrimary = '';
            statusFallback.setAttribute('aria-label', label + ' unavailable');
            statusFallback.innerHTML = '<i class="bx bx-error-circle" aria-hidden="true"></i><span>Preview unavailable</span>';
            primary.replaceWith(statusFallback);
          }
          card.classList.add('is-video-unavailable');
        }
      });

      if (finePointer && !reducedMotion) {
        card.addEventListener('pointerenter', () => play(state));
        card.addEventListener('pointerleave', () => stop(state, true));
      }
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const state = states.get(entry.target);
          if (!state) return;
          if (entry.isIntersecting) {
            hydrate(state);
          } else {
            stop(state, true);
          }
        });
      }, { rootMargin: PORTFOLIO_CONFIG.videoObserverMargin, threshold: 0.01 });

      cards.forEach((card) => observer.observe(card));
    }

    document.addEventListener('portfolio:stop-previews', stopAll);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAll();
    });

    window.addEventListener('scroll', () => {
      if (!activeState || scrollFrame) return;
      scrollFrame = requestFrame(() => {
        scrollFrame = 0;
        if (!activeState) return;
        const rect = activeState.card.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) stop(activeState, true);
      });
    }, { passive: true });
  };

  const initPortfolioAccessibility = () => {
    document.querySelectorAll('.portfolio-wrap').forEach((card) => {
      const projectName = card.querySelector('.portfolio-info h3');
      card.querySelectorAll('.portfolio-links a').forEach((link) => {
        const icon = link.querySelector('i');
        if (icon) icon.setAttribute('aria-hidden', 'true');
        if (link.hasAttribute('aria-label')) return;
        const explicitTitle = link.getAttribute('title');
        const fallbackName = projectName ? projectName.textContent.trim() : 'portfolio project';
        link.setAttribute('aria-label', explicitTitle || ('Open ' + fallbackName));
      });
    });
  };

  const initProjectBrief = () => {
    const modal = document.querySelector('#project-brief-modal');
    const dialog = document.querySelector('#project-brief-dialog');
    const form = document.querySelector('#project-brief-form');
    const triggers = Array.from(document.querySelectorAll('.project-brief-trigger'));
    if (!modal || !dialog || !form || !triggers.length) return;

    const closeControls = Array.from(modal.querySelectorAll('[data-project-brief-close]'));
    const status = form.querySelector('#project-brief-status');
    const fields = {
      name: form.elements.name,
      projectType: form.elements.projectType,
      deadline: form.elements.deadline,
      budget: form.elements.budget,
      description: form.elements.description
    };

    let lastTrigger = null;
    let closeTimer = 0;
    let inertState = [];

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const setPageInert = (inert) => {
      if (inert) {
        inertState = Array.from(document.body.children)
          .filter((element) => element !== modal && element.tagName !== 'SCRIPT')
          .map((element) => ({ element: element, wasInert: Boolean(element.inert) }));
        inertState.forEach((item) => {
          item.element.inert = true;
        });
      } else {
        inertState.forEach((item) => {
          item.element.inert = item.wasInert;
        });
        inertState = [];
      }
    };

    const openModal = (trigger) => {
      window.clearTimeout(closeTimer);
      lastTrigger = trigger;
      modal.hidden = false;
      document.body.classList.add('project-brief-open');
      setPageInert(true);
      triggers.forEach((item) => item.setAttribute('aria-expanded', String(item === trigger)));
      dialog.focus({ preventScroll: true });
      requestFrame(() => {
        modal.classList.add('is-open');
        window.setTimeout(() => fields.name.focus(), reducedMotion ? 0 : 180);
      });
    };

    const closeModal = () => {
      if (modal.hidden) return;
      modal.classList.remove('is-open');
      document.body.classList.remove('project-brief-open');
      setPageInert(false);
      triggers.forEach((item) => item.setAttribute('aria-expanded', 'false'));
      closeTimer = window.setTimeout(() => {
        modal.hidden = true;
        if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
      }, reducedMotion ? 0 : 330);
    };

    const setFieldError = (field, message) => {
      const wrapper = field.closest('[data-brief-field]');
      const error = wrapper ? wrapper.querySelector('.project-brief__error') : null;
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
      if (wrapper) wrapper.classList.toggle('is-invalid', Boolean(message));
      if (error) error.textContent = message || '';
    };

    const validate = () => {
      let firstInvalid = null;
      const requiredFields = [
        [fields.name, 'Please enter your name.'],
        [fields.projectType, 'Please choose a project type.'],
        [fields.description, 'Please describe the project.']
      ];

      requiredFields.forEach((item) => {
        const field = item[0];
        const message = field.value.trim() ? '' : item[1];
        setFieldError(field, message);
        if (message && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        status.textContent = 'Please complete the required fields.';
        return false;
      }

      status.textContent = '';
      return true;
    };

    const formatDeadline = (value) => {
      if (!value) return 'Belum ditentukan';
      try {
        return new Intl.DateTimeFormat('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC'
        }).format(new Date(value + 'T00:00:00Z'));
      } catch (error) {
        return value;
      }
    };

    const buildMessage = () => {
      const name = fields.name.value.trim();
      const projectType = fields.projectType.value.trim();
      const deadline = formatDeadline(fields.deadline.value);
      const budget = fields.budget.value.trim() || 'Belum ditentukan';
      const description = fields.description.value.trim();

      return [
        'Halo Ahmad Farrel, saya ingin mendiskusikan proyek.',
        '',
        'Nama: ' + name,
        'Jenis Proyek: ' + projectType,
        'Deadline: ' + deadline,
        'Budget: ' + budget,
        '',
        'Deskripsi:',
        description,
        '',
        'Apakah proyek ini dapat kita diskusikan lebih lanjut?'
      ].join('\n');
    };

    triggers.forEach((trigger) => {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', () => openModal(trigger));
    });

    closeControls.forEach((control) => control.addEventListener('click', closeModal));

    Object.values(fields).forEach((field) => {
      const clearError = () => {
        if (field.required && field.value.trim()) setFieldError(field, '');
        if (status.textContent) status.textContent = '';
      };
      field.addEventListener('input', clearError);
      field.addEventListener('change', clearError);
    });

    modal.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll(focusableSelector))
        .filter((element) => !element.hidden && element.offsetParent !== null);
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validate()) return;

      const message = buildMessage();
      const url = 'https://wa.me/' + PORTFOLIO_CONFIG.whatsappNumber + '?text=' + encodeURIComponent(message);
      const whatsappWindow = window.open('about:blank', '_blank');
      if (whatsappWindow) whatsappWindow.opener = null;

      status.textContent = 'Brief ready. Opening WhatsApp…';
      form.querySelector('.project-brief__submit').classList.add('is-ready');

      window.setTimeout(() => {
        if (whatsappWindow) {
          whatsappWindow.location.replace(url);
        } else {
          window.location.href = url;
        }
      }, reducedMotion ? 0 : 220);
    });
  };

  const init = () => {
    document.documentElement.classList.add('enhancements-ready');
    setWhatsAppLinks();
    initHeroNameSweep();
    initHeroParallax();
    initAnimationVisibility();
    initOpening();
    initNavigationRail();
    initSkillsToolbox();
    initAboutReveal();
    initAboutDepth();
    initResumeJourney();
    applyPortfolioMediaConfig();
    initPortfolioAccessibility();
    initPortfolioPreviews();
    initTiltEffects();
    initProjectBrief();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
