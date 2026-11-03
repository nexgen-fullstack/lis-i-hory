/* Маєток Ліс і Гори — interactions */
document.documentElement.classList.add('js');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => matchMedia('(max-width: 900px)').matches;

/* ---------- nav: scrolled state + mobile menu ---------- */
(function () {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  const hero = document.querySelector('.hero');
  if ('IntersectionObserver' in window && hero) {
    new IntersectionObserver(([e]) => nav.classList.toggle('scrolled', !e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' }).observe(hero);
  }
  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
})();

/* ---------- videos: load and play only while visible ---------- */
(function () {
  const vids = [...document.querySelectorAll('video[data-src]')];
  const load = v => { if (!v.src) { v.src = v.dataset.src; v.load(); } };
  const play = v => { if (reduceMotion) return; load(v); const p = v.play(); if (p) p.catch(() => {}); };
  if (!('IntersectionObserver' in window)) { vids.forEach(play); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    const v = en.target;
    if (getComputedStyle(v).display === 'none') return;
    if (v.classList.contains('sea-layer') && !v.classList.contains('is-on')) return;
    if (en.isIntersecting) play(v); else if (v.src) v.pause();
  }), { rootMargin: '200px 0px', threshold: 0.01 });
  vids.forEach(v => io.observe(v));
  window.__playVideo = play;
})();

/* ---------- reveal on scroll ---------- */
(function () {
  const els = [...document.querySelectorAll('.reveal')];
  const groups = new Map();
  els.forEach(el => {
    const p = el.parentElement;
    const i = groups.get(p) || 0;
    el.style.setProperty('--rd', Math.min(i, 6));
    groups.set(p, i + 1);
  });
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  els.forEach(el => io.observe(el));
  setTimeout(() => els.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }), 1800);
})();

/* ---------- cottage mini galleries ---------- */
document.querySelectorAll('[data-gallery]').forEach(g => {
  const imgs = [...g.querySelectorAll('img')];
  const dots = [...g.querySelectorAll('.cot-dots button')];
  let k = 0, timer;
  const show = n => {
    k = (n + imgs.length) % imgs.length;
    imgs.forEach((im, i) => im.classList.toggle('is-on', i === k));
    dots.forEach((d, i) => d.classList.toggle('on', i === k));
  };
  dots.forEach((d, i) => d.addEventListener('click', () => { show(i); clearInterval(timer); }));
  if (!reduceMotion && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => show(k + 1), 3800);
    }, { threshold: 0.4 }).observe(g);
  }
});

/* ---------- seasons switcher ---------- */
(function () {
  const DATA = {
    zyma: { t: 'Сніг, лижі й гарячий чан', d: 'До підйомників Буковеля — 5–10 хвилин. Повертаєтеся в тишу лісу: лазня, купіль, чан під снігопадом і вечір біля каміна.', l: ['Лижі та сноуборд на Буковелі', 'Лазня з купіллю, чан', 'Джакузі на терасі під снігом'] },
    lito: { t: 'Басейн, ліс і стежка на Хом\'як', d: 'Відкритий басейн з підігрівом серед смерек, сніданки на терасі, а від воріт — маршрут на гору Хом\'як, до водоспаду й полонини.', l: ['Басейн з підігрівом', 'Похід на Хом\'як від воріт', 'Мангал в альтанці'] },
    osin: { t: 'Золоті Карпати й тиша', d: 'Найспокійніший сезон: золоті модрини, гриби вздовж стежок, тумани над долиною і довгі вечори біля каміна.', l: ['Тумани над долиною', 'Гриби й чорниці', 'Лазня та камін'] },
    svyata: { t: 'Новий рік у зрубі', d: 'Ялинка в камінній залі, довгий стіл для всієї компанії, гірлянди на терасі й сніг за вікном. Святкові дати бронюють заздалегідь.', l: ['Камінна зала з ялинкою', 'Стіл на 14 гостей', 'Гірлянди й сніг'] }
  };
  const tabs = [...document.querySelectorAll('.sea-tabs button')];
  const layers = [...document.querySelectorAll('.sea-layer')];
  const box = document.querySelector('.sea-text');
  const tEl = document.getElementById('sea-title'), dEl = document.getElementById('sea-desc'), lEl = document.getElementById('sea-list');
  function set(s) {
    tabs.forEach(b => b.setAttribute('aria-selected', String(b.dataset.s === s)));
    layers.forEach(l => {
      const on = l.dataset.season === s;
      l.classList.toggle('is-on', on);
      if (l.tagName === 'VIDEO') { if (on && window.__playVideo) window.__playVideo(l); else if (l.src) l.pause(); }
    });
    const x = DATA[s];
    tEl.textContent = x.t; dEl.textContent = x.d;
    lEl.innerHTML = x.l.map(i => `<li>${i}</li>`).join('');
    box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap');
  }
  tabs.forEach(b => b.addEventListener('click', () => set(b.dataset.s)));
  // Start on the current season
  const m = new Date().getMonth() + 1;
  const start = m === 12 || m <= 3 ? 'zyma' : m <= 5 ? 'lito' : m <= 8 ? 'lito' : 'osin';
  if (start !== 'zyma') set(start);
})();

/* ---------- surroundings rail ---------- */
(function () {
  const rail = document.getElementById('rail');
  const step = () => (rail.querySelector('.spot')?.offsetWidth || 400) + 18;
  document.getElementById('rail-prev').addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
  document.getElementById('rail-next').addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
})();

/* ---------- lightbox ---------- */
(function () {
  const items = [...document.querySelectorAll('#masonry .m')];
  const lb = document.getElementById('lightbox'), img = document.getElementById('lb-img');
  let k = 0, last;
  const show = n => { k = (n + items.length) % items.length; img.src = items[k].dataset.full; img.alt = items[k].querySelector('img').alt; };
  const open = n => { last = document.activeElement; show(n); lb.hidden = false; document.body.style.overflow = 'hidden'; document.getElementById('lb-close').focus(); };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; if (last) last.focus(); };
  items.forEach((b, i) => b.addEventListener('click', () => open(i)));
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => show(k - 1));
  document.getElementById('lb-next').addEventListener('click', () => show(k + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(k - 1);
    if (e.key === 'ArrowRight') show(k + 1);
  });
  let x0 = null;
  lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(k + (dx < 0 ? 1 : -1)); x0 = null; });
})();

/* ---------- booking ---------- */
(function () {
  // Орієнтовні ціни з відкритих джерел (karpaty.love) — уточнити у власника.
  const COTTAGES = [
    { id: 'vezha', name: 'Вежа', max: 7, rate: 10000, note: 'джакузі на терасі' },
    { id: 'lisovyi', name: 'Лісовий', max: 8, rate: 10000, note: 'під смереками' },
    { id: 'kolorytnyi', name: 'Колоритний', max: 14, rate: 29200, note: 'камінна зала' },
    { id: 'stylnyi', name: 'Стильний', max: 14, rate: 29200, note: 'king-size ліжка' }
  ];
  const PHONE = '+380504680470', EMAIL = 'lisovyi.maietok@gmail.com';
  const $ = id => document.getElementById(id);
  const form = $('book-form');
  const inEl = $('in'), outEl = $('out'), gOut = $('guests'), pet = $('pet');
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
    if (m === 12 || m <= 3) return '❄ Сезон на Буковелі: 5 км до підйомників. Увечері — лазня, чан і камін.';
    if (m >= 6 && m <= 9) return '☀ Літо: басейн з підігрівом відкритий, стежка на Хом\'як — від воріт.';
    if (m === 4 || m === 5) return '🌿 Весна: тихий ліс, повноводий водоспад, лазня й джакузі працюють.';
    return '🍂 Осінь: золоті смереки, тумани над долиною, вечори біля каміна.';
  }

  function render() {
    const n = nights();
    season.textContent = seasonText();
    rows.innerHTML = '';
    COTTAGES.forEach(c => {
      const fits = guests <= c.max;
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'opt' + (fits ? '' : ' is-off');
      b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', String(picked === c.id));
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
  function syncOut(inp, out) {
    if (!inp.value) return;
    const next = new Date(+new Date(inp.value) + 864e5);
    out.min = iso(next);
    if (!out.value || out.value <= inp.value) out.value = iso(new Date(+next + 864e5));
  }
  inEl.addEventListener('change', () => { syncOut(inEl, outEl); render(); });
  outEl.addEventListener('change', render);
  $('q-in').addEventListener('change', () => syncOut($('q-in'), $('q-out')));

  const goBook = () => $('bronyuvannia').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

  // Hero quick booking -> fills the full form
  $('quick-book').addEventListener('submit', e => {
    e.preventDefault();
    if ($('q-in').value) inEl.value = $('q-in').value;
    if ($('q-out').value) outEl.value = $('q-out').value;
    guests = +$('q-guests').value; gOut.textContent = guests;
    const fit = COTTAGES.filter(c => guests <= c.max).sort((a, b) => a.rate - b.rate)[0];
    picked = fit ? fit.id : null;
    render(); goBook();
  });

  document.querySelectorAll('[data-pick]').forEach(b => b.addEventListener('click', () => {
    picked = b.dataset.pick;
    const c = COTTAGES.find(x => x.id === picked);
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

/* ---------- mobile dock ---------- */
(function () {
  const dock = document.getElementById('dock');
  const hero = document.querySelector('.hero'), book = document.getElementById('bronyuvannia');
  if (!('IntersectionObserver' in window)) return;
  let h = true, b = false;
  const upd = () => dock.classList.toggle('show', !h && !b);
  new IntersectionObserver(([e]) => { h = e.isIntersecting; upd(); }).observe(hero);
  new IntersectionObserver(([e]) => { b = e.isIntersecting; upd(); }, { threshold: 0.05 }).observe(book);
})();
