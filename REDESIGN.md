# Coreenact — editorial redesign (React source)

This is the restyled React/TypeScript source for coreenact.com, rebuilt in the
visual language of the Squarespace *Design Intelligence* page: a single light,
editorial theme — near-black hero, oversized tracked display type, generous
whitespace, hairline rules — with colour carried only by the Coreenact mark and
the Microsoft product logos.

All site content, data, routes, the enquiry/mail pipeline, the live-chat widget,
the ROI estimator and the add-on catalogue are unchanged.

## What changed

| File | Change |
| --- | --- |
| `index.html` | Archivo replaces Poppins; the dark-mode boot script is removed. |
| `src/index.css` | **Rewritten.** New design system (tokens, base typography, `cx-*` component classes) plus a "bridge" layer that re-skins the legacy Tailwind palette to the editorial system app-wide. |
| `src/components/Navbar.tsx` | **Rewritten.** One solid paper bar that floats transparent over the dark home hero; no utility strip, no theme switcher, no gradient pill nav. |
| `src/components/Footer.tsx` | **Rewritten.** Editorial footer: brand, three link columns, offices, legal bar. |
| `src/components/Hero.tsx` | **Rewritten.** Typographic editorial hero (the interactive blueprint simulator is retired). |
| `src/App.tsx` | Home composition: the six gradient portal cards are replaced with the editorial numbered solution-pillar list; the `<main>` wrapper is de-themed. |
| `src/context/ThemeContext.tsx` | Mode locked to `light` (single-theme design); the context API is unchanged so consumers still compile. |
| `public/coreenact-logo-light.png`, `public/coreenact-logo-dark.png` | Added — light-on-dark and dark-on-light logo variants for the nav/hero/footer. |

## Design tokens

```
ink      #0a0a0a     paper    #ffffff     cream    #f3f0ea
cream-2  #eae5db     line     #e2ddd2     muted    #6c6a65
```

Type: **Archivo** (400/500/600/700) for both display and body. Radii collapse to
2px, shadows are removed, and the legacy blue/indigo/emerald/rose accents resolve
to ink or muted — see the `BRIDGE` block at the end of `src/index.css`.

## Run it

```
npm install
npm run dev      # tsx server.ts
npm run build    # vite build + esbuild server bundle
npm run lint     # tsc --noEmit
```

`npm run lint` passes cleanly on this source.

## Notes / follow-ups

- The bridge layer restyles every page that still uses the old Tailwind palette,
  so inner pages inherit the new look without being rewritten. Individual pages
  can be migrated to the `cx-*` component classes over time.
- The interactive hero simulator and the theme toggle were dropped in favour of
  the single-theme editorial direction. If either is wanted back, say so.
- The full `vite build` was not run here (the sandbox has a 2 GB memory cap that
  Tailwind's WASM compiler exceeds). Run `npm run build` locally to produce the
  production bundle.

## Colour cards (latest pass)

The editorial canvas stays monochrome; colour and motion are carried by the
cards. Each card is tinted with its own brand gradient (rail, glow, hover
shadow) and stamped with the **real Microsoft product mark** taken from
`src/components/icons/MicrosoftIcons.tsx` — Business Central, Copilot, Power BI,
Power Apps, Power Automate, Fabric, Azure, Teams, Dataverse, Entra, Excel,
Outlook, SharePoint and the Microsoft four-square.

| File | Change |
| --- | --- |
| `src/lib/cardStyle.ts` | New. Resolves a Tailwind gradient string to the CSS custom properties a card reads. |
| `src/index.css` | `.cx-cards` / `.cx-card` (rail, glow, hover lift, coloured shadow) plus re-tinting of the accent classes inside a card. |
| `SolutionsGrid.tsx`, `IndustriesPage.tsx`, `AiAgentsPage.tsx`, `AddonsListCard.tsx` | Card containers tagged `cx-card` with their brand gradient. |

The standalone HTML preview carries the fuller version of this: every grid on
every page — services, solutions, capability items, industries, AI topics,
add-ons, digital marketing, resources, about and case studies — is a colour card
with a real Microsoft mark and a staggered entrance.

## One mark per card

Cards no longer repeat a single logo. Every record in the catalogue is mapped to
the Microsoft (or Coreenact) mark that matches what it actually is — by `id`, not
by keyword guessing:

| Card | Mark |
| --- | --- |
| ERP Implementation | Dynamics 365 Business Central |
| NAV to Cloud Migration | Visual Studio (C/AL to AL refactoring) |
| ERP Audit & Health Check | SQL Server |
| Global ERP Rollouts | Azure |
| India Localization | Dynamics 365 |
| Security & Governance | Entra ID |
| Managed Services | Teams |
| Digital Marketing | Power BI |
| Education industry | Coreenact EdCore |
| Construction industry | SharePoint |
| HRMS / HR story | Coreenact Payroll |
| LMS portal | Coreenact 360 |

Verified per grid: services 8/8 distinct, industries 9/9, add-ons 9/9, capability
items 6/6, resources 6/6, AI topics 20/22 (the two pairs are Word + PowerPoint
sharing the Microsoft 365 four-square, and the two agent-building topics sharing
Copilot Studio — both deliberate, because the project ships no Word or PowerPoint
mark and showing a different product's logo would be worse than repeating).

On the React side `MicrosoftAppBadge` now names any of 30 marks, and
`SERVICE_MS_APP` / `INDUSTRY_MS_APP` carry the specific choice per record.

## Modern theme (latest pass)

The site now sits on a clean, minimal product surface rather than the earlier
editorial one.

| | Before | Now |
| --- | --- | --- |
| Type | Archivo, whisper-weight 300 display | **Plus Jakarta Sans**, weight 600 display |
| Hero | #000, square buttons | #050505, particles kept, crisp type |
| Buttons | 0px radius (Squarespace signature) | 10px soft-rounded |
| Cards | gradient rail + bloom + light sweep | hairline border, soft shadow, one brand accent along the top |
| Section bands | warm cream (#f3f0ea) | neutral greys (#fafafa / #f4f4f5) |
| Motion | 0.5s lift + sheen sweep | 0.2s, translateY(-3px), no sweep |

Kept: the Microsoft product marks on every card (one per record, mapped by id)
and the particle hero.

Files touched: `src/index.css` (tokens, type, buttons, cards, hero, nav, reveal),
`index.html` (font), `src/components/Navbar.tsx` (renamed the brand mark class —
it collided with the card logo tile and was inheriting its background).
