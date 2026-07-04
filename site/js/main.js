/* ═══════════════════════════════════════════════════════════
   Crafts_n_beyond — motion engine
   the page is a shagun being opened by hand:
   thread → foil → tissue → folded note → handwriting.
   ═══════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MOBILE = matchMedia('(max-width: 767px)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  let lenisRef = null; // shared so the lightbox can pause/resume smooth scroll

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  /* seeded random — human irregularity, same every visit */
  const mulberry32 = (a) => () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rand = mulberry32(1108); // the studio's lucky number, why not
  const jitter = (base, spread) => base + (rand() - 0.5) * 2 * spread;

  const EXPO = 'expo.out';
  const QUART = 'power2.inOut';

  const prepDraw = (path) => {
    const L = path.getTotalLength();
    path.style.strokeDasharray = L;
    path.style.strokeDashoffset = L;
    return L;
  };

  const fmtTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + String(sec).padStart(2, '0');
  };

  /* ─────────────────────────────────────────────
     reduced motion: a calm, complete page. no tricks.
     ───────────────────────────────────────────── */
  if (REDUCED) {
    document.addEventListener('DOMContentLoaded', () => {
      const cover = $('#wrapCover'); if (cover) cover.remove();
      const mauli = $('#mauli'); if (mauli) mauli.remove();
      const hint = $('#mauliHint'); if (hint) hint.remove();
      // hero video: no autoplay motion — hold on the poster, offer controls
      const hero = $('.hero__video');
      if (hero) { hero.removeAttribute('autoplay'); hero.removeAttribute('loop'); try { hero.pause(); } catch (e) {} hero.controls = true; }
      const video = $('#scrubVideo');
      if (video) { video.controls = true; video.preload = 'metadata'; }
      $$('.mnote').forEach((n) => { n.style.opacity = '0.9'; });
      const fold = $('#fold'); if (fold) fold.remove(); // scene is pure motion; cut it
      $$('.icon-path, .thread-path, .circle-path, .cta-bow path, .underline-path, .translit__swash').forEach((p) => {
        p.style.strokeDasharray = 'none'; p.style.strokeDashoffset = '0';
      });
      // wordmark: static (no cycling) in reduced motion
      buildWordCycle({ reduced: true });
      // gallery still needs to exist — build static cards (posters, no autoplay) + wire the lightbox
      buildGallery({ reduced: true });
      initLightbox();
      $$('.card__still').forEach((im) => { im.style.opacity = '1'; });
      const nav = $('#nav');
      addEventListener('scroll', () => nav.classList.toggle('is-scrolled', scrollY > 80), { passive: true });
    });
    return;
  }

  /* ─────────────────────────────────────────────
     boot
     ───────────────────────────────────────────── */
  const boot = () => {
    if (!window.gsap || !window.ScrollTrigger) {
      // motion libs failed to load — reveal the page anyway, don't trap the visitor
      document.documentElement.classList.remove('js-armed');
      const cover = $('#wrapCover'); if (cover) cover.remove();
      const hv = $('.hero__video'); if (hv) { try { hv.play(); } catch (e) {} }
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);

    let lenis = null;
    if (window.Lenis) {
      // buttery, weighted scroll everywhere. lerp gives a consistent glide
      // regardless of device; syncTouch carries it to phones (the 80% audience).
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchInertiaMultiplier: 22,
        // let anything opted-out (the mobile card carousel) scroll natively
        prevent: (node) => !!(node && node.closest && node.closest('[data-lenis-prevent]')),
      });
      lenisRef = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      // in-page anchors should glide, not jump
      $$('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href');
          if (id.length < 2) return;
          const target = document.querySelector(id);
          if (!target) return;
          e.preventDefault();
          lenis.scrollTo(target, { offset: -60, duration: 1.4 });
        });
      });
      document.documentElement.classList.add('lenis-on');
    }

    buildGallery();        // cards from gallery-data.js — before initWork/initTissue query them
    initLightbox();
    seedTilts();
    initNav();
    initThreads();
    initStory();
    buildWordCycle();
    initWork();
    initTissue();
    initGalleryVideos();
    initFold();
    initReel();
    initKind();
    initProcess();
    initClosing();
    if (FINE) { initMagnetic(); initCursorDot(); }
    initFoil();

    // the cover unwraps, then the hero speaks
    playCover(() => {
      document.documentElement.classList.add('js-ready');
      playHeroIntro();
    });

    // late layout (fonts/images) shifts pin positions — refresh once settled.
    // fonts.ready covers the case where Fraunces swapped in after the boot timeout.
    addEventListener('load', () => ScrollTrigger.refresh());
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  };

  const seedTilts = () => {
    $$('.polaroid').forEach((el, i) => {
      const t = jitter(0, 3.2);
      el.style.setProperty('--tilt', t.toFixed(2) + 'deg');
    });
  };

  /* ─────────────────────────────────────────────
     cover: the page opens like a gift
     ───────────────────────────────────────────── */
  const playCover = (done) => {
    const cover = $('#wrapCover');
    if (!cover) { done(); return; }
    const bow = $('.bow-path', cover);
    const L = prepDraw(bow);
    const tl = gsap.timeline({
      defaults: { ease: EXPO },
      onComplete: () => { cover.remove(); done(); },
    });
    tl.to(bow, { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' })
      .to($('.wrap-bow', cover), { scale: 0.86, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.12')
      .to($('.wrap-panel--top', cover), { yPercent: -102, duration: 0.9, ease: 'expo.inOut' }, '<0.1')
      .to($('.wrap-panel--bottom', cover), { yPercent: 102, duration: 0.9, ease: 'expo.inOut' }, '<');
  };

  /* ─────────────────────────────────────────────
     hero: mask reveals, foil press, arch, mauli
     ───────────────────────────────────────────── */
  const playHeroIntro = () => {
    const lines = $$('.hero__title .line');
    lines.forEach((line) => {
      const inner = document.createElement('span');
      inner.className = 'line-inner';
      inner.style.display = 'block';
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
    });
    const inners = $$('.hero__title .line-inner');
    const arch = $('#heroArch');
    const cuts = $$('.hero__cut');
    const tl = gsap.timeline({ defaults: { ease: EXPO } });

    gsap.set($$('.hero__eyebrow, .hero__sub, .hero__ctas'), { opacity: 0, y: 14 });
    gsap.set(inners, { yPercent: 112, rotate: 3.5 });
    gsap.set(arch, { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 18px 18px)' });
    gsap.set(cuts, { opacity: 0, scale: 0.9 });
    gsap.set('.stamp', { opacity: 0, rotate: -20, scale: 0.7 });

    tl.to(inners, { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.1 }, 0)
      .to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.5 }, 0.35)
      // the letterpress press: the whole headline gets struck
      .fromTo('.hero__title', { y: -5 }, { y: 0, duration: 0.3, ease: 'power3.out' }, 0.82)
      .to('.hero__sub', { opacity: 1, y: 0, duration: 0.55 }, 0.5)
      .to('.hero__ctas', { opacity: 1, y: 0, duration: 0.55 }, 0.62)
      .to(arch, { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 18px 18px)', duration: 1.05, ease: 'expo.inOut' }, 0.55)
      .to(cuts, {
        opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.7)',
        stagger: { each: 0.09, from: 'random' },
      }, 1.05)
      .to('.stamp', { opacity: 0.85, rotate: -8, scale: 1, duration: 0.45, ease: 'back.out(2)' }, 1.25)
      .to('.hero__scrollcue', { opacity: 1, duration: 0.6 }, 2.1);

    const cue = $('.hero__scrollcue .cue-path');
    if (cue) { prepDraw(cue); gsap.to(cue, { strokeDashoffset: 0, duration: 0.9, delay: 2.1, ease: 'power2.inOut' }); }

    // scroll parallax: cutouts drift, headline lifts & blurs away
    $$('.hero__cut').forEach((cut) => {
      const depth = parseFloat(cut.dataset.depth || 1.08);
      gsap.to(cut, {
        yPercent: (depth - 1) * -320,
        rotate: '+=' + jitter(0, 3),
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    });
    gsap.to('.hero__copy', {
      yPercent: -8, opacity: 0.25, filter: 'blur(4px)', ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: 0.6 },
    });
    gsap.to('.hero__scrollcue', {
      opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '25% top', scrub: true },
    });

    initMauli();
  };

  /* the mauli unties on your first scroll (or a tap on the arch) */
  const initMauli = () => {
    const mauli = $('#mauli');
    if (!mauli) return;
    const hint = $('#mauliHint');
    let untied = false;

    const untie = () => {
      if (untied) return;
      untied = true;
      const loops = $$('.mauli-loop', mauli);
      const tails = $$('.mauli-tail', mauli);
      const knot = $('.mauli-knot', mauli);
      const bands = $$('#mauliBands path', mauli);
      const bow = $('#mauliBow', mauli);
      tails.forEach(prepDraw);
      tails.forEach((t) => { t.style.strokeDashoffset = 0; });

      const tl = gsap.timeline({ onComplete: () => mauli.remove() });
      if (hint) tl.to(hint, { opacity: 0, x: 10, duration: 0.25 }, 0);
      tl.to(loops, {
        scale: 0.08, transformOrigin: '0px 0px', duration: 0.38,
        ease: 'power3.in', stagger: 0.07,
      }, 0)
        .to(knot, { scale: 0.4, transformOrigin: '0px 0px', opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.28)
        .to(tails, {
          strokeDashoffset: (i, el) => -el.getTotalLength(),
          duration: 0.35, ease: 'power2.in', stagger: 0.05,
        }, 0.18)
        .to(bands, { x: 360, opacity: 0, duration: 0.55, ease: 'power3.in', stagger: 0.03 }, 0.3)
        .to(bow, { y: 80, rotate: 22, opacity: 0, duration: 0.5, ease: 'power2.in' }, 0.34)
        .fromTo('#heroArch', { scale: 1.014 }, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' }, 0.5);
    };

    ScrollTrigger.create({ start: 40, once: true, onEnter: untie });
    $('#archWrap').addEventListener('pointerdown', untie, { once: true });
    if (hint) {
      gsap.fromTo(hint, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 2.4 });
      gsap.to(hint, { x: 6, repeat: -1, yoyo: true, duration: 0.9, ease: 'sine.inOut', delay: 2.4 });
    }
  };

  /* hot-foil: the sheen follows your pointer / your phone's tilt */
  const initFoil = () => {
    const foil = $('#foilWord');
    if (!foil) return;
    let ambient = gsap.to(foil, {
      '--sheen': '-60%', duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut',
      startAt: { '--sheen': '160%' },
    });
    const sheenTo = gsap.quickTo(foil, '--sheen', { duration: 0.7, ease: 'power2.out' });
    let idleTimer = null;
    const wake = (v) => {
      if (ambient) { ambient.kill(); ambient = null; }
      sheenTo(v + '%');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        ambient = gsap.to(foil, { '--sheen': '-40%', duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }, 4000);
    };
    if (FINE) {
      addEventListener('pointermove', (e) => {
        wake(130 - (e.clientX / innerWidth) * 170);
      }, { passive: true });
    }
    addEventListener('deviceorientation', (e) => {
      if (e.gamma == null) return;
      wake(45 - (e.gamma / 45) * 85);
    }, { passive: true });
  };

  /* ─────────────────────────────────────────────
     threads: the mauli's line runs through the page
     ───────────────────────────────────────────── */
  const initThreads = () => {
    $$('.thread .thread-path').forEach((path) => {
      prepDraw(path);
      gsap.to(path, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: {
          trigger: path.closest('section'),
          start: 'top 75%', end: 'bottom 55%', scrub: 0.8,
        },
      });
    });
  };

  /* ─────────────────────────────────────────────
     story: sticky pane, beats, the circled "two of us"
     ───────────────────────────────────────────── */
  const initStory = () => {
    revealLines('.story__title');
    gsap.fromTo('#storyPane img', { scale: 1.16 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.story__grid', start: 'top 80%', end: 'bottom 60%', scrub: 0.6 },
    });
    $$('.story .beat').forEach((beat) => {
      gsap.from(beat, {
        opacity: 0, y: 30, duration: 0.7, ease: EXPO,
        scrollTrigger: { trigger: beat, start: 'top 74%' },
      });
    });
    gsap.from('.story__note', {
      opacity: 0, rotate: -6, duration: 0.7, ease: EXPO,
      scrollTrigger: { trigger: '.story__note', start: 'top 85%' },
    });
    const circle = $('#circlePath');
    if (circle) {
      prepDraw(circle);
      gsap.to(circle, {
        strokeDashoffset: 0, duration: 0.75, ease: 'power2.inOut',
        scrollTrigger: { trigger: '#circledUs', start: 'top 70%' },
      });
    }
  };

  /* the wordmark keeps updating — inks in one service, holds, swaps to the next */
  const WORDS = [
    { text: 'शगुन', dev: true },   // शगुन
    { text: 'Trousseau Packing' },
    { text: 'Handcrafted Gifts' },
    { text: 'Customised &amp; Personalised Gifts' },
  ];
  const SWASH_D = 'M8 12 C 60 4, 150 18, 232 8';

  const buildWordCycle = (opts) => {
    const stage = $('#wordCycleStage');
    if (!stage || !window.gsap) return;
    const reduced = opts && opts.reduced;
    stage.innerHTML = '';
    const items = WORDS.map((w) => {
      const item = document.createElement('div');
      item.className = 'wordcycle__item' + (w.dev ? ' wordcycle__item--dev' : '');
      const span = document.createElement('span');
      span.className = 'wordcycle__word';
      span.innerHTML = w.text;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'wordcycle__swash');
      svg.setAttribute('viewBox', '0 0 240 16');
      svg.setAttribute('fill', 'none');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', SWASH_D);
      svg.appendChild(path);
      item.append(span, svg);
      stage.appendChild(item);
      return { item, path, len: 0 };
    });
    // fit longer phrases so they never overflow their cell
    items.forEach((it) => {
      const span = $('.wordcycle__word', it.item);
      let guard = 0;
      while (span.scrollWidth > stage.clientWidth && guard < 24) {
        const cur = parseFloat(getComputedStyle(span).fontSize);
        span.style.fontSize = (cur * 0.94) + 'px';
        guard++;
      }
      it.len = it.path.getTotalLength();
    });

    if (reduced) {
      // reduced motion: no cycling. show the signature word, static.
      items.forEach((it, i) => {
        it.item.style.clipPath = 'none';
        it.item.style.opacity = i === 0 ? '1' : '0';
        it.path.style.strokeDasharray = 'none';
        it.path.style.strokeDashoffset = '0';
        it.path.style.opacity = i === 0 ? '1' : '0';
      });
      return;
    }

    items.forEach((it) => {
      gsap.set(it.item, { clipPath: 'inset(-12% 100% -12% 0)', y: 8 });
      prepDraw(it.path);
    });

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: EXPO } });
    items.forEach((it, i) => {
      // ink the word in L→R, rise to rest, draw the gold swash
      tl.to(it.item, { clipPath: 'inset(-12% 0% -12% 0)', y: 0, duration: 0.7 }, '+=0')
        .to(it.path, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, '<0.25')
        // hold
        .to(it.item, { duration: 1.7 }, '>')
        // wipe out to the left, swash retracts — unless it's the last (loop wraps to first)
        .to(it.item, { clipPath: 'inset(-12% 0% -12% 100%)', y: -6, duration: 0.55, ease: 'power2.in' }, '>')
        .to(it.path, { strokeDashoffset: () => it.len, duration: 0.35, ease: 'power2.in' }, '<')
        // reset this item off-screen-right for its next turn
        .set(it.item, { clipPath: 'inset(-12% 100% -12% 0)', y: 8 })
        .set(it.path, { strokeDashoffset: () => it.len });
    });

    // pause the loop while the section is off-screen (perf)
    ScrollTrigger.create({
      trigger: '#wordCycle', start: 'top bottom', end: 'bottom top',
      onToggle: (self) => { self.isActive ? tl.play() : tl.pause(); },
    });
  };

  /* ─────────────────────────────────────────────
     recent work: pinned horizontal drift (desktop)
     ───────────────────────────────────────────── */
  let workContainerAnim = null;
  const initWork = () => {
    revealLines('.work__title');
    const track = $('#workTrack');
    const pinwrap = $('#workPin');
    const progress = $('#workProgress');
    if (!track) return;

    // gsap.matchMedia swaps desktop-pin ↔ mobile-carousel cleanly when the
    // viewport crosses 768px (incl. a phone rotating), reverting each on exit.
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const getDist = () => track.scrollWidth - innerWidth;
      workContainerAnim = gsap.to(track, {
        x: () => -getDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinwrap, start: 'top top', end: () => '+=' + Math.round(getDist()),
          pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (st) => { if (progress) progress.style.transform = 'scaleX(' + st.progress + ')'; },
        },
      });
      $$('.card').forEach((card) => {
        gsap.from(card, {
          scale: 0.94, opacity: 0.4, ease: 'none',
          scrollTrigger: {
            trigger: card, containerAnimation: workContainerAnim,
            start: 'left 95%', end: 'left 55%', scrub: true,
          },
        });
        gsap.to($('.card__num', card), {
          xPercent: -35, ease: 'none',
          scrollTrigger: {
            trigger: card, containerAnimation: workContainerAnim,
            start: 'left 100%', end: 'right 0%', scrub: true,
          },
        });
      });
      return () => { workContainerAnim = null; track.style.transform = ''; };
    });

    mm.add('(max-width: 767px)', () => {
      // vertical stack — each card just reveals as it scrolls up. no carousel,
      // no pin, nothing competing with the page scroll or the tissue tear.
      $$('.card').forEach((card) => {
        gsap.from(card, {
          opacity: 0, y: 40, duration: 0.7, ease: EXPO,
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    });
  };

  /* ─────────────────────────────────────────────
     gallery: build the category cards from gallery-data.js
     ───────────────────────────────────────────── */
  const CATS = (window.GALLERY || []);
  let openLightbox = () => {};

  const buildGallery = (opts) => {
    const track = $('#workTrack');
    if (!track || !CATS.length) return;
    const reduced = opts && opts.reduced;
    track.innerHTML = '';
    CATS.forEach((c, i) => {
      const base = 'media/gallery/' + c.slug + '/';
      const card = document.createElement('article');
      card.className = 'card';
      card.dataset.slug = c.slug;

      const num = document.createElement('span');
      num.className = 'card__num';
      num.setAttribute('aria-hidden', 'true');
      num.textContent = String(i + 1).padStart(2, '0');

      const media = document.createElement('div');
      media.className = 'arch card__media';
      if (c.videos && c.videos.length && !reduced) {
        const v = document.createElement('video');
        v.className = 'card__video';
        v.muted = true; v.loop = true; v.playsInline = true;
        v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
        v.preload = 'none';
        v.poster = base + c.poster;
        v.dataset.src = base + c.videos[0];
        media.appendChild(v);
      } else {
        const img = document.createElement('img');
        img.className = 'card__still';
        img.src = base + c.poster;
        img.alt = c.name + ' by Crafts_n_beyond';
        img.loading = 'lazy';
        media.appendChild(img);
      }

      const body = document.createElement('div');
      body.className = 'card__body';
      const h = document.createElement('h3');
      h.className = 'card__name';
      h.textContent = c.name;
      const note = document.createElement('p');
      note.className = 'card__note';
      note.textContent = c.note;
      const btn = document.createElement('button');
      btn.className = 'card__seeall';
      btn.type = 'button';
      const total = c.count + (c.videos ? c.videos.length : 0);
      btn.innerHTML = 'See all ' + total + ' <span aria-hidden="true">&rarr;</span>';
      btn.setAttribute('aria-label', 'See all ' + c.name + ' photos');
      btn.addEventListener('click', () => openLightbox(c.slug));
      body.append(h, note, btn);

      // the revealed media is also a doorway into the full set
      media.addEventListener('click', (e) => {
        if (media.querySelector('.tissue')) return; // still wrapped — let the tear handle it
        openLightbox(c.slug);
      });

      card.append(num, media, body);
      track.appendChild(card);
    });
  };

  /* category videos: load + play only while on screen (perf + battery) */
  const initGalleryVideos = () => {
    const vids = $$('.card__video');
    if (!vids.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting && en.intersectionRatio > 0.55) {
          if (!v.src && v.dataset.src) v.src = v.dataset.src;
          const p = v.play(); if (p && p.catch) p.catch(() => {});
        } else {
          try { v.pause(); } catch (e) {}
        }
      });
    }, { threshold: [0, 0.55, 1] });
    vids.forEach((v) => io.observe(v));
  };

  /* ─────────────────────────────────────────────
     lightbox: a category's full set
     ───────────────────────────────────────────── */
  const initLightbox = () => {
    const lb = $('#lightbox');
    if (!lb) return;
    const grid = $('#lbGrid'), title = $('#lbTitle'), note = $('#lbNote'), eyebrow = $('#lbEyebrow');
    const panel = $('.lightbox__panel', lb);
    let lastFocus = null;

    const close = () => {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      grid.innerHTML = ''; // unmount media (stops any playing video)
      document.body.style.overflow = '';
      if (lenisRef) lenisRef.start();
      if (lastFocus) { try { lastFocus.focus(); } catch (e) {} }
    };

    openLightbox = (slug) => {
      const c = CATS.find((x) => x.slug === slug);
      if (!c) return;
      lastFocus = document.activeElement;
      const base = 'media/gallery/' + c.slug + '/';
      title.textContent = c.name;
      note.textContent = c.note;
      eyebrow.textContent = String(CATS.indexOf(c) + 1).padStart(2, '0') + ' — the full set';
      grid.innerHTML = '';
      // video(s) first, then photos
      (c.videos || []).forEach((v) => {
        const fig = document.createElement('figure');
        fig.className = 'lb-item lb-item--video';
        const el = document.createElement('video');
        el.src = base + v; el.muted = true; el.loop = true; el.playsInline = true;
        el.setAttribute('muted', ''); el.setAttribute('playsinline', '');
        el.controls = true; el.preload = 'metadata'; el.poster = base + c.poster;
        const pr = el.play && el.play(); if (pr && pr.catch) pr.catch(() => {});
        fig.appendChild(el); grid.appendChild(fig);
      });
      c.photos.forEach((p, idx) => {
        const fig = document.createElement('figure');
        fig.className = 'lb-item';
        fig.style.animationDelay = Math.min(idx * 0.045, 0.4) + 's';
        const img = document.createElement('img');
        img.src = base + p.src; img.loading = 'lazy';
        img.width = p.w; img.height = p.h;
        img.alt = c.name + ' — piece ' + (idx + 1);
        fig.appendChild(img); grid.appendChild(fig);
      });
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lenisRef) lenisRef.stop();
      panel.scrollTop = 0;
      $('#lbClose').focus();
    };

    lb.addEventListener('click', (e) => { if (e.target.hasAttribute('data-lb-close')) close(); });
    $('#lbClose').addEventListener('click', close);
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && lb.classList.contains('is-open')) close(); });
  };

  /* ─────────────────────────────────────────────
     tissue: tear the wrapper to meet the work
     ───────────────────────────────────────────── */
  const initTissue = () => {
    const medias = $$('.card__media');
    const JAGS = 12;
    medias.forEach((media, idx) => {
      const seedR = mulberry32(40 + idx);
      const jags = Array.from({ length: JAGS + 1 }, () => (seedR() - 0.5) * 7);

      const tissue = document.createElement('div');
      tissue.className = 'tissue';
      tissue.setAttribute('role', 'button');
      tissue.setAttribute('tabindex', '0');
      tissue.setAttribute('aria-label', 'Unwrap this piece');
      tissue.style.background =
        'radial-gradient(circle at 20% 30%, rgba(176,136,65,0.16) 1.5px, transparent 2px) 0 0/26px 26px, ' +
        'radial-gradient(circle at 70% 80%, rgba(143,45,45,0.10) 1.5px, transparent 2px) 13px 13px/26px 26px, ' +
        'linear-gradient(160deg, #EFD4CD, #E9CCC5 55%, #E3BFB7)';

      const flap = document.createElement('div');
      flap.className = 'tissue';
      flap.style.background = tissue.style.background;
      flap.style.zIndex = '4';
      flap.style.pointerEvents = 'none';
      flap.style.boxShadow = '6px 0 14px rgba(67,32,31,0.18)';

      const hint = document.createElement('span');
      hint.className = 'tissue__hint';
      hint.textContent = idx === 0 ? 'drag to tear' : 'kholo →';
      tissue.appendChild(hint);

      media.appendChild(tissue);
      media.appendChild(flap);

      const clipAt = (p) => {
        const x = p * 112 - 6; // sweep past both edges
        const right = ['polygon('];
        const left = ['polygon(0% 0%,'];
        for (let i = 0; i <= JAGS; i++) {
          const y = (i / JAGS) * 100;
          const xi = Math.min(104, Math.max(-4, x + jags[i]));
          right.push(xi + '% ' + y + '%,');
          left.push(xi + '% ' + y + '%,');
        }
        right.push('100% 100%, 100% 0%)');
        left.push('0% 100%)');
        tissue.style.clipPath = right.join(' ');
        flap.style.clipPath = left.join(' ');
        flap.style.transform = 'translateX(' + p * -26 + 'px) rotate(' + p * -7 + 'deg)';
      };
      clipAt(0);

      let p = 0, dragging = false, startX = 0, startY = 0, moved = false, torn = false, snapTween = null;

      const snapBack = () => {
        if (snapTween) snapTween.kill();
        const proxy = { v: p };
        snapTween = gsap.to(proxy, {
          v: 0, duration: 0.45, ease: 'elastic.out(1, 0.55)',
          onUpdate: () => clipAt(proxy.v),
          onComplete: () => { snapTween = null; },
        });
        p = 0;
      };

      const finish = () => {
        if (torn) return;
        torn = true;
        if (snapTween) { snapTween.kill(); snapTween = null; }
        tissue.classList.add('is-torn');
        const proxy = { v: p };
        gsap.to(proxy, {
          v: 1, duration: 0.4 * (1 - p) + 0.12, ease: 'power2.in',
          onUpdate: () => clipAt(proxy.v),
          onComplete: () => {
            gsap.to(flap, {
              x: -media.clientWidth * 0.7, y: 40, rotate: -24, opacity: 0,
              duration: 0.55, ease: 'power2.in',
              onComplete: () => { tissue.remove(); flap.remove(); },
            });
            if (navigator.vibrate) { try { navigator.vibrate(8); } catch (e) {} }
          },
        });
        gsap.to(hint, { opacity: 0, duration: 0.2 });
      };

      tissue.addEventListener('pointerdown', (e) => {
        if (torn) return;
        if (snapTween) { snapTween.kill(); snapTween = null; }
        dragging = true; moved = false;
        startX = e.clientX; startY = e.clientY;
        tissue.setPointerCapture(e.pointerId);
      });
      tissue.addEventListener('pointermove', (e) => {
        if (!dragging || torn) return;
        const dx = e.clientX - startX;
        // vertical intent → let the page scroll, bail out of the tear
        if (!moved && Math.abs(e.clientY - startY) > Math.abs(dx) + 4) { dragging = false; snapBack(); return; }
        if (Math.abs(dx) > 5) moved = true;
        p = clamp01(dx / (media.clientWidth * 0.75));
        clipAt(p);
        if (p >= 0.96) { dragging = false; finish(); }
      });
      const release = () => {
        if (!dragging || torn) return;
        dragging = false;
        if (p > 0.42) finish();          // a real pull → tear it open
        else if (!moved) finish();       // a deliberate tap → reveal for them
        else snapBack();                 // an unfinished drag → snap shut
      };
      tissue.addEventListener('pointerup', release);
      tissue.addEventListener('pointercancel', () => { if (!dragging || torn) return; dragging = false; snapBack(); });
      tissue.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); finish(); }
      });

      // the first wrapper tears itself — now you know the game
      if (idx === 0) {
        ScrollTrigger.create({
          trigger: media, start: 'top 70%', once: true,
          onEnter: () => setTimeout(finish, 900),
        });
      }
    });
  };

  /* ─────────────────────────────────────────────
     fold: a shagun note pleats into a rosette
     ───────────────────────────────────────────── */
  const initFold = () => {
    const stage = $('#foldStage');
    if (!stage) return;
    const N = 14;

    // the note, drawn once: ivory, gold border, 101 in the corners
    const noteSvg =
      "<svg xmlns='http://www.w3.org/2000/svg' width='480' height='160' viewBox='0 0 480 160'>" +
      "<rect x='2' y='2' width='476' height='156' rx='6' fill='%23FBF3E4' stroke='%23B08841' stroke-width='2.5'/>" +
      "<rect x='12' y='12' width='456' height='136' rx='4' fill='none' stroke='%23B08841' stroke-width='1' stroke-dasharray='5 4'/>" +
      "<circle cx='240' cy='80' r='42' fill='%23F1E8DC' stroke='%23B08841' stroke-width='1.6'/>" +
      "<circle cx='240' cy='80' r='30' fill='none' stroke='%23C98B82' stroke-width='1.2' stroke-dasharray='3 3'/>" +
      "<g fill='%23C98B82' fill-opacity='0.6' stroke='%238F2D2D' stroke-width='1'>" +
      "<ellipse cx='240' cy='62' rx='6' ry='14'/><ellipse cx='240' cy='98' rx='6' ry='14'/>" +
      "<ellipse cx='222' cy='80' rx='14' ry='6'/><ellipse cx='258' cy='80' rx='14' ry='6'/>" +
      "<ellipse cx='227' cy='67' rx='9' ry='9' transform='rotate(-45 227 67)'/><ellipse cx='253' cy='93' rx='9' ry='9' transform='rotate(-45 253 93)'/>" +
      "<ellipse cx='253' cy='67' rx='9' ry='9' transform='rotate(45 253 67)'/><ellipse cx='227' cy='93' rx='9' ry='9' transform='rotate(45 227 93)'/>" +
      "</g><circle cx='240' cy='80' r='7' fill='%238F2D2D'/>" +
      "<text x='36' y='50' font-family='Georgia,serif' font-size='26' fill='%238F2D2D'>101</text>" +
      "<text x='400' y='132' font-family='Georgia,serif' font-size='26' fill='%238F2D2D'>101</text>" +
      "<path d='M60 120 C 80 100 100 140 120 118' fill='none' stroke='%23B08841' stroke-width='1.2'/>" +
      "<path d='M360 42 C 380 22 400 62 420 40' fill='none' stroke='%23B08841' stroke-width='1.2'/>" +
      '</svg>';
    const noteUrl = 'url("data:image/svg+xml,' + noteSvg + '")';

    const strips = [];
    for (let i = 0; i < N; i++) {
      const strip = document.createElement('div');
      strip.className = 'fold__strip';
      const shade = document.createElement('div');
      shade.className = 'fold__strip-shade';
      strip.appendChild(shade);
      stage.appendChild(strip);
      strips.push({ strip, shade });
    }

    const stem = document.createElement('div');
    stem.style.cssText = 'position:absolute;left:50%;top:50%;width:2.5px;height:0;background:#7d8a4f;transform:translateX(-50%);transform-origin:top;';
    stage.appendChild(stem);

    let W = 0, sw = 0;
    const measure = () => {
      W = Math.min(480, stage.clientWidth);
      sw = W / N;
      strips.forEach(({ strip }, i) => {
        strip.style.width = sw + 1 + 'px';
        strip.style.left = '50%';
        strip.style.backgroundImage = noteUrl;
        strip.style.backgroundSize = W + 'px 160px';
        strip.style.backgroundPosition = -(i * sw) + 'px 0';
      });
    };
    measure();
    ScrollTrigger.addEventListener('refreshInit', () => { measure(); render(); });

    gsap.set('#foldCaption', { opacity: 0, y: 12 });

    const state = { f: 0 };
    const render = () => {
      const f = state.f;
      const foldT = clamp01(f / 0.5);                    // 0-0.5: pleat
      const fanT = clamp01((f - 0.52) / 0.3);            // 0.52-0.82: fan
      const s = 1 - foldT * 0.64;                        // strip scaleX (keep petals fleshy)
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const fan = ease(fanT);
      strips.forEach(({ strip, shade }, i) => {
        const centered = (i - (N - 1) / 2) * sw * s;
        const x = centered * (1 - fan) - (sw * s) / 2;
        const angle = (-58 + (i * 116) / (N - 1)) * fan;
        const lift = fan * -34;
        strip.style.transform =
          'translate(' + x + 'px,' + lift + 'px) rotate(' + angle + 'deg) scaleX(' + s + ')' +
          (fan ? ' scaleY(' + (1 + fan * 0.16) + ')' : '');
        strip.style.transformOrigin = '50% 100%';
        strip.style.borderRadius = fan ? '48% 48% 4% 4% / ' + 34 * fan + '% ' + 34 * fan + '% 2% 2%' : '0';
        const shadeBase = i % 2 ? 0.26 : 0.05;
        shade.style.opacity = (shadeBase * foldT * (1 - fan * 0.55)).toFixed(3);
      });
      const settle = clamp01((f - 0.82) / 0.18);
      stage.style.transform = 'scale(' + (1 + fan * 0.22 - settle * 0.06) + ')';
      stem.style.height = clamp01((f - 0.78) / 0.18) * 56 + 'px';
      stem.style.top = 'calc(50% + ' + (fan * -34 + 78) + 'px)';
    };
    render();

    gsap.timeline({
      scrollTrigger: {
        trigger: '#foldPin', start: 'top top', end: '+=170%',
        pin: true, scrub: 0.5, anticipatePin: 1,
      },
    })
      .to(state, { f: 1, ease: 'none', duration: 1, onUpdate: render })
      .to('#foldCaption', { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.86);

    gsap.from('.fold__title, .fold .eyebrow', {
      opacity: 0, y: 24, duration: 0.7, ease: EXPO, stagger: 0.08,
      scrollTrigger: { trigger: '#fold', start: 'top 70%' },
    });
  };

  /* ─────────────────────────────────────────────
     reel: two years of orders, scrubbed by hand
     ───────────────────────────────────────────── */
  const initReel = () => {
    const video = $('#scrubVideo');
    const stamp = $('#reelTime');
    if (!video) return;
    const ORIGINAL_SECONDS = 109.9; // stamp shows the reel's real timeline

    ScrollTrigger.create({
      trigger: '#fold', start: 'top bottom', once: true,
      onEnter: () => { video.preload = 'auto'; video.load(); },
    });

    const notes = [
      { el: $('#mnote1'), a: 0.14, b: 0.30 },
      { el: $('#mnote2'), a: 0.42, b: 0.58 },
      { el: $('#mnote3'), a: 0.70, b: 0.85 },
    ].filter((n) => n.el);
    notes.forEach((n) => {
      n.text = $('.mnote__text', n.el);
      n.arrow = $('svg path', n.el);
      n.L = prepDraw(n.arrow);
      n.strike = $('.strike', n.el);
      n.text.style.clipPath = 'inset(0 100% 0 0)';
    });

    let lastSet = -1, seeking = false;
    video.addEventListener('seeked', () => { seeking = false; });
    // when metadata finally arrives, paint the correct frame for the current scroll pos
    video.addEventListener('loadedmetadata', () => { lastSet = -1; render(); });
    const state = { p: 0 };
    const render = () => {
      const p = state.p;
      if (video.duration && video.readyState >= 1) {
        const t = p * video.duration;
        // one seek in flight at a time — avoids stacking requests and thrashing decode
        if (!seeking && Math.abs(t - lastSet) > 1 / 30) {
          seeking = true;
          video.currentTime = t;
          lastSet = t;
        }
      }
      if (stamp) stamp.textContent = fmtTime(p * ORIGINAL_SECONDS) + ' / ' + fmtTime(ORIGINAL_SECONDS);
      notes.forEach((n) => {
        const local = clamp01((p - n.a) / (n.b - n.a));
        const write = clamp01(local / 0.55);
        const arrowT = clamp01((local - 0.5) / 0.4);
        n.text.style.clipPath = 'inset(0 ' + (1 - write) * 100 + '% 0 0)';
        n.arrow.style.strokeDashoffset = (1 - arrowT) * n.L;
        if (n.strike) n.strike.style.setProperty('--strike', clamp01((local - 0.75) / 0.25));
        n.el.style.opacity = local > 0 ? (p > n.b + 0.06 ? 0.55 : 1) : 0;
      });
    };

    gsap.to(state, {
      p: 1, ease: 'none',
      scrollTrigger: {
        trigger: '#reelPin', start: 'top top', end: '+=260%',
        pin: true, scrub: 0.5, anticipatePin: 1,
      },
      onUpdate: render,
    });

    gsap.from('.reel__head > *', {
      opacity: 0, y: 22, duration: 0.7, ease: EXPO, stagger: 0.09,
      scrollTrigger: { trigger: '#reel', start: 'top 70%' },
    });
    gsap.from('#reelRosette', {
      scale: 0, rotate: -40, duration: 0.6, ease: 'back.out(2)',
      scrollTrigger: { trigger: '#reelPin', start: 'top 40%' },
    });
  };

  /* ─────────────────────────────────────────────
     kind words + marquee
     ───────────────────────────────────────────── */
  const initKind = () => {
    const quote = $('.kind__text');
    if (quote && window.SplitText) {
      const split = new SplitText(quote, { type: 'lines', linesClass: 'kline' });
      split.lines.forEach((l) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'clip';
        l.parentNode.insertBefore(wrap, l);
        wrap.appendChild(l);
      });
      gsap.from(split.lines, {
        yPercent: 110, rotate: 2, duration: 0.8, ease: EXPO, stagger: 0.08,
        scrollTrigger: { trigger: quote, start: 'top 76%' },
      });
    }
    gsap.to('.kind__hl', {
      '--hl': '100%', duration: 0.9, ease: 'power2.inOut',
      scrollTrigger: { trigger: '.kind__text', start: 'top 55%' },
    });
    gsap.from('.kind__photo', {
      opacity: 0, y: 36, rotate: -8, duration: 0.8, ease: EXPO,
      scrollTrigger: { trigger: '.kind__grid', start: 'top 72%' },
    });
    gsap.from('.kind__cite', {
      opacity: 0, duration: 0.6,
      scrollTrigger: { trigger: '.kind__text', start: 'top 55%' },
    });

    const track = $('#marqueeTrack');
    if (track) {
      const tween = gsap.to(track, { xPercent: -50, ease: 'none', duration: 26, repeat: -1 });
      let ts = 1;
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = Math.abs(self.getVelocity()) / 1400;
          ts = gsap.utils.clamp(0.6, 3.2, 1 + v);
        },
      });
      gsap.ticker.add(() => {
        tween.timeScale(gsap.utils.interpolate(tween.timeScale(), ts, 0.06));
        ts = gsap.utils.interpolate(ts, 1, 0.04);
      });
    }
  };

  /* ─────────────────────────────────────────────
     process: numerals, drawn icons, connecting thread
     ───────────────────────────────────────────── */
  const initProcess = () => {
    revealLines('.process__title');
    $$('.step').forEach((step) => {
      const icon = $('.icon-path', step);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: step, start: 'top 72%' },
        defaults: { ease: EXPO },
      });
      tl.from($('.step__num', step), { y: 44, opacity: 0, duration: 0.65 })
        .from([$('.step__name', step), $('.step__copy', step)], { y: 22, opacity: 0, duration: 0.55, stagger: 0.08 }, 0.12);
      if (icon) {
        prepDraw(icon);
        tl.to(icon, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, 0.15);
        tl.add(() => {
          gsap.to($('.step__icon', step), {
            rotate: jitter(0, 1.6), duration: 2.6, repeat: -1, yoyo: true,
            ease: 'sine.inOut', transformOrigin: '50% 90%',
          });
        });
      }
    });
  };

  /* ─────────────────────────────────────────────
     closing: the thread reties the bow around your order
     ───────────────────────────────────────────── */
  const initClosing = () => {
    revealLines('.closing__title');
    const under = $('.underline-path');
    if (under) {
      prepDraw(under);
      gsap.to(under, {
        strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut',
        scrollTrigger: { trigger: '.closing__title', start: 'top 62%' },
      });
    }
    const band = $('#ctaBand');
    const knotPaths = $$('#ctaKnot path');
    if (band) {
      prepDraw(band);
      knotPaths.forEach(prepDraw);
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.closing', start: 'top 78%', end: 'top 30%', scrub: 0.6 },
      });
      tl.to(band, { strokeDashoffset: 0, duration: 0.7, ease: 'none' })
        .to(knotPaths, { strokeDashoffset: 0, duration: 0.3, stagger: 0.06, ease: 'none' }, 0.62);
      ScrollTrigger.create({
        trigger: '.closing', start: 'top 32%', once: true,
        onEnter: () => {
          gsap.fromTo('#ctaBow', { scale: 1 }, { scale: 1.045, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.inOut', transformOrigin: '50% 50%' });
          if (navigator.vibrate) { try { navigator.vibrate(8); } catch (e) {} }
        },
      });
    }
    gsap.from('.closing__ps', {
      opacity: 0, y: 14, duration: 0.6, ease: EXPO,
      scrollTrigger: { trigger: '.closing__ps', start: 'top 88%' },
    });
    gsap.to('.closing__bg', {
      scale: 1.06, ease: 'none',
      scrollTrigger: { trigger: '.closing', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    });
  };

  /* ─────────────────────────────────────────────
     shared: line mask reveals for section titles
     ───────────────────────────────────────────── */
  const revealLines = (sel) => {
    const el = $(sel);
    if (!el) return;
    const lines = $$('.line', el);
    const targets = lines.length ? lines : [el];
    targets.forEach((line) => {
      const inner = document.createElement('span');
      inner.className = 'line-inner';
      inner.style.display = 'block';
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
    });
    gsap.from($$('.line-inner', el).length ? $$('.line-inner', el) : targets, {
      yPercent: 112, rotate: 2.5, duration: 0.85, ease: EXPO, stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 80%' },
    });
  };

  /* ─────────────────────────────────────────────
     chrome: nav, magnetic buttons, cursor dot
     ───────────────────────────────────────────── */
  const initNav = () => {
    const nav = $('#nav');
    ScrollTrigger.create({
      start: 80, end: 'max',
      onUpdate: (self) => {
        nav.classList.toggle('is-scrolled', self.scroll() > 80);
        gsap.to(nav, {
          yPercent: self.direction === 1 && self.scroll() > 300 ? -130 : 0,
          duration: 0.35, ease: 'power2.out', overwrite: 'auto',
        });
      },
    });
  };

  const initMagnetic = () => {
    $$('[data-magnetic]').forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.22);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  };

  const initCursorDot = () => {
    const dot = $('#cursorDot');
    if (!dot) return;
    const label = $('span', dot);
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.25, ease: 'power3.out' });
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.25, ease: 'power3.out' });
    addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    $$('.card__media').forEach((m) => {
      m.addEventListener('mouseenter', () => {
        label.textContent = $('.tissue', m) ? 'tear' : 'view';
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'back.out(1.8)' });
      });
      m.addEventListener('mouseleave', () => gsap.to(dot, { scale: 0, duration: 0.25 }));
    });
  };

  /* ── go ── */
  const start = () => {
    const fontsReady = document.fonts && document.fonts.ready
      ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1600))])
      : Promise.resolve();
    fontsReady.then(boot);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
