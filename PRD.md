# PRD — Crafts_n_beyond: A Motion-First Brand Website

**Version 1.0 · July 2026**
**Client:** Crafts_n_beyond (@crafts_n_beyond_) · Saloni Garg & Santwana Garg
**Deliverable:** Single-page scroll experience · Next.js + Motion + GSAP
**Design direction:** Warm Editorial Luxe

---

## 1. Product Overview

### 1.1 What this is

A single-page, motion-driven website for Crafts_n_beyond — a two-person handmade gifting studio specializing in Shagun Nariyals (decorated ceremonial coconuts), trousseau packing, money bouquets, and luxury hampers for Indian weddings and festivals.

The site is not a store. It is a **portfolio that converts** — its single job is to make a visitor feel the care in the work, then tap one button to start a WhatsApp order conversation.

### 1.2 Why motion matters here

Every product this studio makes is about *the moment of presentation* — the unwrapping, the reveal, the gasp. The website should behave the same way: content is revealed, unwrapped, and presented as the visitor scrolls, mirroring the physical experience of receiving one of their hampers. Motion is the brand argument, not decoration.

### 1.3 Audience

- Brides-to-be and their families planning trousseau packing (peak: Nov–Feb, Apr–May wedding seasons)
- Gift-givers for Rakhi, Diwali, Karwa Chauth, engagements
- Primarily mobile users arriving from Instagram (assume ≥ 80% mobile traffic)
- Hinglish-comfortable; "Shagun", "Trousseau", "Nariyal" need no translation

### 1.4 Success metrics

| Metric | Target |
|---|---|
| WhatsApp CTA click-through | ≥ 8% of sessions |
| Scroll depth past Product Showcase | ≥ 60% of sessions |
| LCP (mobile, 4G) | < 2.5s |
| Bounce before first scroll | < 35% |

### 1.5 Primary conversion

WhatsApp deep link throughout: `https://wa.me/919588337180?text=Hi%20Crafts_n_beyond!%20I%27d%20love%20to%20order%20a%20custom%20hamper.`
Secondary: Instagram profile link `https://www.instagram.com/crafts_n_beyond_/`.

---

## 2. Brand & Content Foundation

### 2.1 Voice

Derived from their actual Instagram captions: warm, personal, proud of the handwork, lightly playful ("Shagun envelopes are not for 2026 😒"). On the website, this voice is kept but **calmed down** — no emoji in body copy, fewer exclamation marks, more white space between thoughts. The captions shout because Instagram demands it; the website can speak quietly and be heard.

**Voice rules:**
- First person plural ("we wrap", "we make") — it's two makers, and that's the story.
- Concrete nouns over adjectives: say "gota, satin, dried rose" not "premium materials".
- Never say: "elevate", "curated", "bespoke", "luxury redefined", "crafted with passion". These are the template words this site must avoid.

### 2.2 Copy deck (final draft copy — no lorem ipsum)

**Hero**
- Eyebrow: `Handmade in India · Since the first nariyal`
- Headline: `Some gifts are wrapped.` / `Ours are dressed.`
- Subline: `Shagun nariyals, trousseau packing, money bouquets & hampers — made by hand, two at a time, for the days you'll remember forever.`
- CTA: `Start your order on WhatsApp` · secondary: `See the work` (scroll anchor)

**Story section**
- Heading: `Two pairs of hands. Every single piece.`
- Body: `Crafts_n_beyond is Saloni and Santwana — an artist duo who believe a gift's first impression begins before it's opened. Every coconut is painted, every ribbon tied, every tray arranged by us. No inventory, no assembly line. You tell us the occasion; we make the one thing that fits it.`

**Product showcase — category cards**
1. `Shagun Nariyals` — `Our coin nariyal went viral for a reason. Painted, beaded, and finished by hand for shagun that stands out on the thaal.`
2. `Trousseau Packing` — `Fairy-tale packing for brides-to-be. Sarees, lehengas and gifts dressed like they're part of the celebration — because they are.`
3. `Money Bouquets & Hampers` — `Envelopes are done. Cash folded into blooms, arranged to order — the surprise that gets photographed.`
4. `Dry-fruit & Festive Hampers` — `Draped in grandeur, styled in heritage. Trays that make the rounds at weddings and never come back empty.`

**Signature piece section**
- Heading: `Watch one come together.`
- Caption under video: `A full trousseau set, from bare tray to final bow.`

**Testimonial section**
- The real client quote (verbatim from their feed): `"Thank you Crafts and Beyond for the beautiful gift packing. The presentation was elegant, neat, and made the gift feel extra special. Your attention to detail really shows. Highly appreciated and definitely recommended."`
- Attribution: `— A happy client, via Instagram`
- Marquee ticker phrases (looping): `SHAGUN NARIYAL · TROUSSEAU PACKING · MONEY BOUQUET · RAKHI · HAMPERS · HANDMADE IN INDIA ·`

**Process section**
- Heading: `Made to order, not to stock.`
- Steps:
  1. `Tell us the occasion` — `DM or WhatsApp us the date, the budget, and who it's for.`
  2. `We sketch the idea` — `Colours, materials, and a reference photo before we begin.`
  3. `Made by hand` — `Every element cut, tied, painted and arranged by the two of us.`
  4. `Delivered for your day` — `Packed to survive the journey and steal the moment.`

**Closing CTA**
- Oversized line: `Make it` / `unforgettable.`
- Button: `Order on WhatsApp`
- Footer micro-copy: `Crafts_n_beyond · Handmade gifting studio · @crafts_n_beyond_ · WhatsApp 95883 37180`

> **Open question for client:** confirm the relationship framing ("artist duo" is used above — adjust to "sisters"/"mother-daughter" if they prefer to say so publicly).

### 2.3 Content inventory — mapping extracted media to sections

All files exist today in `crafts_n_beyond_media/`. Grid thumbnails are 640px max — see §7.1 for the re-shoot/re-export request list.

| File | Content (from IG alt-text) | Assigned section |
|---|---|---|
| `images/image_00.jpg` | Products presentation cover ("Make every special moment…") | Hero — floating cutout A |
| `images/image_01.jpg` | Trousseau packing ("made with full joy and hardwork") | Product showcase — Trousseau card |
| `images/image_02.jpg` | Trousseau packing (alternate frame) | Story section — background pane |
| `images/image_03.jpg` | Luxury dry-fruit hamper | Product showcase — Hamper card |
| `images/image_04.jpg` | Luxury dry-fruit hamper (640×640, best quality) | Hero — floating cutout B |
| `images/image_05.jpg` | Client dress packing ("for my beautiful Niece") | Testimonial — supporting image |
| `images/image_06.jpg` | Client testimonial post (640×640) | Testimonial — do NOT screenshot; retype as live text |
| `images/image_07.jpg` | Money bouquet | Product showcase — Money Bouquet card |
| `images/image_08.jpg` | Money hamper (alternate) | Process section — step imagery |
| `images/image_09.jpg` | Coin Shagun Nariyal ("our viral coin nariyal") | Product showcase — Nariyal card |
| `images/image_10.jpg` | Fairy-tale trousseau for bride-to-be (640×480) | Signature piece — poster frame |
| `images/image_11.jpg` | Coin Shagun Nariyal (alternate) | Closing CTA — background texture image |
| `images/image_12.jpg` | Brand logo / profile picture (320×320) | Nav mark + favicon source |
| `videos/reel_00.mp4` | Product-showcase reel, 109s, high bitrate (7.4MB), video-only | Hero media + Signature piece (scrubbed) |
| `videos/reel_01.mp4` | Same reel, low bitrate (2.7MB) | Mobile / slow-connection fallback source |
| `videos/reel_02.mp4` | Separated audio track of the same reel | Not used (site video is always muted) |

> Note: the three video files are DASH renditions of **one** reel. They are video-only streams — perfect for muted autoplay, which is the only autoplay browsers allow anyway.

---

## 3. Art Direction — "Warm Editorial Luxe"

The reference sensibility is a Zajno-grade editorial site: confident typography doing the heavy lifting, restrained palette, motion that feels physical. It should feel like a wedding invitation suite art-directed by a magazine, not a SaaS landing page.

### 3.1 Palette

| Token | Hex | Usage |
|---|---|---|
| `--ivory` | `#FAF6EF` | Page base |
| `--cream` | `#F1E8DC` | Section alternation, cards |
| `--blush` | `#E9CCC5` | Tinted panels, hover states |
| `--rose` | `#C98B82` | Accents, active states, marquee text |
| `--maroon` | `#43201F` | All body text & display type ("ink") |
| `--gold` | `#B08841` | Foil accent — rules, underlines, numerals ONLY. Never large fills. |
| `--shadow` | `rgba(67,32,31,0.10)` | The only shadow color allowed |

**Rules:** maroon-on-ivory is the default pairing (contrast 10.4:1, AAA). Gold never carries text smaller than 20px (contrast is decorative-tier). No pure white, no pure black anywhere.

### 3.2 Typography

| Role | Face | Notes |
|---|---|---|
| Display | **Fraunces** (Google Fonts, variable) | Use the `opsz` axis: 144pt optical size for heroes, 9pt for small caps eyebrows. `SOFT 0, WONK 1` axis settings on the hero only — the slight wonkiness is the "human hand" detail. |
| Body & UI | **Instrument Sans** (Google Fonts, variable) | 400/500/600 only. |

**Type scale (fluid, clamp-based):**

| Token | Size | Face / weight | Use |
|---|---|---|---|
| `display-xl` | `clamp(3.5rem, 11vw, 9rem)` | Fraunces 560, lh 0.95, ls -0.02em | Hero, closing line |
| `display-l` | `clamp(2.5rem, 6vw, 4.5rem)` | Fraunces 500, lh 1.02 | Section headings |
| `display-m` | `clamp(1.6rem, 3vw, 2.25rem)` | Fraunces 480 italic | Pull quotes, testimonial |
| `body-l` | `clamp(1.05rem, 1.4vw, 1.25rem)` | Instrument 400, lh 1.6 | Intro paragraphs |
| `body` | `1rem` | Instrument 400, lh 1.65 | Default |
| `eyebrow` | `0.8125rem` | Instrument 600, ls 0.14em, uppercase | Section labels |
| `numeral` | `clamp(4rem, 8vw, 7rem)` | Fraunces 300, gold | Process step numbers |

**Editorial rules:** headlines break where the *sentence* breaks, never where the container does (hand-authored `<br>`); italics reserved for emotional beats; one display moment per viewport.

### 3.3 Texture & the human layer

These are the details that keep it from feeling generated:

1. **Paper grain:** a 2–3% opacity grain PNG (tileable, 400×400) multiplied over `--ivory` sitewide. Subliminal, not visible as noise.
2. **Hand-drawn accents:** SVG underline strokes, circled words, and small arrows — drawn (in Figma/Jitter with a pencil brush, 2–3 variants each), never from an icon set. Used max once per section.
3. **Asymmetric layout:** a 12-column grid where content deliberately sits off-center — text columns start at col 2 or 3, images bleed off the right edge. No section is centered except Hero and Closing CTA.
4. **Polaroid frames:** product photos get a 12px ivory inset border and a random rotation between −2.5° and 2.5° (seeded per image, not on every render).
5. **Imperfect timing:** stagger delays get ±15% jitter (calm, seeded) so grids never animate with robotic uniformity.

### 3.4 Anti-template rules (hard constraints)

- ❌ No symmetric 3-column feature grids with icons
- ❌ No stock icon sets (Feather/FontAwesome/Heroicons). Any icon that appears is drawn for this site
- ❌ No `border-radius: 8px` default cards; corners are either sharp, fully round (pills), or arched (see below)
- ❌ No purple/blue gradients, no glassmorphism, no floating 3D blobs
- ❌ No "Lorem" anywhere at any build phase — use the copy deck from day one
- ✅ The signature shape is the **arch** (Indian doorway / mehrab): image masks, video frames, and hover reveals all use a half-circle-top arch mask. This one repeated motif ties the site together

---

## 4. Site Architecture — one page, seven scenes

```
[0] Nav (fixed, minimal)
[1] Hero — "Some gifts are wrapped. Ours are dressed."
[2] Story — "Two pairs of hands."
[3] Product Showcase — horizontal scroll, 4 categories
[4] Signature Piece — scroll-scrubbed reel
[5] Testimonial + marquee
[6] Process — 4 steps
[7] Closing CTA + footer
```

**Nav:** logo mark (from `image_12.jpg`, cropped to the "CB" monogram) left; `Order on WhatsApp` pill right. Nav background is transparent until 80px of scroll, then blurred ivory at 92% opacity. Hides on scroll-down, reveals on scroll-up (translateY, 240ms).

Full section-by-section motion specs are in §5.4.

---

## 5. Motion Design System

### 5.1 Principles

1. **Unwrap, don't fade.** The default reveal is a mask wipe (clip-path) — content is *uncovered* like a gift, not faded in like a slide deck.
2. **One hero motion per viewport.** Each scene has a single choreographed moment; everything else supports it quietly.
3. **Physical, not floaty.** Ease-out-expo entrances (fast start, soft landing — like setting something down). Nothing drifts aimlessly.
4. **The scroll is the timeline.** Big moments are scrubbed by scroll position (GSAP), so the visitor controls the pacing. Time-based animation (Motion) is reserved for entrances and micro-interactions.
5. **Calm jitter.** Seeded randomness in delays and rotations — human irregularity, never chaos.

### 5.2 Motion tokens

```ts
// motion-tokens.ts
export const ease = {
  outExpo:  [0.16, 1, 0.3, 1],      // entrances, reveals
  inOutQuart: [0.76, 0, 0.24, 1],   // position changes, nav
  outBack:  [0.34, 1.56, 0.64, 1],  // playful pops (Lottie triggers, badges)
} as const;

export const spring = {
  soft:   { stiffness: 100, damping: 20 },  // magnetic buttons
  snappy: { stiffness: 300, damping: 24 },  // cursor followers
} as const;

export const dur = {
  micro: 0.12,   // hovers, color changes
  ui:    0.24,   // nav, buttons
  reveal: 0.48,  // text/image entrances
  scene: 0.9,    // hero choreography, big masks
} as const;

export const stagger = {
  lines: 0.09, items: 0.06,
  jitter: (base: number, i: number) => base * (1 + seededNoise(i) * 0.15),
} as const;
```

### 5.3 Scroll infrastructure

- **Lenis** smooth scroll: `{ duration: 1.1, easing: outExpo, smoothWheel: true, syncTouch: false }` — native touch scrolling on mobile stays untouched (critical for the 80% mobile audience).
- **GSAP ScrollTrigger** drives all pinned/scrubbed scenes; `scrub: 0.6` everywhere (slight lag = weight).
- ScrollTrigger and Lenis tick on the same rAF (`lenis.on('scroll', ScrollTrigger.update)`).
- **Parallax depth ratios:** background imagery `0.85×` scroll speed, mid elements `0.93×`, floating cutouts `1.08×`. Max translation ±12vh, always transform-only.

### 5.4 Per-section motion storyboards

**Scene 1 — Hero** *(the thesis statement)*

| # | Trigger | Element | Motion | Duration / Ease | Library |
|---|---|---|---|---|---|
| 1 | Page ready (fonts loaded) | Headline lines (2) | Per-line mask reveal: each line rises from behind a baseline clip, with 4° rotation settling to 0° | 0.9s, outExpo, stagger 0.09s | Motion |
| 2 | +0.4s | Eyebrow + subline | Fade + 12px rise | 0.48s, outExpo | Motion |
| 3 | +0.6s | Arch-masked reel (`reel_00.mp4`, muted loop, ~8s excerpt) | Arch mask expands from 0% to full height (clip-path animation) | 1.1s, inOutQuart | Motion |
| 4 | +0.8s | Floating cutouts (`image_00`, `image_04`, polaroid-framed) | Scale 0.92→1 + settle into ±2° rotation | 0.7s, outBack, stagger jittered | Motion |
| 5 | Scroll | Cutouts | Parallax drift at 1.08× with ±3° slow rotation | scrub 0.6 | GSAP |
| 6 | Scroll | Headline | Rises at 0.9× and blurs 0→4px as hero exits | scrub | GSAP |
| 7 | Idle 4s | Hand-drawn arrow Lottie + "scroll" label | Draw-on stroke animation | 0.8s, one-shot | Lottie (Jitter) |

**Scene 2 — Story**

| # | Trigger | Element | Motion | Duration / Ease | Library |
|---|---|---|---|---|---|
| 1 | 30% in view | Heading | Word-level mask reveal | 0.48s, outExpo, stagger 0.06 | Motion |
| 2 | Pin: section pins for 150vh | `image_02` background pane | Scales 1.15→1 and arch mask widens as text sequence plays | scrub | GSAP |
| 3 | During pin | Body copy, 3 beats | Each beat crossfades + rises sequentially, scroll-scrubbed | scrub | GSAP |
| 4 | 60% through pin | Hand-drawn circle around "two of us" | Stroke draw-on | 0.6s | Lottie (Jitter) |

**Scene 3 — Product Showcase** *(the centerpiece interaction)*

| # | Trigger | Element | Motion | Duration / Ease | Library |
|---|---|---|---|---|---|
| 1 | Section reaches top | Whole section | Pins; vertical scroll translates the 4-card track horizontally (total travel ≈ 300vw) | scrub 0.6 | GSAP |
| 2 | Card enters center | Active card | Scales 0.94→1; its arch image mask opens; category name (display-l) unmasks | scrub | GSAP |
| 3 | Card enters center | Oversized gold numeral (01–04) | Counter-parallax at 0.8× (moves opposite to track) | scrub | GSAP |
| 4 | Hover (desktop) | Card image | Cursor-follow peek: image shifts toward cursor up to 10px; alternate detail crop crossfades in | spring.snappy | Motion |
| 5 | Progress | Thin gold progress rule under track | Width 0→100% | scrub | GSAP |
| 6 | Mobile fallback | Track | Native horizontal scroll-snap carousel, no pin; same reveals on `whileInView` | — | Motion |

**Scene 4 — Signature Piece**

| # | Trigger | Element | Motion | Duration / Ease | Library |
|---|---|---|---|---|---|
| 1 | Section pin (200vh) | `reel_00.mp4` full-bleed, poster `image_10` | `currentTime` scrubbed by scroll through a pre-selected 20s segment — visitor "hand-cranks" the making-of | scrub 0.4 | GSAP |
| 2 | During pin | Caption | Typewriter-style unmask, then holds | scrub | GSAP |
| 3 | Pin exit | Video frame | Arch mask contracts; section releases | scrub | GSAP |

*Implementation note:* scroll-scrubbed video requires the mp4 re-encoded with dense keyframes (`-g 12`) or frame-extracted to an image sequence for iOS Safari reliability. Budget both paths; decide in build Phase 2 (§7.2).

**Scene 5 — Testimonial + marquee**

| # | Trigger | Element | Motion | Duration / Ease | Library |
|---|---|---|---|---|---|
| 1 | 40% in view | Quote (display-m italic) | Line-by-line rise, gold quotation mark pops via outBack | 0.48s/line | Motion |
| 2 | In view | `image_05` polaroid | Settles in with −2° rotation | 0.6s outExpo | Motion |
| 3 | Always (paused off-screen) | Marquee ticker | Infinite horizontal loop, 28s/cycle; pauses on hover; speed multiplies ×1.6 with scroll velocity | linear | GSAP |

**Scene 6 — Process**

| # | Trigger | Element | Motion | Duration / Ease | Library |
|---|---|---|---|---|---|
| 1 | Each step 30% in view | Gold numeral | Rises masked + counts up (00→0N flicker, 3 frames) | 0.48s outExpo | Motion |
| 2 | With numeral | Step Lottie icon (4 total, authored in Jitter) | Line draw-on, then subtle idle loop | 0.8s draw, 3s loop | Lottie |
| 3 | With numeral | Step copy | Fade + rise, jittered stagger | 0.48s | Motion |
| 4 | Scroll through section | Vertical connecting thread (SVG path) | Stroke draws down linking steps | scrub | GSAP |

**Scene 7 — Closing CTA**

| # | Trigger | Element | Motion | Duration / Ease | Library |
|---|---|---|---|---|---|
| 1 | 50% in view | "Make it / unforgettable." (display-xl) | Two-line mask reveal; "unforgettable." in italic with hand-drawn gold underline drawing on | 0.9s + 0.6s | Motion + Lottie |
| 2 | In view | WhatsApp button | Magnetic pull within 80px radius; icon Lottie pulses once on first view | spring.soft | Motion + Lottie |
| 3 | Background | `image_11` at 6% opacity, blurred 40px | Slow 1.0→1.06 scale drift | scrub | GSAP |

### 5.5 Micro-interactions (global)

- **Magnetic buttons:** primary CTAs attract the cursor within an 80px radius (`spring.soft`), max displacement 6px — subtle, not gimmicky.
- **Link underlines:** all inline links use a gold underline that draws left→right on hover (240ms, outExpo) and exits right→left.
- **Image hover:** any interactive image gets `scale(1.03)` inside its fixed mask (mask never moves) + grain opacity bump, 240ms.
- **Button press:** `scale(0.97)`, 120ms — every clickable, no exceptions.
- **Cursor (desktop only):** default cursor everywhere except Product Showcase, where a small `View` dot follows via `spring.snappy`. No full-page custom cursors.

### 5.6 Jitter → Lottie asset list

All authored in **Jitter (jitter.video)**, exported as Lottie JSON (dotLottie where supported), rendered via `lottie-react`. Single color `--maroon` or `--gold`, recolorable at runtime.

| Asset | Description | Loop | Target size | Est. JSON |
|---|---|---|---|---|
| `underline-draw` | Hand-drawn underline, 3 length variants | One-shot | 280×24 | <8KB |
| `circle-scribble` | Rough circle around a word | One-shot | 200×80 | <8KB |
| `arrow-scroll` | Curved hand-drawn arrow + wiggle idle | Draw once, idle loop | 48×80 | <10KB |
| `step-brief` | Chat bubble sketch (process step 1) | Draw + idle | 96×96 | <12KB |
| `step-sketch` | Pencil drawing a line (step 2) | Draw + idle | 96×96 | <12KB |
| `step-hands` | Hands tying a bow (step 3) | Draw + idle | 96×96 | <15KB |
| `step-delivery` | Gift box with lid settling (step 4) | Draw + idle | 96×96 | <12KB |
| `whatsapp-pulse` | One soft ring pulse around the WA icon | One-shot | 64×64 | <6KB |

Export settings: 60fps timeline, shape layers only (no rasters), trim-path draw-ons, total Lottie budget ≤ 80KB for all 8 assets.

### 5.7 Reduced motion

When `prefers-reduced-motion: reduce`:
- All mask/transform reveals become 240ms opacity crossfades
- No pinned sections: Story, Showcase (falls back to snap carousel), and Signature (becomes poster image + play button) un-pin
- Lenis disabled (native scroll); marquee static; Lotties render final frame
- Video never autoplays; magnetic/cursor effects off

This is a first-class spec, implemented as a global `useReducedMotion()` gate from day one — not a retrofit.

---

## 6. Technical Specification

### 6.1 Stack

| Layer | Choice | Version | Why |
|---|---|---|---|
| Framework | Next.js (App Router, `output: 'export'`) | 15.x | Static export → cheap/instant hosting, no server needed |
| UI animation | Motion (`motion/react`) | 11.x+ | Entrances, micro-interactions, layout animation |
| Scroll scenes | GSAP + ScrollTrigger | 3.12+ | Pinning, scrubbing, horizontal track (free tier is sufficient) |
| Smooth scroll | Lenis | 1.x | Weighted scroll on desktop, native on touch |
| Lottie | `lottie-react` | 2.x | Jitter export playback |
| Styling | Tailwind CSS v4 + CSS custom properties for all tokens | 4.x | Tokens in §3 and §5.2 map 1:1 to CSS vars |
| Fonts | `next/font` self-hosted Fraunces + Instrument Sans | — | No layout shift, no third-party requests |
| Deploy | Vercel | — | Push-to-deploy, preview URLs for client review |

### 6.2 Project structure

```
app/
  layout.tsx            // fonts, metadata, grain overlay, Lenis provider
  page.tsx              // section composition
components/
  scenes/               // Hero.tsx, Story.tsx, Showcase.tsx, Signature.tsx,
                        // Testimonial.tsx, Process.tsx, ClosingCta.tsx
  motion/               // MaskReveal.tsx, MagneticButton.tsx, Marquee.tsx,
                        // ParallaxLayer.tsx, ArchMask.tsx, LottieOnView.tsx
  Nav.tsx
lib/
  motion-tokens.ts      // §5.2 verbatim
  seeded-random.ts      // deterministic jitter (seed = element index)
  lenis.ts
public/
  media/                // optimized images (AVIF/WebP + JPG fallback)
  video/                // hero-loop.mp4, signature-scrub.mp4 (re-encoded)
  lottie/               // 8 Jitter exports
  textures/grain.png
```

### 6.3 Media pipeline

- **Images:** current 640px thumbnails are usable at card size but NOT full-bleed. Pipeline: `sharp` script → AVIF + WebP + JPG at 640/1280/1920, `next/image` with explicit `sizes`. Full-bleed usage blocked on higher-res originals (§7.1); until then, full-bleed slots use blur-up treatment (30px blur as texture, sharp polaroid inset on top) — an intentional look, not a compromise.
- **Hero loop:** cut an 8s excerpt from `reel_00.mp4`, 720×1280, H.264 CRF 26 + WebM/VP9, target ≤ 1.2MB, `muted playsinline loop autoplay preload="metadata"`, poster from `image_00`.
- **Signature scrub:** 20s excerpt re-encoded keyframe-dense (`-g 12`) for `currentTime` scrubbing; fallback path = 60-frame WebP sequence if iOS testing shows jank.
- **`reel_02.mp4` (audio) is unused.** All site video is muted.

### 6.4 Performance budget

| Item | Budget |
|---|---|
| JS (gzipped, initial) | ≤ 200KB (Motion ~34KB + GSAP ~28KB + Lenis ~4KB + app) |
| Fonts | 2 variable families, `woff2`, subset latin, ≤ 90KB total |
| Hero (LCP) | Poster image ≤ 90KB AVIF; video lazy-attached after LCP |
| Lottie total | ≤ 80KB |
| CLS | ≈ 0 (all media has explicit aspect-ratio boxes) |
| Animation rule | transform/opacity/clip-path only — no width/height/top/left tweens |

### 6.5 SEO & metadata

- Title: `Crafts_n_beyond — Handmade Shagun Nariyals, Trousseau Packing & Hampers`
- Description from hero subline; OG image = art-directed card (hero headline over `image_04`), 1200×630
- `LocalBusiness` JSON-LD with WhatsApp number, Instagram `sameAs`
- Single `<h1>` (hero headline); scene headings are `<h2>`

---

## 7. Assets, Build Plan & QA

### 7.1 Asset gaps — request list for the client

| Priority | Ask | Fallback if unavailable |
|---|---|---|
| P0 | Logo/monogram vector (or high-res export) | Trace `image_12.jpg` monogram to SVG |
| P0 | 6–10 original product photos (phone camera fine, window light, ≥ 2000px) | Blur-up treatment (§6.3) sitewide |
| P1 | Original reel files from phone (not Instagram-compressed) | Use extracted `reel_00.mp4` renditions |
| P1 | A photo of the two makers' hands at work | Story section uses product close-up instead |
| P2 | Preferred name framing ("artist duo" vs "sisters" etc.) | Ship with "artist duo" |
| P2 | Any brand assets (business card, sticker sheet) for color matching | Palette in §3.1 stands |

### 7.2 Build phases

**Phase 1 — Static foundation (no motion)**
Layout all 7 scenes with final copy, tokens, type scale, optimized media, reduced-motion styles as the base state.
*Acceptance: pixel review on 390px & 1440px; Lighthouse ≥ 95 perf/a11y; zero CLS; all copy from §2.2 verbatim.*

**Phase 2 — Motion layer**
Lenis + ScrollTrigger infrastructure, then scenes in order: Hero → Showcase → Story → Signature → rest. Decide video-scrub vs frame-sequence for iOS here.
*Acceptance: every storyboard row in §5.4 implemented; 60fps on mid-tier Android (tested via CPU 4× throttle); mobile showcase carousel snap works with thumb.*

**Phase 3 — Polish & humanity pass**
Lottie integration, seeded jitter, magnetic buttons, marquee velocity, grain, easing review at 0.5× speed (GSAP `timeScale`), cross-browser QA.
*Acceptance: QA checklist below fully green.*

### 7.3 QA checklist

- [ ] Watch every animation at 0.5× speed — nothing snaps, overlaps wrongly, or eases linearly
- [ ] iOS Safari: video scrub scene, arch masks (`-webkit-` clip-path), no scroll-jank with Lenis disabled on touch
- [ ] `prefers-reduced-motion`: full walkthrough matches §5.7
- [ ] Keyboard: all CTAs reachable, focus visible (gold 2px outline), skip-to-content link
- [ ] WhatsApp deep link opens correct chat with prefilled text on iOS + Android
- [ ] Slow 3G: poster renders < 2.5s, video attaches late without layout shift
- [ ] Screen reader: headings hierarchy sensible, decorative Lotties `aria-hidden`
- [ ] 320px width: no horizontal overflow anywhere

---

## Appendix A — Optional AI-asset enhancements (Higgsfield)

The user's Higgsfield account is connected (currently 0 credits, free plan). If credits are added later, these are the only two uses worth paying for — both are polish, not blockers:

1. **Hero ambience loop:** a 6s subtle motion loop (drifting gold dust / soft fabric movement) generated from `image_04` as an image-to-video pass, used at low opacity behind the hero headline. Prompt direction: "slow drifting golden bokeh over cream silk, subtle, seamless loop".
2. **Upscaling:** run the 13 extracted 640px images through Higgsfield upscale (2K) as a stopgap until the client provides originals. Verify hands/text areas for artifacts before shipping — reject any image where the craftwork detail smears.

## Appendix B — Reference quality bar

- zajno.com — scroll pacing and easing weight
- lusion.co — scrubbed video restraint
- fromsmash.com / grandimage.fr — editorial serif + warm palette handling
- The test: screenshot any viewport of the finished site — if it could be mistaken for a Framer template, revisit §3.3/§3.4.

---

*PRD ends. Everything above is buildable as specified; open items are exactly two: client asset delivery (§7.1) and the iOS video-scrub decision (§7.2 Phase 2).*
