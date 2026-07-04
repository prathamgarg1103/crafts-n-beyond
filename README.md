# Crafts_n_beyond — motion website

A single-page, motion-first website for **Crafts_n_beyond** ([@crafts_n_beyond_](https://www.instagram.com/crafts_n_beyond_/)) — a handmade Indian gifting studio (shagun nariyals, trousseau packing, money bouquets, hampers). The site's one job: make a visitor feel the care in the work, then tap one button to start a WhatsApp order.

## What's here

```
site/            the deployable website (static, hand-coded)
  index.html     structure + all copy
  css/style.css  design system — "warm editorial luxe"
  js/main.js     motion engine (GSAP + ScrollTrigger + Lenis)
  media/         product photos + video posters
  video/         hero loop + scroll-scrubbed reel
PRD.md           the product requirements doc the build follows
crafts_n_beyond_media/   original extracted source media
vercel.json      hosting config (serves site/ as the static root)
```

## Stack

Hand-coded HTML/CSS/vanilla JS. No framework. Motion via [GSAP](https://gsap.com) + ScrollTrigger + SplitText and [Lenis](https://lenis.darkroom.engineering/) smooth scroll, all from CDN.

## Signature interactions

- **The wrap** — the page opens like a gift (bow unties, panels part)
- **Mauli thread** — a red-gold thread tied around the hero, untied on first scroll
- **Hot-foil headline** — gold sheen that follows your pointer / phone tilt
- **shagun ⇄ शगुन** — the word transliterates itself as you scroll
- **Tear-to-reveal gallery** — drag to tear tissue off each product
- **Note → rose** — a banknote accordion-folds into a money bouquet
- **Scroll-scrubbed reel** — you hand-crank the making-of, with handwritten margin notes
- **Closing bow** — the thread returns and reties around the WhatsApp CTA

Full reduced-motion fallback throughout.

## Run locally

```bash
cd site
python -m http.server 4173
# open http://localhost:4173
```

## Deploy

Configured for [Vercel](https://vercel.com) via `vercel.json` (serves `site/` as the static root, no build step).

## Handoff notes

Before going fully live, the client should provide: a logo vector, higher-resolution product photos, and confirm the WhatsApp number (`+91 95883 37180`). Set the `og:url` / `og:image` in `site/index.html` to the real domain so link previews render. Copy intentionally avoids stating a city or business age until the client confirms them.
