/* =========================================================
   teemeup.ai — app.js
   Nav, drawer, smooth scroll, FAQ accordion,
   sticky feature tabs scroll driver
   ========================================================= */
(function () {
  'use strict';

  /* ── Nav "Get the App" links: route straight to the right store ──
     Any [data-store-link] element (mobile nav button + drawer item)
     gets its href rewritten to the visitor's platform store — App
     Store on iOS, Google Play on Android. Desktop/unknown UAs keep
     the plain /app fallback already in the markup, and the mobile
     nav button itself is CSS-hidden on desktop regardless. ────── */
  var storeLinks = document.querySelectorAll('[data-store-link]');
  if (storeLinks.length) {
    var ua = window.navigator.userAgent || window.navigator.vendor || '';
    var isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    var isAndroid = /Android/.test(ua);
    var storeUrl = isIOS
      ? 'https://apps.apple.com/us/app/teemeup-golf-tee-times/id6763700956'
      : isAndroid
      ? 'https://play.google.com/store/apps/details?id=com.teemeupai'
      : null;
    if (storeUrl) {
      storeLinks.forEach(function (a) {
        a.href = storeUrl;
        a.target = '_blank';
        a.rel = 'noopener';
      });
    }
  }

  /* ── Smooth anchor scroll ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = 72;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
      var drawer = document.getElementById('nav-drawer');
      if (drawer) drawer.classList.remove('is-open');
    });
  });

  /* ── Nav scroll state ─────────────────────────────────── */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav drawer ────────────────────────────────── */
  var burger = document.getElementById('nav-burger');
  var drawer = document.getElementById('nav-drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      drawer.classList.toggle('is-open');
    });
  }

  /* ── FAQ accordion ────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-item__q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(function (o) {
        o.classList.remove('is-open');
      });
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* ── Sticky features: IntersectionObserver ────────────── */
  var featItems = document.querySelectorAll('.features__item');
  var featImg   = document.getElementById('feat-img');
  var featGlow  = document.getElementById('feat-glow');

  if (featItems.length && featImg) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Deactivate all
          featItems.forEach(function (el) { el.classList.remove('is-active'); });
          // Activate this one
          entry.target.classList.add('is-active');
          // Swap image
          var imgSrc  = entry.target.getAttribute('data-feat-img');
          var glowType = entry.target.getAttribute('data-feat-glow');
          if (imgSrc && imgSrc !== featImg.getAttribute('src')) {
            featImg.classList.remove('is-visible');
            featImg.classList.add('is-hidden');
            setTimeout(function () {
              featImg.setAttribute('src', imgSrc);
              featImg.classList.remove('is-hidden');
              featImg.classList.add('is-visible');
            }, 250);
          }
          // Swap glow colour
          if (featGlow) {
            featGlow.className = 'features__phone-glow features__phone-glow--' + (glowType || 'purple');
          }
        }
      });
    }, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    });
    featItems.forEach(function (el) { observer.observe(el); });
  }

  /* Scroll reveal is handled entirely by GSAP in animations.js */

})();
