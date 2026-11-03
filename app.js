/* Маєток Ліс і Гори — interactions */
document.documentElement.classList.add('js');

/* ---------- Morphing dropdown (from the Halden template) ---------- */
(function () {
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const dd = document.getElementById('dd');
  if (!nav || !dd) return;
  const triggers = [...nav.querySelectorAll('.trigger')];
  const panels = Object.fromEntries([...dd.querySelectorAll('.panel')].map(p => [p.dataset.panel, p]));
  const order = ['kotedzhi', 'vidpochynok', 'dovkola'];
  const PAD = 20;
  let current = null;
  let closeTimer;

  const trig = id => triggers.find(t => t.dataset.menu === id);

  function place(id) {
    const p = panels[id];
    const w = p.offsetWidth, h = p.offsetHeight;
    const hr = header.getBoundingClientRect();
    const tr = trig(id).getBoundingClientRect();
    let x = tr.left - PAD;
    x = Math.max(hr.left + 12, Math.min(x, hr.right - w - 12));
    x -= (dd.offsetParent || header).getBoundingClientRect().left;
    dd.style.setProperty('--x', x + 'px');
    dd.style.setProperty('--w', w + 'px');
    dd.style.setProperty('--h', h + 'px');
  }

  function open(id) {
    clearTimeout(closeTimer);
    if (current === id) return;
    const next = panels[id];
    if (!current) {
      dd.classList.add('instant', 'snap');
      Object.values(panels).forEach(p => { p.classList.add('snap'); p.removeAttribute('data-state'); });
      place(id);
      void dd.offsetWidth;
      dd.classList.remove('snap');
      Object.values(panels).forEach(p => p.classList.remove('snap'));
      dd.classList.add('open');
      requestAnimationFrame(() => dd.classList.remove('instant'));
    } else {
      const dir = order.indexOf(id) > order.indexOf(current) ? 1 : -1;
      panels[current].dataset.state = dir > 0 ? 'exit-left' : 'exit-right';
      next.classList.add('snap');
      next.dataset.state = dir > 0 ? 'exit-right' : 'exit-left';
      void next.offsetWidth;
      next.classList.remove('snap');
      place(id);
    }
    next.dataset.state = 'active';
    triggers.forEach(t => t.setAttribute('aria-expanded', String(t.dataset.menu === id)));
    current = id;
  }

  function close() {
    dd.classList.remove('open');
    if (current) panels[current].removeAttribute('data-state');
    triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
    current = null;
  }
  function scheduleClose(ms = 140) { clearTimeout(closeTimer); closeTimer = setTimeout(close, ms); }

  triggers.forEach(t => {
    t.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') open(t.dataset.menu); });
    t.addEventListener('click', () => (current === t.dataset.menu ? close() : open(t.dataset.menu)));
  });
  const plain = document.getElementById('reviews-link');
  plain && plain.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') scheduleClose(60); });
  nav.addEventListener('pointerenter', () => clearTimeout(closeTimer));
  nav.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') scheduleClose(); });
  nav.addEventListener('focusout', e => { if (!nav.contains(e.relatedTarget)) scheduleClose(0); });
  dd.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  document.addEventListener('pointerdown', e => { if (!nav.contains(e.target)) close(); });
  window.addEventListener('resize', () => { if (current) place(current); });

  const items = [...dd.querySelectorAll('.d-item')];
  const imgs = [...dd.querySelectorAll('.d-media img')];
  items.forEach(it => {
    const on = () => {
      items.forEach(i => i.classList.toggle('is-active', i === it));
      imgs.forEach((im, k) => im.classList.toggle('is-active', String(k) === it.dataset.img));
    };
    it.addEventListener('pointerenter', on);
    it.addEventListener('focus', on);
  });

  /* mobile sheet */
  const btn = document.getElementById('menu-btn');
  const sheet = document.getElementById('sheet');
  function setSheet(openIt) {
    sheet.classList.toggle('open', openIt);
    btn.setAttribute('aria-expanded', String(openIt));
    btn.setAttribute('aria-label', openIt ? 'Закрити меню' : 'Відкрити меню');
  }
  btn.addEventListener('click', () => setSheet(!sheet.classList.contains('open')));
  sheet.addEventListener('click', e => { if (e.target.closest('a')) setSheet(false); });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const was = current;
    close(); setSheet(false);
    if (was) trig(was).focus();
  });
})();

/* ---------- Features: hover shows a description in a fixed spot ---------- */
(function () {
  const out = document.getElementById('feat-desc');
  if (!out) return;
  const first = out.textContent;
  document.querySelectorAll('.feat-col li').forEach(li => {
    const show = () => {
      document.querySelectorAll('.feat-col li.is-on').forEach(x => x.classList.remove('is-on'));
      li.classList.add('is-on');
      out.textContent = li.dataset.d;
    };
    li.addEventListener('pointerenter', show);
    li.addEventListener('focus', show);
  });
  document.querySelector('.feat-grid').addEventListener('pointerleave', () => {
    document.querySelectorAll('.feat-col li.is-on').forEach(x => x.classList.remove('is-on'));
    out.textContent = first;
  });
})();

/* ---------- Booking: the live thing ---------- */
(function () {
  // Орієнтовні ціни з відкритих джерел (karpaty.love, вересень 2026) — уточнити у власника.
  const COTTAGES = [
    { id: 'vezha', name: 'Вежа', max: 7, rate: 10000, note: 'джакузі на терасі' },
    { id: 'lisovyi', name: 'Лісовий', max: 8, rate: 10000, note: 'кухонний куточок' },
    { id: 'kolorytnyi', name: 'Колоритний', max: 14, rate: 29200, note: 'камінний зал' },
    { id: 'stylnyi', name: 'Стильний', max: 14, rate: 29200, note: 'ліжка king-size' }
  ];
  const PHONE = '+380504680470';
  const EMAIL = 'lisovyi.maietok@gmail.com';

  const $ = id => document.getElementById(id);
  const form = $('book-form');
  if (!form) return;
  const inEl = $('in'), outEl = $('out'), gOut = $('guests'), pet = $('pet');
  const rows = $('rows'), season = $('season'), msg = $('form-msg');
  let guests = 6;
  let picked = null;

  const fmt = n => n.toLocaleString('uk-UA').replace(/ /g, ' ') + ' ₴';
  const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  inEl.min = iso(today);
  outEl.min = iso(new Date(today.getTime() + 864e5));

  function nights() {
    if (!inEl.value || !outEl.value) return 0;
    const n = Math.round((new Date(outEl.value) - new Date(inEl.value)) / 864e5);
    return n > 0 ? n : 0;
  }

  function seasonText() {
    if (!inEl.value) return 'Оберіть дати заїзду — покажемо, що працює в маєтку саме тоді.';
    const m = new Date(inEl.value).getMonth() + 1;
    if (m === 12 || m <= 3) return 'Сезон на Буковелі: до підйомників 5 км. Увечері — лазня, чан і камін.';
    if (m >= 6 && m <= 9) return 'Літо: басейн з підігрівом відкритий, стежка на Хом\'як — від воріт.';
    if (m === 4 || m === 5) return 'Весна: тихий ліс, водоспад повноводий, лазня й джакузі працюють.';
    return 'Осінь: золоті смереки, гриби вздовж стежок, вечори біля каміна.';
  }

  function render() {
    const n = nights();
    season.textContent = seasonText() + (n ? ` ${n} ${plural(n, 'ніч', 'ночі', 'ночей')}.` : '');
    rows.innerHTML = '';
    COTTAGES.forEach(c => {
      const fits = guests <= c.max;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'row' + (fits ? '' : ' is-off');
      b.setAttribute('aria-pressed', String(picked === c.id));
      b.dataset.id = c.id;
      const fitText = fits ? `до ${c.max} гостей · ${c.note}` : `замало місць — до ${c.max} гостей`;
      const price = n ? fmt(c.rate * n) + ` за ${n} ${plural(n, 'ніч', 'ночі', 'ночей')}` : 'від ' + fmt(c.rate) + ' / ніч';
      b.innerHTML = `<span class="row-name">${c.name}</span><span class="row-fit">${fitText}</span><span class="row-price">${price}</span>`;
      b.addEventListener('click', () => { picked = c.id; if (!fits) { guests = c.max; gOut.textContent = guests; } render(); });
      rows.appendChild(b);
    });
  }

  function plural(n, one, few, many) {
    const a = n % 10, b = n % 100;
    if (a === 1 && b !== 11) return one;
    if (a >= 2 && a <= 4 && (b < 10 || b >= 20)) return few;
    return many;
  }

  $('g-minus').addEventListener('click', () => { guests = Math.max(1, guests - 1); gOut.textContent = guests; render(); });
  $('g-plus').addEventListener('click', () => { guests = Math.min(16, guests + 1); gOut.textContent = guests; render(); });
  inEl.addEventListener('change', () => {
    if (inEl.value) {
      const next = new Date(new Date(inEl.value).getTime() + 864e5);
      outEl.min = iso(next);
      if (!outEl.value || outEl.value <= inEl.value) outEl.value = iso(new Date(next.getTime() + 864e5));
    }
    render();
  });
  outEl.addEventListener('change', render);

  // "Обрати …" buttons in the cottage descriptions
  document.querySelectorAll('[data-pick]').forEach(b => b.addEventListener('click', () => {
    picked = b.dataset.pick;
    const c = COTTAGES.find(x => x.id === picked);
    if (guests > c.max) { guests = c.max; gOut.textContent = guests; }
    render();
    document.getElementById('bronyuvannia').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('name'), phone = $('phone');
    let bad = null;
    [inEl, outEl, name, phone].forEach(f => {
      const empty = !f.value.trim();
      f.setAttribute('aria-invalid', String(empty));
      if (empty && !bad) bad = f;
    });
    if (bad) { msg.className = 'form-msg'; msg.textContent = 'Заповніть дати, ім\'я і телефон — і ми підтвердимо бронь.'; bad.focus(); return; }
    if (!picked) {
      const fit = COTTAGES.find(c => guests <= c.max);
      picked = fit ? fit.id : 'stylnyi';
      render();
    }
    const c = COTTAGES.find(x => x.id === picked);
    const n = nights();
    const text = `Вітаю! Хочу забронювати котедж «${c.name}» з ${inEl.value} по ${outEl.value} (${n} ${plural(n, 'ніч', 'ночі', 'ночей')}), гостей: ${guests}${pet.checked ? ', з собакою' : ''}. ${name.value}, ${phone.value}.${$('wish').value ? ' Побажання: ' + $('wish').value : ''}`;
    // Демо: заявка зберігається у браузері; на продакшені — відправка в CRM / Telegram-бот адміністратора.
    try { localStorage.setItem('lisihory-last-request', JSON.stringify({ c: c.id, in: inEl.value, out: outEl.value, guests, t: Date.now() })); } catch (_) {}
    msg.className = 'form-msg ok';
    msg.innerHTML = `Дякуємо, ${escapeHtml(name.value)}! Заявку на «${c.name}» прийнято — адміністратор передзвонить, щоб підтвердити дати. Не хочете чекати? <a href="viber://chat?number=%2B380504680470&draft=${encodeURIComponent(text)}">Написати у Viber</a> · <a href="tel:${PHONE}">Подзвонити</a> · <a href="mailto:${EMAIL}?subject=${encodeURIComponent('Бронювання: ' + c.name)}&body=${encodeURIComponent(text)}">Email</a>`;
  });

  function escapeHtml(s) { return s.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])); }

  render();
})();

/* ---------- Map: load Google Maps only on request ---------- */
(function () {
  const btn = document.getElementById('map-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const map = document.getElementById('map');
    map.innerHTML = '<iframe title="Маєток Ліс і Гори на карті" src="https://www.google.com/maps?q=48.3490777,24.4741761&z=14&hl=uk&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
  });
})();

/* ---------- Entrances for the parts of every section ---------- */
(function () {
  const groups = [
    ['.intro', '.intro-text, .intro-photo, .intro-note'],
    ['.showcase', '.showcase-h, .panel-photo, .band-caption, .cottage'],
    ['.features', '.h-small, .feat-col, .feat-desc'],
    ['.gallery', '.g'],
    ['.booking', '.h-wide, .book-inputs > *, .season, .rows, .price-note'],
    ['.testimonial', '.spread-line, .spread-attr, .reviews figure, .rating'],
    ['.route', '.h-section, .route-lead, .routes > div, .map'],
    ['.seo', '.h-small, .seo-cols p'],
    ['.faq', '.h-wide, details'],
    ['.contact', '.contact-say, .contact-mail, .contact-left, .contact-right']
  ];
  const els = [];
  groups.forEach(([sec, sel]) => {
    const root = document.querySelector(sec);
    if (!root) return;
    root.querySelectorAll(sel).forEach((el, i) => { el.dataset.reveal = ''; el.style.setProperty('--i', Math.min(i, 6)); els.push(el); });
  });
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(el => io.observe(el));
  setTimeout(() => els.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) el.classList.add('in'); }), 2500);
})();
