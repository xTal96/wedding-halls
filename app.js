'use strict';

/* =========================================================
   Constants
   ========================================================= */
const MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
const MONTHS_SHORT = ['ינו׳', 'פבר׳', 'מרץ', 'אפר׳', 'מאי', 'יוני', 'יולי', 'אוג׳', 'ספט׳', 'אוק׳', 'נוב׳', 'דצמ׳'];
// JS getDay(): 0 = Sunday. Saturday-evening weddings are "מוצ״ש".
const DAYS = ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'מוצאי שבת'];
const DAYS_SHORT = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'מוצ״ש'];

const EXTRA_PRESETS = [
  { name: 'הגברה', type: 'fixed' },
  { name: 'תאורה', type: 'fixed' },
  { name: 'עיצוב אולם', type: 'fixed' },
  { name: 'עיצוב חופה', type: 'fixed' },
  { name: 'דמי שירות', type: 'percent' },
  { name: 'בר אלכוהול', type: 'perGuest' },
  { name: 'DJ', type: 'fixed' },
  { name: 'מפיק/ה', type: 'fixed' },
  { name: 'מסך LED', type: 'fixed' },
  { name: 'בר קוקטיילים', type: 'perGuest' },
  { name: 'טיפ למלצרים', type: 'perGuest' },
  { name: 'עשן כבד', type: 'fixed' },
  { name: 'זיקוקים / אפקטים', type: 'fixed' },
  { name: 'אבטחה', type: 'fixed' },
  { name: 'חניה / ואלה', type: 'fixed' },
  { name: 'שעת הארכה', type: 'fixed' },
  { name: 'אישורי הגעה', type: 'fixed' },
  { name: 'סידורי הושבה', type: 'fixed' },
  { name: 'חדר כלה', type: 'fixed' },
  { name: 'קבלת פנים מורחבת', type: 'perGuest' },
  { name: 'שולחן קינוחים', type: 'fixed' },
  { name: 'מנות ילדים', type: 'fixed' },
  { name: 'ניקיון', type: 'fixed' },
];
const CONTRACTOR_PRESETS = [
  'צלם סטילס', 'צלם וידאו', 'צלם מגנטים', 'צלם רחפן', 'עוזר/ת צלם', 'DJ', 'להקה', 'נגן/ית',
  'מפיק/ה', 'רב / עורך טקס', 'מאפרת', 'מעצב/ת שיער', 'אטרקציה',
];
const TYPE_LABELS = { fixed: 'סכום קבוע', perGuest: 'לאורח', percent: '% מהמנות' };

const ICON = {
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
};

/* =========================================================
   Helpers
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const num = (v) => { const n = parseFloat(String(v ?? '').replace(/[^\d.\-]/g, '')); return Number.isFinite(n) ? n : 0; };
const hasVal = (v) => v !== null && v !== undefined && v !== '';
const ILS = new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 });
const fmt = (n) => ILS.format(Math.round(n || 0));
const parseDate = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const fmtDate = (s) => { const d = parseDate(s); return `${d.getDate()}.${d.getMonth() + 1}.${String(d.getFullYear()).slice(2)}`; };

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove('show'), 1800);
}

// "ספט׳–נוב׳" for runs of 3+, otherwise a comma list.
// Months are cyclic, so Nov + Dec + Jan + Feb reads as "נוב׳–פבר׳".
function listLabel(arr, names, allLabel, total, cyclic) {
  if (!arr || !arr.length || arr.length === total) return allLabel;
  let s = [...arr].sort((a, b) => a - b);
  if (cyclic && s.includes(0) && s.includes(total - 1)) {
    let k = s.length - 1;
    while (k > 0 && s[k - 1] === s[k] - 1) k--;
    s = [...s.slice(k), ...s.slice(0, k)];
  }
  const next = (x) => (x + 1) % total;
  const parts = [];
  for (let i = 0; i < s.length;) {
    let j = i;
    while (j + 1 < s.length && s[j + 1] === next(s[j])) j++;
    if (j - i >= 2) parts.push(`${names[s[i]]}–${names[s[j]]}`);
    else for (let k = i; k <= j; k++) parts.push(names[s[k]]);
    i = j + 1;
  }
  return parts.join(', ');
}
const monthsLabel = (m) => (m.length === 1 ? MONTHS[m[0]] : listLabel(m, MONTHS_SHORT, 'כל השנה', 12, true));
const daysLabel = (d) => (d.length === 1 ? DAYS[d[0]] : listLabel(d, DAYS_SHORT, 'כל הימים', 7));
const describeRule = (r) => `${monthsLabel(r.months)} · ${daysLabel(r.days)}`;

/* =========================================================
   State
   ========================================================= */
const KEY = 'wedding-halls-v1';
function defaults() {
  return {
    version: 1,
    guests: 300,
    vatRate: 18,
    contractors: [
      { id: uid(), name: 'צלם סטילס', count: 1 },
      { id: uid(), name: 'צלם וידאו', count: 1 },
      { id: uid(), name: 'DJ', count: 1 },
    ],
    halls: [],
    filter: { month: null, day: null, date: '' },
  };
}
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.halls)) return { ...defaults(), ...s, filter: { ...defaults().filter, ...s.filter } };
  } catch (e) { /* ignore */ }
  return defaults();
}
let state = load();
let saveTimer;
function save() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flush, 200);
}
function flush() {
  clearTimeout(saveTimer);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}
addEventListener('pagehide', flush);
document.addEventListener('visibilitychange', () => document.visibilityState === 'hidden' && flush());
navigator.storage?.persist?.();

// Per-hall "what-if" counts (not persisted — for playing with numbers).
const hallOverrides = {};
const hallDates = {};
let sheet = null;
let mainScroll = 0;

const contractorsTotal = () => state.contractors.reduce((a, c) => a + num(c.count), 0);
const findHall = (id) => state.halls.find((h) => h.id === id);
function currentHall() {
  const m = location.hash.match(/^#\/hall\/(.+)$/);
  return m ? findHall(decodeURIComponent(m[1])) : null;
}
function hallCounts(h) {
  const o = hallOverrides[h.id] || {};
  return {
    guests: o.guests ?? state.guests,
    contractors: o.contractors ?? contractorsTotal(),
    overridden: o.guests != null || o.contractors != null,
  };
}

/* =========================================================
   Pricing
   ========================================================= */
// The most specific matching rule wins (fewest month × day combinations).
function ruleFor(hall, m, d) {
  let best = null;
  let bestScore = Infinity;
  for (const r of hall.rules) {
    if (!(num(r.price) > 0)) continue;
    if (r.months.length && !r.months.includes(m)) continue;
    if (r.days.length && !r.days.includes(d)) continue;
    const score = (r.months.length || 12) * (r.days.length || 7);
    if (score < bestScore) { bestScore = score; best = r; }
  }
  return best;
}

function calc(hall, rule, guests, contractors) {
  const minG = num(hall.minGuests);
  const billed = Math.max(guests, minG);
  const price = num(rule.price);
  const lines = [];
  const food = billed * price;
  lines.push({
    label: 'מנות אורחים',
    detail: `${billed.toLocaleString('he-IL')} × ${fmt(price)}${billed > guests ? ` (מינימום ${minG})` : ''}`,
    amount: food,
  });
  const cPrice = hasVal(rule.contractorPrice) ? num(rule.contractorPrice) : num(hall.contractorPrice);
  const cCost = contractors * cPrice;
  if (contractors > 0) lines.push({ label: 'ארוחות ספקים', detail: `${contractors} × ${fmt(cPrice)}`, amount: cCost });
  const base = food + cCost;
  for (const x of hall.extras) {
    const a = num(x.amount);
    if (!a) continue;
    let amount = a;
    let detail = '';
    if (x.type === 'perGuest') { amount = a * billed; detail = `${billed} × ${fmt(a)}`; }
    else if (x.type === 'percent') { amount = (base * a) / 100; detail = `${a}% מ-${fmt(base)}`; }
    lines.push({ label: x.name || 'תוספת', detail, amount });
  }
  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const vat = hall.vatExcluded ? (subtotal * num(state.vatRate)) / 100 : 0;
  const total = subtotal + vat;
  return { lines, subtotal, vat, total, perGuest: guests ? total / guests : 0 };
}

// Cheapest / priciest total over every (month, day) that passes the filter.
function hallSummary(hall, guests, contractors, filter) {
  let min = null;
  let max = null;
  const cache = new Map();
  for (let m = 0; m < 12; m++) {
    if (filter.month != null && filter.month !== m) continue;
    for (let d = 0; d < 7; d++) {
      if (filter.day != null && filter.day !== d) continue;
      const r = ruleFor(hall, m, d);
      if (!r) continue;
      if (!cache.has(r.id)) cache.set(r.id, calc(hall, r, guests, contractors).total);
      const total = cache.get(r.id);
      if (!min || total < min.total) min = { total, m, d, rule: r };
      if (!max || total > max.total) max = { total, m, d, rule: r };
    }
  }
  return { min, max };
}

/* =========================================================
   Shared components
   ========================================================= */
function stepper(target, value, step, small) {
  return `<div class="stepper${small ? ' sm' : ''}">
    <button class="step-btn" data-action="step" data-target="${target}" data-delta="${step}" aria-label="הוספה">+</button>
    <input class="step-input" type="number" inputmode="numeric" pattern="[0-9]*" data-count="${target}" value="${value}" aria-label="כמות">
    <button class="step-btn" data-action="step" data-target="${target}" data-delta="${-step}" aria-label="הפחתה">−</button>
  </div>`;
}

function getCount(target) {
  const h = currentHall();
  if (target === 'guests') return state.guests;
  if (target === 'hall-guests') return hallCounts(h).guests;
  if (target === 'hall-contractors') return hallCounts(h).contractors;
  if (target === 'sheet-guests') return sheet.guests;
  if (target === 'sheet-contractors') return sheet.contractors;
  if (target.startsWith('con:')) return num(state.contractors.find((c) => c.id === target.slice(4))?.count);
  return 0;
}

function setCount(target, v, fromInput) {
  v = Math.max(0, Math.round(num(v)));
  const h = currentHall();
  if (target === 'guests') state.guests = v;
  else if (target === 'hall-guests') (hallOverrides[h.id] ||= {}).guests = v;
  else if (target === 'hall-contractors') (hallOverrides[h.id] ||= {}).contractors = v;
  else if (target === 'sheet-guests') sheet.guests = v;
  else if (target === 'sheet-contractors') sheet.contractors = v;
  else if (target.startsWith('con:')) {
    const c = state.contractors.find((x) => x.id === target.slice(4));
    if (c) c.count = v;
  }
  if (!fromInput) document.querySelectorAll(`[data-count="${target}"]`).forEach((i) => { i.value = v; });
  save();
  refresh();
}

/* =========================================================
   Main screen
   ========================================================= */
function contractorsSummary() {
  const names = state.contractors.filter((c) => num(c.count) > 0).map((c) => (num(c.count) > 1 ? `${c.name} ×${c.count}` : c.name));
  return names.length ? esc(names.join(', ')) : 'לא הוגדרו ספקים';
}

function renderMain() {
  const f = state.filter;
  $('#app').innerHTML = `
    <header class="top">
      <div>
        <h1>השוואת אולמות</h1>
        <p class="sub">${state.halls.length ? `${state.halls.length} אולמות בהשוואה` : 'מוצאים את האולם המושלם'}</p>
      </div>
      <button class="icon-btn" data-action="open-settings" aria-label="הגדרות">${ICON.gear}</button>
    </header>

    <section class="card">
      <div class="row-between">
        <div><div class="label">מספר מוזמנים</div><div class="hint">כמה אורחים צפויים להגיע</div></div>
        ${stepper('guests', state.guests, 10)}
      </div>
      <div class="divider"></div>
      <button class="row-between row-btn" data-action="open-contractors">
        <div style="min-width:0"><div class="label">ספקים שאוכלים</div><div class="hint" id="con-summary">${contractorsSummary()}</div></div>
        <div class="pill"><span id="con-total">${contractorsTotal()}</span>${ICON.chev}</div>
      </button>
    </section>

    <section class="card">
      <div class="row-between">
        <div class="label">מתי?</div>
        <div class="date-wrap">
          ${f.date ? '<button class="clear-btn" data-action="clear-filter" aria-label="ניקוי">×</button>' : ''}
          <label class="date-btn">${ICON.cal}<span>${f.date ? fmtDate(f.date) : 'בחירת תאריך'}</span>
            <input type="date" data-change="filter-date" value="${esc(f.date)}"></label>
        </div>
      </div>
      <div id="filter-chips"></div>
    </section>

    <div id="hall-list"></div>
    <button class="fab" data-action="add-hall">${ICON.plus}אולם חדש</button>`;
  renderFilterChips();
  renderHallList();
}

function renderFilterChips() {
  const f = state.filter;
  $('#filter-chips').innerHTML = `
    <div class="chips scroll">
      <button class="chip ${f.month == null ? 'on' : ''}" data-action="filter-month" data-m="">כל החודשים</button>
      ${MONTHS.map((n, i) => `<button class="chip ${f.month === i ? 'on' : ''}" data-action="filter-month" data-m="${i}">${n}</button>`).join('')}
    </div>
    <div class="chips scroll">
      <button class="chip ${f.day == null ? 'on' : ''}" data-action="filter-day" data-d="">כל הימים</button>
      ${DAYS_SHORT.map((n, i) => `<button class="chip ${f.day === i ? 'on' : ''}" data-action="filter-day" data-d="${i}">${n}</button>`).join('')}
    </div>`;
  document.querySelectorAll('#filter-chips .chips.scroll').forEach((row) => {
    const on = row.querySelector('.chip.on');
    if (on) row.scrollLeft += on.getBoundingClientRect().left - row.getBoundingClientRect().left - (row.clientWidth - on.offsetWidth) / 2;
  });
}

function renderHallList() {
  const el = $('#hall-list');
  if (!el) return;
  if (!state.halls.length) {
    el.innerHTML = `<div class="empty"><div class="big">💍</div><h2>עדיין אין אולמות</h2>
      <p>הוסיפו אולם, הזינו מחירים למנה לפי חודשים וימים, תוספות ומחיר ארוחת ספק — ונשווה בשבילכם.</p></div>`;
    return;
  }
  const g = state.guests;
  const c = contractorsTotal();
  const f = state.filter;
  const exact = f.month != null && f.day != null;
  const items = state.halls.map((h) => ({ h, s: hallSummary(h, g, c, f) }));
  items.sort((a, b) => (a.s.min?.total ?? Infinity) - (b.s.min?.total ?? Infinity));
  const priced = items.filter((i) => i.s.min);
  const best = priced[0]?.s.min.total;

  let title = 'הזול ביותר בכל אולם';
  if (exact) title = `${DAYS[f.day]} ב${MONTHS[f.month]}`;
  else if (f.month != null) title = `${MONTHS[f.month]} · טווח מחירים`;
  else if (f.day != null) title = `${DAYS[f.day]} · טווח מחירים`;

  el.innerHTML = `<div class="section-title"><span>${title}</span><span>${g} אורחים</span></div>` +
    items.map(({ h, s }, i) => {
      const name = `<span>${esc(h.name || 'אולם ללא שם')}</span>`;
      if (!s.min) {
        return `<button class="hall-card" data-action="open-hall" data-id="${h.id}">
          <div class="hc-top"><div class="hc-name"><span class="rank">–</span>${name}</div></div>
          <div class="hc-none">${h.rules.length ? 'אין תמחור לתאריכים שנבחרו' : 'עדיין לא הוזנו מחירים — הקישו להוספה'}</div></button>`;
      }
      const isBest = priced.length > 1 && s.min.total === best;
      const diff = s.min.total - best;
      const range = s.max.total - s.min.total >= 1;
      return `<button class="hall-card ${isBest ? 'best' : ''}" data-action="open-hall" data-id="${h.id}">
        <div class="hc-top"><div class="hc-name"><span class="rank">${i + 1}</span>${name}</div>${isBest ? '<span class="badge">הכי משתלם</span>' : ''}</div>
        <div class="hc-price">${fmt(s.min.total)}${range ? `<span class="hc-to"> – ${fmt(s.max.total)}</span>` : ''}</div>
        <div class="hc-meta">${fmt(s.min.rule.price)} למנה · ${fmt(g ? s.min.total / g : 0)} לאורח עם הכל</div>
        ${exact ? '' : `<div class="hc-when">${ICON.cal}הכי זול: ${esc(describeRule(s.min.rule))}</div>`}
        ${diff >= 1 ? `<div class="hc-diff">+${fmt(diff)}</div>` : ''}
      </button>`;
    }).join('');
}

/* =========================================================
   Hall screen
   ========================================================= */
function renderHall(h) {
  const { guests, contractors } = hallCounts(h);
  if (hallDates[h.id] === undefined) hallDates[h.id] = state.filter.date || '';
  $('#app').innerHTML = `
    <header class="nav">
      <button class="nav-back" data-action="back">${ICON.back}אולמות</button>
      <button class="icon-btn danger" data-action="del-hall" aria-label="מחיקת אולם">${ICON.trash}</button>
    </header>
    <input class="title-input" data-hall-field="name" value="${esc(h.name)}" placeholder="שם האולם" enterkeyhint="done">

    <section class="card calc-bar">
      <div class="calc-cols">
        <div><div class="label sm">אורחים</div>${stepper('hall-guests', guests, 10)}</div>
        <div><div class="label sm">ספקים</div>${stepper('hall-contractors', contractors, 1)}</div>
      </div>
      <div id="reset-wrap"></div>
    </section>

    <div class="section-title"><span>מחיר למנה</span><button class="text-btn" data-action="add-rule">${ICON.plus}תמחור</button></div>
    <div id="rules-list"></div>

    <section class="card">
      <div class="row-between">
        <div class="label">בדיקת תאריך</div>
        <div class="date-wrap">
          <label class="date-btn">${ICON.cal}<span id="check-date-label">${hallDates[h.id] ? fmtDate(hallDates[h.id]) : 'בחירה'}</span>
            <input type="date" data-change="check-date" value="${esc(hallDates[h.id])}"></label>
        </div>
      </div>
      <div id="date-check"></div>
    </section>

    <details class="card" id="grid-details">
      <summary>לוח מחירים לפי חודש ויום</summary>
      <div id="price-grid"></div>
    </details>

    <div class="section-title"><span>ארוחות ספקים</span></div>
    <section class="card">
      <label class="field-row"><span>מחיר לארוחת ספק<small>צלמים, DJ, מפיק וכו׳</small></span>
        <div class="money-input"><input type="number" inputmode="decimal" data-hall-field="contractorPrice" value="${esc(h.contractorPrice)}" placeholder="0"><span>₪</span></div>
      </label>
    </section>

    <div class="section-title"><span>תוספות וחיובים קבועים</span></div>
    <section class="card">
      <div id="extras-list"></div>
      <button class="add-row" data-action="add-extra">${ICON.plus}הוספת חיוב</button>
      <div class="preset-chips" id="extra-presets"></div>
    </section>

    <div class="section-title"><span>פרטים נוספים</span></div>
    <section class="card">
      <label class="field-row"><span>מינימום מנות<small>האולם יחייב לפחות על כמות זו</small></span>
        <input type="number" inputmode="numeric" data-hall-field="minGuests" value="${esc(h.minGuests)}" placeholder="ללא"></label>
      <div class="divider"></div>
      <label class="field-row"><span>המחירים לא כוללים מע״מ<small>יתווסף ${state.vatRate}% לסה״כ</small></span>
        <input type="checkbox" class="switch" data-hall-field="vatExcluded" ${h.vatExcluded ? 'checked' : ''}></label>
      <div class="divider"></div>
      <label class="field-row"><span>איש קשר</span>
        <input type="text" data-hall-field="contact" value="${esc(h.contact)}" placeholder="שם / טלפון"></label>
      <textarea data-hall-field="notes" placeholder="הערות, מה כלול, רשמים מהפגישה...">${esc(h.notes)}</textarea>
    </section>`;
  renderResetBtn(h);
  renderRules(h);
  renderDateCheck(h);
  renderGrid(h);
  renderExtras(h);
}

function renderResetBtn(h) {
  const el = $('#reset-wrap');
  if (!el) return;
  el.innerHTML = hallCounts(h).overridden
    ? `<button class="link-btn" data-action="reset-hall-counts">חזרה לנתונים הכלליים (${state.guests} אורחים · ${contractorsTotal()} ספקים)</button>`
    : '';
}

function renderRules(h) {
  const el = $('#rules-list');
  if (!el) return;
  const { guests, contractors } = hallCounts(h);
  if (!h.rules.length) {
    el.innerHTML = `<div class="card rules-empty"><p class="hint" style="margin-bottom:12px">הוסיפו מחיר למנה עבור חודשים וימים.<br>למשל: ספטמבר, ימי חמישי — ₪450</p>
      <button class="btn primary" data-action="add-rule">הוספת תמחור ראשון</button></div>`;
    return;
  }
  el.innerHTML = h.rules.map((r) => {
    const c = calc(h, r, guests, contractors);
    return `<div class="rule-card">
      <button class="rule-main" data-action="breakdown" data-rule="${r.id}">
        <div class="rule-when">
          <div class="rule-months">${esc(monthsLabel(r.months))}</div>
          <div class="rule-days">${esc(daysLabel(r.days))}</div>
          ${r.note ? `<div class="rule-note">${esc(r.note)}</div>` : ''}
        </div>
        <div class="rule-price">
          <div class="pp">${fmt(r.price)}<small> למנה</small></div>
          <div class="tot">סה״כ ${fmt(c.total)}</div>
        </div>
      </button>
      <button class="rule-edit" data-action="edit-rule" data-rule="${r.id}" aria-label="עריכה">${ICON.edit}</button>
    </div>`;
  }).join('');
}

function renderDateCheck(h) {
  const el = $('#date-check');
  if (!el) return;
  const v = hallDates[h.id];
  if (!v) { el.innerHTML = '<p class="hint">בחרו תאריך כדי לראות איזה מחיר חל עליו ומה הסה״כ</p>'; return; }
  const dt = parseDate(v);
  const m = dt.getMonth();
  const d = dt.getDay();
  const r = ruleFor(h, m, d);
  if (!r) { el.innerHTML = `<p class="hint">אין תמחור שמתאים ל${DAYS[d]} ב${MONTHS[m]}</p>`; return; }
  const { guests, contractors } = hallCounts(h);
  const c = calc(h, r, guests, contractors);
  el.innerHTML = `<button class="date-result" data-action="breakdown" data-rule="${r.id}" data-m="${m}" data-d="${d}" data-date="${v}">
    <div><div class="label">${DAYS[d]}, ${dt.getDate()} ב${MONTHS[m]}</div><div class="hint">${fmt(r.price)} למנה · ${esc(describeRule(r))}</div></div>
    <div class="big">${fmt(c.total)}</div></button>`;
}

function renderGrid(h) {
  const el = $('#price-grid');
  if (!el) return;
  if (!h.rules.length) { el.innerHTML = '<p class="hint pad">הוסיפו תמחור כדי לראות את הלוח</p>'; return; }
  const grid = [];
  let lo = Infinity;
  let hi = -Infinity;
  for (let m = 0; m < 12; m++) {
    grid[m] = [];
    for (let d = 0; d < 7; d++) {
      const r = ruleFor(h, m, d);
      grid[m][d] = r;
      if (r) { lo = Math.min(lo, num(r.price)); hi = Math.max(hi, num(r.price)); }
    }
  }
  const heat = (p) => (hi > lo ? 12 + ((p - lo) / (hi - lo)) * 78 : 35);
  el.innerHTML = `<table class="grid"><thead><tr><th></th>${DAYS_SHORT.map((d) => `<th>${d}</th>`).join('')}</tr></thead><tbody>
    ${grid.map((row, m) => `<tr><th>${MONTHS_SHORT[m]}</th>${row.map((r, d) => (r
      ? `<td><button class="${heat(num(r.price)) > 60 ? 'hot' : ''}" style="--heat:${heat(num(r.price)).toFixed(0)}%" data-action="breakdown" data-rule="${r.id}" data-m="${m}" data-d="${d}">${Math.round(num(r.price))}</button></td>`
      : '<td class="none">–</td>')).join('')}</tr>`).join('')}
    </tbody></table>
    <div class="grid-legend"><span>מחיר למנה ב-₪ · הקישו לפירוט</span><span>${fmt(lo)} – ${fmt(hi)}</span></div>`;
}

function renderExtras(h) {
  const el = $('#extras-list');
  if (!el) return;
  el.innerHTML = h.extras.length
    ? h.extras.map((x) => `
      <div class="extra-row">
        <div class="extra-line">
          <input class="extra-name" data-extra-field="name" data-id="${x.id}" data-ac="extra" value="${esc(x.name)}" placeholder="שם החיוב (למשל הגברה)" autocomplete="off" enterkeyhint="next">
          <div class="money-input"><input type="number" inputmode="decimal" data-extra-field="amount" data-id="${x.id}" value="${esc(x.amount)}" placeholder="0"><span>${x.type === 'percent' ? '%' : '₪'}</span></div>
          <button class="x-btn" data-action="del-extra" data-id="${x.id}" aria-label="מחיקה">×</button>
        </div>
        <div class="ac-list"></div>
        <div class="seg">${Object.keys(TYPE_LABELS).map((t) => `<button class="${x.type === t ? 'on' : ''}" data-action="extra-type" data-id="${x.id}" data-type="${t}">${TYPE_LABELS[t]}</button>`).join('')}</div>
      </div>`).join('')
    : '<p class="hint">עדיין אין חיובים. בחרו מהרשימה למטה או הוסיפו ידנית.</p>';
  renderExtraPresets(h);
}

function renderExtraPresets(h) {
  const el = $('#extra-presets');
  if (!el) return;
  const have = new Set(h.extras.map((x) => x.name.trim()));
  el.innerHTML = EXTRA_PRESETS.filter((p) => !have.has(p.name)).slice(0, 10)
    .map((p) => `<button class="chip sm" data-action="add-extra" data-name="${esc(p.name)}">+ ${esc(p.name)}</button>`).join('');
}

/* =========================================================
   Autocomplete (inline suggestion chips under the input)
   ========================================================= */
function acSuggestions(input) {
  const kind = input.dataset.ac;
  const q = input.value.trim();
  let pool;
  let taken;
  if (kind === 'extra') {
    const h = currentHall();
    pool = [...EXTRA_PRESETS.map((p) => p.name), ...state.halls.flatMap((x) => x.extras.map((e) => e.name))];
    taken = new Set(h ? h.extras.filter((e) => e.id !== input.dataset.id).map((e) => e.name.trim()) : []);
  } else {
    pool = [...CONTRACTOR_PRESETS, ...state.contractors.map((c) => c.name)];
    taken = new Set(state.contractors.filter((c) => c.id !== input.dataset.id).map((c) => c.name.trim()));
  }
  const all = [...new Set(pool.map((s) => s.trim()).filter(Boolean))].filter((n) => !taken.has(n) && n !== q);
  if (!q) return all.slice(0, 12);
  const starts = all.filter((n) => n.startsWith(q));
  const contains = all.filter((n) => !n.startsWith(q) && n.includes(q));
  return [...starts, ...contains].slice(0, 12);
}
function showAc(input) {
  const list = input.closest('.extra-row, .con-row')?.querySelector('.ac-list');
  if (!list) return;
  list.innerHTML = acSuggestions(input).map((s) => `<button class="chip sm" data-action="ac-pick" data-value="${esc(s)}">${esc(s)}</button>`).join('');
}
function hideAc(input) {
  const list = input.closest('.extra-row, .con-row')?.querySelector('.ac-list');
  if (list) setTimeout(() => { if (document.activeElement !== input) list.innerHTML = ''; }, 250);
}

/* =========================================================
   Sheets
   ========================================================= */
function openSheet(title, body, st) {
  sheet = st;
  const root = $('#sheet-root');
  root.innerHTML = `<div class="sheet-backdrop" data-action="close-sheet"></div>
    <div class="sheet" role="dialog" aria-modal="true">
      <div class="sheet-grip"></div>
      <div class="sheet-head"><h2>${title}</h2><button class="text-btn" data-action="close-sheet">סגירה</button></div>
      <div class="sheet-body">${body}</div>
    </div>`;
  document.body.classList.add('sheet-open');
  void root.offsetHeight; // force layout so the slide-up transition runs
  root.classList.add('show');
}
function closeSheet() {
  const root = $('#sheet-root');
  root.classList.remove('show');
  document.body.classList.remove('sheet-open');
  const was = sheet;
  sheet = null;
  setTimeout(() => { if (!sheet) root.innerHTML = ''; }, 300);
  if (was?.type === 'contractors' || was?.type === 'settings') render();
  else refresh();
}

/* ---------- breakdown ---------- */
function openBreakdown(h, rule, m, d, date) {
  const { guests, contractors } = hallCounts(h);
  let sub;
  if (date) { const dt = parseDate(date); sub = `${DAYS[d]}, ${dt.getDate()} ב${MONTHS[m]}`; }
  else if (m != null && d != null) sub = `${DAYS[d]} ב${MONTHS[m]}`;
  else sub = describeRule(rule);
  openSheet(`${esc(h.name || 'אולם')}<small>${esc(sub)}</small>`, `
    <div class="card" style="margin:0">
      <div class="calc-cols">
        <div><div class="label sm">אורחים</div>${stepper('sheet-guests', guests, 10)}</div>
        <div><div class="label sm">ספקים</div>${stepper('sheet-contractors', contractors, 1)}</div>
      </div>
    </div>
    <div id="bd-lines"></div>
    <div class="btn-row">
      <button class="btn ghost" data-action="edit-rule" data-rule="${rule.id}">עריכת התמחור</button>
      ${navigator.share ? '<button class="btn ghost" data-action="share-breakdown">שיתוף</button>' : ''}
    </div>`, { type: 'breakdown', hallId: h.id, ruleId: rule.id, guests, contractors, sub });
  renderBreakdownLines();
}
function breakdownData() {
  const h = findHall(sheet.hallId);
  const r = h?.rules.find((x) => x.id === sheet.ruleId);
  return h && r ? { h, r, c: calc(h, r, sheet.guests, sheet.contractors) } : null;
}
function renderBreakdownLines() {
  const el = $('#bd-lines');
  const data = breakdownData();
  if (!el || !data) return;
  const { c } = data;
  el.innerHTML = `<div class="lines">
      ${c.lines.map((l) => `<div class="line"><div class="l">${esc(l.label)}${l.detail ? `<small>${esc(l.detail)}</small>` : ''}</div><div class="a">${fmt(l.amount)}</div></div>`).join('')}
      ${c.vat ? `<div class="line sub"><div class="l">לפני מע״מ</div><div class="a">${fmt(c.subtotal)}</div></div>
        <div class="line"><div class="l">מע״מ<small>${state.vatRate}%</small></div><div class="a">${fmt(c.vat)}</div></div>` : ''}
    </div>
    <div class="total-box">
      <div><div style="font-size:14px;opacity:.9">סה״כ</div><div class="t">${fmt(c.total)}</div></div>
      <div class="pg">לאורח<b>${fmt(c.perGuest)}</b></div>
    </div>`;
}
function shareBreakdown() {
  const data = breakdownData();
  if (!data) return;
  const { h, c } = data;
  const text = [
    `${h.name || 'אולם'} — ${sheet.sub}`,
    `${sheet.guests} אורחים, ${sheet.contractors} ספקים`,
    '',
    ...c.lines.map((l) => `${l.label}: ${fmt(l.amount)}${l.detail ? ` (${l.detail})` : ''}`),
    ...(c.vat ? [`מע״מ: ${fmt(c.vat)}`] : []),
    '',
    `סה״כ: ${fmt(c.total)} (${fmt(c.perGuest)} לאורח)`,
  ].join('\n');
  navigator.share({ text }).catch(() => {});
}

/* ---------- rule editor ---------- */
function openRuleEditor(h, rule) {
  const isNew = !rule;
  const draft = rule
    ? { ...rule, months: [...rule.months], days: [...rule.days] }
    : { id: uid(), months: [], days: [], price: '', contractorPrice: '', note: '' };
  openSheet(isNew ? 'תמחור חדש' : 'עריכת תמחור', `
    <div class="label">חודשים</div>
    <div class="toggle-grid months" id="rule-months"></div>
    <div class="label">ימים</div>
    <div class="toggle-grid days" id="rule-days"></div>
    <div class="label">מחירים</div>
    <div class="card">
      <label class="field-row"><span>מחיר למנה</span>
        <div class="money-input"><input type="number" inputmode="decimal" id="rule-price" value="${esc(draft.price)}" placeholder="0"><span>₪</span></div></label>
      <div class="divider"></div>
      <label class="field-row"><span>ארוחת ספק<small>ריק = ${hasVal(h.contractorPrice) ? fmt(h.contractorPrice) : 'ברירת המחדל'} של האולם</small></span>
        <div class="money-input"><input type="number" inputmode="decimal" id="rule-cprice" value="${esc(draft.contractorPrice)}" placeholder="${esc(h.contractorPrice || '')}"><span>₪</span></div></label>
      <div class="divider"></div>
      <label class="field-row"><span>הערה</span><input type="text" id="rule-note" value="${esc(draft.note)}" placeholder="למשל: כולל בר"></label>
    </div>
    <p class="hint">אם כמה תמחורים חלים על אותו תאריך — התמחור המצומצם ביותר קובע (למשל ״ספטמבר · חמישי״ גובר על ״כל השנה״).</p>
    <div class="sheet-actions">
      <button class="btn primary" data-action="save-rule">שמירה</button>
      ${isNew ? '' : `<div class="btn-row"><button class="btn ghost" data-action="dup-rule">שכפול</button><button class="btn ghost" style="color:var(--danger)" data-action="del-rule">מחיקה</button></div>`}
    </div>`, { type: 'rule', hallId: h.id, draft, isNew });
  renderRuleToggles();
}
function renderRuleToggles() {
  const d = sheet.draft;
  $('#rule-months').innerHTML = `<button class="all ${d.months.length ? '' : 'on'}" data-action="rule-month" data-v="">כל השנה</button>` +
    MONTHS.map((n, i) => `<button class="${d.months.includes(i) ? 'on' : ''}" data-action="rule-month" data-v="${i}">${n}</button>`).join('');
  $('#rule-days').innerHTML = `<button class="all ${d.days.length ? '' : 'on'}" data-action="rule-day" data-v="">כל הימים</button>` +
    DAYS_SHORT.map((n, i) => `<button class="${d.days.includes(i) ? 'on' : ''}" data-action="rule-day" data-v="${i}">${i === 6 ? n : `יום ${n}`}</button>`).join('');
}
function toggleIn(arr, v, total) {
  if (v === '') return [];
  const n = Number(v);
  const out = arr.includes(n) ? arr.filter((x) => x !== n) : [...arr, n].sort((a, b) => a - b);
  return out.length === total ? [] : out;
}
function readRuleDraft() {
  const d = sheet.draft;
  d.price = $('#rule-price').value === '' ? '' : num($('#rule-price').value);
  d.contractorPrice = $('#rule-cprice').value === '' ? '' : num($('#rule-cprice').value);
  d.note = $('#rule-note').value.trim();
  return d;
}

/* ---------- contractors ---------- */
function openContractors() {
  openSheet(`ספקים שאוכלים<small>האולם מחייב ארוחה לכל ספק</small>`, `
    <p class="hint" style="margin:0 2px 12px">הספקים שלכם שיאכלו באירוע. מחיר ארוחת ספק מוגדר בכל אולם בנפרד.</p>
    <div class="card" id="con-list"></div>
    <div class="preset-chips" id="con-presets"></div>`, { type: 'contractors' });
  renderContractors();
}
function renderContractors() {
  const el = $('#con-list');
  if (!el) return;
  el.innerHTML = (state.contractors.length
    ? state.contractors.map((c) => `
      <div class="extra-row con-row">
        <div class="extra-line">
          <input class="extra-name" data-con-field="name" data-id="${c.id}" data-ac="contractor" value="${esc(c.name)}" placeholder="סוג ספק" autocomplete="off" enterkeyhint="done">
          ${stepper(`con:${c.id}`, num(c.count), 1, true)}
          <button class="x-btn" data-action="del-contractor" data-id="${c.id}" aria-label="מחיקה">×</button>
        </div>
        <div class="ac-list"></div>
      </div>`).join('')
    : '<p class="hint">אין ספקים ברשימה</p>') +
    `<button class="add-row" data-action="add-contractor">${ICON.plus}הוספת ספק</button>
     <div class="row-between" style="margin-top:10px;padding-top:10px;border-top:1px solid var(--line)"><span class="label">סה״כ ארוחות ספקים</span><b id="con-sheet-total">${contractorsTotal()}</b></div>`;
  const have = new Set(state.contractors.map((c) => c.name.trim()));
  $('#con-presets').innerHTML = CONTRACTOR_PRESETS.filter((n) => !have.has(n))
    .map((n) => `<button class="chip sm" data-action="add-contractor" data-name="${esc(n)}">+ ${esc(n)}</button>`).join('');
}

/* ---------- settings ---------- */
function openSettings() {
  openSheet('הגדרות', `
    <div class="card">
      <label class="field-row"><span>שיעור מע״מ<small>לאולמות שהמחיר שלהם לא כולל מע״מ</small></span>
        <div class="money-input"><input type="number" inputmode="decimal" data-setting="vatRate" value="${esc(state.vatRate)}"><span>%</span></div></label>
    </div>
    <div class="label">גיבוי</div>
    <p class="hint" style="margin:0 2px 10px">הנתונים נשמרים רק במכשיר הזה. מומלץ לגבות מדי פעם, או כדי להעביר לטלפון של בן/בת הזוג.</p>
    <button class="btn ghost" data-action="export">ייצוא גיבוי</button>
    <button class="btn ghost" data-action="import">ייבוא מגיבוי</button>
    <input type="file" id="import-file" accept="application/json,.json" hidden>
    <div class="label">התקנה באייפון</div>
    <p class="hint" style="margin:0 2px 10px">בספארי: כפתור השיתוף ← ״הוספה למסך הבית״. האפליקציה תעבוד גם בלי אינטרנט.</p>
    <button class="btn danger" data-action="wipe">מחיקת כל הנתונים</button>`, { type: 'settings' });
}
async function exportData() {
  flush();
  const json = JSON.stringify(state, null, 2);
  const name = `wedding-halls-${new Date().toISOString().slice(0, 10)}.json`;
  const file = new File([json], name, { type: 'application/json' });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], title: 'גיבוי השוואת אולמות' }); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const s = JSON.parse(reader.result);
      if (!s || !Array.isArray(s.halls)) throw new Error('bad');
      if (!confirm(`לייבא ${s.halls.length} אולמות? הנתונים הנוכחיים יוחלפו.`)) return;
      state = { ...defaults(), ...s, filter: { ...defaults().filter, ...s.filter } };
      flush();
      closeSheet();
      toast('הגיבוי יובא בהצלחה');
    } catch (e) { alert('הקובץ לא תקין'); }
  };
  reader.readAsText(file);
}

/* =========================================================
   Render / routing
   ========================================================= */
function render() {
  const h = currentHall();
  if (h) renderHall(h);
  else {
    if (location.hash) history.replaceState(null, '', location.pathname);
    renderMain();
  }
}
function refresh() {
  const h = currentHall();
  if (h) {
    renderResetBtn(h);
    renderRules(h);
    renderDateCheck(h);
    renderGrid(h);
  } else {
    renderHallList();
    const t = $('#con-total');
    if (t) t.textContent = contractorsTotal();
    const s = $('#con-summary');
    if (s) s.innerHTML = contractorsSummary();
  }
  if (sheet?.type === 'breakdown') renderBreakdownLines();
  if (sheet?.type === 'contractors') { const t = $('#con-sheet-total'); if (t) t.textContent = contractorsTotal(); }
}
let cameFromMain = false;
function goHall(id) {
  mainScroll = scrollY;
  cameFromMain = true;
  location.hash = `#/hall/${id}`;
}
function goBack() {
  const h = currentHall();
  // Drop a hall that was created and left completely empty.
  if (h && !h.name.trim() && !h.rules.length && !h.extras.length && !hasVal(h.contractorPrice)) {
    state.halls = state.halls.filter((x) => x.id !== h.id);
    save();
  }
  if (cameFromMain) { cameFromMain = false; history.back(); } else location.hash = '';
}
addEventListener('hashchange', () => {
  if (sheet) { sheet = null; $('#sheet-root').innerHTML = ''; $('#sheet-root').classList.remove('show'); document.body.classList.remove('sheet-open'); }
  render();
  if (currentHall()) scrollTo(0, 0);
  else scrollTo(0, mainScroll);
});

/* =========================================================
   Events
   ========================================================= */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-action]');
  if (!t) return;
  const a = t.dataset.action;
  const h = currentHall();
  switch (a) {
    case 'step':
      setCount(t.dataset.target, getCount(t.dataset.target) + Number(t.dataset.delta));
      break;

    // main
    case 'add-hall': {
      const hall = { id: uid(), name: '', contractorPrice: '', minGuests: '', vatExcluded: false, contact: '', notes: '', rules: [], extras: [], createdAt: Date.now() };
      state.halls.push(hall);
      save();
      goHall(hall.id);
      setTimeout(() => $('.title-input')?.focus(), 50);
      break;
    }
    case 'open-hall': goHall(t.dataset.id); break;
    case 'filter-month':
      state.filter.month = t.dataset.m === '' ? null : Number(t.dataset.m);
      state.filter.date = '';
      save(); renderMain();
      break;
    case 'filter-day':
      state.filter.day = t.dataset.d === '' ? null : Number(t.dataset.d);
      state.filter.date = '';
      save(); renderMain();
      break;
    case 'clear-filter':
      state.filter = { month: null, day: null, date: '' };
      save(); renderMain();
      break;
    case 'open-contractors': openContractors(); break;
    case 'open-settings': openSettings(); break;

    // hall
    case 'back': goBack(); break;
    case 'del-hall':
      if (h && confirm(`למחוק את "${h.name || 'האולם'}"?`)) {
        state.halls = state.halls.filter((x) => x.id !== h.id);
        save();
        location.hash = '';
      }
      break;
    case 'reset-hall-counts':
      delete hallOverrides[h.id];
      renderHall(h);
      break;
    case 'add-rule': openRuleEditor(h, null); break;
    case 'edit-rule': {
      const hall = h || findHall(sheet?.hallId);
      openRuleEditor(hall, hall.rules.find((r) => r.id === t.dataset.rule));
      break;
    }
    case 'breakdown': {
      const r = h.rules.find((x) => x.id === t.dataset.rule);
      const m = t.dataset.m != null ? Number(t.dataset.m) : null;
      const d = t.dataset.d != null ? Number(t.dataset.d) : null;
      if (r) openBreakdown(h, r, m, d, t.dataset.date);
      break;
    }
    case 'add-extra': {
      const name = t.dataset.name || '';
      const preset = EXTRA_PRESETS.find((p) => p.name === name);
      const x = { id: uid(), name, amount: '', type: preset?.type || 'fixed' };
      h.extras.push(x);
      save();
      renderExtras(h);
      const sel = name ? `[data-extra-field="amount"][data-id="${x.id}"]` : `[data-extra-field="name"][data-id="${x.id}"]`;
      $(sel)?.focus();
      break;
    }
    case 'del-extra':
      h.extras = h.extras.filter((x) => x.id !== t.dataset.id);
      save(); renderExtras(h); refresh();
      break;
    case 'extra-type': {
      const x = h.extras.find((y) => y.id === t.dataset.id);
      if (x) x.type = t.dataset.type;
      save(); renderExtras(h); refresh();
      break;
    }
    case 'ac-pick': {
      const row = t.closest('.extra-row, .con-row');
      const input = row.querySelector('[data-ac]');
      input.value = t.dataset.value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      row.querySelector('.ac-list').innerHTML = '';
      if (input.dataset.ac === 'extra') {
        const preset = EXTRA_PRESETS.find((p) => p.name === t.dataset.value);
        const x = h.extras.find((y) => y.id === input.dataset.id);
        if (preset && x && !hasVal(x.amount)) { x.type = preset.type; save(); renderExtras(h); }
        $(`[data-extra-field="amount"][data-id="${input.dataset.id}"]`)?.focus();
      } else input.blur();
      break;
    }

    // sheets
    case 'close-sheet': closeSheet(); break;
    case 'share-breakdown': shareBreakdown(); break;
    case 'rule-month': readRuleDraft(); sheet.draft.months = toggleIn(sheet.draft.months, t.dataset.v, 12); renderRuleToggles(); break;
    case 'rule-day': readRuleDraft(); sheet.draft.days = toggleIn(sheet.draft.days, t.dataset.v, 7); renderRuleToggles(); break;
    case 'save-rule': {
      const d = readRuleDraft();
      if (!(num(d.price) > 0)) { $('#rule-price').focus(); toast('הזינו מחיר למנה'); return; }
      const hall = findHall(sheet.hallId);
      const i = hall.rules.findIndex((r) => r.id === d.id);
      if (i >= 0) hall.rules[i] = d; else hall.rules.push(d);
      save(); closeSheet();
      toast('נשמר');
      break;
    }
    case 'dup-rule': {
      const d = readRuleDraft();
      const hall = findHall(sheet.hallId);
      const copy = { ...d, id: uid(), months: [...d.months], days: [...d.days] };
      openRuleEditor(hall, null);
      sheet.draft = copy;
      $('#rule-price').value = copy.price; $('#rule-cprice').value = copy.contractorPrice; $('#rule-note').value = copy.note;
      renderRuleToggles();
      toast('עותק — שנו חודשים/ימים ושמרו');
      break;
    }
    case 'del-rule': {
      const hall = findHall(sheet.hallId);
      if (!confirm('למחוק את התמחור?')) return;
      hall.rules = hall.rules.filter((r) => r.id !== sheet.draft.id);
      save(); closeSheet();
      break;
    }
    case 'add-contractor': {
      const c = { id: uid(), name: t.dataset.name || '', count: 1 };
      state.contractors.push(c);
      save(); renderContractors();
      if (!c.name) $(`[data-con-field="name"][data-id="${c.id}"]`)?.focus();
      break;
    }
    case 'del-contractor':
      state.contractors = state.contractors.filter((c) => c.id !== t.dataset.id);
      save(); renderContractors();
      break;
    case 'export': exportData(); break;
    case 'import': $('#import-file').click(); break;
    case 'wipe':
      if (confirm('למחוק את כל האולמות והנתונים? אי אפשר לבטל.')) {
        state = defaults(); flush(); closeSheet();
      }
      break;
  }
});

document.addEventListener('input', (e) => {
  const t = e.target;
  const h = currentHall();
  if (t.dataset.count) { setCount(t.dataset.count, t.value, true); return; }
  if (t.dataset.hallField && h) {
    const f = t.dataset.hallField;
    if (f === 'vatExcluded') h.vatExcluded = t.checked;
    else if (f === 'contractorPrice' || f === 'minGuests') h[f] = t.value === '' ? '' : num(t.value);
    else h[f] = t.value;
    save();
    if (f !== 'name' && f !== 'notes' && f !== 'contact') refresh();
    return;
  }
  if (t.dataset.extraField && h) {
    const x = h.extras.find((y) => y.id === t.dataset.id);
    if (!x) return;
    if (t.dataset.extraField === 'amount') { x.amount = t.value === '' ? '' : num(t.value); refresh(); }
    else { x.name = t.value; showAc(t); }
    save();
    return;
  }
  if (t.dataset.conField) {
    const c = state.contractors.find((y) => y.id === t.dataset.id);
    if (c) c.name = t.value;
    showAc(t);
    save();
    return;
  }
  if (t.dataset.setting === 'vatRate') { state.vatRate = num(t.value); save(); }
});

document.addEventListener('change', (e) => {
  const t = e.target;
  if (t.dataset.change === 'filter-date') {
    if (t.value) {
      const d = parseDate(t.value);
      state.filter = { month: d.getMonth(), day: d.getDay(), date: t.value };
    } else state.filter = { month: null, day: null, date: '' };
    save(); renderMain();
  } else if (t.dataset.change === 'check-date') {
    const h = currentHall();
    hallDates[h.id] = t.value;
    $('#check-date-label').textContent = t.value ? fmtDate(t.value) : 'בחירה';
    renderDateCheck(h);
  } else if (t.id === 'import-file' && t.files[0]) importData(t.files[0]);
  else if (t.dataset.hallField === 'vatExcluded') t.dispatchEvent(new Event('input', { bubbles: true }));
});

document.addEventListener('focusin', (e) => {
  if (e.target.dataset?.ac) showAc(e.target);
  if (e.target.classList?.contains('step-input')) e.target.select();
});
document.addEventListener('focusout', (e) => {
  if (e.target.dataset?.ac) hideAc(e.target);
  // Normalise an emptied count input back to 0 on blur.
  if (e.target.dataset?.count && e.target.value === '') e.target.value = 0;
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.matches('input:not([type=checkbox])')) e.target.blur();
});

/* =========================================================
   Boot
   ========================================================= */
render();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
