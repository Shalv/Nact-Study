# Deploying Coreenact

Two targets, for two different jobs.

| Target | What you get | What it does *not* do |
| --- | --- | --- |
| **Vercel / Node host** | The full app — pages **and** the API | — |
| **GitHub Pages** | A static, shareable build of the site | No API: contact forms, the live-chat alerts and `/api/leads` are inert |

---

## 1. Full app (Vercel or any Node host)

The app is an SPA plus a small Express server (`server.ts`) that also runs as a
Vercel function through `api/index.ts`.

```bash
npm install
npm run build     # vite build + esbuild server bundle
npm start         # node server.ts
```

`vercel.json` already wires this up:

- `/api/:path*` → `api/index.ts`
- everything else → `index.html` (so deep links like `/services/erp-audit`
  resolve to the app shell)

### Environment

Copy `.env.example` and fill in what you need. Nothing is required for the site
to render; these drive the backend features.

| Variable | Purpose |
| --- | --- |
| `NOTIFICATION_EMAIL` | Comma-separated recipients for enquiry / lead / chat alerts |
| `GRAPH_TENANT_ID`, `GRAPH_CLIENT_ID`, `GRAPH_SENDER_EMAIL` | Microsoft Graph sender (defaults live in `mailTransport.ts`) |
| `GRAPH_CLIENT_SECRET` | Azure app secret — **Graph is only used when this is set** |
| `SMTP_USER`, `SMTP_PASS` | SMTP fallback (`smtp.office365.com:587`) |
| `SEND_ENQUIRY_CONFIRMATION` | `false` disables the prospect auto-reply |
| `SEND_LIVE_CHAT_ALERT` | `false` disables live-chat mail alerts |
| `GEMINI_API_KEY` | Site agent / prompt features |

Never commit a real secret. `.env*` is git-ignored except `.env.example`.

### Mail transport

Graph is preferred and is the only option when the tenant has SMTP AUTH
disabled. To set it up: create an app registration, add a client secret, grant
the **Mail.Send** *application* permission with admin consent, then set
`GRAPH_CLIENT_SECRET`. Check the wiring without sending a form:

```bash
curl -s https://<host>/api/email-status   # which transport is active
curl -sX POST https://<host>/api/email-test
```

---

## 2. Static site (GitHub Pages)

`.github/workflows/deploy-pages.yml` builds the app and publishes it to Pages on
every push to `main` (and on manual dispatch).

Two things the workflow takes care of, both of which matter if you build by hand:

1. **Sub-path base.** A project site lives at `https://<owner>.github.io/<repo>/`,
   so the build is given `VITE_BASE=/<repo>/`. Vite applies that to everything it
   bundles, and `scripts/apply-base.mjs` rewrites the public-asset URLs the app
   hardcodes (`/images/…`, `/logos/…`, the logos). Reproduce it locally with:

   ```bash
   VITE_BASE=/<repo>/ npm run build:pages
   ```

2. **SPA fallback.** Pages serves `404.html` for unknown paths, and the app
   routes on the pathname, so the workflow copies `dist/index.html` to
   `dist/404.html`. Without it, a refresh on `/services/erp-audit` 404s.

### Enabling it

GitHub Pages is only available for **public** repositories on the free plan. If
the repository is private you must either make it public or upgrade the plan
before the workflow can publish. Then set **Settings → Pages → Source** to
*GitHub Actions*.

Remember: on Pages the API does not exist, so the enquiry forms will not send.
Point the marketing site at Pages only if the forms are not needed there, or
keep Vercel as the canonical host and treat Pages as a preview.

---

## 3. Single-file review preview

For reviewing the whole site without a server:

```bash
npm run preview:build     # writes dist-preview/preview.html
```

This inlines the JS, the CSS and every public image into one HTML file that opens
from disk. It routes through the location hash (`#/services/erp-audit`) because a
`file://` page has no server to resolve paths. The build is ~5 MB, which is over
the GitHub API push limit, so the artefact is not committed — regenerate it.
