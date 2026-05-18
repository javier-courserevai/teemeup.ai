/* =========================================================
   teemeup.ai — Motion micro-animations
   Requires: window.Motion (motion.dev CDN)
   ========================================================= */
(function () {
  if (typeof window.Motion === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var animate = window.Motion.animate;

  /* ── 1. NAV LINKS — underline slide-in ────────────────── */
  document.querySelectorAll('.nav__link').forEach(function (link) {
    var line = document.createElement('span');
    line.className = 'nav__link-underline';
    link.appendChild(line);

    link.addEventListener('mouseenter', function () {
      animate(line, { scaleX: 1 }, { duration: 0.2, easing: 'ease-out' });
    });
    link.addEventListener('mouseleave', function () {
      animate(line, { scaleX: 0 }, { duration: 0.15, easing: 'ease-in' });
    });
  });

  /* ── 2. PRIMARY BUTTONS — press + hover scale ──────────── */
  document.querySelectorAll('.btn--primary').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      animate(btn, { scale: 1.03 }, { duration: 0.15, easing: [0.22, 0.68, 0, 1.2] });
    });
    btn.addEventListener('mouseleave', function () {
      animate(btn, { scale: 1 }, { duration: 0.2, easing: 'ease-out' });
    });
    btn.addEventListener('mousedown', function () {
      animate(btn, { scale: 0.97 }, { duration: 0.08, easing: 'ease-out' });
    });
    btn.addEventListener('mouseup', function () {
      animate(btn, { scale: 1.02 }, { duration: 0.12, easing: 'ease-out' });
    });
  });

  /* ── 3. OUTLINE / GHOST BUTTONS ──────────────────────── */
  document.querySelectorAll('.btn--outline, .btn--ghost-light, .btn--white').forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      animate(btn, { scale: 1.025 }, { duration: 0.15, easing: 'ease-out' });
    });
    btn.addEventListener('mouseleave', function () {
      animate(btn, { scale: 1 }, { duration: 0.2, easing: 'ease-out' });
    });
  });

  /* ── 4. HOW-IT-WORKS STEPS — lift on hover ────────────── */
  document.querySelectorAll('.how__step').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      animate(card, { y: -6 }, { duration: 0.28, easing: [0.22, 0.68, 0, 1.2] });
    });
    card.addEventListener('mouseleave', function () {
      animate(card, { y: 0 }, { duration: 0.3, easing: 'ease-out' });
    });
  });

  /* ── 5. BENTO FEATURE CARDS — gentle float ───────────── */
  document.querySelectorAll('.feature-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      animate(card, { y: -4 }, { duration: 0.22, easing: [0.22, 0.68, 0, 1.2] });
    });
    card.addEventListener('mouseleave', function () {
      animate(card, { y: 0 }, { duration: 0.25, easing: 'ease-out' });
    });
  });

  /* ── 6. ECOSYSTEM CARDS — lift with purple tint ─────── */
  document.querySelectorAll('.ecosystem__card:not(.ecosystem__card--featured)').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      animate(card, { y: -5 }, { duration: 0.25, easing: [0.22, 0.68, 0, 1.2] });
    });
    card.addEventListener('mouseleave', function () {
      animate(card, { y: 0 }, { duration: 0.28, easing: 'ease-out' });
    });
  });

  /* ── 7. HERO CTA — recurring shimmer sweep ───────────── */
  var heroCta = document.querySelector('.hero .btn--white, .hero .btn--primary');
  if (heroCta) {
    heroCta.style.position = 'relative';
    heroCta.style.overflow = 'hidden';
    var shimmer = document.createElement('span');
    shimmer.style.cssText = [
      'position:absolute',
      'inset:0',
      'background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.22) 50%,transparent 60%)',
      'transform:translateX(-100%)',
      'pointer-events:none',
      'border-radius:inherit'
    ].join(';');
    heroCta.appendChild(shimmer);

    function runShimmer() {
      animate(shimmer, { x: ['−100%', '200%'] }, { duration: 0.9, easing: 'ease-in-out' })
        .then(function () { return new Promise(function (r) { setTimeout(r, 3200); }); })
        .then(runShimmer);
    }
    setTimeout(runShimmer, 1800);
  }

  /* ── 8. PLATFORM CARDS — subtle tilt on hover ─────────── */
  document.querySelectorAll('.platform-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      animate(card, { y: -3, scale: 1.02 }, { duration: 0.2, easing: 'ease-out' });
    });
    card.addEventListener('mouseleave', function () {
      animate(card, { y: 0, scale: 1 }, { duration: 0.22, easing: 'ease-out' });
    });
  });

  /* ── 9. FAQ ITEMS — icon rotation ────────────────────── */
  document.querySelectorAll('.faq-item__q').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var icon = trigger.querySelector('.faq-item__icon');
      if (!icon) return;
      var isOpen = trigger.closest('.faq-item').classList.contains('open');
      animate(icon, { rotate: isOpen ? 45 : 0 }, { duration: 0.2, easing: 'ease-out' });
    });
  });

})();
