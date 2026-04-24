/* =========================================================
   teemeup.ai — GSAP animation suite
   Requires: gsap.min.js + ScrollTrigger.min.js (loaded before this)
   ========================================================= */
(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── Easing shorthand ───────────────────────────────── */
  var OUT  = 'power3.out';
  var OUT2 = 'power2.out';
  var BACK = 'back.out(1.4)';

  /* ─────────────────────────────────────────────────────
     1. NAV — slide down on page load
  ───────────────────────────────────────────────────── */
  gsap.from('.nav', {
    y: -60, opacity: 0, duration: 0.7, ease: OUT, clearProps: 'all'
  });
  gsap.from('.nav__list li', {
    y: -16, opacity: 0, duration: 0.45, stagger: 0.07, delay: 0.3, ease: OUT2
  });
  gsap.from('.nav__cta .btn', {
    y: -16, opacity: 0, duration: 0.45, delay: 0.55, ease: OUT2
  });

  /* ─────────────────────────────────────────────────────
     2. HERO — staggered entrance
  ───────────────────────────────────────────────────── */
  gsap.set([
    '.hero__copy .eyebrow',
    '.hero__title',
    '.hero__lede',
    '.hero__actions'
  ], { opacity: 0, y: 32 });
  gsap.set('.hero__chat', { opacity: 0, x: 60 });
  gsap.set('.hero__chat-tag', { opacity: 0, scale: 0.8 });

  var heroTl = gsap.timeline({ defaults: { ease: OUT } });
  heroTl
    .to('.hero__copy .eyebrow',  { opacity: 1, y: 0, duration: 0.55 }, 0.35)
    .to('.hero__title',          { opacity: 1, y: 0, duration: 0.7  }, 0.52)
    .to('.hero__lede',           { opacity: 1, y: 0, duration: 0.6  }, 0.76)
    .to('.hero__actions',        { opacity: 1, y: 0, duration: 0.5  }, 0.94)
    .to('.hero__chat',           { opacity: 1, x: 0, duration: 1.0, ease: 'power2.out' }, 0.6)
    .to('.hero__chat-tag--1',    { opacity: 1, scale: 1, duration: 0.5, ease: BACK }, 1.2)
    .to('.hero__chat-tag--2',    { opacity: 1, scale: 1, duration: 0.5, ease: BACK }, 1.4);

  /* ─────────────────────────────────────────────────────
     3. GENERIC .reveal — ScrollTrigger for all sections
  ───────────────────────────────────────────────────── */
  document.querySelectorAll('.reveal').forEach(function (el) {
    var delay = el.dataset.delay ? parseFloat(el.dataset.delay) * 0.1 : 0;
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: delay,
      ease: OUT2
    });
  });

  /* ─────────────────────────────────────────────────────
     4. FEATURES — coordinated stagger (overrides generic)
  ───────────────────────────────────────────────────── */
  var features = document.querySelectorAll('.features__grid .feature');
  if (features.length) {
    features.forEach(function (el) {
      var st = ScrollTrigger.getById('feature-' + Array.from(features).indexOf(el));
      if (st) st.kill();
    });
    gsap.fromTo(features,
      { opacity: 0, y: 44 },
      {
        scrollTrigger: { trigger: '.features__grid', start: 'top 82%', once: true },
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: OUT2
      }
    );
  }

  /* ─────────────────────────────────────────────────────
     5. HOW IT WORKS — alternating slide from sides
  ───────────────────────────────────────────────────── */
  document.querySelectorAll('.how__step').forEach(function (step, i) {
    var dir = (i % 2 === 0) ? -1 : 1;
    var text   = step.querySelector('.how__step-text');
    var visual = step.querySelector('.how__step-visual');

    if (text) {
      gsap.from(text, {
        scrollTrigger: { trigger: step, start: 'top 83%', once: true },
        opacity: 0, x: dir * 45, duration: 0.75, ease: OUT2
      });
    }
    if (visual) {
      gsap.from(visual, {
        scrollTrigger: { trigger: step, start: 'top 83%', once: true },
        opacity: 0, x: -dir * 45, duration: 0.8, delay: 0.15, ease: OUT2
      });
    }
  });

  /* ─────────────────────────────────────────────────────
     6. SHOWCASE — copy from left, phone from right
  ───────────────────────────────────────────────────── */
  gsap.from('.showcase__copy', {
    scrollTrigger: { trigger: '.showcase__layout', start: 'top 80%', once: true },
    opacity: 0, x: -40, duration: 0.8, ease: OUT2
  });
  gsap.from('.showcase__product', {
    scrollTrigger: { trigger: '.showcase__layout', start: 'top 80%', once: true },
    opacity: 0, x: 40, duration: 0.9, delay: 0.12, ease: OUT2
  });

  /* ─────────────────────────────────────────────────────
     7. FAQ — stagger items
  ───────────────────────────────────────────────────── */
  gsap.from('.faq-item', {
    scrollTrigger: { trigger: '.faq__list', start: 'top 85%', once: true },
    opacity: 0, y: 20, duration: 0.45, stagger: 0.08, ease: OUT2
  });

  /* ─────────────────────────────────────────────────────
     8. CTA — scale + fade up
  ───────────────────────────────────────────────────── */
  gsap.from('.cta__inner > *', {
    scrollTrigger: { trigger: '.cta', start: 'top 80%', once: true },
    opacity: 0, y: 36, scale: 0.97, duration: 0.65, stagger: 0.12, ease: OUT
  });

  /* ─────────────────────────────────────────────────────
     9. FOOTER — gentle fade up
  ───────────────────────────────────────────────────── */
  gsap.from('.footer__inner > *', {
    scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true },
    opacity: 0, y: 24, duration: 0.6, stagger: 0.1, ease: OUT2
  });

  /* ─────────────────────────────────────────────────────
     10. HOVER micro-interactions
  ───────────────────────────────────────────────────── */
  // Feature cards subtle lift on hover (beyond the CSS transform)
  document.querySelectorAll('.feature').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, { y: -6, duration: 0.3, ease: OUT2, overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { y: 0, duration: 0.4, ease: OUT2, overwrite: 'auto' });
    });
  });

  // CTA button pulse on hover
  var ctaBtn = document.querySelector('.cta .btn--green');
  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', function () {
      gsap.to(ctaBtn, { scale: 1.04, duration: 0.25, ease: OUT2 });
    });
    ctaBtn.addEventListener('mouseleave', function () {
      gsap.to(ctaBtn, { scale: 1, duration: 0.3, ease: OUT2 });
    });
  }

})();
