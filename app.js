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
  banya: [I('laznia', 'Лазня — справжня пара в банних шапках', 640, 480), I('khalaty', 'Після лазні — халати й вогонь у каміні', 640, 960), I('altanka-vohon', 'Альтанка з вогнищем узимку', 640, 311), I('vohon', 'Живий вогонь', 640, 800)],
  morning: [I('terasa-zyma', 'Тераса з видом на засніжені смереки', 640, 480), V('ranok', 'Ранок на терасі з книжкою', 'media/ranok.webp'), V('yoga', 'Йога на терасі'), V('balkon', 'Ліс просто за балконом'), V('svitanok', 'Світанок у котеджі'), I('terasa-chai', 'Чай на терасі', 640, 853), I('snidanok', 'Сніданок на терасі', 640, 480), I('snidanok-2', 'Святковий сніданок', 640, 960), I('veranda', 'Веранда з видом на ліс', 640, 853)],
  fire: [I('styl-kamin', 'Камін у вітальні зрубу', 640, 853), V('kamin', 'Вечір біля каміна', 'media/kamin.webp'), V('kamin-2', 'Живий вогонь'), V('shampanske', 'Свято біля ялинки'), I('kamin-zala', 'Камінна зала', 640, 640), I('kolor-kamin', 'Кам\'яний камін у Колоритному', 640, 853), I('kamin-loft', 'Лофт-камін у Стильному', 640, 800), I('chai-kamin', 'Чай біля вогню', 640, 1388), I('khalaty', 'Халати й вогонь', 640, 960)],
  kids: [I('bilyard', 'Більярд у мансарді', 640, 480), I('dytiacha', 'Дитяча кімната', 640, 427), I('batut', 'Батут на галявині', 640, 960), I('hoidalka', 'Гойдалка серед смерек', 640, 853), I('hamak', 'Гамак під соснами', 640, 853)],
  vezha: [I('vezha', 'Вежа — п\'ять поверхів серед смерек', 640, 853), I('vezha-dzhakuzi', 'Джакузі на терасі', 640, 1138), I('vezha-teleskop', 'Оглядовий поверх з телескопом', 640, 960), I('vezha-zala', 'Панорамна зала', 640, 853), I('vezha-nich', 'Вежа вночі', 640, 853), I('dzhakuzi-nich', 'Джакузі під гірляндами', 640, 960)],
  kolor: [I('kolor', 'Колоритний — шале на 14 гостей', 640, 450), I('kolor-kamin', 'Камінна зала', 640, 853), I('kolor-nomer', 'Номер у гуцульському стилі', 640, 480), I('kolor-spalnia', 'Спальня з килимом', 640, 450), I('kolor-korydor', 'Дерев\'яний коридор', 640, 480)],
  styl: [I('styl', 'Стильний — зруб на кам\'яному цоколі', 640, 427), I('styl-kamin', 'Камін у вітальні', 640, 853), I('styl-vitalnia', 'Світла вітальня', 640, 853), I('styl-spalnia', 'Спальня king-size', 640, 640), I('styl-vanna', 'Ванна з підсвіченим дзеркалом', 640, 640)],
  lis: [I('lis', 'Лісовий — зруб під смереками', 640, 360), I('lis-2', 'Тераса на краю лісу', 640, 1138), I('lis-3', 'Котедж серед галявини', 640, 296), I('lis-zyma', 'Лісовий узимку', 640, 853), I('lis-ranok', 'Ранок у спальні', 640, 960)]
};

const SEASONS = {
  zyma: { t: 'Сніг, лижі й гаряча лазня', d: 'До підйомників Буковеля — 5–10 хвилин. Повертаєтеся в тишу лісу: лазня з купіллю, джакузі під снігопадом і вечір біля каміна.', l: ['Лижі та сноуборд на Буковелі', 'Лазня з купіллю', 'Джакузі під снігом'], loop: 'snig', group: [V('snig', 'Снігопад над котеджем', 'media/snig.webp'), V('dolyna', 'Поляниця з висоти взимку', 'media/hero.webp'), I('zyma-vohni', 'Ніч після снігопаду', 640, 1138), I('zyma-smereky', 'Смереки в снігу', 640, 1137), I('zyma-dakh', 'Засніжені дахи', 640, 853)] },
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
  ['zyma-vohni', 'Ніч після снігопаду', 'Котедж у вогниках', 'Фото маєтку', 640, 1138],
  ['w-vechir', 'Вечір на полонині', 'Лавка під смерекою', 'Фото: Okolomatoris, CC BY-SA 4.0, ' + W, 640, 427],
  ['dolyna-lito', 'Літня долина', 'Луки й гори на обрії', 'Фото гостей маєтку', 640, 853],
  ['khmary', 'Хмари під ногами', 'Після дощу в горах', 'Фото гостей маєтку', 640, 480],
  ['lis-vohni', 'Ліс у вогниках', 'Вечірня зона серед смерек', 'Фото маєтку', 640, 1138],
  ['tuman', 'Туман над лісом', 'Ранок у Поляниці', 'Фото маєтку', 640, 960],
  ['smereky', 'Вікові смереки', 'Карпатський нацпарк з трьох боків', 'Фото маєтку', 640, 853]
].map(([n, t, s, c, w, h]) => ({ ...I(n, `${t} — ${s}`, w, h), title: t, sub: s, credit: c }));

const GALLERY = [
  I('zyma-vohni', 'Ніч після снігопаду', 640, 1138), I('dzhakuzi-nich', 'Джакузі під гірляндами', 640, 960), I('vezha-nich', 'Вежа вночі', 640, 853),
  I('zakhid-kotedzh', 'Захід над маєтком', 640, 480), I('khalaty', 'Вечір біля каміна', 640, 960), I('basein-plavannia', 'Басейн з підігрівом', 640, 960),
  I('lis-vohni', 'Ліс у вогниках', 640, 1138), I('nich-terytoriia', 'Територія вночі', 640, 853), I('snidanok-2', 'Святковий сніданок', 640, 960),
  I('kelykhy', 'Вечір біля басейну', 640, 853), I('veranda-druzi', 'Компанія на веранді', 640, 480), I('vecheria-sklo', 'Вечеря у скляній залі', 640, 1138),
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

/* ---------- lightbox (photos + videos, arrows, swipe, keys, thumbs) ---------- */
const LB = (function () {
  const lb = document.getElementById('lb'), stage = document.getElementById('lb-stage'), cap = document.getElementById('lb-cap'), count = document.getElementById('lb-count'), thumbs = document.getElementById('lb-thumbs');
  let items = [], k = 0, last = null;
  function render() {
    const it = items[k];
    stage.innerHTML = '';
    let el;
    if (it.t === 'v') {
      el = document.createElement('video');
      Object.assign(el, { src: it.src, controls: true, autoplay: true, playsInline: true, loop: true, poster: it.thumb, preload: 'auto' });
      el.setAttribute('playsinline', '');
    } else {
      el = new Image(); el.src = it.src; el.alt = it.cap || ''; el.decoding = 'async';
    }
    stage.appendChild(el);
    cap.innerHTML = (it.cap || '') + (it.credit ? `<small>${it.credit}</small>` : '');
    count.textContent = `${k + 1} / ${items.length}`;
    [...thumbs.children].forEach((b, i) => { b.classList.toggle('on', i === k); if (i === k) b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }); });
    // preload neighbours
    [k + 1, k - 1].forEach(j => { const n = items[(j + items.length) % items.length]; if (n && n.t === 'i') { const p = new Image(); p.src = n.src; } });
  }
  function open(list, start = 0) {
    items = list; k = start; last = document.activeElement;
    thumbs.innerHTML = items.map((it, i) => `<button type="button" class="${it.t === 'v' ? 'is-video' : ''}" aria-label="${(it.cap || 'Фото ' + (i + 1)).replace(/"/g, '&quot;')}"><img src="${it.thumb}" alt="" loading="lazy"></button>`).join('');
    [...thumbs.children].forEach((b, i) => b.addEventListener('click', () => { k = i; render(); }));
    lb.hidden = false; document.body.style.overflow = 'hidden';
    render(); document.getElementById('lb-close').focus();
  }
  function close() { lb.hidden = true; stage.innerHTML = ''; document.body.style.overflow = ''; if (last) last.focus(); }
  const go = d => { k = (k + d + items.length) % items.length; render(); };
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => go(-1));
  document.getElementById('lb-next').addEventListener('click', () => go(1));
  lb.addEventListener('click', e => { if (e.target === stage) close(); });
  document.addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); });
  let x0 = null, y0 = null;
  stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1); x0 = null; });
  return { open };
})();

/* buttons with data-open="group" */
let currentSeason = 'zyma';
document.addEventListener('click', e => {
  const b = e.target.closest('[data-open]');
  if (!b) return;
  const g = b.dataset.open === 'season' ? SEASONS[currentSeason].group : GROUPS[b.dataset.open];
  if (g) LB.open(g, +(b.dataset.start || 0));
});

/* ---------- cottage carousels ---------- */
document.querySelectorAll('[data-gallery]').forEach(box => {
  const list = GROUPS[box.dataset.gallery];
  const name = box.closest('.cot').querySelector('h3').textContent;
  box.innerHTML = list.map((it, i) => `<img class="slide${i === 0 ? ' is-on' : ''}" src="${i === 0 ? it.src : it.thumb}" ${i === 0 ? '' : `data-hi="${it.src}"`} alt="${it.cap}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async">`).join('') +
    `<button type="button" class="round round-light cot-arrow prev" aria-label="Попереднє фото: ${name}"><svg viewBox="0 0 16 16"><path d="M10 3 5 8l5 5"/></svg></button>
     <button type="button" class="round round-light cot-arrow next" aria-label="Наступне фото: ${name}"><svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5"/></svg></button>
     <div class="cot-bar"><div class="cot-dots">${list.map((_, i) => `<button type="button" aria-label="Фото ${i + 1}"${i === 0 ? ' class="on"' : ''}></button>`).join('')}</div>
     <button type="button" class="cot-zoom"><svg viewBox="0 0 16 16"><path d="M10 2h4v4M6 14H2v-4M14 2 9 7M2 14l5-5"/></svg>Усі фото · ${list.length}</button></div>`;
  const slides = [...box.querySelectorAll('.slide')], dots = [...box.querySelectorAll('.cot-dots button')];
  let k = 0, timer;
  const show = n => {
    k = (n + slides.length) % slides.length;
    const s = slides[k]; if (s.dataset.hi) { s.src = s.dataset.hi; delete s.dataset.hi; }
    slides.forEach((im, i) => im.classList.toggle('is-on', i === k));
    dots.forEach((d, i) => d.classList.toggle('on', i === k));
  };
  const stop = () => clearInterval(timer);
  box.querySelector('.prev').addEventListener('click', () => { stop(); show(k - 1); });
  box.querySelector('.next').addEventListener('click', () => { stop(); show(k + 1); });
  dots.forEach((d, i) => d.addEventListener('click', () => { stop(); show(i); }));
  slides.forEach(s => s.addEventListener('click', () => LB.open(list, k)));
  box.querySelector('.cot-zoom').addEventListener('click', () => LB.open(list, k));
  let x0 = null;
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { stop(); show(k + (dx < 0 ? 1 : -1)); } x0 = null; });
  if (!reduceMotion && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { stop(); if (e.isIntersecting) timer = setInterval(() => show(k + 1), 4200); }, { threshold: 0.5 }).observe(box);
  }
});

/* ---------- surroundings rail ---------- */
(function () {
  const rail = document.getElementById('rail');
  rail.innerHTML = AROUND.map((it, i) => `<button type="button" class="spot" data-i="${i}"><span class="spot-img"><img src="${it.thumb}" alt="${it.title}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async"></span><span class="spot-txt"><b>${it.title}</b><span>${it.sub}</span></span></button>`).join('');
  rail.addEventListener('click', e => { const s = e.target.closest('.spot'); if (s) LB.open(AROUND, +s.dataset.i); });
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
  m.addEventListener('click', e => { const b = e.target.closest('.m'); if (b) LB.open(GALLERY, +b.dataset.i); });
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
  const dock = document.getElementById('dock'), hero = document.querySelector('.hero'), book = document.getElementById('bronyuvannia');
  if (!('IntersectionObserver' in window)) return;
  let h = true, b = false;
  const upd = () => dock.classList.toggle('show', !h && !b);
  new IntersectionObserver(([e]) => { h = e.isIntersecting; upd(); }).observe(hero);
  new IntersectionObserver(([e]) => { b = e.isIntersecting; upd(); }, { threshold: 0.05 }).observe(book);
})();
