// Assembles an upload-ready folder for Cloudflare Pages: dist/cloudflare/
// Mirrors package-godaddy.mjs; the Angular build itself is unchanged.
import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const browser = new URL('dist/jagtech-web/browser/', root);
const out = new URL('dist/cloudflare/', root);

if (!existsSync(new URL('index.csr.html', browser))) {
  console.error('Build output not found. Run "npm run build" first.');
  process.exit(1);
}

rmSync(out, { recursive: true, force: true });
cpSync(browser, out, { recursive: true });

// Pages has no Node server, so unknown URLs get the client-rendered app shell,
// which routes to NotFoundPage. Pages serves 404.html with a real 404 status.
cpSync(new URL('index.csr.html', browser), new URL('404.html', out));

// Response headers (https://developers.cloudflare.com/pages/configuration/headers/).
// `! Link`: Pages turns <link rel="modulepreload" href="chunk-….js"> into Link
// headers; browsers resolve those against the page URL (ignoring <base href>),
// so /projects/x/ would preload /projects/x/chunk-….js → 404. Angular already
// preloads the right URLs from the HTML.
// JS/CSS file names are content-hashed (outputHashing: all) → cache for a year.
writeFileSync(
  new URL('_headers', out),
  `/*
  ! Link
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
`,
);

// The contact page moved to a section on the home page.
writeFileSync(new URL('_redirects', out), '/contact /#contact 301\n/contact/ /#contact 301\n');

console.log('Ready to deploy: dist/cloudflare/');
