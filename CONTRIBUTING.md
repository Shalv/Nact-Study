# Contributing

Thanks for helping with the Coreenact site. This is a small, opinionated
codebase — the notes below are the conventions that keep it that way.

## Getting set up

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # tsc --noEmit — please make this pass before opening a PR
```

No backend configuration is needed to work on the UI. See
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) if you need the mail transport or a
deploy.

## How the site is put together

- **Routes are real paths.** `src/routes.ts` maps a pathname to a page; `App.tsx`
  derives its state from the parsed route rather than a page flag. If you add a
  view, add it there and to the sitemap.
- **Pages are data-driven.** Copy and catalogue records live in `src/data/`.
  Adding a record adds a page, a nav target where relevant, and a sitemap entry —
  no component changes. Prefer editing data over hardcoding text in a component.
- **One design system.** `src/index.css` holds the tokens, the `cx-*` component
  classes and a "bridge" layer that re-skins the legacy Tailwind palette. New UI
  should use the `cx-*` classes and the tokens rather than raw colours, so the
  theme stays swappable.
- **Lazy pages.** Page components are code-split with `React.lazy`. Keep large
  data blocks (e.g. the Copilot catalogue) out of the main bundle by importing
  them only where they are used.

## Style

- TypeScript, strict. `npm run lint` is the gate.
- Comments explain *why*, not *what* — especially where a choice looks odd
  (a rewrite, a workaround, a deliberately narrow type).
- Match the surrounding code: two-space indent, double quotes, no default exports
  except where a file already uses one.
- Accessibility: interactive elements are real `<button>`/`<a>`; images carry
  `alt`; decorative visuals are `aria-hidden`.

## Adding a page or a link

1. Add the record to the relevant file in `src/data/`.
2. If it is a new top-level page, add it to `PAGE_PATHS` and `PAGE_TITLES` in
   `src/routes.ts`, and to the nav (`Navbar.tsx`) or footer (`Footer.tsx`).
3. Add the URL to `public/sitemap.xml`.
4. Wire related links so the page is reachable sideways, not just from the nav —
   `src/components/RelatedLinks.tsx` is the shared block for this.

## Pull requests

- One concern per PR; keep diffs readable.
- Run `npm run lint` and `npm run build` before pushing.
- Describe what changed and why, and note anything you could not verify.

## Secrets

Never commit credentials. Use `.env.example` for the shape and set real values in
the host's environment. `.env*` is ignored except the example.
