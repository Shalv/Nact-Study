<div align="center">

# Coreenact — Microsoft Dynamics 365 Business Central

**Enterprise Microsoft Solutions Partner — Dynamics 365 Business Central, NAV-to-Cloud
migration, India GST localisation, agentic AI and 24/7 managed support.**

[Live site](https://www.coreenact.com) ·
[Redesign notes](REDESIGN.md) ·
[Deployment](docs/DEPLOYMENT.md) ·
[Contributing](CONTRIBUTING.md) ·
[Contact](https://www.coreenact.com/contact)

</div>

---

## What this is

The Coreenact marketing site: a React + TypeScript single-page application with a
small Express backend that handles the enquiry pipeline, the live-chat alerts and
the site agent. Every view is addressed by a real URL, so deep links and refreshes
work — the pathname is the source of truth for what renders (`src/routes.ts`).

The interface follows the Logic Design visual language: a near-black canvas with
one acid-lime accent, Anton display type over Inter, pill buttons and hairline
rules. `REDESIGN.md` documents the system and how it reaches every page.

## Stack

| | |
| --- | --- |
| App | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/index.css`) |
| Motion | `motion` (Framer Motion) |
| Icons | `lucide-react`, plus in-house Microsoft / CoreEnact marks |
| Server | Express 4 (`server.ts`), nodemailer, Microsoft Graph |
| Deploy | Vercel (`vercel.json`) or any Node host; static preview via GitHub Pages |

## Getting started

```bash
npm install
npm run dev        # tsx server.ts  → http://localhost:3000
```

Set the environment from `.env.example` before the backend features will work
(mail transport, notification recipients). See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Runs the Express server with Vite middleware (dev) |
| `npm run build` | Production build: `vite build` + the esbuild server bundle |
| `npm start` | Runs the built server (`node server.ts`) |
| `npm run lint` | `tsc --noEmit` — the type gate |
| `npm run build:pages` | Static build for a sub-path (GitHub Pages), with `VITE_BASE` |
| `npm run preview:build` | Self-contained single-file review preview |

## Project layout

```
api/            Vercel serverless entry (re-exports the Express app)
src/
  App.tsx       Route switch, overlays, home composition
  routes.ts     Path ⇄ page mapping, titles, catalog helpers
  index.css     The whole design system + legacy-palette bridge
  components/   One file per page, section or modal
  data/         All copy and catalogue records (services, solutions, industries…)
  context/      ThemeProvider (single light theme)
  lib/          Mail/CRM/lead helpers shared with the server
public/         Static assets, robots.txt, sitemap.xml, llms.txt
scripts/        Build helpers (preview bundle, deploy base)
.github/        GitHub Pages workflow
```

Content lives in `src/data/`; adding a record there adds a page and a sitemap
entry, with no component changes.

## Deployment

- **Full app (with the API):** Vercel — `vercel.json` rewrites `/api/*` to
  `api/index.ts` and everything else to `index.html`.
- **Static site:** GitHub Pages via `.github/workflows/deploy-pages.yml`. This is
  a static build, so the Express API does not run there and the contact forms are
  inert. A project Pages site is served from a sub-path, which the workflow
  handles with `VITE_BASE` and `scripts/apply-base.mjs`.

Full instructions, environment variables and the mail transport setup are in
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Enquiry notifications (Microsoft 365)

Every submission to `POST /api/enquiry` (contact form and consultation modal),
`POST /api/leads` (site agent) and `POST /api/live-chat/message` (visitor chat)
sends a notification mail to the addresses in `NOTIFICATION_EMAIL`, comma
separated. Reply-to is set to the prospect.

Two transports, tried in that order (see `mailTransport.ts`):

1. **Microsoft Graph** — preferred, and the one that works when the tenant has
   disabled SMTP AUTH. The backend authenticates as the Azure app registration
   with the client-credentials flow, then calls `/users/{sender}/sendMail`.
2. **SMTP** (`smtp.office365.com:587`) — a fallback, used only when Graph is not
   configured. Needs `SMTP_USER` + `SMTP_PASS`, and SMTP AUTH on the mailbox.

Verify without filling in the form:

- `GET /api/email-status` — which transport is active and what is missing.
- `POST /api/email-test` — sends one message to the configured recipients.

Each enquiry also sends a fixed-template confirmation to the address the prospect
typed, throttled to one per address per 10 minutes and 50 per hour. Set
`SEND_ENQUIRY_CONFIRMATION=false` to turn it off.

**Storage:** submissions are not written to a database. There is no PostgreSQL
support in this codebase — `GET /api/leads` reads an in-memory list that is empty
after every restart. Treat the mailbox as the system of record until a real store
is added.

## License

[MIT](LICENSE) © Coreenact Solutions Pvt. Ltd.
