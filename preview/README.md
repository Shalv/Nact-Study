# Preview

`coreenact-redesign.html` is the standalone, self-contained preview of the
Logic-theme redesign — one HTML file with the CSS, the app code, the content and
every logo and image embedded, so it opens straight in a browser with no build
step and works offline.

It is **not committed to this repository**: the inlined single-file build is
~5 MB, which exceeds the request size limit of the API used to publish this repo.
Regenerate it locally instead:

    npm run preview:build     # writes dist-preview/preview.html

then copy `dist-preview/preview.html` to `preview/coreenact-redesign.html`.

The preview covers the whole site: 100 routes across the home page, solutions
and their capability items, services, AI & Agents topics and stories, industries,
digital marketing, add-ons, about, case studies, resources, contact, the enquiry
page and the privacy policy. Navigation is hash-based (`#/services/erp-audit`)
because a `file://` page has no server to resolve paths.

This is a review artefact, not the source of truth — the React application in
the project root is the real implementation. See `../REDESIGN.md`.
