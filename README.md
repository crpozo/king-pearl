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

## WordPress theme

The same site is packaged as a classic WordPress theme in [`wordpress/king-pearl/`](wordpress/king-pearl/), with a ready-to-upload zip at [`wordpress/king-pearl.zip`](wordpress/king-pearl.zip).

**Install:** WP admin → Appearance → Themes → Add New → Upload Theme → choose `king-pearl.zip` → Activate. No plugins or extra configuration needed.

The theme serves the exact same app (`data.js` + `app.js` rendering into `#root`), so content — flavors, ES/EN copy, contact details — is still edited in the theme's `data.js`, not the WP editor. Details in [`wordpress/king-pearl/readme.txt`](wordpress/king-pearl/readme.txt).

Rebuild the zip after editing theme files:

```bash
cd wordpress && rm -f king-pearl.zip && zip -r king-pearl.zip king-pearl
```

## Placeholders to swap

- Contact details: WhatsApp `+593 99 000 0000`, `hola@kingpearl.ec`, `@kingpearl.ec`
- Flavor tub photos are cropped from the catalog poster — replace with clean product shots when available
