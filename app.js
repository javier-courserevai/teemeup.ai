/* =========================================================
   teemeup.ai — page script
   - Scroll reveal (IntersectionObserver)
   - Smooth anchor scroll from nav
   - Nav shadow on scroll + mobile drawer
   - Hero chat typewriter-style reveal
   - Showcase tabs (copy + browser)
   - Pricing monthly/yearly toggle
   - FAQ accordion (single-open)
   - Tweaks panel (accent color, hero headline)
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = document.getElementById('nav').offsetHeight;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // close drawer if open
      document.getElementById('nav').classList.remove('is-open');
    });
  });

  /* ---------- Nav scrolled state + mobile drawer ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
    });
  }

  /* ---------- Hero chat reveal sequence ---------- */
  var chatBody = document.getElementById('chat-body');
  if (chatBody) {
    var steps = chatBody.querySelectorAll('[data-step]');
    var playChat = function () {
      steps.forEach(function (el, idx) {
        setTimeout(function () {
          el.classList.add('is-shown');
          chatBody.scrollTop = chatBody.scrollHeight;
        }, 500 + idx * 900);
      });
    };
    // play once when hero is visible
    if ('IntersectionObserver' in window) {
      var heroObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            playChat();
            heroObs.disconnect();
          }
        });
      }, { threshold: 0.25 });
      heroObs.observe(chatBody);
    } else {
      playChat();
    }
  }

  /* ---------- Showcase tabs ---------- */
  var tabs = document.querySelectorAll('.showcase__tab');
  var panels = document.querySelectorAll('.showcase__panel');
  var mappTabs = document.querySelectorAll('.mapp__tab');
  var mappViews = document.querySelectorAll('.mapp__view');

  function activateShowcaseKey(key) {
    tabs.forEach(function (t) { t.classList.toggle('is-active', t.dataset.tab === key); });
    panels.forEach(function (p) { p.classList.toggle('is-active', p.dataset.panel === key); });
    mappTabs.forEach(function (t) { t.classList.toggle('is-active', t.dataset.mapp === key); });
    mappViews.forEach(function (v) { v.classList.toggle('is-active', v.classList.contains('mapp__view--' + key)); });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () { activateShowcaseKey(tab.dataset.tab); });
  });

  mappTabs.forEach(function (tab) {
    tab.addEventListener('click', function () { activateShowcaseKey(tab.dataset.mapp); });
  });

  sideItems.forEach(function (s) {
    s.addEventListener('click', function () {
      var key = s.dataset.side;
      var matchingTab = document.querySelector('.showcase__tab[data-tab="' + key + '"]');
      if (matchingTab) matchingTab.click();
    });
  });

  /* ---------- Pricing toggle ---------- */
  var billBtns = document.querySelectorAll('.pricing__toggle-btn');
  var amounts = document.querySelectorAll('.price-card__amount');
  billBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      billBtns.forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active');
      var mode = b.dataset.billing; // monthly | yearly
      amounts.forEach(function (a) {
        var val = mode === 'yearly' ? a.dataset.y : a.dataset.m;
        a.textContent = val;
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-item__q');
    q.addEventListener('click', function () {
      var open = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(function (o) { o.classList.remove('is-open'); });
      if (!open) item.classList.add('is-open');
    });
  });

  /* =========================================================
     TWEAKS — edit-mode protocol
     ========================================================= */

  var defaults = window.__TWEAK_DEFAULTS__ || {
    accentColor: '#d4a25a',
    headlinePart1: 'Plan the round',
    headlinePart2: 'just ask',
    navCtaLabel: 'Download now'
  };

  var applyTweaks = function (t) {
    if (t.accentColor) {
      document.documentElement.style.setProperty('--color-accent', t.accentColor);
      // update active swatch
      document.querySelectorAll('.tweaks__swatch').forEach(function (s) {
        s.classList.toggle('is-active', s.dataset.accent === t.accentColor);
      });
    }
    if (t.headlinePart1 != null) {
      var p1 = document.getElementById('hero-headline-part-1');
      if (p1) p1.textContent = t.headlinePart1;
      var in1 = document.getElementById('tweak-headline-1');
      if (in1 && in1.value !== t.headlinePart1) in1.value = t.headlinePart1;
    }
    if (t.headlinePart2 != null) {
      var p2 = document.getElementById('hero-headline-part-2');
      if (p2) p2.textContent = t.headlinePart2;
      var in2 = document.getElementById('tweak-headline-2');
      if (in2 && in2.value !== t.headlinePart2) in2.value = t.headlinePart2;
    }
    if (t.navCtaLabel != null) {
      var c = document.getElementById('nav-cta-text');
      if (c) c.textContent = t.navCtaLabel;
      var in3 = document.getElementById('tweak-cta');
      if (in3 && in3.value !== t.navCtaLabel) in3.value = t.navCtaLabel;
    }
  };

  applyTweaks(defaults);

  var persist = function (edits) {
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: edits }, '*');
    } catch (_) {}
  };

  // Swatches
  document.querySelectorAll('.tweaks__swatch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      var color = sw.dataset.accent;
      applyTweaks({ accentColor: color });
      persist({ accentColor: color });
    });
  });

  // Text inputs
  var bindInput = function (id, key) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', function () {
      var edits = {}; edits[key] = el.value;
      applyTweaks(edits);
    });
    el.addEventListener('change', function () {
      var edits = {}; edits[key] = el.value;
      persist(edits);
    });
  };
  bindInput('tweak-headline-1', 'headlinePart1');
  bindInput('tweak-headline-2', 'headlinePart2');
  bindInput('tweak-cta', 'navCtaLabel');

  // Edit-mode protocol
  var tweaksPanel = document.getElementById('tweaks');
  window.addEventListener('message', function (ev) {
    var d = ev && ev.data;
    if (!d || !d.type) return;
    if (d.type === '__activate_edit_mode') tweaksPanel.classList.add('is-open');
    if (d.type === '__deactivate_edit_mode') tweaksPanel.classList.remove('is-open');
  });
  try {
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  } catch (_) {}

})();
