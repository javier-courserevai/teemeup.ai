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
     Store on iOS, Google Play on Android.

     Visibility and redirect are decided by the SAME check, so the
     button can never be shown without also knowing where to send
     the tap: real desktop UAs (including a merely narrow browser
     window, which has no real store to open) never see the nav
     button at all; a genuine iOS/Android UA always gets it, and it
     always resolves straight to that platform's store. The drawer's
     copy of the link ignores .is-store-ready (its own visibility is
     handled by the drawer open state) but still gets the right href
     whenever detection succeeds. */
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
        a.classList.add('is-store-ready');
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
      var openDrawerEl = document.getElementById('nav-drawer');
      var openBurgerEl = document.getElementById('nav-burger');
      if (openDrawerEl) openDrawerEl.classList.remove('is-open');
      if (openBurgerEl) {
        openBurgerEl.classList.remove('is-open');
        openBurgerEl.setAttribute('aria-expanded', 'false');
      }
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
    var openDrawer = function () {
      drawer.classList.add('is-open');
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
    };
    var closeDrawer = function () {
      drawer.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (drawer.classList.contains('is-open')) closeDrawer(); else openDrawer();
    });
    // Tap/click outside the open drawer closes it
    document.addEventListener('click', function (e) {
      if (drawer.classList.contains('is-open') && !drawer.contains(e.target) && e.target !== burger) {
        closeDrawer();
      }
    });
    // Esc closes it, and returns focus to the trigger
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
        burger.focus();
      }
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
