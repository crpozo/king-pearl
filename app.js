/* ============ King Pearl — vanilla render layer ============ */
(function () {
  const { FLAVORS, PRICE, I18N, CONTACT } = window.KP;
  const FLAVOR_HEX = ['#FF9E1B', '#D7263D', '#7AC70C', '#E8245A', '#7B2FBF', '#FF3B5C', '#FFA516'];
  const LIGHT_FLAVORS = { maracuya: 1, manzana: 1, mango: 1 }; // need dark text on their color

  // --- tiny helpers ---------------------------------------------------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let lang = 'es';
  let activeFlavor = 0;
  let lineupFilter = 'all';

  // Which flavor ids belong to each lineup filter pill.
  const LINEUP_CATS = {
    all: FLAVORS.map((f) => f.id),
    tropical: ['maracuya', 'mango'],
    berry: ['cereza', 'frambuesa', 'arandano', 'fresa'],
    new: FLAVORS.filter((f) => f.isNew).map((f) => f.id)
  };

  // --- SVG icon sets --------------------------------------------------------
  const usoIcons = [
    `<svg viewBox="0 0 48 48" fill="none"><path d="M13 16h22l-2.2 23a3 3 0 0 1-3 2.7H18.2a3 3 0 0 1-3-2.7L13 16Z" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><path d="M11 16h26" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M29 16 32 5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="21" cy="31" r="2.3" fill="currentColor"/><circle cx="27" cy="36" r="2.3" fill="currentColor"/><circle cx="26" cy="27" r="2.3" fill="currentColor"/></svg>`,
    `<svg viewBox="0 0 48 48" fill="none"><path d="M16 22a8 8 0 0 1 16 0" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M14 22h20l-9 21a1 1 0 0 1-2 0L14 22Z" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><circle cx="21" cy="16" r="2" fill="currentColor"/><circle cx="28" cy="17" r="2" fill="currentColor"/></svg>`,
    `<svg viewBox="0 0 48 48" fill="none"><path d="M24 6c1.4 8 4 10.6 12 12-8 1.4-10.6 4-12 12-1.4-8-4-10.6-12-12 8-1.4 10.6-4 12-12Z" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><circle cx="38" cy="34" r="2.4" fill="currentColor"/></svg>`
  ];
  const featIcons = [
    `<svg viewBox="0 0 48 48" fill="none"><path d="M24 7c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle cx="36" cy="32" r="2.6" fill="currentColor"/><circle cx="13" cy="34" r="2.2" fill="currentColor"/></svg>`,
    `<svg viewBox="0 0 48 48" fill="none"><path d="M38 10C24 10 14 18 14 30c0 4 2 8 2 8s10-2 16-8 6-20 6-20Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 38c4-8 10-14 20-20" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    `<svg viewBox="0 0 48 48" fill="none"><path d="M24 6v36M9 15l30 18M39 15 9 33" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="24" r="5" fill="currentColor"/></svg>`,
    `<svg viewBox="0 0 48 48" fill="none"><path d="M14 16h20l-2 24a3 3 0 0 1-3 2.7H19a3 3 0 0 1-3-2.7L14 16Z" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M11 16h26" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M29 16l3-10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>`
  ];
  const waIcon = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.4A10 10 0 1 0 12 2Zm5.6 14.1c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.1.5.1.7-.1l.8-1c.2-.3.4-.2.6-.1l2 .9c.3.2.5.3.6.4.1.2.1.7-.1 1.4Z"/></svg>`;

  // --- markup builders ------------------------------------------------------
  function nav(t) {
    const links = [['#sabores', t.nav.sabores], ['#usos', t.nav.usos],
      ['#recetas', t.nav.recetas], ['#nosotros', t.nav.nosotros], ['#contacto', t.nav.contacto]];
    const linkHtml = links.map(([h, l]) => `<a href="${h}">${esc(l)}</a>`).join('');
    return `
    <header class="nv" id="nav">
      <div class="wrap nv__inner">
        <nav class="nv__links">${linkHtml}</nav>
        <a href="#top" class="nv__brand"><img src="assets/kp-logo.png" alt="King Pearl" /></a>
        <div class="nv__right">
          <div class="lang">
            <button data-lang="es" class="${lang === 'es' ? 'on' : ''}">ES</button>
            <button data-lang="en" class="${lang === 'en' ? 'on' : ''}">EN</button>
          </div>
          <a class="nv__cta" href="${CONTACT.waLink}" target="_blank" rel="noopener">${esc(t.cta.quote)}</a>
          <button class="nv__burger" id="burger" aria-label="menu"><span></span><span></span><span></span></button>
        </div>
      </div>
      <div class="nv__mob" id="mob" style="display:none">
        ${linkHtml}
        <a class="btn btn--accent" href="${CONTACT.waLink}" target="_blank" rel="noopener">${esc(t.cta.quote)}</a>
      </div>
    </header>`;
  }

  function hero(t) {
    const get = (id) => FLAVORS.find((f) => f.id === id);
    const head = t.hero.line;
    return `
    <section class="hero" id="top">
      <img class="hero__cup hero__cup--l" src="${get('manzana').img}" alt="" aria-hidden="true" />
      <img class="hero__cup hero__cup--r" src="${get('fresa').img}" alt="" aria-hidden="true" />
      <div class="hero__center">
        <h1 class="display hero__h">${esc(head[0])}<br />${esc(head[1])}</h1>
        <div class="hero__sub">${(Array.isArray(t.hero.sub) ? t.hero.sub : [t.hero.sub]).map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        <a class="hero__cta" href="#sabores">${esc(t.cta.flavors)} <span aria-hidden="true">›</span></a>
      </div>
      <svg class="hero__wave" viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#FFFFFF" d="M0,130 L0,86 C420,86 520,86 612,86 C672,86 686,28 720,28 C754,28 768,86 828,86 C920,86 1020,86 1440,86 L1440,130 Z" />
      </svg>
      <a class="hero__dot" href="#sabores" aria-label="scroll">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </a>
    </section>`;
  }

  function marquee(t) {
    let row = '';
    for (let i = 0; i < 6; i++) {
      row += `<span class="mq__item">${esc(t.marquee)}<span class="mq__dot" style="background:${FLAVOR_HEX[i % 7]}"></span></span>`;
    }
    return `<div class="mq"><div class="mq__row">${row}${row}</div></div>`;
  }

  const arrowIcon = (dir) =>
    `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${dir === 'prev' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}"/></svg>`;

  // Five-star rating: a grey base row with a colored layer clipped to %.
  function starRow(rating) {
    const star = '<svg class="star" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.95 2.6.94-5.5-4-3.9 5.53-.8L10 1.6Z"/></svg>';
    const five = star.repeat(5);
    const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
    return `<span class="stars" role="img" aria-label="${rating} / 5">
        <span class="stars__bg">${five}</span>
        <span class="stars__fg" style="width:${pct}%">${five}</span>
        <span class="stars__num">${rating.toFixed(1)}</span>
      </span>`;
  }

  // One flavor card — image with hover CTA, rating, category tag, name.
  function lineupCard(f, t) {
    const name = lang === 'es' ? f.es : f.en;
    const tag = lang === 'es' ? f.tagEs : f.tagEn;
    return `
      <article class="pcard" style="--c:${f.color};--deep:${f.deep}">
        <div class="pcard__media">
          ${f.isNew ? `<span class="pcard__badge">${esc(t.flavors.new)}</span>` : ''}
          <img src="${f.img}" alt="${esc(name)}" loading="lazy" decoding="async" />
          <a class="pcard__add" href="${CONTACT.waLink}" target="_blank" rel="noopener">${esc(t.lineup.add)}</a>
        </div>
        ${starRow(f.rating)}
        <span class="pcard__tag">${esc(tag)}</span>
        <h3 class="pcard__name">${esc(name)}</h3>
      </article>`;
  }

  // Cards + subline for the currently selected filter.
  function lineupCardsHtml(t) {
    const ids = LINEUP_CATS[lineupFilter] || LINEUP_CATS.all;
    return ids.map((id) => lineupCard(FLAVORS.find((f) => f.id === id), t)).join('');
  }
  function lineupSub(t) {
    const n = (LINEUP_CATS[lineupFilter] || LINEUP_CATS.all).length;
    return `${n} ${esc(t.lineup.count)} · ${esc(t.lineup.refr)} <span class="pl__snow" aria-hidden="true">❄</span>`;
  }

  // OLIPOP "Shop our collections"-style selector: filter pills, a contextual
  // subline, and a scroll-snap carousel of rated cards with prev/next arrows.
  function productLineup(t) {
    const pills = t.lineup.filters.map((fl) =>
      `<button class="pl__pill${fl.id === lineupFilter ? ' on' : ''}" data-filter="${fl.id}">${esc(fl.label)}</button>`).join('');
    return `
    <section class="pl">
      <div class="wrap">
        <div class="pl__head">
          <h2 class="display pl__title reveal d1">${esc(t.lineup.title)}</h2>
          <div class="pl__filters reveal d1" role="tablist">${pills}</div>
          <p class="pl__sub reveal d1" id="plSub">${lineupSub(t)}</p>
        </div>
      </div>
      <div class="pl__deck reveal d2">
        <button class="pl__nav pl__nav--prev" id="plPrev" aria-label="Anterior">${arrowIcon('prev')}</button>
        <div class="pl__row" id="plRow">${lineupCardsHtml(t)}</div>
        <button class="pl__nav pl__nav--next" id="plNext" aria-label="Siguiente">${arrowIcon('next')}</button>
      </div>
      <div class="wrap pl__cta reveal d2">
        <a class="btn btn--accent pl__btn" href="#sabores">${esc(t.lineup.all)} <span aria-hidden="true">›</span></a>
      </div>
    </section>`;
  }

  function wireLineup() {
    const t = I18N[lang];
    const row = document.getElementById('plRow');
    const sub = document.getElementById('plSub');
    const prev = document.getElementById('plPrev');
    const next = document.getElementById('plNext');
    if (!row) return;

    document.querySelectorAll('[data-filter]').forEach((b) => {
      b.addEventListener('click', () => {
        lineupFilter = b.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach((x) => x.classList.toggle('on', x === b));
        row.innerHTML = lineupCardsHtml(t);
        sub.innerHTML = lineupSub(t);
        row.scrollTo({ left: 0, behavior: 'smooth' });
        syncArrows();
      });
    });

    const step = () => {
      const card = row.querySelector('.pcard');
      const gap = parseFloat(getComputedStyle(row).columnGap) || 20;
      return card ? card.offsetWidth + gap : row.clientWidth * 0.8;
    };
    const syncArrows = () => {
      const max = row.scrollWidth - row.clientWidth - 2;
      const overflow = max > 4;
      [prev, next].forEach((b) => b.classList.toggle('pl__nav--hide', !overflow));
      prev.disabled = row.scrollLeft <= 2;
      next.disabled = row.scrollLeft >= max;
    };
    prev.addEventListener('click', () => row.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => row.scrollBy({ left: step(), behavior: 'smooth' }));
    row.addEventListener('scroll', syncArrows, { passive: true });
    window.addEventListener('resize', syncArrows, { passive: true });
    syncArrows();
  }

  // bite (pearl) · burst (splash star) · repeat (loop)
  const stepIcons = [
    `<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M24 7c6.5 8 11 12.6 11 19a11 11 0 0 1-22 0c0-6.4 4.5-11 11-19Z"/><path d="M19 26a5 5 0 0 0 5 5"/></svg>`,
    `<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M24 5l3.2 7.6L35 9l-2.6 8 8.1.5-6.6 5 6.6 5-8.1.5 2.6 8-7.8-3.6L24 43l-3.2-7.6L13 39l2.6-8-8.1-.5 6.6-5-6.6-5 8.1-.5L13 9l7.8 3.6L24 5Z"/></svg>`,
    `<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18a12 12 0 0 1 20-3"/><path d="M34 8v8h-8"/><path d="M34 30a12 12 0 0 1-20 3"/><path d="M14 40v-8h8"/></svg>`
  ];
  function steps(t) {
    const colors = [FLAVOR_HEX[0], FLAVOR_HEX[1], FLAVOR_HEX[2]]; // orange · red · green
    const lbl = lang === 'es' ? 'Paso' : 'Step';
    const items = t.steps.items.map((s, i) => `
      <article class="s2 reveal d${i + 1}" style="--c:${colors[i]}">
        <span class="s2__ghost" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div class="s2__badge">${stepIcons[i]}</div>
        <span class="s2__num">${lbl} ${String(i + 1).padStart(2, '0')}</span>
        <h3 class="s2__t">${esc(s[0])}</h3>
        <p class="s2__d">${esc(s[1])}</p>
      </article>`).join('');
    return `
    <section class="steps" id="perlas">
      <div class="wrap">
        <div class="steps__head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(t.steps.tag)}</span>
          <h2 class="display steps__title reveal d1">${esc(t.steps.title)}</h2>
        </div>
        <div class="steps__grid">${items}</div>
      </div>
    </section>`;
  }

  // interactive showcase — rebuilt on flavor change so the section recolors
  function showcaseHtml(t) {
    const f = FLAVORS[activeFlavor];
    const dark = !!LIGHT_FLAVORS[f.id];
    const name = lang === 'es' ? f.es : f.en;
    const desc = lang === 'es' ? f.descEs : f.descEn;
    const txt = dark ? '#1A1611' : '#fff';
    const sub = dark ? 'rgba(26,22,17,.7)' : 'rgba(255,255,255,.82)';

    const chips = FLAVORS.map((ff, k) => `
      <button role="tab" aria-selected="${k === activeFlavor}" data-chip="${k}"
        class="fchip${k === activeFlavor ? ' on' : ''}"
        style="--c:${ff.color};border-color:${k === activeFlavor ? txt : (dark ? 'rgba(26,22,17,.28)' : 'rgba(255,255,255,.4)')};color:${txt}">
        <span class="fchip__sw" style="background:${ff.color}"></span>
        <span>${esc(lang === 'es' ? ff.es : ff.en)}</span>
        ${ff.isNew ? `<span class="fchip__new">${esc(t.flavors.new)}</span>` : ''}
      </button>`).join('');

    return `
      <div class="wrap">
        <div class="sc__head">
          <h2 class="display sc__title">${esc(t.flavors.title)}</h2>
        </div>
        <div class="sc__main">
          <div class="sc__stage">
            <figure class="sc__tub">
              ${f.isNew ? `<span class="sc__new">${esc(t.flavors.new)}</span>` : ''}
              <img src="${f.img}" alt="${esc(name)}" loading="eager" decoding="async" fetchpriority="high" />
            </figure>
          </div>
          <div class="sc__info">
            <h3 class="display sc__name">${esc(name)}</h3>
            <p class="sc__desc" style="color:${sub}">${esc(desc)}</p>
            <div class="sc__buy">
              <span class="sc__price"><small style="color:${sub}">${esc(t.flavors.from)}</small> ${esc(PRICE)}</span>
              <a class="btn ${dark ? 'btn--ink' : 'btn--cream'}" href="${CONTACT.waLink}" target="_blank" rel="noopener">${esc(t.cta.quote)}</a>
            </div>
          </div>
        </div>
        <div class="sc__picker" role="tablist">${chips}</div>
      </div>`;
  }

  function paintShowcase() {
    const t = I18N[lang];
    const f = FLAVORS[activeFlavor];
    const dark = !!LIGHT_FLAVORS[f.id];
    const sc = document.getElementById('sabores');
    sc.style.background = f.color;
    sc.style.color = dark ? '#1A1611' : '#fff';
    sc.innerHTML = showcaseHtml(t);
    sc.querySelectorAll('[data-chip]').forEach((b) => {
      b.addEventListener('click', () => { activeFlavor = Number(b.dataset.chip); paintShowcase(); });
    });
  }

  function usos(t) {
    const colors = ['#FF9E1B', '#E8245A', '#7B2FBF'];
    const cards = t.usos.items.map((it, i) => `
      <article class="uc reveal d${i + 1}" style="--c:${colors[i]}">
        <span class="uc__n display">${String(i + 1).padStart(2, '0')}</span>
        <span class="uc__ic">${usoIcons[i]}</span>
        <h3 class="uc__t">${esc(it.t)}</h3>
        <p class="uc__d">${esc(it.d)}</p>
      </article>`).join('');
    return `
    <section class="usos" id="usos">
      <div class="wrap">
        <div class="usos__head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(t.usos.tag)}</span>
          <h2 class="display usos__title reveal d1">${esc(t.usos.title)}</h2>
        </div>
        <div class="usos__grid">${cards}</div>
      </div>
    </section>`;
  }

  // OLIPOP "Our Mission"-style zig-zag: alternating illustration + copy rows.
  function features(t) {
    const accents = ['#FF9E1B', '#E8245A', '#7B2FBF', '#43AC28'];
    const rows = t.features.items.map((it, i) => `
      <article class="frow${i % 2 ? ' frow--rev' : ''} reveal d${(i % 2) + 1}" style="--c:${accents[i % accents.length]}">
        <figure class="frow__art">
          <span class="frow__disc"></span>
          <span class="frow__ic">${featIcons[i]}</span>
          <span class="frow__pearl frow__pearl--a"></span>
          <span class="frow__pearl frow__pearl--b"></span>
          <span class="frow__pearl frow__pearl--c"></span>
        </figure>
        <div class="frow__copy">
          <span class="frow__n display">${String(i + 1).padStart(2, '0')}</span>
          <h3 class="frow__t">${esc(it.t)}</h3>
          <p class="frow__d">${esc(it.d)}</p>
        </div>
      </article>`).join('');
    return `
    <section class="feats">
      <div class="wrap">
        <div class="feats__head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(t.features.tag)}</span>
          <h2 class="display feats__title reveal d1">${esc(t.features.title)}</h2>
        </div>
        <div class="feats__rows">${rows}</div>
      </div>
    </section>`;
  }

  const checkIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

  // "Qué son las perlas explosivas" — intro copy + benefits checklist.
  function whatare(t) {
    const c = t.whatare;
    const benefits = c.benefits.map((b) => `<li><span class="wa2__ck">${checkIcon}</span>${esc(b)}</li>`).join('');
    return `
    <section class="wa2" id="perlas">
      <div class="wrap wa2__grid">
        <div class="wa2__copy">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display wa2__title reveal d1">${esc(c.title)}</h2>
          <p class="wa2__body reveal d2">${esc(c.body)}</p>
        </div>
        <div class="wa2__card reveal d2">
          <h3 class="wa2__bt">${esc(c.benefitsTitle)}</h3>
          <ul class="wa2__benefits">${benefits}</ul>
        </div>
      </div>
    </section>`;
  }

  // "Cómo usarlas" — quantity table, serving steps, best drinks/desserts.
  function usage(t) {
    const c = t.usage;
    const qty = c.qty.map((q) => `<li><span>${esc(q[0])}</span><b>${esc(q[1])}</b></li>`).join('');
    const serve = c.serve.map((s) => `<li><span class="use__ck">${checkIcon}</span>${esc(s)}</li>`).join('');
    const chips = (arr) => arr.map((x) => `<span class="use__chip">${esc(x)}</span>`).join('');
    return `
    <section class="use" id="usos">
      <div class="wrap">
        <div class="sec-head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display sec-title reveal d1">${esc(c.title)}</h2>
          <p class="sec-intro reveal d2">${esc(c.intro)}</p>
        </div>
        <div class="use__grid">
          <div class="use__card reveal d1">
            <h3 class="use__ct">${esc(c.qtyTitle)}</h3>
            <ul class="use__qty">${qty}</ul>
            <p class="use__note">${esc(c.qtyNote)}</p>
          </div>
          <div class="use__card reveal d2">
            <h3 class="use__ct">${esc(c.serveTitle)}</h3>
            <ul class="use__serve">${serve}</ul>
          </div>
          <div class="use__card reveal d1">
            <h3 class="use__ct">${esc(c.drinksTitle)}</h3>
            <div class="use__chips">${chips(c.drinks)}</div>
          </div>
          <div class="use__card reveal d2">
            <h3 class="use__ct">${esc(c.dessertsTitle)}</h3>
            <div class="use__chips">${chips(c.desserts)}</div>
          </div>
        </div>
      </div>
    </section>`;
  }

  // "Conservación y manipulación" — checklist of storage tips.
  function care(t) {
    const c = t.care;
    const items = c.items.map((it, i) => `
      <li class="care__item reveal d${(i % 3) + 1}"><span class="care__ck">${checkIcon}</span>${esc(it)}</li>`).join('');
    return `
    <section class="care">
      <div class="wrap">
        <div class="sec-head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display sec-title reveal d1">${esc(c.title)}</h2>
          <p class="sec-intro reveal d2">${esc(c.body)}</p>
        </div>
        <ul class="care__grid">${items}</ul>
        <p class="care__note reveal">${esc(c.note)}</p>
      </div>
    </section>`;
  }

  // "Recetas King Pearl" — recipe cards with ingredients + method.
  function recipes(t) {
    const c = t.recipes;
    const catLabel = { drink: c.catDrink, dessert: c.catDessert, cocktail: c.catCocktail };
    const cards = c.list.map((r, i) => {
      const ing = r.ing.map((x) => `<li>${esc(x)}</li>`).join('');
      const steps = r.steps.map((x) => `<li>${esc(x)}</li>`).join('');
      return `
        <article class="rec__card reveal d${(i % 3) + 1}" data-cat="${r.cat}">
          <span class="rec__badge">${esc(catLabel[r.cat] || '')}</span>
          <h3 class="rec__name">${esc(r.name)}</h3>
          <div class="rec__block">
            <h4 class="rec__lbl">${esc(c.ingLabel)}</h4>
            <ul class="rec__ing">${ing}</ul>
          </div>
          <div class="rec__block">
            <h4 class="rec__lbl">${esc(c.stepLabel)}</h4>
            <ol class="rec__steps">${steps}</ol>
          </div>
        </article>`;
    }).join('');
    return `
    <section class="rec" id="recetas">
      <div class="wrap">
        <div class="sec-head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display sec-title reveal d1">${esc(c.title)}</h2>
          <p class="sec-intro reveal d2">${esc(c.intro)}</p>
        </div>
        <div class="rec__grid">${cards}</div>
        ${c.note ? `<p class="rec__note reveal">${esc(c.note)}</p>` : ''}
      </div>
    </section>`;
  }

  // "Beneficios de trabajar con King Pearl" — B2B value cards.
  function biz(t) {
    const c = t.biz;
    const colors = ['#FF9E1B', '#D7263D', '#7AC70C', '#E8245A', '#7B2FBF', '#FF3B5C'];
    const cards = c.items.map((it, i) => `
      <article class="biz__card reveal d${(i % 3) + 1}" style="--c:${colors[i % colors.length]}">
        <span class="biz__n display">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="biz__t">${esc(it.t)}</h3>
        <p class="biz__d">${esc(it.d)}</p>
      </article>`).join('');
    return `
    <section class="biz">
      <div class="wrap">
        <div class="sec-head sec-head--light">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display sec-title reveal d1">${esc(c.title)}</h2>
        </div>
        <div class="biz__grid">${cards}</div>
      </div>
    </section>`;
  }

  function about(t) {
    const c = t.about;
    return `
    <section class="ab" id="nosotros">
      <div class="wrap ab__grid">
        <div class="ab__copy">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display ab__h reveal d1"><span>${esc(c.a)}</span><span>${esc(c.b)}</span></h2>
          <p class="ab__body reveal d2">${esc(c.body)}</p>
        </div>
        <figure class="ab__art reveal d2"><img src="assets/hero-keyart.jpg" alt="King Pearl" /></figure>
      </div>
    </section>`;
  }

  function contact(t) {
    const c = t.contact;
    return `
    <section class="ct" id="contacto">
      <div class="wrap ct__inner">
        <h2 class="display ct__h reveal d1">${esc(c.title)}</h2>
        <p class="ct__body reveal d2">${esc(c.body)}</p>
        <a class="btn btn--accent ct__wa reveal d3" href="${CONTACT.waLink}" target="_blank" rel="noopener">${waIcon}${esc(c.wa)}</a>
        <div class="ct__social reveal d4">
          <a href="${CONTACT.fbLink}" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"/></svg>
          </a>
          <a href="${CONTACT.igLink}" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="${CONTACT.ttLink}" target="_blank" rel="noopener" aria-label="TikTok">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 8.3a6.5 6.5 0 0 1-3.9-1.3v6.6A5.6 5.6 0 1 1 11.5 8c.3 0 .6 0 .9.08v2.92a2.7 2.7 0 1 0 1.9 2.58V2h2.8A3.9 3.9 0 0 0 21 5.5V8.3Z"/></svg>
          </a>
        </div>
      </div>
      <div class="wrap ct__loc reveal">
        <figure class="ct__photo">
          <img src="assets/local-entrada.jpg" alt="Fachada de Autos Sierra — entrada a King Pearl" loading="lazy" />
          <figcaption>${esc(c.access)}</figcaption>
        </figure>
        <div class="ct__loc-info">
          <span class="ct__loc-eye">${esc(c.location)}</span>
          <p class="ct__addr">${esc(CONTACT.address)}</p>
          <div class="ct__hours">
            <span class="ct__hours-lbl">${esc(c.hoursLabel)}</span>
            ${c.hoursLines.map((h) => `<span>${esc(h)}</span>`).join('')}
          </div>
          <a class="btn btn--cream ct__dir" href="${CONTACT.mapsLink}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>
            ${esc(c.directions)}
          </a>
        </div>
      </div>
      <p class="wrap ct__thanks reveal">${esc(c.thanks)}</p>
      <footer class="ft">
        <div class="wrap ft__top">
          <div class="ft__brand">
            <img class="ft__logo" src="assets/kp-logo.png" alt="King Pearl" />
            <p class="ft__tag">${esc(c.ftTag)}</p>
          </div>
          <div class="ft__cols">
            <div class="ft__col">
              <h4>${esc(c.explore)}</h4>
              <a href="#sabores">${esc(t.nav.sabores)}</a>
              <a href="#nosotros">${esc(t.nav.nosotros)}</a>
            </div>
            <div class="ft__col">
              <h4>${esc(c.cols_contact)}</h4>
              <a href="${CONTACT.waLink}" target="_blank" rel="noopener">${esc(CONTACT.whatsapp)}</a>
              <a href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a>
              <a href="${CONTACT.igLink}" target="_blank" rel="noopener">${esc(CONTACT.instagram)}</a>
            </div>
            <div class="ft__col">
              <h4>${esc(c.cities)}</h4>
              <a href="${CONTACT.mapsLink}" target="_blank" rel="noopener">${esc(CONTACT.address)}</a>
              <span>${esc(c.hoursLines[0])}</span>
              <span>${esc(c.hoursLines[1])}</span>
            </div>
          </div>
        </div>
        <div class="wrap ft__bottom">
          <p class="ft__r">© ${new Date().getFullYear()} King Pearl · ${esc(c.rights)}</p>
        </div>
      </footer>
    </section>`;
  }

  // --- behaviours -----------------------------------------------------------
  function wireNav() {
    const nv = document.getElementById('nav');
    const onScroll = () => nv.classList.toggle('nv--solid', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    document.querySelectorAll('[data-lang]').forEach((b) => {
      b.addEventListener('click', () => setLang(b.dataset.lang));
    });

    const burger = document.getElementById('burger');
    const mob = document.getElementById('mob');
    if (burger) {
      burger.addEventListener('click', () => {
        mob.style.display = mob.style.display === 'none' ? 'flex' : 'none';
      });
      mob.addEventListener('click', () => { mob.style.display = 'none'; });
    }
  }

  function wireReveals() {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }

  // --- mount ----------------------------------------------------------------
  function render() {
    const t = I18N[lang];
    document.documentElement.lang = lang;
    const root = document.getElementById('root');
    root.innerHTML =
      nav(t) +
      '<main>' +
        hero(t) +
        productLineup(t) +
        '<section class="sc" id="sabores"></section>' +
        whatare(t) +
        usage(t) +
        care(t) +
        recipes(t) +
        about(t) +
        features(t) +
        biz(t) +
        contact(t) +
      '</main>';
    paintShowcase();
    wireLineup();
    wireNav();
    wireReveals();
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l === 'en' ? 'en' : 'es';
    render();
  }

  // Warm the browser cache so switching flavors in the showcase is instant.
  function preloadImages() {
    const urls = FLAVORS.map((f) => f.img).concat(['assets/hero-keyart.jpg']);
    urls.forEach((src) => { const im = new Image(); im.decoding = 'async'; im.src = src; });
  }

  preloadImages();
  render();
})();
