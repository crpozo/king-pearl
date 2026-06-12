/* ============ King Pearl — vanilla render layer ============ */
(function () {
  const { FLAVORS, PRICE, I18N, CONTACT } = window.KP;
  const FLAVOR_HEX = ['#FF9E1B', '#D7263D', '#7AC70C', '#E8245A', '#7B2FBF', '#FF3B5C', '#FFA516'];

  // --- tiny helpers ---------------------------------------------------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let lang = 'es';
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
    const route = currentRoute();
    const links = [['#/', t.nav.inicio], ['#/usos', t.nav.usos],
      ['#/recetas', t.nav.recetas], ['#/nosotros', t.nav.nosotros]];
    const linkHtml = links.map(([h, l]) =>
      `<a href="${h}" class="${('#' + route) === h ? 'on' : ''}">${esc(l)}</a>`).join('');
    return `
    <header class="nv" id="nav">
      <div class="wrap nv__inner">
        <nav class="nv__links">${linkHtml}</nav>
        <a href="#/" class="nv__brand"><img src="assets/kp-logo.png" alt="King Pearl" /></a>
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
        <path fill="#FFFFFF" d="M0,130 L0,112 C460,112 540,38 720,38 C900,38 980,112 1440,112 L1440,130 Z" />
      </svg>
      <a class="hero__dot" href="#sabores" aria-label="scroll">
        <img src="assets/crown-black.png" alt="" />
      </a>
    </section>`;
  }

  // Reusable colored page header for inner pages (mirrors the home hero).
  function pageBanner(eyebrow, title, sub) {
    return `
    <section class="phero">
      <span class="phero__pearl phero__pearl--1" aria-hidden="true"></span>
      <span class="phero__pearl phero__pearl--2" aria-hidden="true"></span>
      <span class="phero__pearl phero__pearl--3" aria-hidden="true"></span>
      <span class="phero__pearl phero__pearl--4" aria-hidden="true"></span>
      <div class="phero__center">
        <span class="eyebrow phero__eye"><span class="sq"></span>${esc(eyebrow)}</span>
        <h1 class="display phero__h">${esc(title)}</h1>
        ${sub ? `<p class="phero__sub">${esc(sub)}</p>` : ''}
      </div>
      <svg class="hero__wave" viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#FFFFFF" d="M0,130 L0,112 C460,112 540,38 720,38 C900,38 980,112 1440,112 L1440,130 Z" />
      </svg>
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
    <section class="pl" id="sabores">
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
        <a class="btn btn--accent pl__btn" href="${CONTACT.waLink}" target="_blank" rel="noopener">${esc(t.cta.quote)} <span aria-hidden="true">›</span></a>
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
    const maxScroll = () => row.scrollWidth - row.clientWidth - 2;
    const syncArrows = () => {
      // Keep both arrows active so the carousel can loop around endlessly.
      const overflow = maxScroll() > 4;
      [prev, next].forEach((b) => b.classList.toggle('pl__nav--hide', !overflow));
    };
    prev.addEventListener('click', () => {
      if (row.scrollLeft <= 2) row.scrollTo({ left: maxScroll(), behavior: 'smooth' });
      else row.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      if (row.scrollLeft >= maxScroll()) row.scrollTo({ left: 0, behavior: 'smooth' });
      else row.scrollBy({ left: step(), behavior: 'smooth' });
    });
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

  // Clean icon-card grid: a colored icon badge, title and description.
  function features(t) {
    const accents = ['#FF9E1B', '#E8245A', '#7B2FBF', '#43AC28'];
    const cards = t.features.items.map((it, i) => `
      <article class="feat reveal d${(i % 4) + 1}" style="--c:${accents[i % accents.length]}">
        <span class="feat__ic">${featIcons[i]}</span>
        <h3 class="feat__t">${esc(it.t)}</h3>
        <p class="feat__d">${esc(it.d)}</p>
      </article>`).join('');
    return `
    <section class="feats">
      <div class="wrap">
        <div class="feats__head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(t.features.tag)}</span>
          <h2 class="display feats__title reveal d1">${esc(t.features.title)}</h2>
        </div>
        <div class="feats__grid">${cards}</div>
      </div>
    </section>`;
  }

  const checkIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;
  // A bursting-pearl glyph: a circle with a small highlight + spark.
  const pearlIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true"><circle cx="11" cy="13" r="7" stroke="currentColor" stroke-width="2"/><circle cx="8.5" cy="10.5" r="1.6" fill="currentColor"/><path d="M19 4.5l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9.9-2Z" fill="currentColor"/></svg>`;

  // "Qué son las perlas explosivas" — centered intro, then an image beside an
  // accordion of benefits (native <details>, no JS). OLIPOP "Our Mission" style.
  function whatare(t) {
    const c = t.whatare;
    const chev = `<svg class="acc__chev" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
    const items = c.benefits.map((b, i) => `
      <details class="acc__item" name="kp-benefits"${i === 0 ? ' open' : ''}>
        <summary class="acc__head">
          <span class="acc__ic">${pearlIcon}</span>
          <span class="acc__t">${esc(b.t)}</span>
          ${chev}
        </summary>
        <div class="acc__body"><p>${esc(b.d)}</p></div>
      </details>`).join('');
    return `
    <section class="wa2" id="perlas">
      <div class="wrap">
        <div class="wa2__intro">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display wa2__title reveal d1">${esc(c.title)}</h2>
          <p class="wa2__body reveal d2">${esc(c.body)}</p>
        </div>
        <div class="wa2__grid reveal d2">
          <figure class="wa2__img"><img src="assets/hero-keyart.jpg" alt="${esc(c.title)}" loading="lazy" decoding="async" /></figure>
          <div class="wa2__acc">
            <h3 class="wa2__bt">${esc(c.benefitsTitle)}</h3>
            <div class="acc">${items}</div>
          </div>
        </div>
      </div>
    </section>`;
  }

  // "Cómo usarlas" — quantity table, serving steps, best drinks/desserts.
  function usage(t, bare) {
    const c = t.usage;
    const qty = c.qty.map((q) => `<li><span>${esc(q[0])}</span><b>${esc(q[1])}</b></li>`).join('');
    const serve = c.serve.map((s) => `<li><span class="use__ck">${checkIcon}</span>${esc(s)}</li>`).join('');
    const chips = (arr) => arr.map((x) => `<span class="use__chip">${esc(x)}</span>`).join('');
    const head = bare ? '' : `
        <div class="sec-head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display sec-title reveal d1">${esc(c.title)}</h2>
          <p class="sec-intro reveal d2">${esc(c.intro)}</p>
        </div>`;
    return `
    <section class="use" id="usos">
      <div class="wrap">
        ${head}
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
  function recipes(t, bare) {
    const c = t.recipes;
    const catLabel = { drink: c.catDrink, dessert: c.catDessert, cocktail: c.catCocktail };
    const cards = c.list.map((r, i) => {
      const ing = r.ing.map((x) => `<li>${esc(x)}</li>`).join('');
      const steps = r.steps.map((x) => `<li>${esc(x)}</li>`).join('');
      return `
        <article class="rec__card reveal d${(i % 3) + 1}" data-cat="${r.cat}">
          ${r.img ? `<figure class="rec__media"><img src="${r.img}" alt="${esc(r.name)}" loading="lazy" /></figure>` : ''}
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
    const head = bare ? '' : `
        <div class="sec-head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display sec-title reveal d1">${esc(c.title)}</h2>
          <p class="sec-intro reveal d2">${esc(c.intro)}</p>
        </div>`;
    return `
    <section class="rec" id="recetas">
      <div class="wrap">
        ${head}
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
        <span class="biz__n">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="biz__t">${esc(it.t)}</h3>
        <p class="biz__d">${esc(it.d)}</p>
      </article>`).join('');
    return `
    <section class="biz">
      <div class="wrap">
        <div class="sec-head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(c.tag)}</span>
          <h2 class="display sec-title reveal d1">${esc(c.title)}</h2>
        </div>
        <div class="biz__grid">${cards}</div>
      </div>
    </section>`;
  }

  // Home navigation cards that link to the additional pages.
  // Home teaser of the usage guide: quantity + serving, with a link to /usos.
  function usagePreview(t) {
    const c = t.usage;
    const qty = c.qty.map((q) => `<li><span>${esc(q[0])}</span><b>${esc(q[1])}</b></li>`).join('');
    const serve = c.serve.map((s) => `<li><span class="use__ck">${checkIcon}</span>${esc(s)}</li>`).join('');
    return `
    <section class="use">
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
        </div>
        <div class="use__cta reveal d2">
          <a class="btn btn--accent" href="#/usos">${esc(c.more)} <span aria-hidden="true">›</span></a>
        </div>
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

  // Is the Quito showroom open right now? (evaluated in Ecuador time)
  function isOpenNow() {
    try {
      const p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Guayaquil', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      const wd = p.find((x) => x.type === 'weekday').value;
      const mins = (+p.find((x) => x.type === 'hour').value % 24) * 60 + (+p.find((x) => x.type === 'minute').value);
      if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(wd)) return mins >= 540 && mins < 1080;
      if (wd === 'Sat') return mins >= 570 && mins < 840;
      return false;
    } catch (e) { return false; }
  }

  const pinIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>`;
  const clockIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
  const phoneIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 3.5 9 4l1 4-2 1.5a12 12 0 0 0 6.5 6.5L16 14l4 1 .5 2.5a2 2 0 0 1-2 2.2A16 16 0 0 1 4.3 5.5a2 2 0 0 1 2.2-2Z"/></svg>`;
  const truckIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 7h12v9H2z"/><path d="M14 10h4l3.2 3.2V16H14"/><circle cx="6.2" cy="17.8" r="1.9"/><circle cx="17.2" cy="17.8" r="1.9"/></svg>`;
  const mailIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7.5 8 5.7 8-5.7"/></svg>`;
  const boltIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/></svg>`;
  const starIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.4l6.5-.9L12 2.6z"/></svg>`;
  const medalIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="5.5"/><path d="m8.6 13.6-2.1 7 5.5-3 5.5 3-2.1-7"/></svg>`;
  const chartIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20h18"/><path d="m4.5 15.5 5-5 3.5 3.5L20 7"/><path d="M15.5 7H20v4.5"/></svg>`;
  const sparkIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11 3l1.7 4.8L17.5 9.5l-4.8 1.7L11 16l-1.7-4.8L4.5 9.5l4.8-1.7L11 3z"/><path d="M18.5 14l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z"/></svg>`;

  // Full-width delivery strip: 24h badge + nationwide shipping note.
  function shipBar(t) {
    return `
    <section class="ship">
      <div class="wrap ship__inner reveal">
        <span class="ship__badge">${boltIcon}${esc(t.ship.badge)}</span>
        <p class="ship__text">${truckIcon}<span>${esc(t.ship.text)}</span></p>
      </div>
    </section>`;
  }

  function whySec(t) {
    const w = t.why;
    const icons = [medalIcon, chartIcon, sparkIcon];
    const cards = w.items.map((it, i) => `
      <article class="why__card reveal d${i + 1}">
        <span class="why__ic">${icons[i % icons.length]}</span>
        <h3 class="why__t">${esc(it.t)}</h3>
        <p class="why__d">${esc(it.d)}</p>
      </article>`).join('');
    return `
    <section class="why" id="por-que">
      <div class="wrap">
        <div class="why__head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(w.eyebrow)}</span>
          <h2 class="display sec-title reveal d1">${esc(w.title)}</h2>
        </div>
        <div class="why__grid">${cards}</div>
        <p class="display why__slogan reveal d2">“${esc(w.slogan)}”</p>
      </div>
    </section>`;
  }

  function reviewsSec(t) {
    const r = t.reviews;
    const stars = `<span class="rv__stars" aria-label="5/5">${starIcon.repeat(5)}</span>`;
    const cards = r.items.map((it, i) => `
      <article class="rv__card reveal d${i + 1}">
        ${stars}
        <p class="rv__text">“${esc(it.text)}”</p>
        <footer class="rv__who"><b>${esc(it.name)}</b><span>${esc(it.biz)}</span></footer>
      </article>`).join('');
    return `
    <section class="rv" id="reviews">
      <div class="wrap">
        <div class="rv__head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(r.eyebrow)}</span>
          <h2 class="display sec-title reveal d1">${esc(r.title)}</h2>
        </div>
        <div class="rv__grid">${cards}</div>
      </div>
    </section>`;
  }

  function contactSection(t) {
    const c = t.contact;
    const hoursLine = c.hoursLines.map((h) => h.replace(' · ', ' ')).join(' · ');
    const mapQ = encodeURIComponent(CONTACT.address);
    const field = (color, label, value) => `
          <div class="ct__field">
            <span class="ct__dot2" style="--c:${color}"></span>
            <div><span class="ct__field-lbl">${esc(label)}</span><p class="ct__addr">${value}</p></div>
          </div>`;
    return `
    <section class="ct" id="contacto">
      <div class="wrap ct__top2 reveal">
        <h2 class="display ct__h">${esc(c.location)}</h2>
        <p class="ct__thanks">${esc(c.thanks)}</p>
      </div>
      <div class="wrap ct__loc reveal">
        <div class="ct__card">
          <figure class="ct__photo">
            <img src="assets/local-entrada.jpg" alt="Fachada de Autos Sierra — entrada a King Pearl" loading="lazy" />
            <figcaption>${esc(c.access)}</figcaption>
          </figure>
          ${field('#ffffff', c.addrLabel, esc(CONTACT.address))}
          ${field('#FF9E1B', c.hoursLabel, esc(hoursLine))}
          ${field('#7AC70C', c.shipLabel, esc(t.ship.text))}
          ${field('#B57BEE', c.emailLabel, `<a class="ct__mail" href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a>`)}
          <div class="ct__btns">
            <a class="btn ct__wa-btn" href="${CONTACT.waLink}" target="_blank" rel="noopener">WhatsApp</a>
            <a class="btn ct__call-btn" href="${CONTACT.telLink}">${esc(c.call)}</a>
          </div>
        </div>
        <div class="ct__map-card">
          <iframe class="ct__map" title="${esc(c.location)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=${mapQ}&output=embed"></iframe>
        </div>
      </div>
      ${contactForm(c.form)}
    </section>`;
  }

  // Static site: submissions go to CONTACT.email through FormSubmit's AJAX API.
  function contactForm(f) {
    return `
      <div class="wrap ct__form-wrap reveal">
        <form class="ct__form" id="ct-form">
          <div class="ct__form-head">
            <h3 class="ct__form-title">${esc(f.title)}</h3>
            <p class="ct__form-sub">${esc(f.sub)}</p>
          </div>
          <div class="ct__form-grid">
            <label class="ct__fld">
              <span class="ct__fld-lbl">${esc(f.name)}</span>
              <input class="ct__in" name="name" type="text" placeholder="${esc(f.namePh)}" required autocomplete="name" maxlength="80" />
            </label>
            <label class="ct__fld">
              <span class="ct__fld-lbl">${esc(f.reach)}</span>
              <input class="ct__in" name="reach" type="text" placeholder="${esc(f.reachPh)}" required maxlength="120" />
            </label>
            <label class="ct__fld">
              <span class="ct__fld-lbl">${esc(f.biz)} <em>${esc(f.bizOpt)}</em></span>
              <input class="ct__in" name="biz" type="text" placeholder="${esc(f.bizPh)}" autocomplete="organization" maxlength="80" />
            </label>
            <label class="ct__fld ct__fld--full">
              <span class="ct__fld-lbl">${esc(f.msg)}</span>
              <textarea class="ct__in ct__ta" name="msg" rows="4" placeholder="${esc(f.msgPh)}" required maxlength="600"></textarea>
            </label>
          </div>
          <div class="ct__form-foot">
            <button class="btn ct__wa-btn ct__form-send" type="submit">${esc(f.send)}</button>
            <p class="ct__form-note" id="ct-form-status" role="status">${esc(f.note)}</p>
          </div>
        </form>
      </div>`;
  }

  function siteFooter(t) {
    const c = t.contact;
    return `
      <footer class="ft">
        <div class="wrap ft__top">
          <div class="ft__brand">
            <img class="ft__logo" src="assets/kp-logo.png" alt="King Pearl" />
            <p class="ft__tag">${esc(c.ftTag)}</p>
            <div class="ft__social">
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
          <div class="ft__cols">
            <div class="ft__col">
              <h4>${esc(c.explore)}</h4>
              <a href="#/">${esc(t.nav.inicio)}</a>
              <a href="#/usos">${esc(t.nav.usos)}</a>
              <a href="#/recetas">${esc(t.nav.recetas)}</a>
              <a href="#/nosotros">${esc(t.nav.nosotros)}</a>
            </div>
            <div class="ft__col">
              <h4>${esc(c.cols_contact)}</h4>
              <a href="${CONTACT.waLink}" target="_blank" rel="noopener">${esc(CONTACT.whatsapp)}</a>
              <a href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a>
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
      </footer>`;
  }

  // --- behaviours -----------------------------------------------------------
  function wireNav() {
    const nv = document.getElementById('nav');
    // White solid bar on every page (banner design).
    nv.classList.add('nv--solid');

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

  // Single-open accordion. Modern browsers do this natively via the shared
  // `name` attribute; this is the fallback for browsers without that support.
  function wireAccordion() {
    document.querySelectorAll('.acc').forEach((acc) => {
      const items = Array.from(acc.querySelectorAll('.acc__item'));
      items.forEach((d) => {
        d.addEventListener('toggle', () => {
          if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
        });
      });
    });
  }

  function wireContactForm() {
    const form = document.getElementById('ct-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = I18N[lang].contact.form;
      const status = document.getElementById('ct-form-status');
      const btn = form.querySelector('.ct__form-send');
      const v = (n) => form.elements[n].value.trim();
      btn.disabled = true;
      status.className = 'ct__form-note';
      status.textContent = f.sending;
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${CONTACT.email}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: f.subject, _template: 'table', _captcha: 'false',
            [f.name]: v('name'), [f.reach]: v('reach'),
            [f.biz]: v('biz') || '—', [f.msg]: v('msg')
          })
        });
        if (!res.ok) throw new Error('formsubmit ' + res.status);
        form.reset();
        status.classList.add('is-ok');
        status.textContent = f.ok;
      } catch (err) {
        status.classList.add('is-err');
        status.textContent = f.err;
      } finally {
        btn.disabled = false;
      }
    });
  }

  function wireReveals() {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }

  // --- pages ----------------------------------------------------------------
  const pageHome = (t) => hero(t) + whatare(t) + productLineup(t) + shipBar(t) + whySec(t) + reviewsSec(t) + usagePreview(t) + contactSection(t);
  const pageUsos = (t) => pageBanner(t.usage.tag, t.usage.title, t.usage.intro) + usage(t, true) + care(t);
  const pageRecetas = (t) => pageBanner(t.recipes.tag, t.recipes.title, t.recipes.intro) + recipes(t, true);
  const pageNosotros = (t) => pageBanner(t.about.tag, t.about.pageTitle, t.about.pageSub) + about(t) + features(t) + biz(t) + contactSection(t);

  const ROUTES = { '/': pageHome, '/usos': pageUsos, '/recetas': pageRecetas, '/nosotros': pageNosotros };

  // Hash router. Inner pages use "#/usos"; bare in-page anchors ("#sabores")
  // and the empty hash map to home so the browser can still scroll to them.
  function currentRoute() {
    const h = (location.hash || '').replace(/^#/, '');
    return h.startsWith('/') && ROUTES[h] ? h : '/';
  }

  // --- mount ----------------------------------------------------------------
  let mountedRoute = null;
  function render(force) {
    const route = currentRoute();
    // Same page (e.g. an in-page "#sabores" anchor) — leave the DOM so the
    // browser handles the anchor scroll instead of rebuilding the page.
    if (!force && route === mountedRoute) return;
    mountedRoute = route;

    const t = I18N[lang];
    document.documentElement.lang = lang;
    const page = ROUTES[route] || pageHome;
    const isHome = route === '/';
    const titles = { '/': lang === 'es' ? 'Burbujas Explosivas' : 'Bursting Bubbles',
      '/usos': t.nav.usos, '/recetas': t.nav.recetas, '/nosotros': t.nav.nosotros };
    document.title = 'King Pearl — ' + (titles[route] || '');
    const root = document.getElementById('root');
    root.innerHTML =
      nav(t) +
      `<main${isHome ? '' : ' class="subpage"'}>${page(t)}</main>` +
      siteFooter(t);

    if (isHome) { wireLineup(); wireAccordion(); }
    wireNav();
    wireContactForm();
    wireReveals();
    window.scrollTo(0, 0);
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l === 'en' ? 'en' : 'es';
    render(true);
  }

  // Warm the browser cache so the flavor images swap in instantly.
  function preloadImages() {
    const urls = FLAVORS.map((f) => f.img).concat(['assets/hero-keyart.jpg']);
    urls.forEach((src) => { const im = new Image(); im.decoding = 'async'; im.src = src; });
  }

  window.addEventListener('hashchange', () => render(false));
  preloadImages();
  render(true);
})();
