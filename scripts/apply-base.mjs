// Prefix the app's public-asset URLs with the deploy base.
//
// Vite applies `base` to everything it bundles (imported images, the CSS, the
// index.html references), but the app also points at files in public/ with
// literal absolute strings — "/images/…", "/logos/…", "/coreenact-logo-light.png"
// and so on — which Vite leaves alone. On a project GitHub Pages site the app is
// served from "/<repo>/", so those literals would resolve to the wrong place and
// every image would 404.
//
// Rather than thread a base-aware helper through the components, this runs after
// `vite build` and rewrites those literals in the emitted JS/CSS/HTML. It is a
// no-op when the base is "/", so the default build is untouched.
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const base = process.env.VITE_BASE || '/';

// Public paths the app references as plain strings.
const PREFIXES = [
  '/images/',
  '/logos/',
  '/assets/',
  '/coreenact-logo-light.png',
  '/coreenact-logo-dark.png',
  '/coreenact-logo.png',
  '/coreenact-mark.png',
  '/Microsoft-Solutions-Partner.png',
  '/hero-particle-sphere.mp4',
  '/hero-particle-sphere.webm',
  '/favicon-512x512.png',
  '/copilot-agent-logo.webp',
  '/chat-widget.js',
  '/logo.png',
];

if (base === '/') {
  console.log('apply-base: base is "/" — nothing to rewrite');
  process.exit(0);
}

const b = base.endsWith('/') ? base : `${base}/`;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

let files = 0;
let hits = 0;
for (const file of walk(DIST)) {
  if (!/\.(js|css|html)$/.test(file)) continue;
  let src = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const prefix of PREFIXES) {
    // Match the literal only when it is a complete path — preceded by a quote,
    // backtick or "(" — so we never rewrite a longer path by accident.
    const re = new RegExp(`(["'\`(])${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    const next = src.replace(re, `$1${b.slice(0, -1)}${prefix}`);
    if (next !== src) {
      hits += src.match(re)?.length ?? 0;
      src = next;
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, src);
    files += 1;
  }
}

console.log(`apply-base: base "${b}" applied to ${hits} reference(s) across ${files} file(s)`);
