/* ============ King Pearl — vanilla render layer ============ */
(function () {
  const { FLAVORS, PRICE, I18N, CONTACT } = window.KP;
  const FLAVOR_HEX = ['#FF9E1B', '#D7263D', '#7AC70C', '#E8245A', '#7B2FBF', '#FF3B5C', '#FFA516'];
  const LIGHT_FLAVORS = { maracuya: 1, manzana: 1, mango: 1 }; // need dark text on their color

  // --- tiny helpers ---------------------------------------------------------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  let lang = 'es';
  let activeFlavor = 0;

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
    const links = [['#sabores', t.nav.sabores], ['#perlas', t.nav.perlas],
      ['#nosotros', t.nav.nosotros], ['#contacto', t.nav.contacto]];
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
        <p class="hero__sub">${esc(t.hero.sub)}</p>
        <a class="hero__cta" href="#sabores">${esc(t.cta.flavors)} <span aria-hidden="true">›</span></a>
      </div>
      <svg class="hero__wave" viewBox="0 0 1440 130" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#FFFFFF" d="M0,130 L0,86 C420,86 520,86 612,86 C672,86 686,28 720,28 C754,28 768,86 828,86 C920,86 1020,86 1440,86 L1440,130 Z" />
      </svg>
      <a class="hero__dot" href="#perlas" aria-label="scroll">
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

  // Gong Cha-style product lineup: a row of gradient tiles with the center
  // card raised + highlighted, and an "All products" button below.
  function productLineup(t) {
    const byId = (id) => FLAVORS.find((f) => f.id === id);
    const picks = ['manzana', 'cereza', 'mango', 'arandano', 'maracuya'];
    const cards = picks.map((id) => {
      const f = byId(id);
      const name = lang === 'es' ? f.es : f.en;
      return `
        <article class="pcard" style="--c:${f.color};--deep:${f.deep}">
          <div class="pcard__media">
            <img src="${f.img}" alt="${esc(name)}" />
          </div>
          <h3 class="pcard__name">${esc(name)}</h3>
        </article>`;
    }).join('');
    return `
    <section class="pl">
      <div class="wrap">
        <div class="pl__head">
          <span class="eyebrow reveal"><span class="sq"></span>${esc(t.lineup.tag)}</span>
          <h2 class="display pl__title reveal d1">${esc(t.lineup.title)}</h2>
        </div>
        <div class="pl__row reveal d1">${cards}</div>
        <div class="pl__cta reveal d2">
          <a class="btn btn--accent pl__btn" href="#sabores">${esc(t.lineup.all)} <span aria-hidden="true">›</span></a>
        </div>
      </div>
    </section>`;
  }

  function steps(t) {
    const colors = [FLAVOR_HEX[0], FLAVOR_HEX[1], FLAVOR_HEX[2]]; // orange · red · green
    const items = t.steps.items.map((s, i) => `
      <article class="s2 reveal d${i + 1}" style="--c:${colors[i]}">
        <div class="s2__badge"><span>${String(i + 1).padStart(2, '0')}</span></div>
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
          <span class="eyebrow" style="color:${txt}">
            <span class="sq" style="background:${txt}"></span>${esc(t.flavors.tag)}
          </span>
          <h2 class="display sc__title">${esc(t.flavors.title)}</h2>
          <span class="sc__count display">${String(activeFlavor + 1).padStart(2, '0')}<i style="color:${sub}">/07</i></span>
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

  function features(t) {
    const cards = t.features.items.map((it, i) => `
      <div class="feat reveal d${i + 1}">
        <span class="feat__ic">${featIcons[i]}</span>
        <h3 class="feat__t">${esc(it.t)}</h3>
        <p class="feat__d">${esc(it.d)}</p>
      </div>`).join('');
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

  function about(t) {
    const c = t.about;
    const stats = c.stats.map((s, i) => `
      <div class="st reveal d${i + 1}">
        <span class="st__n display" style="color:${FLAVOR_HEX[[0, 4, 2][i]]}">${esc(s[0])}</span>
        <span class="st__l">${esc(s[1])}</span>
      </div>`).join('');
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
      <div class="wrap ab__stats">${stats}</div>
    </section>`;
  }

  function contact(t) {
    const c = t.contact;
    return `
    <section class="ct" id="contacto">
      <div class="wrap ct__inner">
        <span class="eyebrow ct__eye"><span class="sq"></span>${esc(c.tag)}</span>
        <h2 class="display ct__h reveal d1">${esc(c.title)}</h2>
        <p class="ct__body reveal d2">${esc(c.body)}</p>
        <a class="btn btn--accent ct__wa reveal d3" href="${CONTACT.waLink}" target="_blank" rel="noopener">${waIcon}${esc(c.wa)}</a>
        <div class="ct__meta reveal d4">
          <a href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a><span class="ct__sep"></span>
          <a href="${CONTACT.igLink}" target="_blank" rel="noopener">${esc(CONTACT.instagram)}</a><span class="ct__sep"></span>
          <span>${esc(c.city)}</span>
        </div>
      </div>
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
              <a href="#perlas">${esc(t.nav.perlas)}</a>
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
              <span>${esc(c.city)}</span>
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
        steps(t) +
        '<section class="sc" id="sabores"></section>' +
        features(t) +
        about(t) +
        contact(t) +
      '</main>';
    paintShowcase();
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
