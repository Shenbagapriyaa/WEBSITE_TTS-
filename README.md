# Track Tech Solution — Website

A single-page marketing site for Track Tech Solution, themed around the factory/IoT
visuals from the product video (real frames and a looping clip are used as actual
assets, not stock images).

## Run it locally

No build step or dependencies — it's plain HTML/CSS/JS.

**Option A — just open it**
Double-click `index.html`, or open it from VS Code's file explorer in your browser.

**Option B — VS Code Live Server (recommended)**
1. Install the "Live Server" extension in VS Code.
2. Right-click `index.html` → "Open with Live Server".
3. It opens at `http://127.0.0.1:5500` with auto-reload on save.

## Project structure

```
index.html            Page markup
css/styles.css         All styling (design tokens at the top as CSS variables)
js/main.js             Nav toggle, cursor glow, animated counters, scroll reveal, live ticker
assets/video/          Looping hero background video (from the product video)
assets/img/            Section images, extracted as real stills from the product video
```

## What's interactive

- **Animated stat counters** — 37% / 28% / 99.2% count up when they scroll into view.
- **Cursor glow** — a soft cyan glow follows the pointer on desktop (disabled under
  9 00px width and under `prefers-reduced-motion`).
- **Live floor ticker** — the "Piece #… passed QC" number in the hero ticks up on an
  interval. It's illustrative, not connected to a real feed — wire it to your actual
  API by replacing the `setInterval` block in `js/main.js`.
- **Section reveal** — each section fades up once as you scroll to it (not per-card,
  to keep the motion calm rather than busy).
- Mobile nav menu, hero video that pauses when scrolled out of view (saves battery/CPU).

## Customizing

- Colors, fonts and spacing are all CSS variables at the top of `css/styles.css`
  under `:root` — change `--cyan`, `--navy`, etc. to re-theme the whole site.
- Swap any file in `assets/img/` or `assets/video/` with your own — filenames are
  referenced directly in `index.html`.
- Contact details and copy live directly in `index.html`; there's no CMS or backend.
