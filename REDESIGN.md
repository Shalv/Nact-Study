# Coreenact — "Logic" theme (React source)

This is the Coreenact React/TypeScript app re-skinned in the visual language of
**logicdesign.co.uk**. The whole interface — typography, colour, navigation,
hero, cards, buttons, footer — now follows that theme, while every page, route,
data file, the enquiry/mail pipeline, the live-chat widget, the ROI estimator and
the add-on catalogue are unchanged.

## The design system

Pulled from the reference site's own theme (WordPress preset tokens + compiled
CSS):

| Token | Value |
| --- | --- |
| Accent (primary) | `#c8db53` — acid lime, used only for action + emphasis |
| Ink / black | `#101010` |
| Dark | `#2c2c2c` · `#1c1c1c` |
| Light / body | `#f1f1f1` · `#ececec` |
| Muted | `#c5c5c5` |
| Display font | **Anton** — uppercase, condensed |
| Body font | **Inter** |
| Radii | `.25 / .4 / .75 / 1 / 1.5 rem`; buttons are full pills (`2em`) |
| Line height | `1.7` body, `1.26` headings |

Signature devices carried over: near-black full-bleed sections, oversized
uppercase Anton headlines closed with a lime underscore (`_`), pill buttons that
scale on hover, generous radii, hairline rules, and a black footer with a large
call to action flecked with lime shapes.

## How the re-skin reaches every page

Rewriting ~40 components and 100 routes by hand would be fragile. Instead:

1. **`src/index.css`** is the single source of the theme. It defines the Logic
   tokens in Tailwind's `@theme` block **and remaps the legacy palette** (slate,
   gray, blue, sky, indigo, emerald, rose, …) onto the new system. Because
   `bg-blue-600`, `text-slate-900`, `border-slate-200` and friends now resolve to
   Logic colours, **every existing utility class across the app inherits the new
   look with no component rewrite.**
2. **`dark:` variants are disabled** (`@custom-variant dark`), and the
   `ThemeProvider` keeps the document on light, so the app renders as the single
   light theme the reference uses. The old dark-mode styling is inert.
3. A short **bridge layer** at the end of `index.css` covers the few things
   `@theme` cannot express: arbitrary hex utilities (`bg-[#005a9e]`), radii,
   coloured shadow glows, gradients (collapsed to flat on-brand surfaces while
   keeping image overlays), and legibility fixes for dark panels.
4. The **chrome is rewritten** in the new language: `Navbar`, `Footer` and
   `Hero`, plus the home composition in `App.tsx`.

## What changed

| File | Change |
| --- | --- |
| `index.html` | Anton + Inter replace Archivo. |
| `src/index.css` | **Rewritten.** Logic tokens, base typography, `cx-*` component classes, legacy-palette remap, bridge layer. |
| `src/components/Navbar.tsx` | **Rewritten.** Transparent over the dark hero, solid black bar elsewhere; pill links; active page in lime; lime pill CTA. |
| `src/components/Hero.tsx` | **Rewritten.** Full-height black hero, uppercase Anton headline with the lime underscore, floating image tiles, lime pill CTAs, Microsoft stack marquee. |
| `src/components/Footer.tsx` | **Rewritten.** Black footer with an oversized Anton CTA, lime shapes, brand + three link columns + offices + legal bar. |
| `src/App.tsx` | Home composition retheme; footer wired to the contact modal; lime underscore on the pillars heading. |
| `src/routes.ts`, `src/App.tsx` | Added a guarded hash-router mode used **only** by the single-file preview (see below); the deployed app still uses real paths. |
| `src/main.preview.tsx`, `preview.html`, `vite.preview.config.ts`, `scripts/inline-preview-assets.mjs` | New — build the self-contained review preview. |

## Run it

```
npm install
npm run dev            # tsx server.ts  → http://localhost:3000
npm run build          # vite build + esbuild server bundle
npm run lint           # tsc --noEmit  (passes cleanly)
npm run preview:build  # single self-contained HTML review preview
```

## Notes

- The preview at `preview/coreenact-redesign.html` is a standalone, fully
  self-contained file (app code, CSS, logos and images inlined) that opens
  straight from disk with no build step and works offline. Navigation there is
  hash-based (`#/services/erp-audit`), because a `file://` page has no server to
  resolve paths.
- The accent is the reference site's lime. If Coreenact would rather keep its
  Microsoft-blue accent, the swap is a handful of values in the `@theme` block
  and the `cx-btn-*` / bridge rules in `src/index.css`.
- Inner-page headers render on the light canvas (the reference site uses a dark
  hero on some inner pages); the dark home hero, dark cards and black footer
  carry the theme. Individual pages can be migrated to `cx-phero` over time.
