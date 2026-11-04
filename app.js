/* Маєток Ліс і Гори — interactions */
document.documentElement.classList.add('js');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- media library (all real: Google Maps photos/videos of the estate + Wikimedia Commons) ---------- */
const I = (n, cap, w = 640, h = 853) => ({ t: 'i', thumb: `img/${n}-640.webp`, src: `img/${n}-1600.webp`, cap, w, h });
const V = (n, cap, poster) => ({ t: 'v', thumb: poster || `media/full/${n}.webp`, src: `media/full/${n}.mp4`, cap });

const GROUPS = {
  reels: [V('basein', 'Басейн з підігрівом', 'media/basein.webp'), V('snig', 'Снігопад над котеджем', 'media/snig.webp'), V('yalynka', 'Вечір біля ялинки', 'media/yalynka.webp'), V('dolyna', 'Поляниця з висоти — маєток серед смерек', 'media/hero.webp')],
  pool: [V('basein-dity', 'Діти в басейні з підігрівом', 'media/basein-dity.webp'), V('basein-2', 'Басейн серед смерек'), V('flamingo', 'Літо в басейні'), V('basein-3', 'Тепла вода у будь-яку погоду'), V('basein', 'Басейн біля шале', 'media/basein.webp'), I('basein-plavannia', 'Купання всією компанією', 640, 960), I('basein-dity', 'Басейн з підігрівом', 640, 960), I('lito-basein', 'Басейн і галявина', 640, 960), I('zyma-basein', 'Басейн узимку', 640, 958)],
  jacuzzi: [V('dzhakuzi', 'Джакузі на терасі Вежі', 'media/dzhakuzi.webp'), V('dzhakuzi-nich', 'Джакузі вночі під гірляндами'), I('dzhakuzi-nich', 'Вечір у джакузі', 640, 960), I('vezha-dzhakuzi', 'Тераса з джакузі серед лісу', 640, 1138)],
  banya: [I('laznia', 'Лазня — справжня пара в банних шапках', 640, 480), I('altanka-vohon', 'Альтанка з вогнищем узимку', 640, 311), I('vohon', 'Живий вогонь', 640, 800)],
  morning: [I('terasa-zyma', 'Тераса з видом на засніжені смереки', 640, 480), V('ranok', 'Ранок на терасі з книжкою', 'media/ranok.webp'), V('yoga', 'Йога на терасі'), I('terasa-chai', 'Чай на терасі', 640, 853), I('veranda', 'Веранда з видом на ліс', 640, 853)],
  fire: [I('styl-kamin', 'Камін у вітальні зрубу', 640, 853), V('kamin-2', 'Живий вогонь'), V('shampanske', 'Свято біля ялинки'), I('kamin-zala', 'Камінна зала', 640, 640), I('kolor-kamin', 'Кам\'яний камін у Колоритному', 640, 853), I('kamin-loft', 'Лофт-камін у Стильному', 640, 800), I('chai-kamin', 'Чай біля вогню', 640, 1388)],
  kids: [I('bilyard', 'Більярд у мансарді', 640, 480), I('dytiacha', 'Дитяча кімната', 640, 427), I('batut', 'Батут на галявині', 640, 960), I('hoidalka', 'Гойдалка серед смерек', 640, 853), I('hamak', 'Гамак під соснами', 640, 853)],
  vezha: [I('vezha', 'Вежа — п\'ять поверхів серед смерек', 640, 853), I('vezha-dzhakuzi', 'Джакузі на терасі', 640, 1138), I('vezha-teleskop', 'Оглядовий поверх з телескопом', 640, 960), I('vezha-zala', 'Панорамна зала', 640, 853), I('vezha-nich', 'Вежа вночі', 640, 853), I('dzhakuzi-nich', 'Джакузі під гірляндами', 640, 960)],
  kolor: [I('kolor', 'Колоритний — шале на 14 гостей', 640, 349), I('kolor-kamin', 'Камінна зала', 640, 853), I('kolor-nomer', 'Номер у гуцульському стилі', 640, 480), I('kolor-spalnia', 'Спальня з килимом', 640, 425), I('kolor-korydor', 'Дерев\'яний коридор', 640, 480)],
  styl: [I('styl', 'Стильний — зруб на кам\'яному цоколі', 640, 427), I('styl-kamin', 'Камін у вітальні', 640, 853), I('styl-vitalnia', 'Світла вітальня', 640, 853), I('styl-spalnia', 'Спальня king-size', 640, 640), I('styl-vanna', 'Ванна з підсвіченим дзеркалом', 640, 640)],
  lis: [I('lis', 'Лісовий — зруб під смереками', 640, 360), I('lis-2', 'Тераса на краю лісу', 640, 1138), I('lis-3', 'Котедж серед галявини', 640, 296), I('lis-zyma', 'Лісовий узимку', 640, 853), I('lis-ranok', 'Ранок у спальні', 640, 960)]
};

const SEASONS = {
  zyma: { t: 'Сніг, лижі й гаряча лазня', d: 'До підйомників Буковеля — 5–10 хвилин. Повертаєтеся в тишу лісу: лазня з купіллю, джакузі під снігопадом і вечір біля каміна.', l: ['Лижі та сноуборд на Буковелі', 'Лазня з купіллю', 'Джакузі під снігом'], loop: 'snig', group: [V('snig', 'Снігопад над котеджем', 'media/snig.webp'), V('dolyna', 'Поляниця з висоти взимку', 'media/hero.webp'), I('dolyna-zyma-2', 'Зимова долина з висоти', 720, 540), I('lis-zyma', 'Лісовий після снігопаду', 640, 853), I('zyma-dakh', 'Засніжені дахи', 640, 853)] },
  lito: { t: 'Басейн, ліс і стежка на Хом\'як', d: 'Відкритий басейн з підігрівом серед смерек, сніданки на терасі, а від воріт — маршрут на Хом\'як, до водоспаду й полонини.', l: ['Басейн з підігрівом', 'Похід на Хом\'як', 'Мангал в альтанці'], loop: 'lito', group: [V('basein-2', 'Літо в басейні', 'media/lito.webp'), V('basein-dity', 'Діти в басейні', 'media/basein-dity.webp'), I('lito-basein', 'Басейн і галявина', 640, 960), I('dolyna-lito', 'Літня долина', 640, 853), I('hamak', 'Гамак під соснами', 640, 853)] },
  osin: { t: 'Тумани, тиша й золоті Карпати', d: 'Найспокійніший сезон: тумани над долиною, гриби вздовж стежок, ранки з кавою на терасі й довгі вечори біля каміна.', l: ['Тумани над долиною', 'Гриби й чорниці', 'Лазня та камін'], loop: 'ranok', group: [V('ranok', 'Ранок на терасі', 'media/ranok.webp'), I('tuman', 'Туман над лісом', 640, 960), I('zakhid-kotedzh', 'Захід над маєтком', 640, 480), I('khmary', 'Хмари під ногами', 640, 480), I('smereky', 'Вікові смереки', 640, 853)] },
  svyata: { t: 'Новий рік у зрубі', d: 'Ялинка в камінній залі, довгий стіл для всієї компанії, гірлянди на терасі й сніг за вікном. Святкові дати бронюють заздалегідь.', l: ['Камінна зала з ялинкою', 'Стіл на 14 гостей', 'Гірлянди й сніг'], loop: 'vecheria', group: [V('vecheria', 'Святкова вечеря', 'media/vecheria.webp'), V('yalynka', 'Вечір біля ялинки', 'media/yalynka.webp'), V('shampanske', 'Свято біля ялинки'), I('yalynka', 'Ялинка в залі', 640, 853), I('yalynka-2', 'Новорічний декор', 640, 853), I('zala-yalynka', 'Камінна зала з ялинкою', 640, 853)] }
};

const W = 'Wikimedia Commons';
const AROUND = [
  ['w-khomiak', 'Гора Хом\'як, 1542 м', 'Маршрут стартує від маєтку', 'Фото: Maximym44, CC BY-SA 4.0, ' + W, 640, 480],
  ['khomiak-tablychka', 'Вершина Хом\'яка', 'Вид на Ґорґани з вершини', 'Фото гостей маєтку', 640, 1137],
  ['w-polonyna', 'Полонина Хом\'яків', 'Пікнік з видом на гори', 'Фото: CC BY-SA 4.0, ' + W, 640, 480],
  ['vodospad', 'Водоспад неподалік', 'Стежкою через ліс', 'Фото гостей маєтку', 640, 296],
  ['w-hoverla', 'Говерла', 'Найвища вершина України', 'Фото: Khoroshkov, CC BY-SA 4.0, ' + W, 640, 427],
  ['w-ozero', 'Озеро Молодості', 'Буковель, 5 км від маєтку', 'Фото: Blablabalooo, CC BY-SA 4.0, ' + W, 640, 480],
  ['w-bukovel', 'Буковель', 'Лижі, сноуборд, ресторани', 'Фото: CC BY-SA 3.0, ' + W, 640, 480],
  ['dolyna-zyma', 'Поляниця з висоти', 'Маєток серед засніжених смерек', 'Фото маєтку', 640, 479],
  ['w-gorgany', 'Ґорґани взимку', 'Найдикіші гори Карпат', 'Фото: Vitalii Bashkatov, CC BY-SA 4.0, ' + W, 640, 427],
  ['zakhid-kotedzh', 'Захід над маєтком', 'Вогняне небо над смереками', 'Фото маєтку', 640, 480],
  ['w-zakhid', 'Захід над смереками', 'Полонина Хом\'яків', 'Фото: Okolomatoris, CC BY-SA 4.0, ' + W, 640, 427],
  ['zyma-basein', 'Басейн під снігом', 'Зима в маєтку', 'Фото маєтку', 640, 958],
  ['w-vechir', 'Вечір на полонині', 'Лавка під смерекою', 'Фото: Okolomatoris, CC BY-SA 4.0, ' + W, 640, 427],
  ['dolyna-lito', 'Літня долина', 'Луки й гори на обрії', 'Фото гостей маєтку', 640, 853],
  ['khmary', 'Хмари під ногами', 'Після дощу в горах', 'Фото гостей маєтку', 640, 480],
  ['lis-vohni', 'Ліс у вогниках', 'Вечірня зона серед смерек', 'Фото маєтку', 640, 1138],
  ['tuman', 'Туман над лісом', 'Ранок у Поляниці', 'Фото маєтку', 640, 960],
  ['smereky', 'Вікові смереки', 'Карпатський нацпарк з трьох боків', 'Фото маєтку', 640, 853]
].map(([n, t, s, c, w, h]) => ({ ...I(n, `${t} — ${s}`, w, h), title: t, sub: s, credit: c }));

const GALLERY = [
  I('lis-zyma', 'Лісовий після снігопаду', 640, 853), I('dzhakuzi-nich', 'Джакузі під гірляндами', 640, 960), I('vezha-nich', 'Вежа вночі', 640, 853),
  I('zakhid-kotedzh', 'Захід над маєтком', 640, 480), I('basein-plavannia', 'Басейн з підігрівом', 640, 960),
  I('lis-vohni', 'Ліс у вогниках', 640, 1138), I('nich-terytoriia', 'Територія вночі', 640, 853),   I('kelykhy', 'Вечір біля басейну', 640, 853), I('veranda-druzi', 'Компанія на веранді', 640, 480), I('vecheria-sklo', 'Вечеря у скляній залі', 640, 1138),
  I('chai-kamin', 'Чай біля каміна', 640, 1388), I('zyma-dakh', 'Засніжені дахи', 640, 853), I('maietok-zyma', 'Маєток узимку з дрона', 640, 479),
  I('yalynka-2', 'Новий рік у зрубі', 640, 853), I('terasa-chai', 'Чай на терасі', 640, 853), I('vezha-teleskop', 'Телескоп у Вежі', 640, 960)
];

/* ---------- nav ---------- */
(function () {
  const nav = document.getElementById('nav'), burger = document.getElementById('burger'), menu = document.getElementById('menu'), hero = document.querySelector('.hero');
  if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => nav.classList.toggle('scrolled', !e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
  const setMenu = open => { menu.classList.toggle('open', open); menu.setAttribute('aria-hidden', String(!open)); burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню'); document.body.style.overflow = open ? 'hidden' : ''; };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
})();

/* ---------- lazy video: load & play only while visible ---------- */
const playVideo = v => { if (reduceMotion || !v) return; if (!v.src) { v.src = v.dataset.src; v.load(); } const p = v.play(); if (p) p.catch(() => {}); };
(function () {
  const vids = [...document.querySelectorAll('video[data-src]')];
  if (!('IntersectionObserver' in window)) { vids.forEach(playVideo); return; }
  const io = new IntersectionObserver(es => es.forEach(en => {
    const v = en.target;
    if (!v.offsetParent && getComputedStyle(v).position !== 'fixed') return;
    if (en.isIntersecting) playVideo(v); else if (v.src) v.pause();
  }), { rootMargin: '200px 0px', threshold: 0.01 });
  vids.forEach(v => io.observe(v));
})();

/* ---------- phone "Back" closes any open overlay and keeps you at the same spot ---------- */
const Back = (function () {
  let fn = null;
  addEventListener('popstate', () => { if (fn) { const f = fn; fn = null; f(); } });
  return {
    open(f) { fn = f; history.pushState({ overlay: 1 }, ''); },
    close() { if (fn) history.back(); }
  };
})();
const EASE = 'cubic-bezier(.32,.72,0,1)';
const lockPage = on => document.documentElement.classList.toggle('zv-open', on);

/* ---------- viewer: photo/video grows to full screen, native swipe, pinch & double-tap zoom, no sound ---------- */
const ZV = (function () {
  const root = document.getElementById('zv'), track = document.getElementById('zv-track');
  const count = document.getElementById('zv-count'), cap = document.getElementById('zv-cap');
  const prevB = document.getElementById('zv-prev'), nextB = document.getElementById('zv-next');
  let items = [], k = -1, last = null, z = { s: 1, x: 0, y: 0 };
  const slide = i => track.children[i];
  const media = i => { const s = slide(i); return s && s.firstElementChild; };
  const esc = t => (t || '').replace(/"/g, '&quot;');

  function fit(i) {
    const sl = slide(i); if (!sl) return;
    const cs = getComputedStyle(sl), it = items[i];
    const bw = sl.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const bh = sl.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const ar = it.ar || (it.w && it.h ? it.w / it.h : 9 / 16);
    const w = Math.min(bw, bh * ar);
    Object.assign(sl.firstElementChild.style, { width: w + 'px', height: w / ar + 'px' });
  }
  function hiRes(i) {
    const it = items[i], el = media(i);
    if (!el || it.t !== 'i' || el.dataset.hi) return;
    el.dataset.hi = 1; el.loading = 'eager';
    const p = new Image(); p.src = it.src;
    const swap = () => { el.src = it.src; };
    if (p.decode) p.decode().then(swap, swap); else p.onload = swap;
  }
  function setZoom(s, x, y, anim) {
    z = { s, x, y };
    const el = media(k); if (!el) return;
    el.style.transition = anim ? `transform .32s ${EASE}` : 'none';
    el.style.transform = s === 1 && !x && !y ? '' : `translate(${x}px, ${y}px) scale(${s})`;
    track.classList.toggle('zoomed', s > 1);
  }
  function clampZoom() {
    const el = media(k); if (!el) return;
    const lx = Math.max(0, (z.s * el.offsetWidth - track.clientWidth) / 2), ly = Math.max(0, (z.s * el.offsetHeight - track.clientHeight) / 2);
    setZoom(z.s, Math.max(-lx, Math.min(lx, z.x)), Math.max(-ly, Math.min(ly, z.y)), true);
  }
  function activate(i) {
    if (i === k) return;
    if (k >= 0 && z.s !== 1) setZoom(1, 0, 0);
    k = i;
    const it = items[k];
    count.textContent = items.length > 1 ? `${k + 1} / ${items.length}` : '';
    cap.innerHTML = (it.cap || '') + (it.credit ? `<small>${it.credit}</small>` : '');
    prevB.disabled = k === 0; nextB.disabled = k === items.length - 1;
    [k, k + 1, k - 1].forEach(j => { if (j >= 0 && j < items.length) hiRes(j); });
    [...track.children].forEach((sl, j) => {
      const v = sl.firstElementChild; if (v.tagName !== 'VIDEO') return;
      if (j === k) { if (!v.getAttribute('src')) v.src = items[j].src; const p = v.play(); if (p) p.catch(() => {}); }
      else if (!v.paused) v.pause();
    });
  }
  let raf = 0;
  track.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; const i = Math.round(track.scrollLeft / track.clientWidth); if (i >= 0 && i < items.length) activate(i); });
  }, { passive: true });

  function flipIn(from) {
    const el = media(k); if (!el || reduceMotion) return;
    const b = el.getBoundingClientRect(), a = from && from.getBoundingClientRect();
    if (!a || !a.width || a.bottom < 0 || a.top > innerHeight) { el.animate([{ opacity: 0, transform: 'scale(.94)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: EASE }); return; }
    const s = Math.max(a.width / b.width, a.height / b.height);
    const tx = a.left + a.width / 2 - b.left - s * b.width / 2, ty = a.top + a.height / 2 - b.top - s * b.height / 2;
    el.animate([{ transformOrigin: '0 0', transform: `translate(${tx}px, ${ty}px) scale(${s})`, borderRadius: '18px' }, { transformOrigin: '0 0', transform: 'none', borderRadius: '6px' }], { duration: 440, easing: EASE });
  }
  function open(list, start = 0, from) {
    items = list; k = -1; last = document.activeElement; z = { s: 1, x: 0, y: 0 };
    track.classList.remove('zoomed');
    root.classList.toggle('single', list.length < 2);
    track.innerHTML = list.map((it, i) => `<div class="zv-slide">${it.t === 'v'
      ? `<video muted loop playsinline preload="none" poster="${it.thumb}" aria-label="${esc(it.cap)}"></video>`
      : `<img src="${it.thumb}" alt="${esc(it.cap)}" decoding="async"${Math.abs(i - start) > 1 ? ' loading="lazy"' : ''}>`}</div>`).join('');
    track.querySelectorAll('video').forEach(v => v.addEventListener('loadedmetadata', () => {
      const i = [...track.children].indexOf(v.parentElement); if (i < 0) return;
      items[i].ar = v.videoWidth / v.videoHeight; fit(i);
    }));
    root.hidden = false; lockPage(true);
    list.forEach((_, i) => fit(i));
    track.scrollLeft = start * track.clientWidth;
    activate(start);
    flipIn(from);
    Back.open(shut);
    document.getElementById('zv-close').focus({ preventScroll: true });
  }
  function shut() {
    if (root.hidden) return;
    track.querySelectorAll('video').forEach(v => v.pause());
    root.classList.add('out');
    setTimeout(() => { root.hidden = true; root.classList.remove('out'); track.innerHTML = ''; items = []; k = -1; lockPage(false); }, 220);
    if (last && last.focus) last.focus({ preventScroll: true });
  }
  const close = () => Back.close();
  const go = d => { const i = Math.max(0, Math.min(items.length - 1, k + d)); track.scrollTo({ left: i * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' }); };
  document.getElementById('zv-close').addEventListener('click', close);
  prevB.addEventListener('click', () => go(-1));
  nextB.addEventListener('click', () => go(1));
  document.addEventListener('keydown', e => { if (root.hidden) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); });
  addEventListener('resize', () => { if (root.hidden) return; items.forEach((_, i) => fit(i)); setZoom(1, 0, 0); track.scrollLeft = k * track.clientWidth; });

  /* touch: tap = close, double tap / pinch = zoom, one finger drag when zoomed = pan */
  let t0 = null, pinch = null, pan = null, tapTimer = 0, tapX = 0, tapY = 0, lastTouch = 0;
  const center = () => { const r = slide(k).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
  const dist = (p, q) => Math.hypot(p.clientX - q.clientX, p.clientY - q.clientY);
  function toggleZoom(px, py) {
    if (z.s > 1) return setZoom(1, 0, 0, true);
    const c = center(), S = 2.5;
    setZoom(S, -(S - 1) * (px - c.x), -(S - 1) * (py - c.y), true); clampZoom();
  }
  track.addEventListener('touchstart', e => {
    lastTouch = Date.now();
    if (!media(k)) return;
    if (e.touches.length === 2) {
      e.preventDefault();
      const [p, q] = e.touches, c = center();
      const mx = (p.clientX + q.clientX) / 2 - c.x, my = (p.clientY + q.clientY) / 2 - c.y;
      pinch = { d: dist(p, q), s: z.s, cx: (mx - z.x) / z.s, cy: (my - z.y) / z.s }; pan = null; t0 = null;
    } else if (e.touches.length === 1) {
      const p = e.touches[0];
      t0 = { x: p.clientX, y: p.clientY, t: Date.now(), moved: false };
      pan = z.s > 1 ? { x: p.clientX - z.x, y: p.clientY - z.y } : null;
    }
  }, { passive: false });
  track.addEventListener('touchmove', e => {
    if (pinch && e.touches.length === 2) {
      e.preventDefault();
      const [p, q] = e.touches, c = center();
      const s = Math.min(5, Math.max(1, pinch.s * dist(p, q) / pinch.d));
      const mx = (p.clientX + q.clientX) / 2 - c.x, my = (p.clientY + q.clientY) / 2 - c.y;
      setZoom(s, mx - s * pinch.cx, my - s * pinch.cy);
    } else if (pan && e.touches.length === 1) {
      e.preventDefault();
      const p = e.touches[0]; setZoom(z.s, p.clientX - pan.x, p.clientY - pan.y);
    }
    if (t0) { const p = e.touches[0]; if (Math.hypot(p.clientX - t0.x, p.clientY - t0.y) > 10) t0.moved = true; }
  }, { passive: false });
  track.addEventListener('touchend', e => {
    lastTouch = Date.now();
    if (pinch) {
      if (e.touches.length < 2) { pinch = null; if (z.s < 1.05) setZoom(1, 0, 0, true); else clampZoom(); }
      if (e.touches.length === 1 && z.s > 1) { const p = e.touches[0]; pan = { x: p.clientX - z.x, y: p.clientY - z.y }; }
      return;
    }
    if (pan && !e.touches.length) { pan = null; clampZoom(); }
    if (t0 && !t0.moved && Date.now() - t0.t < 350 && !e.touches.length) {
      const p = e.changedTouches[0];
      if (tapTimer && Math.hypot(p.clientX - tapX, p.clientY - tapY) < 40) { clearTimeout(tapTimer); tapTimer = 0; toggleZoom(p.clientX, p.clientY); }
      else { tapX = p.clientX; tapY = p.clientY; tapTimer = setTimeout(() => { tapTimer = 0; if (z.s > 1) setZoom(1, 0, 0, true); else close(); }, 270); }
    }
    t0 = null;
  });
  /* mouse: click = close, double click = zoom */
  let clickTimer = 0;
  track.addEventListener('click', e => {
    if (Date.now() - lastTouch < 800) return;
    if (clickTimer) { clearTimeout(clickTimer); clickTimer = 0; toggleZoom(e.clientX, e.clientY); return; }
    clickTimer = setTimeout(() => { clickTimer = 0; if (z.s > 1) setZoom(1, 0, 0, true); else close(); }, 260);
  });
  return { open };
})();

/* ---------- hero phones: tap = the phone itself grows to (almost) full screen, same muted video ---------- */
(function () {
  const pz = document.getElementById('pz'), pv = pz.querySelector('video'), shell = pz.querySelector('.bezel');
  let from = null;
  const place = () => {
    const H = Math.min(innerHeight * 0.88, innerWidth * 0.92 * 16 / 9), W = H * 9 / 16;
    Object.assign(shell.style, { width: W + 'px', height: H + 'px', left: (innerWidth - W) / 2 + 'px', top: (innerHeight - H) / 2 + 'px' });
  };
  const flip = (a, b) => `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width})`;
  function open(reel) {
    const v = reel.querySelector('video'); from = reel.querySelector('.bezel');
    const src = v.getAttribute('src') || v.dataset.src;
    pv.poster = v.poster;
    if (pv.getAttribute('src') !== src) pv.src = src;
    try { pv.currentTime = v.currentTime || 0; } catch (e) {}
    pz.hidden = false; lockPage(true); place();
    const p = pv.play(); if (p) p.catch(() => {});
    if (!reduceMotion) shell.animate([{ transform: flip(from.getBoundingClientRect(), shell.getBoundingClientRect()) }, { transform: 'none' }], { duration: 480, easing: EASE });
    from.style.visibility = 'hidden';
    Back.open(shut);
  }
  function shut() {
    const done = () => { pz.hidden = true; pz.classList.remove('out'); pv.pause(); if (from) from.style.visibility = ''; lockPage(false); };
    pz.classList.add('out');
    if (reduceMotion || !from) return done();
    shell.animate([{ transform: 'none' }, { transform: flip(from.getBoundingClientRect(), shell.getBoundingClientRect()) }], { duration: 380, easing: EASE, fill: 'forwards' }).onfinish = function () { done(); this.cancel(); };
  }
  document.querySelectorAll('.reel').forEach(r => {
    r.addEventListener('click', () => open(r));
    r.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(r); } });
  });
  pz.addEventListener('click', () => Back.close());
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !pz.hidden) Back.close(); });
  addEventListener('resize', () => { if (!pz.hidden) place(); });
})();

/* buttons with data-open="group" */
let currentSeason = 'zyma';
document.addEventListener('click', e => {
  const b = e.target.closest('[data-open]');
  if (!b) return;
  const g = b.dataset.open === 'season' ? SEASONS[currentSeason].group : GROUPS[b.dataset.open];
  if (g) ZV.open(g, +(b.dataset.start || 0), b);
});

/* tile chips: real number of items in each group */
document.querySelectorAll('.tile[data-open]').forEach(t => {
  const g = GROUPS[t.dataset.open], chip = t.querySelector('.tile-chip');
  if (!g || !chip) return;
  const nv = g.filter(x => x.t === 'v').length, ni = g.length - nv;
  const label = nv && ni ? `Відео й фото · ${g.length}` : nv ? `Відео · ${nv}` : `Фото · ${ni}`;
  [...chip.childNodes].forEach(n => { if (n.nodeType === 3) n.remove(); });
  chip.append(label);
});

/* ---------- inline photos in the intro: tap = open that photo full screen ---------- */
document.querySelectorAll('.inline-img').forEach(el => {
  const it = { t: 'i', thumb: el.dataset.thumb, src: el.dataset.full, w: +el.dataset.w, h: +el.dataset.h, cap: el.getAttribute('aria-label') };
  const open = () => ZV.open([it], 0, el);
  el.addEventListener('click', open);
  el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
});

/* ---------- cottage carousels: native swipe strip, no reloading/flicker ---------- */
document.querySelectorAll('[data-gallery]').forEach(box => {
  const list = GROUPS[box.dataset.gallery];
  const name = box.closest('.cot').querySelector('h3').textContent;
  box.innerHTML = `<div class="cot-track">${list.map((it, i) => `<img class="slide" src="${it.thumb}" srcset="${it.thumb} 640w, ${it.src} 1600w" sizes="(max-width: 900px) 100vw, 55vw" alt="${it.cap}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async">`).join('')}</div>
     <button type="button" class="round round-light cot-arrow prev" aria-label="Попереднє фото: ${name}"><svg viewBox="0 0 16 16"><path d="M10 3 5 8l5 5"/></svg></button>
     <button type="button" class="round round-light cot-arrow next" aria-label="Наступне фото: ${name}"><svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5"/></svg></button>
     <div class="cot-bar"><div class="cot-dots">${list.map((_, i) => `<button type="button" aria-label="Фото ${i + 1}"${i === 0 ? ' class="on"' : ''}></button>`).join('')}</div>
     <button type="button" class="cot-zoom"><svg viewBox="0 0 16 16"><path d="M10 2h4v4M6 14H2v-4M14 2 9 7M2 14l5-5"/></svg>Усі фото · ${list.length}</button></div>`;
  const track = box.querySelector('.cot-track'), slides = [...track.children], dots = [...box.querySelectorAll('.cot-dots button')];
  let k = 0, raf = 0;
  const go = n => track.scrollTo({ left: ((n + slides.length) % slides.length) * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
  track.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; const i = Math.round(track.scrollLeft / track.clientWidth); if (i !== k) { k = i; dots.forEach((d, j) => d.classList.toggle('on', j === k)); } });
  }, { passive: true });
  box.querySelector('.prev').addEventListener('click', () => go(k - 1));
  box.querySelector('.next').addEventListener('click', () => go(k + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  slides.forEach((s, i) => s.addEventListener('click', () => ZV.open(list, i, s)));
  box.querySelector('.cot-zoom').addEventListener('click', () => ZV.open(list, k, slides[k]));
});

/* ---------- surroundings rail ---------- */
(function () {
  const rail = document.getElementById('rail');
  rail.innerHTML = AROUND.map((it, i) => `<button type="button" class="spot" data-i="${i}"><span class="spot-img"><img src="${it.thumb}" alt="${it.title}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async"></span><span class="spot-txt"><b>${it.title}</b><span>${it.sub}</span></span></button>`).join('');
  rail.addEventListener('click', e => { const s = e.target.closest('.spot'); if (s) ZV.open(AROUND, +s.dataset.i, s.querySelector('img')); });
  const prev = document.getElementById('rail-prev'), next = document.getElementById('rail-next');
  const step = () => { const s = rail.querySelector('.spot'); return s ? (s.offsetWidth + 14) * Math.max(1, Math.floor(rail.clientWidth / (s.offsetWidth + 14)) - 1) : 300; };
  const upd = () => { prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8; };
  prev.addEventListener('click', () => rail.scrollBy({ left: -step() }));
  next.addEventListener('click', () => rail.scrollBy({ left: step() }));
  rail.addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true });
  addEventListener('resize', upd); upd();
})();

/* ---------- gallery ---------- */
(function () {
  const m = document.getElementById('masonry');
  m.innerHTML = GALLERY.map((it, i) => `<button type="button" class="m reveal" data-i="${i}"><img src="${it.thumb}" alt="${it.cap}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async"></button>`).join('');
  m.addEventListener('click', e => { const b = e.target.closest('.m'); if (b) ZV.open([GALLERY[+b.dataset.i]], 0, b.querySelector('img')); });
})();

/* ---------- seasons ---------- */
(function () {
  const tabs = [...document.querySelectorAll('.sea-tabs button')], layers = [...document.querySelectorAll('.sea-layer')];
  const box = document.querySelector('.sea-text'), video = document.getElementById('sea-video');
  const tEl = document.getElementById('sea-title'), dEl = document.getElementById('sea-desc'), lEl = document.getElementById('sea-list');
  function set(s, first) {
    currentSeason = s;
    const x = SEASONS[s];
    tabs.forEach(b => b.setAttribute('aria-selected', String(b.dataset.s === s)));
    layers.forEach(l => l.classList.toggle('is-on', l.dataset.season === s));
    tEl.textContent = x.t; dEl.textContent = x.d; lEl.innerHTML = x.l.map(i => `<li>${i}</li>`).join('');
    const src = `media/${x.loop}.mp4`, poster = `media/${x.loop}.webp`;
    video.poster = poster; video.dataset.src = src;
    if (video.src || !first) { video.style.opacity = 0; setTimeout(() => { video.src = src; video.load(); playVideo(video); video.style.opacity = 1; }, 250); }
    if (!first) { box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap'); }
  }
  tabs.forEach(b => b.addEventListener('click', () => set(b.dataset.s)));
  const m = new Date().getMonth() + 1;
  set(m === 12 || m <= 3 ? 'zyma' : m <= 8 ? 'lito' : 'osin', true);
})();

/* ---------- reveal ---------- */
(function () {
  const els = [...document.querySelectorAll('.reveal')];
  const groups = new Map();
  els.forEach(el => { const p = el.parentElement, i = groups.get(p) || 0; el.style.setProperty('--rd', Math.min(i, 6)); groups.set(p, i + 1); });
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  els.forEach(el => io.observe(el));
  setTimeout(() => els.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }), 1600);
})();

/* ---------- booking ---------- */
(function () {
  // Орієнтовні ціни з відкритих джерел (karpaty.love) — уточнити у власника.
  const COTTAGES = [
    { id: 'vezha', name: 'Вежа', max: 7, rate: 10000, note: 'джакузі на терасі' },
    { id: 'lisovyi', name: 'Лісовий', max: 8, rate: 10000, note: 'під смереками' },
    { id: 'kolorytnyi', name: 'Колоритний', max: 14, rate: 29200, note: 'камінна зала' },
    { id: 'stylnyi', name: 'Стильний', max: 14, rate: 29200, note: 'king-size і камін' }
  ];
  const PHONE = '+380504680470', EMAIL = 'lisovyi.maietok@gmail.com';
  const $ = id => document.getElementById(id);
  const form = $('book-form'), inEl = $('in'), outEl = $('out'), gOut = $('guests'), pet = $('pet');
  const rows = $('rows'), season = $('season'), msg = $('form-msg'), total = $('total'), totalLabel = $('total-label');
  let guests = 6, picked = null;
  const fmt = n => n.toLocaleString('uk-UA').replace(/ /g, ' ') + ' ₴';
  const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  [inEl, $('q-in')].forEach(el => el.min = iso(today));
  [outEl, $('q-out')].forEach(el => el.min = iso(new Date(+today + 864e5)));
  const plural = (n, a, b, c) => { const x = n % 10, y = n % 100; return x === 1 && y !== 11 ? a : x >= 2 && x <= 4 && (y < 10 || y >= 20) ? b : c; };
  const nights = () => { if (!inEl.value || !outEl.value) return 0; const n = Math.round((new Date(outEl.value) - new Date(inEl.value)) / 864e5); return n > 0 ? n : 0; };
  function seasonText() {
    if (!inEl.value) return 'Оберіть дати — підкажемо, що працює в маєтку саме тоді.';
    const m = new Date(inEl.value).getMonth() + 1;
    if (m === 12 || m <= 3) return 'Зима: сезон на Буковелі, 5 км до підйомників. Увечері — лазня і камін.';
    if (m >= 6 && m <= 9) return 'Літо: басейн з підігрівом відкритий, стежка на Хом\'як — від воріт.';
    if (m === 4 || m === 5) return 'Весна: тихий ліс, повноводий водоспад, лазня й джакузі працюють.';
    return 'Осінь: тумани над долиною, золоті Карпати, вечори біля каміна.';
  }
  function render() {
    const n = nights();
    season.textContent = seasonText();
    rows.innerHTML = '';
    COTTAGES.forEach(c => {
      const fits = guests <= c.max, b = document.createElement('button');
      b.type = 'button'; b.className = 'opt' + (fits ? '' : ' is-off'); b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', String(picked === c.id));
      b.innerHTML = `<b>${c.name}</b><span>${fits ? 'до ' + c.max + ' гостей · ' + c.note : 'замало місць — до ' + c.max}</span><i>${n ? fmt(c.rate * n) : 'від ' + fmt(c.rate) + ' / ніч'}</i>`;
      b.addEventListener('click', () => { picked = c.id; if (!fits) { guests = c.max; gOut.textContent = guests; } render(); });
      rows.appendChild(b);
    });
    const c = COTTAGES.find(x => x.id === picked);
    if (c && n) { total.textContent = fmt(c.rate * n); totalLabel.textContent = `${c.name} · ${n} ${plural(n, 'ніч', 'ночі', 'ночей')}`; }
    else if (c) { total.textContent = 'від ' + fmt(c.rate); totalLabel.textContent = `${c.name} · за ніч`; }
    else { total.textContent = '—'; totalLabel.textContent = 'Оберіть котедж'; }
  }
  $('g-minus').addEventListener('click', () => { guests = Math.max(1, guests - 1); gOut.textContent = guests; render(); });
  $('g-plus').addEventListener('click', () => { guests = Math.min(16, guests + 1); gOut.textContent = guests; render(); });
  const syncOut = (inp, out) => { if (!inp.value) return; const next = new Date(+new Date(inp.value) + 864e5); out.min = iso(next); if (!out.value || out.value <= inp.value) out.value = iso(new Date(+next + 864e5)); };
  inEl.addEventListener('change', () => { syncOut(inEl, outEl); render(); });
  outEl.addEventListener('change', render);
  $('q-in').addEventListener('change', () => syncOut($('q-in'), $('q-out')));
  const goBook = () => $('bronyuvannia').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  $('quick-book').addEventListener('submit', e => {
    e.preventDefault();
    if ($('q-in').value) inEl.value = $('q-in').value;
    if ($('q-out').value) outEl.value = $('q-out').value;
    guests = +$('q-guests').value; gOut.textContent = guests;
    const fit = COTTAGES.filter(c => guests <= c.max).sort((a, b) => a.rate - b.rate)[0];
    picked = fit ? fit.id : null; render(); goBook();
  });
  document.querySelectorAll('[data-pick]').forEach(b => b.addEventListener('click', () => {
    picked = b.dataset.pick; const c = COTTAGES.find(x => x.id === picked);
    if (guests > c.max) { guests = c.max; gOut.textContent = guests; }
    render(); goBook();
  }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    let bad = null;
    [inEl, outEl, $('name'), $('phone')].forEach(f => { const empty = !f.value.trim(); f.setAttribute('aria-invalid', String(empty)); if (empty && !bad) bad = f; });
    if (bad) { msg.textContent = 'Заповніть дати, ім\'я і телефон — і ми підтвердимо бронь.'; bad.focus(); return; }
    if (!picked) { const fit = COTTAGES.find(c => guests <= c.max); picked = fit ? fit.id : 'stylnyi'; render(); }
    const c = COTTAGES.find(x => x.id === picked), n = nights();
    const text = `Вітаю! Хочу забронювати котедж «${c.name}» з ${inEl.value} по ${outEl.value} (${n} ${plural(n, 'ніч', 'ночі', 'ночей')}), гостей: ${guests}${pet.checked ? ', з собакою' : ''}. ${$('name').value}, ${$('phone').value}.${$('wish').value ? ' Побажання: ' + $('wish').value : ''}`;
    // Демо: на продакшені — відправка в Telegram-бот адміністратора / CRM.
    const esc = s => s.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    msg.innerHTML = `Дякуємо, ${esc($('name').value)}! Заявку на «${c.name}» прийнято — адміністратор передзвонить, щоб підтвердити дати. Швидше: <a href="viber://chat?number=%2B380504680470&draft=${encodeURIComponent(text)}">Viber</a> · <a href="tel:${PHONE}">дзвінок</a> · <a href="mailto:${EMAIL}?subject=${encodeURIComponent('Бронювання: ' + c.name)}&body=${encodeURIComponent(text)}">email</a>`;
  });
  render();
})();

/* ---------- map on demand ---------- */
document.getElementById('map-btn').addEventListener('click', () => {
  document.getElementById('map').innerHTML = '<iframe title="Маєток Ліс і Гори на карті" src="https://www.google.com/maps?q=48.3490777,24.4741761&z=14&hl=uk&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
});

/* ---------- footer info ---------- */
(function () {
  const b = document.getElementById('info-btn'), p = document.getElementById('info-pop');
  b.addEventListener('click', () => { const open = p.hidden; p.hidden = !open; b.setAttribute('aria-expanded', String(open)); });
  document.addEventListener('click', e => { if (!p.hidden && !e.target.closest('.info')) { p.hidden = true; b.setAttribute('aria-expanded', 'false'); } });
})();

/* ---------- mobile dock ---------- */
(function () {
  const dock = document.getElementById('dock'), hero = document.querySelector('.hero'), book = document.getElementById('bronyuvannia'), cots = document.querySelector('.stack');
  if (!('IntersectionObserver' in window)) return;
  let h = true, b = false, c = false;
  const upd = () => dock.classList.toggle('show', !h && !b && !c);
  new IntersectionObserver(([e]) => { h = e.isIntersecting; upd(); }).observe(hero);
  new IntersectionObserver(([e]) => { b = e.isIntersecting; upd(); }, { threshold: 0.05 }).observe(book);
  /* cottage cards have their own price + button: keep the dock out of their way */
  new IntersectionObserver(([e]) => { c = e.isIntersecting; upd(); }, { rootMargin: '-15% 0px -15% 0px' }).observe(cots);
})();
