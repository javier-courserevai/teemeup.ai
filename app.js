/* =========================================================
   teemeup.ai — page script (redesign)
   - Nav toggle + scroll shadow
   - Smooth anchor scroll
   - FAQ accordion
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = document.getElementById('nav') ? document.getElementById('nav').offsetHeight : 68;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // close mobile drawer
      var drawer = document.getElementById('nav-drawer');
      if (drawer) drawer.classList.remove('is-open');
    });
  });

  /* ---------- Nav scroll shadow ---------- */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (!nav) return;
    if (window.scrollY > 12) {
      nav.style.boxShadow = '0 2px 20px rgba(0,0,0,.08)';
    } else {
      nav.style.boxShadow = '';
    }
  }, { passive: true });

  /* ---------- Mobile nav drawer ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var navDrawer = document.getElementById('nav-drawer');
  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', function () {
      navDrawer.classList.toggle('is-open');
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-item__q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function (o) {
        o.classList.remove('is-open');
      });
      // Open this one if it was closed
      if (!isOpen) item.classList.add('is-open');
    });
  });

  /* ---------- GSAP fallback ---------- */
  if (typeof gsap === 'undefined') {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

})();
