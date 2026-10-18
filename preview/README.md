# Preview

`coreenact-redesign.html` is the standalone, self-contained preview — one HTML
file with the CSS, the app code, the content, every logo and image, and the real
Microsoft product marks embedded as inline SVG. It opens straight in a browser
with no build step and works offline.

100 routes: home, solutions and their capability items, services, AI & Agents
topics and stories, industries, digital marketing, add-ons, about, case studies,
resources, contact, the enquiry page and the privacy policy. Hash-based
navigation (`#/services/erp-audit` and so on).

## Theme

Clean and minimal: Plus Jakarta Sans at weight 600 for display, generous white
space, hairline borders, soft depth, restrained motion (0.2s hovers, a short
fade-up on scroll). Both collapse under `prefers-reduced-motion`.

## Hero

A full-bleed near-black canvas with a drifting particle field and one centred
column of crisp type, with a staggered word-rise entrance.

## Cards

Every content grid is a clean card — hairline border, soft shadow, a single
brand accent along the top, and the mark that matches what the card actually is
(mapped per record, so no logo repeats a neighbour's). Marks in use: Business
Central, Copilot, Copilot Studio, Power BI, Power Apps, Power Automate, Power
Platform, Fabric, Azure, Teams, Dataverse, Dynamics 365, Entra, Excel, Outlook,
SharePoint, OneDrive, Viva, Loop, SQL Server, Visual Studio, the Microsoft
four-square, and Coreenact EdCore, 360 and Payroll.

This is a review artefact, not the source of truth — the React application in
the project root is the real implementation. See `../REDESIGN.md`.
