/* =========================================================
   teemeup.ai — animations.js
   GSAP + ScrollTrigger entrance animations (rebuild 2)
   ========================================================= */
(function () {
  if (typeof gsap === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);

  var OUT  = 'power3.out';
  var OUT2 = 'power2.out';
  var EXPO = 'expo.out';

  /* ── HERO ─────────────────────────────────────────────── */
  gsap.from('.hero__badge',  { y: 20, opacity: 0, duration: 0.6, delay: 0.15, ease: OUT2 });
  gsap.from('.hero__title-line',     { y: 60, opacity: 0, duration: 0.9, stagger: 0.13, delay: 0.25, ease: EXPO });
  gsap.from('.hero__desc',   { y: 24, opacity: 0, duration: 0.8, delay: 0.6, ease: OUT2 });
  gsap.from('.hero__actions',{ y: 20, opacity: 0, duration: 0.7, delay: 0.75, ease: OUT2 });
  gsap.from('.hero__social-proof', { y: 16, opacity: 0, duration: 0.6, delay: 0.88, ease: OUT2 });
  gsap.from('.hero__phone',  { y: 40, opacity: 0, scale: 0.95, duration: 1.1, delay: 0.35, ease: EXPO });
  gsap.from('.hero__float--voice', { x: -28, opacity: 0, duration: 0.8, delay: 0.85, ease: EXPO });
  gsap.from('.hero__float--chat',  { x: 28,  opacity: 0, duration: 0.8, delay: 1.0,  ease: EXPO });

  /* Hero parallax */
  gsap.matchMedia().add('(min-width: 881px)', function () {
    gsap.to('.hero__content', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
      y: -60, opacity: 0.2, ease: 'none'
    });
    gsap.to('.hero__visual', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.8 },
      y: -30, ease: 'none'
    });
  });

  /* ── 3D tilt on phone (mouse) ────────────────────────── */
  var heroVisual = document.getElementById('hero-visual');
  if (heroVisual) {
    document.addEventListener('mousemove', function (e) {
      var rect = heroVisual.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var rx = (e.clientY - cy) / window.innerHeight * 10;
      var ry = (e.clientX - cx) / window.innerWidth * -10;
      gsap.to(heroVisual, { rotateX: rx, rotateY: ry, transformPerspective: 900, ease: OUT2, duration: 0.6 });
    });
    document.addEventListener('mouseleave', function () {
      gsap.to(heroVisual, { rotateX: 0, rotateY: 0, duration: 1, ease: OUT2 });
    });
  }

  /* ── Generic section heading reveal ─────────────────────
     Targets eyebrow / s-title / s-lede in each section head */
  function animHead(parentSelector) {
    var parent = document.querySelector(parentSelector);
    if (!parent) return;
    ScrollTrigger.create({
      trigger: parent,
      start: 'top 85%',
      onEnter: function () {
        gsap.from(parent.querySelectorAll('.eyebrow, .s-title, .s-lede'), {
          y: 28, opacity: 0, duration: 0.75, stagger: 0.12, ease: EXPO
        });
      },
      once: true
    });
  }
  animHead('.features__head');
  animHead('.how__head');
  animHead('.founding__head');
  animHead('.ecosystem__head');
  animHead('.platforms__head');
  animHead('.faq__head');

  /* ── FEATURES sticky panel ───────────────────────────── */
  ScrollTrigger.create({
    trigger: '.features__showcase',
    start: 'top 72%',
    onEnter: function () {
      gsap.from('.features__sticky', { x: -32, opacity: 0, duration: 0.9, ease: EXPO });
    },
    once: true
  });
  /* Note: .features__item opacity is controlled by tab-state CSS (.is-active)
     — no GSAP override here to avoid conflicts */

  /* ── FEATURE EXTRA: window cards + tiles ─────────────── */
  ScrollTrigger.batch('.fex-win', {
    start: 'top 86%',
    onEnter: function (els) {
      gsap.from(els, { y: 32, opacity: 0, duration: 0.75, stagger: 0.12, ease: EXPO });
    },
    once: true
  });
  ScrollTrigger.batch('.fex-tile', {
    start: 'top 88%',
    onEnter: function (els) {
      gsap.from(els, { y: 20, opacity: 0, duration: 0.55, stagger: 0.07, ease: OUT2 });
    },
    once: true
  });

  /* ── HOW cards: sticky stack + scale-back ────────────── */
  var howCards = document.querySelectorAll('.how-card');
  howCards.forEach(function (card, i) {
    /* Scale back as the NEXT card scrolls over this one */
    if (i < howCards.length - 1) {
      var nextCard = howCards[i + 1];
      gsap.to(card, {
        scrollTrigger: {
          trigger: nextCard,
          start: 'top 90%',
          end: 'top top+=108',
          scrub: 0.6,
        },
        scale: 0.95,
        ease: 'none',
      });
    }
  });

  /* ── STATS copy + cards ──────────────────────────────── */
  ScrollTrigger.create({
    trigger: '.stats__copy', start: 'top 85%',
    onEnter: function () {
      gsap.from('.stats__copy > *', { y: 28, opacity: 0, duration: 0.75, stagger: 0.1, ease: OUT2 });
    },
    once: true
  });
  ScrollTrigger.batch('.stats__card', {
    start: 'top 85%',
    onEnter: function (els) {
      gsap.from(els, { y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: OUT2 });
    },
    once: true
  });

  /* ── FOUNDING cards ──────────────────────────────────── */
  ScrollTrigger.batch('.founding-card', {
    start: 'top 86%',
    onEnter: function (els) {
      gsap.from(els, { y: 32, opacity: 0, duration: 0.75, stagger: 0.12, ease: EXPO });
    },
    once: true
  });

  /* ── ECOSYSTEM cards ─────────────────────────────────── */
  ScrollTrigger.batch('.eco-card', {
    start: 'top 86%',
    onEnter: function (els) {
      gsap.from(els, { y: 32, opacity: 0, duration: 0.75, stagger: 0.12, ease: EXPO });
    },
    once: true
  });

  /* ── PLATFORMS chips ─────────────────────────────────── */
  ScrollTrigger.batch('.platform-chip', {
    start: 'top 88%',
    onEnter: function (els) {
      gsap.from(els, { scale: 0.88, opacity: 0, duration: 0.45, stagger: 0.07, ease: 'back.out(1.6)' });
    },
    once: true
  });

  /* ── FAQ items ───────────────────────────────────────── */
  ScrollTrigger.batch('.faq-item', {
    start: 'top 88%',
    onEnter: function (els) {
      gsap.from(els, { opacity: 0, y: 18, duration: 0.5, stagger: 0.06, ease: OUT2 });
    },
    once: true
  });

  /* ── CTA section ─────────────────────────────────────── */
  ScrollTrigger.create({
    trigger: '.cta-section',
    start: 'top 78%',
    onEnter: function () {
      gsap.from('.cta-section__inner > *', { y: 36, opacity: 0, duration: 0.8, stagger: 0.1, ease: EXPO });
    },
    once: true
  });

  /* ── Magnetic buttons ─────────────────────────────────── */
  document.querySelectorAll('.btn--primary').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = (e.clientX - rect.left - rect.width  / 2) * 0.22;
      var y = (e.clientY - rect.top  - rect.height / 2) * 0.22;
      gsap.to(btn, { x: x, y: y, duration: 0.3, ease: OUT2 });
    });
    btn.addEventListener('mouseleave', function () {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.4)' });
    });
  });

  /* ── Card hover lifts ─────────────────────────────────── */
  document.querySelectorAll('.bento-card, .eco-card, .founding-card, .how__step').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, { y: -5, duration: 0.25, ease: OUT2, overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { y: 0, duration: 0.35, ease: OUT2, overwrite: 'auto' });
    });
  });

})();
