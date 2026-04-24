/* VideoClip landing — micro-interactions */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll progress bar
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      progress.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const onH = () => {
      if (window.scrollY > 12) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onH, { passive: true });
    onH();
  }

  // IntersectionObserver fade-in
  if (!reduced) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('[data-animate], .hero h1 .line').forEach((el) => io.observe(el));

    // Hero heading — stagger lines already triggered via .in
  } else {
    document.querySelectorAll('[data-animate], .hero h1 .line').forEach((el) => el.classList.add('in'));
  }

  // Counter animation for stats
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduced) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseFloat(el.dataset.count);
          const duration = 1400;
          const start = performance.now();
          const from = 0;
          el.textContent = '0';
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const v = from + (target - from) * eased;
            el.textContent = Number.isInteger(target) ? Math.round(v) : v.toFixed(1);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          co.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => co.observe(c));
  }

  // Smooth scroll to anchor (offset for fixed header)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
      history.pushState(null, '', id);
    });
  });

  // Current year in footer
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Language switch (click to toggle on touch; hover also works via CSS)
  const langSwitch = document.querySelector('.lang-switch');
  if (langSwitch) {
    const toggle = langSwitch.querySelector('.lang-toggle');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = langSwitch.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
      if (!langSwitch.contains(e.target)) {
        langSwitch.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
