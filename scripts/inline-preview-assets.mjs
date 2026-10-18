// Inlines every asset under public/ that the single-file preview references by
// absolute URL (logos, images, the Microsoft stack marks) as a data URI, so the
// generated HTML is fully self-contained and opens offline.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist-preview');
const publicDir = path.join(root, 'public');
const htmlPath = path.join(distDir, 'preview.html');

const MIME = {
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.woff2': 'font/woff2', '.woff': 'font/woff',
};

let html = fs.readFileSync(htmlPath, 'utf8');

// Collect absolute asset URLs referenced in the bundle, e.g. "/images/a.jpg".
const refs = new Set();
const re = /["'`(](\/(?:images|logos|assets)\/[^"'`)\s]+?\.(?:png|jpe?g|webp|gif|svg|mp4|woff2?))["'`)]/g;
let m;
while ((m = re.exec(html)) !== null) refs.add(m[1]);
// Root-level public files referenced with a leading slash and a known extension.
const reRoot = /["'`(](\/[A-Za-z0-9._-]+\.(?:png|jpe?g|webp|svg|ico))["'`)]/g;
while ((m = reRoot.exec(html)) !== null) refs.add(m[1]);

let inlined = 0, missing = 0, bytes = 0;
for (const ref of refs) {
  const file = path.join(publicDir, ref.replace(/^\//, ''));
  if (!fs.existsSync(file)) { missing++; continue; }
  const ext = path.extname(file).toLowerCase();
  const data = fs.readFileSync(file);
  bytes += data.length;
  const uri = `data:${MIME[ext] || 'application/octet-stream'};base64,${data.toString('base64')}`;
  html = html.split(ref).join(uri);
  inlined++;
}

fs.writeFileSync(htmlPath, html);
console.log(`inlined ${inlined} assets (${(bytes / 1048576).toFixed(1)} MB), ${missing} missing, html now ${(html.length / 1048576).toFixed(1)} MB`);
