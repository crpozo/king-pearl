# King Pearl — Burbujas Explosivas 🫧👑

Immersive bilingual (ES/EN) landing page for **King Pearl**, bursting fruit pearls (popping boba) sold in Ecuador.

Implemented from a [Claude Design](https://claude.ai/design) handoff, following the final **Gong Cha-inspired** direction: royal-purple hero, white editorial content, green seals, deep-purple bands & footer, chunky round + serif type.

## Features

- **Royal-purple hero** with centered serif wordmark, flanking flavor tubs and a wave divider
- **Interactive flavor showcase** — click any of the 7 flavors and the whole section recolors (background, text, tub, name, price)
- **"Fruta real · Explosión real"** product banner with green sticker seals
- **Bite → Burst → Repeat** explainer, uses cards, quality band, brand story with stats
- **Bilingual ES/EN** toggle and WhatsApp contact CTA
- Scroll-reveal animations, responsive down to mobile

## Tech

Plain, dependency-free static site — `index.html` + `styles.css` + vanilla JS (`data.js`, `app.js`). No build step. Open `index.html` or serve the folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Placeholders to swap

- Contact details: WhatsApp `+593 99 000 0000`, `hola@kingpearl.ec`, `@kingpearl.ec`
- Flavor tub photos are cropped from the catalog poster — replace with clean product shots when available
