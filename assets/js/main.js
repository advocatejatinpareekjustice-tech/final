    document.documentElement.classList.add('js');

    const finishInitialLoad = () => window.setTimeout(() => document.body.classList.add('is-loaded'), 360);
    if (document.readyState === 'complete') finishInitialLoad();
    else window.addEventListener('load', finishInitialLoad, { once: true });

    const header = document.getElementById('site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const menuClose = document.querySelector('.menu-close');
    const scrollProgress = document.querySelector('.scroll-progress span');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastFocusedElement = null;

    function setMenu(open) {
      if (open) lastFocusedElement = document.activeElement;
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      if (open) menuClose.focus();
      else if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
    }

    menuToggle.addEventListener('click', () => setMenu(true));
    menuClose.addEventListener('click', () => setMenu(false));
    menu.addEventListener('click', (event) => { if (event.target === menu) setMenu(false); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
    document.querySelectorAll('.mobile-links a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 80);
      document.getElementById('back-to-top').classList.toggle('is-visible', window.scrollY > 300);
      if (scrollProgress) {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.transform = `scaleX(${scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0})`;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const sections = [...document.querySelectorAll('[data-nav-section]')];
    const navLinks = [...document.querySelectorAll('[data-nav]')];
    const setActiveNav = (key) => navLinks.forEach((link) => link.classList.toggle('active', link.dataset.nav === key));
    const navObserver = new IntersectionObserver((entries) => {
      const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (active) setActiveNav(active.target.dataset.navSection);
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0.01, .25, .5] });
    sections.forEach((section) => navObserver.observe(section));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: .1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.card-grid .reveal, .why-grid .reveal').forEach((item, index) => item.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`));
    document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

    function initialisePanel(button, open) {
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      button.setAttribute('aria-expanded', String(open));
      panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '0px';
    }
    document.querySelectorAll('[data-accordion]').forEach((accordion) => {
      const buttons = [...accordion.querySelectorAll('.accordion-button')];
      buttons.forEach((button) => {
        initialisePanel(button, button.getAttribute('aria-expanded') === 'true');
        button.addEventListener('click', () => {
          const shouldOpen = button.getAttribute('aria-expanded') !== 'true';
          buttons.forEach((other) => initialisePanel(other, other === button && shouldOpen));
        });
      });
    });
    window.addEventListener('resize', () => document.querySelectorAll('.accordion-button[aria-expanded="true"]').forEach((button) => initialisePanel(button, true)));

    const statsGrid = document.getElementById('stats-grid');
    let countersStarted = false;
    function animateCounter(element) {
      const target = Number(element.dataset.target);
      const suffix = element.dataset.suffix || '';
      const duration = 1350;
      const start = performance.now();
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.floor(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
    const statsObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting) && !countersStarted) {
        countersStarted = true;
        statsGrid.querySelectorAll('.stat-number').forEach(animateCounter);
        observer.disconnect();
      }
    }, { threshold: .35 });
    statsObserver.observe(statsGrid);

    const carousel = document.querySelector('.carousel');
    const track = carousel.querySelector('.carousel-track');
    const slides = [...carousel.querySelectorAll('.testimonial')];
    const dots = [...carousel.querySelectorAll('[data-carousel-dot]')];
    let currentSlide = 0;
    let autoSlide;
    let startX = null;
    const motionReduced = prefersReducedMotion;
    function showSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, dotIndex) => dot.setAttribute('aria-current', String(dotIndex === currentSlide)));
    }
    function resetAutoSlide() {
      window.clearInterval(autoSlide);
      if (!motionReduced && !document.hidden) autoSlide = window.setInterval(() => showSlide(currentSlide + 1), 4000);
    }
    carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => { showSlide(currentSlide - 1); resetAutoSlide(); });
    carousel.querySelector('[data-carousel-next]').addEventListener('click', () => { showSlide(currentSlide + 1); resetAutoSlide(); });
    dots.forEach((dot) => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.carouselDot)); resetAutoSlide(); }));
    carousel.addEventListener('pointerdown', (event) => { startX = event.clientX; });
    carousel.addEventListener('pointerup', (event) => { if (startX !== null) { const distance = event.clientX - startX; if (Math.abs(distance) > 50) { showSlide(currentSlide + (distance < 0 ? 1 : -1)); resetAutoSlide(); } } startX = null; });
    carousel.addEventListener('pointercancel', () => { startX = null; });
    carousel.addEventListener('mouseenter', () => window.clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', resetAutoSlide);
    carousel.addEventListener('focusin', () => window.clearInterval(autoSlide));
    carousel.addEventListener('focusout', resetAutoSlide);
    document.addEventListener('visibilitychange', resetAutoSlide);
    resetAutoSlide();

    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual && !motionReduced && window.matchMedia('(pointer: fine)').matches) {
      heroVisual.addEventListener('pointermove', (event) => {
        const bounds = heroVisual.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - .5) * 4;
        const y = ((event.clientY - bounds.top) / bounds.height - .5) * -3;
        heroVisual.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`);
        heroVisual.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`);
      });
      heroVisual.addEventListener('pointerleave', () => {
        heroVisual.style.setProperty('--tilt-x', '0deg');
        heroVisual.style.setProperty('--tilt-y', '0deg');
      });
    }
