/* =============================================================
   GLAM-APPETIT · interações
   ============================================================= */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- ano no rodapé ---------- */
  var yEl = $('#year'); if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---------- entrada do hero ---------- */
  window.addEventListener('load', function () {
    requestAnimationFrame(function () { document.body.classList.add('is-loaded'); });
  });
  // fallback caso o load demore
  setTimeout(function () { document.body.classList.add('is-loaded'); }, 700);

  /* ---------- nav: muda ao sair do hero ---------- */
  var nav = $('#nav');
  var hero = $('#hero');
  function onScroll() {
    var threshold = (hero ? hero.offsetHeight : window.innerHeight) - 80;
    if (window.scrollY > threshold) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- menu mobile ---------- */
  var burger = $('#burger');
  var drawer = $('#drawer');
  function closeMenu() {
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('#drawer a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- reveals no scroll ---------- */
  if (reduce) {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- contador (stats) ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce || isNaN(target)) return;
    var start = null, dur = 1400;
    el.textContent = '0' + suffix;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var countEls = $$('[data-count]');
  if (countEls.length && 'IntersectionObserver' in window && !reduce) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    countEls.forEach(function (el) { co.observe(el); });
  }

  /* ---------- Carta de Cores (sanfona) ---------- */
  var panels = $$('#colorcard .colorcard__panel');
  function setActivePanel(idx) {
    panels.forEach(function (p, i) {
      var on = i === idx;
      p.classList.toggle('is-active', on);
      p.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }
  panels.forEach(function (p, i) {
    p.addEventListener('mouseenter', function () { setActivePanel(i); });
    p.addEventListener('click', function () { setActivePanel(i); });
    p.addEventListener('focus', function () { setActivePanel(i); });
  });
  var cardWrap = $('#colorcard');
  if (cardWrap) {
    cardWrap.addEventListener('keydown', function (e) {
      var cur = panels.findIndex(function (p) { return p.classList.contains('is-active'); });
      if (e.key === 'ArrowRight') { e.preventDefault(); var n = (cur + 1) % panels.length; setActivePanel(n); panels[n].focus(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); var pr = (cur - 1 + panels.length) % panels.length; setActivePanel(pr); panels[pr].focus(); }
    });
  }

  /* ---------- Galeria: filtros ---------- */
  var filters = $$('.filter');
  var items = $$('#grid .grid__item');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.getAttribute('data-filter');
      items.forEach(function (it) {
        var show = f === 'all' || it.getAttribute('data-cat') === f;
        it.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = $('#lightbox');
  var lbImg = $('#lbImg');
  var lbClose = $('#lbClose');
  var lbPrev = $('#lbPrev');
  var lbNext = $('#lbNext');
  var current = 0;
  function visibleItems() { return items.filter(function (it) { return !it.classList.contains('is-hidden'); }); }
  // prefere o WebP full (mesmo tamanho do PNG, ~90% mais leve); cai pro que o browser carregou ou o src
  function fullSrc(img) { return img.getAttribute('data-full') || img.currentSrc || img.src; }
  function openLb(idx) {
    var vis = visibleItems();
    current = idx;
    var img = vis[idx].querySelector('img');
    lbImg.src = fullSrc(img); lbImg.alt = img.alt;
    lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function nav2(dir) {
    var vis = visibleItems();
    current = (current + dir + vis.length) % vis.length;
    var img = vis[current].querySelector('img');
    lbImg.src = fullSrc(img); lbImg.alt = img.alt;
  }
  items.forEach(function (it) {
    it.addEventListener('click', function () {
      var vis = visibleItems();
      openLb(vis.indexOf(it));
    });
  });
  if (lb) {
    lbClose.addEventListener('click', closeLb);
    lbPrev.addEventListener('click', function (e) { e.stopPropagation(); nav2(-1); });
    lbNext.addEventListener('click', function (e) { e.stopPropagation(); nav2(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') nav2(1);
      if (e.key === 'ArrowLeft') nav2(-1);
    });
  }

})();
