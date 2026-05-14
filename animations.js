/* =========================================================
   teemeup.ai — GSAP animation suite (redesign)
   Requires: gsap.min.js + ScrollTrigger.min.js
   ========================================================= */
(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  var OUT  = 'power3.out';
  var OUT2 = 'power2.out';
  var EXPO = 'expo.out';

  /* ─── 1. NAV ─────────────────────────────────────────── */
  gsap.from('.nav', { y: -70, opacity: 0, duration: 0.9, ease: EXPO, clearProps: 'all' });
  gsap.from('.nav__list li', { y: -16, opacity: 0, duration: 0.5, stagger: 0.07, delay: 0.3, ease: OUT2 });
  gsap.from('.nav__cta .btn', { y: -16, opacity: 0, duration: 0.5, delay: 0.55, ease: OUT2, clearProps: 'all' });

  /* ─── 2. HERO ────────────────────────────────────────── */
  gsap.set('.hero__badge',         { opacity: 0, y: 20 });
  gsap.set('.hero__title',         { opacity: 0, y: 40 });
  gsap.set('.hero__lede',          { opacity: 0, y: 28 });
  gsap.set('.hero__actions',       { opacity: 0, y: 24 });
  gsap.set('.hero__social',        { opacity: 0, y: 20 });
  gsap.set('.hero__mockup',        { opacity: 0, x: 60, scale: 0.96 });
  gsap.set('.hero__float--voice',  { opacity: 0, x: -28, y: 12 });
  gsap.set('.hero__float--chat',   { opacity: 0, x: 28,  y: 12 });

  var heroTl = gsap.timeline({ defaults: { ease: OUT } });
  heroTl
    .to('.hero__badge',        { opacity: 1, y: 0, duration: 0.55 }, 0.20)
    .to('.hero__title',        { opacity: 1, y: 0, duration: 0.80, ease: EXPO }, 0.35)
    .to('.hero__lede',         { opacity: 1, y: 0, duration: 0.60 }, 0.62)
    .to('.hero__actions',      { opacity: 1, y: 0, duration: 0.55 }, 0.78)
    .to('.hero__social',       { opacity: 1, y: 0, duration: 0.50 }, 0.90)
    .to('.hero__mockup',       { opacity: 1, x: 0, scale: 1, duration: 0.95, ease: EXPO }, 0.30)
    .to('.hero__float--voice', { opacity: 1, x: 0, y: 0, duration: 0.75, ease: EXPO }, 0.72)
    .to('.hero__float--chat',  { opacity: 1, x: 0, y: 0, duration: 0.75, ease: EXPO }, 0.84);

  /* Hero stats bar */
  gsap.from('.hero__stat', {
    scrollTrigger: { trigger: '.hero__stats', start: 'top 90%', once: true },
    opacity: 0, y: 18, duration: 0.5, stagger: 0.1, ease: OUT2
  });

  /* ─── 4. FEATURES ────────────────────────────────────── */
  gsap.from('.features__head .eyebrow', {
    scrollTrigger: { trigger: '.features__head', start: 'top 85%', once: true },
    opacity: 0, y: 20, duration: 0.5, ease: OUT2
  });
  gsap.from('.features__head .section-title', {
    scrollTrigger: { trigger: '.features__head', start: 'top 85%', once: true },
    opacity: 0, y: 28, duration: 0.7, delay: 0.1, ease: EXPO
  });
  gsap.from('.features__head .section-lede', {
    scrollTrigger: { trigger: '.features__head', start: 'top 85%', once: true },
    opacity: 0, y: 20, duration: 0.6, delay: 0.22, ease: OUT2
  });

  document.querySelectorAll('.feature-block').forEach(function (block) {
    var isReverse = block.classList.contains('feature-block--reverse');
    var visual = block.querySelector('.feature-block__visual');
    var copy   = block.querySelector('.feature-block__copy');
    gsap.from(copy, {
      scrollTrigger: { trigger: block, start: 'top 82%', once: true },
      opacity: 0, x: isReverse ? 50 : -50, duration: 0.85, ease: EXPO
    });
    if (visual) {
      gsap.from(visual, {
        scrollTrigger: { trigger: block, start: 'top 82%', once: true },
        opacity: 0, x: isReverse ? -50 : 50, duration: 0.95, delay: 0.1, ease: EXPO
      });
    }
  });

  gsap.from('.feature-card', {
    scrollTrigger: { trigger: '.features__grid', start: 'top 85%', once: true },
    opacity: 0, y: 40, scale: 0.96, duration: 0.65, stagger: 0.1, ease: OUT2
  });

  /* ─── 5. STATS ───────────────────────────────────────── */
  gsap.from('.stats__copy > *', {
    scrollTrigger: { trigger: '.stats', start: 'top 80%', once: true },
    opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: OUT2
  });
  gsap.from('.stats__item', {
    scrollTrigger: { trigger: '.stats__grid', start: 'top 82%', once: true },
    opacity: 0, y: 30, scale: 0.96, duration: 0.65, stagger: 0.12, ease: EXPO
  });

  /* ─── 6. HOW IT WORKS ────────────────────────────────── */
  gsap.from('.how__head > *', {
    scrollTrigger: { trigger: '.how__head', start: 'top 85%', once: true },
    opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: OUT2
  });
  document.querySelectorAll('.how__step').forEach(function (step) {
    gsap.from(step, {
      scrollTrigger: { trigger: step, start: 'top 86%', once: true },
      opacity: 0, y: 40, duration: 0.75, ease: EXPO
    });
  });

  /* ─── 7. TESTIMONIALS ───────────────────────────────── */
  gsap.from('.testimonials__head > *', {
    scrollTrigger: { trigger: '.testimonials__head', start: 'top 85%', once: true },
    opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: OUT2
  });
  gsap.from('.testimonial-card', {
    scrollTrigger: { trigger: '.testimonials__grid', start: 'top 84%', once: true },
    opacity: 0, y: 40, scale: 0.97, duration: 0.7, stagger: 0.12, ease: EXPO
  });

  /* ─── 8. SHOWCASE ───────────────────────────────────── */
  gsap.from('.showcase__head > *', {
    scrollTrigger: { trigger: '.showcase__head', start: 'top 85%', once: true },
    opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: OUT2
  });
  gsap.from('.showcase__screen-item', {
    scrollTrigger: { trigger: '.showcase__screens', start: 'top 82%', once: true },
    opacity: 0, y: 50, duration: 0.8, stagger: 0.14, ease: EXPO
  });

  /* ─── 8. FAQ ─────────────────────────────────────────── */
  gsap.from('.faq__head > *', {
    scrollTrigger: { trigger: '.faq__head', start: 'top 85%', once: true },
    opacity: 0, y: 20, duration: 0.55, stagger: 0.1, ease: OUT2
  });
  gsap.from('.faq-item', {
    scrollTrigger: { trigger: '.faq__list', start: 'top 86%', once: true },
    opacity: 0, y: 22, duration: 0.5, stagger: 0.08, ease: OUT2
  });

  /* ─── 9. CTA ─────────────────────────────────────────── */
  gsap.from('.cta__content > *', {
    scrollTrigger: { trigger: '.cta', start: 'top 78%', once: true },
    opacity: 0, y: 30, duration: 0.7, stagger: 0.13, ease: OUT2
  });

  /* ─── 10. FOOTER ─────────────────────────────────────── */
  gsap.from('.footer__inner > *', {
    scrollTrigger: { trigger: '.footer', start: 'top 92%', once: true },
    opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: OUT2
  });

  /* ─── 11. HERO PARALLAX (desktop only) ──────────────── */
  gsap.matchMedia().add('(min-width: 881px)', function () {
    gsap.to('.hero__content', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
      y: -70, opacity: 0, ease: 'none'
    });
    gsap.to('.hero__visual', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.8 },
      y: -30, ease: 'none'
    });
  });

  /* ─── 12. HOVER micro-interactions ──────────────────── */
  document.querySelectorAll('.feature-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, { y: -6, scale: 1.02, duration: 0.3, ease: OUT2, overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { y: 0, scale: 1, duration: 0.4, ease: OUT2, overwrite: 'auto' });
    });
  });

  document.querySelectorAll('.btn--primary').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      gsap.to(btn, { scale: 1.05, duration: 0.22, ease: OUT2 });
    });
    btn.addEventListener('mouseleave', function () {
      gsap.to(btn, { scale: 1, duration: 0.28, ease: OUT2 });
    });
  });

  document.querySelectorAll('.stats__item').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      gsap.to(item, { y: -4, duration: 0.3, ease: OUT2, overwrite: 'auto' });
    });
    item.addEventListener('mouseleave', function () {
      gsap.to(item, { y: 0, duration: 0.35, ease: OUT2, overwrite: 'auto' });
    });
  });

})();
