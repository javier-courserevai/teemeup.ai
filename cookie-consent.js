/* ===========================================================================
   teemeup — Cookie consent (Google Consent Mode v2)
   Self-contained: injects its own styles, banner and preferences modal.
   Loaded only on public website pages (not the in-app webview pages).

   Storage: localStorage["tmu_consent"] =
     { v:1, categories:{necessary:true, analytics:bool, marketing:bool}, at:ISO }

   The Consent Mode DEFAULT (all denied) and the restore of a returning
   visitor's choice are set inline in each page's <head>, BEFORE gtag config.
   This file drives the UI and pushes 'consent' 'update' when the user chooses.
   =========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'tmu_consent';
  var VERSION = 1;
  var COOKIE_POLICY_URL = '/cookies';

  var CATEGORIES = [
    {
      key: 'necessary', name: 'Strictly necessary', required: true,
      desc: 'Needed for the site to work — page navigation, security, and remembering your cookie choice. These are always on.'
    },
    {
      key: 'analytics', name: 'Analytics', required: false,
      desc: 'Google Analytics, so we can see which pages help and improve the site. Sets _ga cookies. Nothing is collected until you allow it.'
    },
    {
      key: 'marketing', name: 'Marketing', required: false,
      desc: 'Would let us measure advertising and remarketing. We don’t use marketing cookies today — this stays off until we do, and only with your consent.'
    }
  ];

  /* ---- storage --------------------------------------------------------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
    catch (e) { return null; }
  }
  function save(cats) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        v: VERSION, categories: cats, at: new Date().toISOString()
      }));
    } catch (e) {}
  }

  /* ---- Consent Mode v2 update ----------------------------------------- */
  function applyConsent(cats) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage:  cats.analytics ? 'granted' : 'denied',
        ad_storage:         cats.marketing ? 'granted' : 'denied',
        ad_user_data:       cats.marketing ? 'granted' : 'denied',
        ad_personalization: cats.marketing ? 'granted' : 'denied'
      });
    }
  }

  function commit(cats) {
    save(cats);
    applyConsent(cats);
    hideBanner();
    closeModal();
  }

  var ACCEPT_ALL = { necessary: true, analytics: true,  marketing: true  };
  var REJECT_ALL = { necessary: true, analytics: false, marketing: false };

  /* ---- styles ---------------------------------------------------------- */
  function injectStyles() {
    if (document.getElementById('tmu-cc-style')) return;
    var css = [
      '.tmu-cc-font{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}',
      '.tmu-cc-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;max-width:560px;margin:0 auto;background:#0d0d18;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:16px;box-shadow:0 22px 60px rgba(0,0,0,.5);padding:20px 22px;}',
      '.tmu-cc-banner__title{font-size:15px;font-weight:700;margin:0 0 6px;color:#fff;}',
      '.tmu-cc-banner__text{font-size:13px;line-height:1.55;color:rgba(255,255,255,.64);margin:0 0 16px;}',
      '.tmu-cc-banner__text a{color:#a78bfa;text-decoration:underline;}',
      '.tmu-cc-actions{display:flex;gap:8px;flex-wrap:wrap;}',
      '.tmu-cc-btn{flex:1 1 130px;min-width:120px;cursor:pointer;font:inherit;font-size:13px;font-weight:600;line-height:1.2;padding:11px 14px;border-radius:10px;border:1px solid transparent;transition:transform .12s ease,background .15s,border-color .15s;text-align:center;}',
      '.tmu-cc-btn:hover{transform:translateY(-1px);}',
      '.tmu-cc-btn:focus-visible{outline:2px solid #a78bfa;outline-offset:2px;}',
      '.tmu-cc-btn--primary{background:linear-gradient(135deg,#5D28EE,#4817CE);color:#fff;box-shadow:0 6px 18px rgba(72,23,206,.4);}',
      '.tmu-cc-btn--solid{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.16);}',
      '.tmu-cc-btn--ghost{background:transparent;color:rgba(255,255,255,.82);border-color:rgba(255,255,255,.22);}',
      '.tmu-cc-overlay{position:fixed;inset:0;z-index:2147483001;background:rgba(4,4,10,.66);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;}',
      '.tmu-cc-modal{width:100%;max-width:520px;max-height:88vh;overflow:auto;background:#0d0d18;color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:26px 26px 22px;box-shadow:0 30px 80px rgba(0,0,0,.6);}',
      '.tmu-cc-modal__title{font-size:19px;font-weight:800;letter-spacing:-.01em;margin:0 0 6px;}',
      '.tmu-cc-modal__intro{font-size:13px;color:rgba(255,255,255,.6);line-height:1.6;margin:0 0 8px;}',
      '.tmu-cc-modal__intro a{color:#a78bfa;text-decoration:underline;}',
      '.tmu-cc-cat{display:flex;gap:14px;align-items:flex-start;padding:16px 0;border-top:1px solid rgba(255,255,255,.08);}',
      '.tmu-cc-cat__body{flex:1;min-width:0;}',
      '.tmu-cc-cat__name{font-size:14px;font-weight:700;margin:0 0 4px;color:#fff;}',
      '.tmu-cc-cat__desc{font-size:12.5px;color:rgba(255,255,255,.56);line-height:1.55;margin:0;}',
      '.tmu-cc-switch{position:relative;flex:none;width:42px;height:24px;margin-top:2px;}',
      '.tmu-cc-switch input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer;}',
      '.tmu-cc-track{position:absolute;inset:0;background:rgba(255,255,255,.2);border-radius:999px;transition:background .18s;pointer-events:none;}',
      '.tmu-cc-track::before{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .18s;}',
      '.tmu-cc-switch input:checked + .tmu-cc-track{background:#22C55E;}',
      '.tmu-cc-switch input:checked + .tmu-cc-track::before{transform:translateX(18px);}',
      '.tmu-cc-switch input:disabled{cursor:not-allowed;}',
      '.tmu-cc-switch input:disabled + .tmu-cc-track{opacity:.5;}',
      '.tmu-cc-switch input:focus-visible + .tmu-cc-track{box-shadow:0 0 0 3px rgba(167,139,250,.5);}',
      '.tmu-cc-modal__actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px;}',
      '@media (max-width:520px){.tmu-cc-btn{flex-basis:100%;}}',
      '@media (prefers-reduced-motion: reduce){.tmu-cc-btn,.tmu-cc-track,.tmu-cc-track::before{transition:none;}.tmu-cc-banner{animation:none;}}',
      '@keyframes tmu-cc-in{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}',
      '.tmu-cc-banner{animation:tmu-cc-in .28s ease both;}'
    ].join('');
    var s = document.createElement('style');
    s.id = 'tmu-cc-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---- banner ---------------------------------------------------------- */
  var bannerEl = null;
  function showBanner() {
    if (bannerEl) return;
    injectStyles();
    var b = document.createElement('div');
    b.className = 'tmu-cc-banner tmu-cc-font';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-live', 'polite');
    b.setAttribute('aria-label', 'Cookie consent');
    b.innerHTML =
      '<p class="tmu-cc-banner__title">We use cookies</p>' +
      '<p class="tmu-cc-banner__text">We use cookies to run teemeup, measure traffic and improve the site. ' +
      'You can accept all, reject the non-essential ones, or choose what to allow. ' +
      'See our <a href="' + COOKIE_POLICY_URL + '">Cookie Policy</a>.</p>' +
      '<div class="tmu-cc-actions">' +
        '<button type="button" class="tmu-cc-btn tmu-cc-btn--ghost" data-tmu="customize">Customize</button>' +
        '<button type="button" class="tmu-cc-btn tmu-cc-btn--solid" data-tmu="reject">Reject non-essential</button>' +
        '<button type="button" class="tmu-cc-btn tmu-cc-btn--primary" data-tmu="accept">Accept all</button>' +
      '</div>';
    b.querySelector('[data-tmu="accept"]').addEventListener('click', function () { commit(ACCEPT_ALL); });
    b.querySelector('[data-tmu="reject"]').addEventListener('click', function () { commit(REJECT_ALL); });
    b.querySelector('[data-tmu="customize"]').addEventListener('click', function () { openModal(); });
    document.body.appendChild(b);
    bannerEl = b;
  }
  function hideBanner() {
    if (bannerEl && bannerEl.parentNode) bannerEl.parentNode.removeChild(bannerEl);
    bannerEl = null;
  }

  /* ---- preferences modal ---------------------------------------------- */
  var overlayEl = null, lastFocus = null;
  function openModal() {
    injectStyles();
    if (overlayEl && document.body.contains(overlayEl)) return;
    overlayEl = null; // clear any stale reference if the node was removed externally
    lastFocus = document.activeElement;
    var current = (load() || {}).categories || { necessary: true, analytics: false, marketing: false };

    var overlay = document.createElement('div');
    overlay.className = 'tmu-cc-overlay tmu-cc-font';

    var modal = document.createElement('div');
    modal.className = 'tmu-cc-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'tmu-cc-modal-title');
    modal.setAttribute('tabindex', '-1');

    var rows = CATEGORIES.map(function (c) {
      var on = c.required ? true : !!current[c.key];
      return '' +
        '<div class="tmu-cc-cat">' +
          '<div class="tmu-cc-cat__body">' +
            '<p class="tmu-cc-cat__name">' + c.name + '</p>' +
            '<p class="tmu-cc-cat__desc">' + c.desc + '</p>' +
          '</div>' +
          '<label class="tmu-cc-switch">' +
            '<input type="checkbox" data-cat="' + c.key + '"' + (on ? ' checked' : '') + (c.required ? ' disabled' : '') + '>' +
            '<span class="tmu-cc-track"></span>' +
          '</label>' +
        '</div>';
    }).join('');

    modal.innerHTML =
      '<h2 class="tmu-cc-modal__title" id="tmu-cc-modal-title">Cookie preferences</h2>' +
      '<p class="tmu-cc-modal__intro">Choose which cookies teemeup can use. You can change this any time from the ' +
      '“Cookie preferences” link in the footer. Full details are in our <a href="' + COOKIE_POLICY_URL + '">Cookie Policy</a>.</p>' +
      rows +
      '<div class="tmu-cc-modal__actions">' +
        '<button type="button" class="tmu-cc-btn tmu-cc-btn--ghost" data-tmu="reject">Reject non-essential</button>' +
        '<button type="button" class="tmu-cc-btn tmu-cc-btn--solid" data-tmu="save">Save preferences</button>' +
        '<button type="button" class="tmu-cc-btn tmu-cc-btn--primary" data-tmu="accept">Accept all</button>' +
      '</div>';

    modal.querySelector('[data-tmu="accept"]').addEventListener('click', function () { commit(ACCEPT_ALL); });
    modal.querySelector('[data-tmu="reject"]').addEventListener('click', function () { commit(REJECT_ALL); });
    modal.querySelector('[data-tmu="save"]').addEventListener('click', function () {
      var cats = { necessary: true };
      CATEGORIES.forEach(function (c) {
        if (c.required) { cats[c.key] = true; return; }
        var box = modal.querySelector('input[data-cat="' + c.key + '"]');
        cats[c.key] = !!(box && box.checked);
      });
      commit(cats);
    });

    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', onKeydown, true);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    overlayEl = overlay;
    modal.focus();
  }
  function closeModal() {
    if (overlayEl && overlayEl.parentNode) overlayEl.parentNode.removeChild(overlayEl);
    overlayEl = null;
    document.removeEventListener('keydown', onKeydown, true);
    if (lastFocus && typeof lastFocus.focus === 'function') { try { lastFocus.focus(); } catch (e) {} }
  }
  function onKeydown(e) { if (e.key === 'Escape') closeModal(); }

  /* ---- footer "Cookie preferences" link (auto-injected) ---------------- */
  function injectFooterLink() {
    var titles = document.querySelectorAll('.footer__col-title');
    for (var i = 0; i < titles.length; i++) {
      if ((titles[i].textContent || '').trim().toLowerCase() === 'legal') {
        var list = titles[i].parentNode.querySelector('.footer__links');
        if (list && !list.querySelector('[data-tmu-cookie-open]')) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = '#';
          a.textContent = 'Cookie preferences';
          a.setAttribute('data-tmu-cookie-open', '');
          a.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
          li.appendChild(a);
          list.appendChild(li);
        }
        break;
      }
    }
  }

  /* ---- public API ------------------------------------------------------ */
  window.tmuCookies = {
    open: openModal,
    reset: function () { try { localStorage.removeItem(STORAGE_KEY); } catch (e) {} showBanner(); }
  };

  /* ---- init ------------------------------------------------------------ */
  function init() {
    injectFooterLink();
    var stored = load();
    if (stored && stored.categories) {
      applyConsent(stored.categories); // re-assert (inline head snippet already did an early pass)
    } else {
      showBanner();
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
