# Latent Space Explorer

An interactive personal portfolio for **Sasha Kolhatkar** — a pannable, zoomable 2D embedding space of projects, skills and academic foundations. Built with React, Tailwind CSS, Framer Motion and an SVG-based vector engine.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5175`).

```bash
npm run build
npm run preview
```

## Controls

| Action | Desktop | Mobile |
| --- | --- | --- |
| Pan | Click + drag | Touch + drag |
| Zoom | Scroll wheel, `+` / `-`, dock buttons | Pinch, double-tap, dock buttons |
| Reset camera | `0` or reset button | Reset button |
| Inspect a project | Click its node | Tap its node |
| Close a case study | `Esc` or return button | Return button |
| Change clustering | Bottom dock | Bottom dock |
| Switch visual mode | Space Mode toggle | SPACE toggle |
| Recruiter view | Quick CV Mode toggle | CV toggle |

## Visual modes

- **Latent Space** (default) — obsidian `#090A0F` canvas with slate gridlines and cyan/violet/emerald accents.
- **Deep Space** — opt-in separate mode with a starfield, drifting nebula wash, and a shifted cyan/purple/pink palette. The choice is saved in `localStorage`, and animations are disabled in Quick CV Mode.

## Architecture

- `src/data/latentData.js` — single source of truth for nodes, edges, three generated layouts, cluster halos and case-study copy.
- `src/hooks/useLatentEngine.js` — one `requestAnimationFrame` loop drives spring layout transitions, magnetic cursor physics, camera easing and SVG edge endpoints. React state only changes on hover / mode changes; per-frame work writes directly to refs and DOM transforms.
- `src/components/LatentCanvas.jsx` — SVG grid, cluster halos and edges, plus DOM nodes (keyboard accessible) with GPU-composited `translate3d` transforms.
- `src/components/CaseStudy.jsx` — camera zoom target + glassmorphic case-study overlay.
- `src/components/QuickCv.jsx` — animation-free, print-friendly recruiter summary.
- `src/components/MobileCards.jsx` — default under 768px, with cluster filters and an opt-in interactive map.
- `src/context/ThemeContext.jsx` — Latent Space / Deep Space mode state and palette, persisted in `localStorage`.
- `src/components/CosmicBackdrop.jsx` — CSS/SVG starfield and nebula shown only in Deep Space mode.

## Content notes

Only publicly available repositories are shown as projects, pulled from `https://github.com/SashaKolhatkar`:

- `sentimentiq` → https://github.com/SashaKolhatkar/sentimentiq
- `memoza` → https://github.com/SashaKolhatkar/memoza
- `smart-crop-recommendation` → https://github.com/SashaKolhatkar/smart-crop-recommendation
- `song-reccomendation` → https://github.com/SashaKolhatkar/song-reccomendation

Unavailable projects and dead links were removed rather than shown as broken buttons.

The Resume button in the header opens `public/resume.pdf`, which is bundled with the site.

Deployment links used where a GitHub Pages site exists: Memoza and Smart Crop Recommendation.
