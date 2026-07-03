/* =============================================================
   GLAM-APPETIT · interações e motion (vanilla)
   Um motor por região. Tudo que é ponteiro/parallax é gated
   por (hover:hover)+(pointer:fine) e prefers-reduced-motion.
   ============================================================= */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var raf = window.requestAnimationFrame.bind(window);

  /* ---------- ano no rodapé ---------- */
  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- split do título do herói (letra a letra) ---------- */
  var title = $('.hero__title');
  if (title) {
    var text = title.textContent.trim();
    title.textContent = '';
    var idx = 0, words = text.split(' ');
    words.forEach(function (word, wi) {
      // cada PALAVRA é inline-block (não quebra no meio); o espaço entre palavras
      // é um nó de texto normal (ponto de quebra) — evita quebra dentro da palavra.
      var w = document.createElement('span');
      w.className = 'word';
      word.split('').forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch;
        s.style.transitionDelay = (0.15 + idx * 0.028) + 's';
        idx++;
        w.appendChild(s);
      });
      title.appendChild(w);
      if (wi < words.length - 1) title.appendChild(document.createTextNode(' '));
    });
  }

  /* ---------- entrada ---------- */
  window.addEventListener('load', function () { raf(function () { document.body.classList.add('is-loaded'); }); });
  setTimeout(function () { document.body.classList.add('is-loaded'); }, 800);

  /* ---------- nav: troca de estado ao sair do herói ---------- */
  var nav = $('#nav'), hero = $('#hero');
  // cacheia a altura do herói (evita ler offsetHeight — reflow — a cada scroll)
  var heroH = hero ? hero.offsetHeight : innerHeight;
  addEventListener('resize', function () { heroH = hero ? hero.offsetHeight : innerHeight; });
  function onScrollNav() { nav.classList.toggle('is-scrolled', scrollY > heroH - 90); }
  addEventListener('scroll', onScrollNav, { passive: true }); onScrollNav();

  /* ---------- menu mobile ---------- */
  var burger = $('#burger'), drawer = $('#drawer');
  if (burger && drawer) {
    // inert + aria-hidden tiram o drawer do tab order/AT quando fechado (inclusive no desktop)
    var setDrawer = function (open) {
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      if ('inert' in drawer) drawer.inert = !open;
    };
    setDrawer(false);
    burger.addEventListener('click', function () { setDrawer(!document.body.classList.contains('menu-open')); });
    $$('#drawer a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });
  }

  /* ---------- reveal único no scroll ---------- */
  var reveals = $$('[data-reveal]');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- marquee: duplica a trilha p/ loop sem costura ---------- */
  var mt = $('#marqueeTrack');
  if (mt) { mt.innerHTML += mt.innerHTML; }

  /* ---------- FlowingMenu: faixa entra pela borda mais próxima ---------- */
  $$('.flowmenu__item').forEach(function (item) {
    var band = item.querySelector('.flowmenu__marquee');
    var name = item.querySelector('.flowmenu__name').textContent;
    var img = item.getAttribute('data-img');
    if (band) {
      var track = document.createElement('div');
      track.className = 'flowmenu__mtrack';
      var unit = '';
      for (var k = 0; k < 5; k++) unit += '<span>' + name + '</span>' + (img ? '<img src="' + img + '" alt="" loading="lazy">' : '');
      track.innerHTML = unit;
      band.appendChild(track);
    }
    if (!fine || !band) return;
    var edge = function (e) { var r = item.getBoundingClientRect(); return (e.clientY - r.top) < r.height / 2 ? 'top' : 'bottom'; };
    item.addEventListener('pointerenter', function (e) {
      band.classList.toggle('from-bottom', edge(e) === 'top');
      item.classList.add('is-on');
    });
    item.addEventListener('pointerleave', function (e) {
      band.classList.toggle('from-bottom', edge(e) === 'top');
      item.classList.remove('is-on');
    });
  });

  /* ---------- carta de cores: holofote ---------- */
  var chroma = $('#chroma');
  if (chroma && fine) {
    chroma.addEventListener('pointermove', function (e) {
      var r = chroma.getBoundingClientRect();
      chroma.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      chroma.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  }

  /* ---------- magnético (CTAs) ---------- */
  if (fine && !reduce) {
    $$('.magnet').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + (mx * 0.28) + 'px,' + (my * 0.32) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- tilt 3D nos cards da galeria ---------- */
  if (fine && !reduce) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
        card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  /* ---------- cursor customizado ---------- */
  var cursor = $('#cursor');
  if (cursor && fine && !reduce) {
    var cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; });
    (function loop() { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px)'; raf(loop); })();
    $$('[data-cursor]').forEach(function (el) {
      el.addEventListener('pointerenter', function () { cursor.classList.add('is-cta'); });
      el.addEventListener('pointerleave', function () { cursor.classList.remove('is-cta'); });
    });
  }

  /* ---------- fio-joia + parallax (um rAF só, gated) ---------- */
  var fioPath = $('#fioPath');
  var plx = $$('[data-parallax]');
  var len = 0;
  if (fioPath) { len = fioPath.getTotalLength(); fioPath.style.strokeDasharray = len; fioPath.style.strokeDashoffset = len; }
  var ticking = false;
  function frame() {
    ticking = false;
    var max = document.documentElement.scrollHeight - innerHeight;
    var prog = max > 0 ? Math.min(scrollY / max, 1) : 0;
    if (fioPath && !reduce) fioPath.style.strokeDashoffset = len * (1 - prog);
    if (!reduce) {
      for (var i = 0; i < plx.length; i++) {
        var el = plx[i], r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > innerHeight + 100) continue;
        var p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -0.5..0.5
        el.style.transform = 'scale(1.08) translateY(' + (p * -14) + 'px)';
      }
    }
  }
  function onScroll() { if (!ticking) { ticking = true; raf(frame); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll); frame();

  /* ---------- galeria: filtros ---------- */
  var filters = $$('.filter'), items = $$('#grid .gitem');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active'); btn.setAttribute('aria-pressed', 'true');
      var f = btn.getAttribute('data-filter');
      items.forEach(function (it) {
        it.classList.toggle('is-hidden', !(f === 'all' || it.getAttribute('data-cat') === f));
      });
    });
  });

  /* ---------- lightbox ---------- */
  var lb = $('#lightbox'), lbImg = $('#lbImg'), current = 0, lbOpener = null;
  function vis() { return items.filter(function (it) { return !it.classList.contains('is-hidden'); }); }
  function full(it) { var img = it.querySelector('img'); return img.getAttribute('data-full') || img.currentSrc || img.src; }
  function alt(it) { return it.querySelector('img').alt; }
  function open(i) { var v = vis(); current = i; lbImg.src = full(v[i]); lbImg.alt = alt(v[i]); lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; lbOpener = document.activeElement; var c = $('#lbClose'); if (c) c.focus(); }
  function close() { lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (lbOpener && lbOpener.focus) lbOpener.focus(); }
  function go(d) { var v = vis(); current = (current + d + v.length) % v.length; lbImg.src = full(v[current]); lbImg.alt = alt(v[current]); }
  if (lb) {
    items.forEach(function (it) { it.addEventListener('click', function () { open(vis().indexOf(it)); }); });
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', function (e) { e.stopPropagation(); go(-1); });
    $('#lbNext').addEventListener('click', function (e) { e.stopPropagation(); go(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    });
  }
})();
