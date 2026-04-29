/* =========================================================
   teemeup.ai — GSAP animation suite  (Apple-style edition)
   Requires: gsap.min.js + ScrollTrigger.min.js (loaded before this)
   ========================================================= */
(function () {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── Easing shorthand ───────────────────────────────── */
  var OUT  = 'power3.out';
  var OUT2 = 'power2.out';
  var BACK = 'back.out(1.4)';
  var EXPO = 'expo.out';

  /* ─────────────────────────────────────────────────────
     UTILITY: split an element's text into per-word spans
     Returns the array of inner .gsap-word spans
  ───────────────────────────────────────────────────── */
  function splitWords(el) {
    if (!el) return [];
    // Preserve child tags (spans like #hero-headline-part-1) but split text nodes
    var words = [];
    // Snapshot childNodes — we mutate the live list during iteration
    Array.from(el.childNodes).forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.textContent;
        var parts = text.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function (part) {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else if (part.length) {
            var wrap = document.createElement('span');
            wrap.className = 'gsap-word-wrap';
            var inner = document.createElement('span');
            inner.className = 'gsap-word';
            inner.textContent = part;
            wrap.appendChild(inner);
            frag.appendChild(wrap);
            words.push(inner);
          }
        });
        el.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Wrap the whole child element as one "word".
        // Move the original node (not a clone) so getElementById refs stay valid.
        var wrap2 = document.createElement('span');
        wrap2.className = 'gsap-word-wrap';
        var inner2 = document.createElement('span');
        inner2.className = 'gsap-word';
        wrap2.appendChild(inner2);
        el.insertBefore(wrap2, node);  // insert wrapper before the node…
        inner2.appendChild(node);       // …then move node into the inner span
        words.push(inner2);
      }
    });
    return words;
  }

  /* ─────────────────────────────────────────────────────
     1. NAV — slide down on page load
  ───────────────────────────────────────────────────── */
  gsap.from('.nav', {
    y: -70, opacity: 0, duration: 0.9, ease: EXPO, clearProps: 'all'
  });
  gsap.from('.nav__list li', {
    y: -18, opacity: 0, duration: 0.5, stagger: 0.07, delay: 0.35, ease: OUT2
  });
  gsap.from('.nav__cta .btn', {
    y: -18, opacity: 0, duration: 0.5, delay: 0.6, ease: OUT2, clearProps: 'all'
  });

  /* ─────────────────────────────────────────────────────
     2. HERO — Apple-style word-by-word title clip reveal
        + staggered copy entrance + phone slide-in
  ───────────────────────────────────────────────────── */

  // 2a. Word-split the hero title
  var heroTitle = document.querySelector('.hero__title');
  var wordSpans = heroTitle ? splitWords(heroTitle) : [];

  // 2b. Set initial states
  gsap.set('.hero__copy .eyebrow', { opacity: 0, y: 28 });
  gsap.set(wordSpans, { y: '110%' });               // words clip upward
  gsap.set('.hero__lede',    { opacity: 0, y: 32 });
  gsap.set('.hero__actions', { opacity: 0, y: 28 });
  gsap.set('.hero__chat',    { opacity: 0, x: 72, rotateY: 8 });
  gsap.set('.hero__chat-tag', { opacity: 0, scale: 0.7 });

  // 2c. Timeline
  var heroTl = gsap.timeline({ defaults: { ease: OUT } });
  heroTl
    .to('.hero__copy .eyebrow', { opacity: 1, y: 0, duration: 0.55 }, 0.3)
    .to(wordSpans, {
        y: '0%',
        duration: 0.75,
        stagger: 0.055,
        ease: EXPO
      }, 0.52)
    .to('.hero__lede',    { opacity: 1, y: 0, duration: 0.65 }, 0.82)
    .to('.hero__actions', { opacity: 1, y: 0, duration: 0.55 }, 1.0)
    .to('.hero__chat',    { opacity: 1, x: 0, rotateY: 0, duration: 1.1, ease: 'power2.out' }, 0.55)
    .to('.hero__chat-tag--1', { opacity: 1, scale: 1, duration: 0.5, ease: BACK }, 1.25)
    .to('.hero__chat-tag--2', { opacity: 1, scale: 1, duration: 0.5, ease: BACK }, 1.45);

  /* ─────────────────────────────────────────────────────
     3. HERO — parallax scrub as you scroll out of section
        Copy moves up faster than phone (depth illusion)
  ───────────────────────────────────────────────────── */
  var mm = gsap.matchMedia();

  mm.add('(min-width: 881px)', function () {
    // Hero copy scrolls up (faster)
    gsap.to('.hero__copy', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      y: -110,
      opacity: 0,
      ease: 'none'
    });

    // Hero phone parallax (slower — creates depth)
    gsap.to('.hero__chat', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.6
      },
      y: -55,
      ease: 'none'
    });
  });

  /* ─────────────────────────────────────────────────────
     4. FEATURES — scrub-linked entrance stagger
        Cards rise in as you scroll into the grid
  ───────────────────────────────────────────────────── */
  var featureHead = document.querySelector('.features__head');
  if (featureHead) {
    gsap.from('.features__head .eyebrow', {
      scrollTrigger: { trigger: featureHead, start: 'top 84%', once: true },
      opacity: 0, y: 24, duration: 0.55, ease: OUT2
    });
    gsap.from('.features__head .section-title', {
      scrollTrigger: { trigger: featureHead, start: 'top 84%', once: true },
      opacity: 0, y: 28, duration: 0.7, delay: 0.1, ease: EXPO
    });
    gsap.from('.features__head .section-lede', {
      scrollTrigger: { trigger: featureHead, start: 'top 84%', once: true },
      opacity: 0, y: 22, duration: 0.6, delay: 0.22, ease: OUT2
    });
  }

  var features = document.querySelectorAll('.features__grid .feature');
  if (features.length) {
    gsap.fromTo(features,
      { opacity: 0, y: 60, scale: 0.96 },
      {
        scrollTrigger: {
          trigger: '.features__grid',
          start: 'top 82%',
          once: true
        },
        opacity: 1, y: 0, scale: 1,
        duration: 0.75, stagger: 0.12, ease: OUT2
      }
    );
  }

  /* ─────────────────────────────────────────────────────
     5. HOW IT WORKS — alternating slide from sides
        with a subtle scrub so it feels physical
  ───────────────────────────────────────────────────── */
  document.querySelectorAll('.how__step').forEach(function (step, i) {
    var dir  = (i % 2 === 0) ? -1 : 1;
    var text = step.querySelector('.how__step-text');
    var vis  = step.querySelector('.how__step-visual');

    if (text) {
      gsap.from(text, {
        scrollTrigger: { trigger: step, start: 'top 85%', once: true },
        opacity: 0, x: dir * 55, duration: 0.85, ease: EXPO
      });
    }
    if (vis) {
      gsap.from(vis, {
        scrollTrigger: { trigger: step, start: 'top 85%', once: true },
        opacity: 0, x: -dir * 55, duration: 0.95, delay: 0.12, ease: EXPO
      });
    }
  });

  /* ─────────────────────────────────────────────────────
     6. SHOWCASE — copy from left, phone from right
        Then scroll-driven tab switching (Apple feature-list style)
  ───────────────────────────────────────────────────── */
  gsap.from('.showcase__copy', {
    scrollTrigger: { trigger: '.showcase__layout', start: 'top 80%', once: true },
    opacity: 0, x: -50, duration: 0.9, ease: EXPO
  });
  gsap.from('.showcase__product', {
    scrollTrigger: { trigger: '.showcase__layout', start: 'top 80%', once: true },
    opacity: 0, x: 50, duration: 1.0, delay: 0.12, ease: EXPO
  });

  /* Tab clicks are handled by app.js — no scroll-driven override needed. */

  /* ─────────────────────────────────────────────────────
     7. FAQ — stagger with a little height-reveal feel
  ───────────────────────────────────────────────────── */
  gsap.from('.faq-item', {
    scrollTrigger: { trigger: '.faq__list', start: 'top 86%', once: true },
    opacity: 0, y: 28, duration: 0.5, stagger: 0.09, ease: OUT2
  });

  /* ─────────────────────────────────────────────────────
     8. CTA — zoom + rise (Apple product announcement feel)
  ───────────────────────────────────────────────────── */
  gsap.fromTo('.cta__inner',
    { opacity: 0, scale: 0.91, y: 50 },
    {
      scrollTrigger: { trigger: '.cta', start: 'top 78%', once: true },
      opacity: 1, scale: 1, y: 0, duration: 1.0, ease: EXPO
    }
  );
  gsap.from('.cta__inner > *', {
    scrollTrigger: { trigger: '.cta', start: 'top 78%', once: true },
    opacity: 0, y: 30, duration: 0.7, stagger: 0.14, ease: OUT2,
    delay: 0.2
  });

  /* ─────────────────────────────────────────────────────
     9. FOOTER — gentle fade up
  ───────────────────────────────────────────────────── */
  gsap.from('.footer__inner > *', {
    scrollTrigger: { trigger: '.footer', start: 'top 92%', once: true },
    opacity: 0, y: 22, duration: 0.6, stagger: 0.1, ease: OUT2
  });

  /* ─────────────────────────────────────────────────────
     10. GENERIC .reveal fallback
         (sections that don't have bespoke animations above)
  ───────────────────────────────────────────────────── */
  document.querySelectorAll('.reveal').forEach(function (el) {
    // skip elements already handled above
    if (el.closest('.features__head') || el.closest('.features__grid')) return;
    var delay = el.dataset.delay ? parseFloat(el.dataset.delay) * 0.1 : 0;
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      opacity: 1, y: 0, duration: 0.7, delay: delay, ease: OUT2
    });
  });

  /* ─────────────────────────────────────────────────────
     11. HOVER micro-interactions
  ───────────────────────────────────────────────────── */
  document.querySelectorAll('.feature').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      gsap.to(card, { y: -8, scale: 1.02, duration: 0.35, ease: OUT2, overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', function () {
      gsap.to(card, { y: 0, scale: 1, duration: 0.45, ease: OUT2, overwrite: 'auto' });
    });
  });

  // Nav CTA pulse
  var navCtaBtn = document.querySelector('.nav__cta .btn--primary');
  if (navCtaBtn) {
    navCtaBtn.addEventListener('mouseenter', function () {
      gsap.to(navCtaBtn, { scale: 1.05, duration: 0.22, ease: OUT2 });
    });
    navCtaBtn.addEventListener('mouseleave', function () {
      gsap.to(navCtaBtn, { scale: 1, duration: 0.28, ease: OUT2 });
    });
  }

  // Hero CTA button magnetic-style hover
  var heroBtn = document.querySelector('.hero__actions .btn--primary');
  if (heroBtn) {
    heroBtn.addEventListener('mouseenter', function () {
      gsap.to(heroBtn, { scale: 1.06, duration: 0.28, ease: BACK });
    });
    heroBtn.addEventListener('mouseleave', function () {
      gsap.to(heroBtn, { scale: 1, duration: 0.35, ease: OUT2 });
    });
  }

  // Big CTA section button
  var ctaBtn = document.querySelector('.cta .btn--green, .cta .btn--primary');
  if (ctaBtn) {
    ctaBtn.addEventListener('mouseenter', function () {
      gsap.to(ctaBtn, { scale: 1.05, duration: 0.25, ease: OUT2 });
    });
    ctaBtn.addEventListener('mouseleave', function () {
      gsap.to(ctaBtn, { scale: 1, duration: 0.3, ease: OUT2 });
    });
  }

  /* ─────────────────────────────────────────────────────
     12. SECTION HEADING reveals — word split for key sections
  ───────────────────────────────────────────────────── */
  ['.how__head .section-title', '.showcase__head .section-title', '.faq__head .section-title']
    .forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      var ws = splitWords(el);
      gsap.set(ws, { y: '105%' });
      gsap.to(ws, {
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        y: '0%',
        duration: 0.7,
        stagger: 0.045,
        ease: EXPO
      });
    });

})();
