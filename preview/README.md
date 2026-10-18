# Preview

`coreenact-redesign.html` is the standalone, self-contained preview of the
Logic-theme redesign — one HTML file with the CSS, the app code, the content and
every logo and image embedded, so it opens straight in a browser with no build
step and works offline.

It covers the whole site: 100 routes across the home page, solutions and their
capability items, services, AI & Agents topics and stories, industries,
digital marketing, add-ons, about, case studies, resources, contact, the
enquiry page and the privacy policy. Navigation is hash-based
(`#/services/erp-audit` and so on) — a `file://` page has no server to resolve
paths, so the preview build routes through the location hash.

Rebuild it with `npm run preview:build` from the project root.

This is a review artefact, not the source of truth — the React application in
the project root is the real implementation. See `../REDESIGN.md`.
