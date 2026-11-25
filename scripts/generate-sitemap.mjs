// Generates public/sitemap.xml from the route list + project slugs.
// Runs automatically before `npm run build` (see "prebuild" in package.json).
import { readFileSync, writeFileSync } from 'node:fs';

const SITE_URL = 'https://www.jagtech.in';
const staticPaths = ['/', '/projects', '/about'];

const projectsSource = readFileSync(new URL('../src/app/core/data/projects.data.ts', import.meta.url), 'utf8');
const slugs = [...projectsSource.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

const today = new Date().toISOString().slice(0, 10);
const urls = [...staticPaths, ...slugs.map((s) => `/projects/${s}`)]
  .map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
console.log(`sitemap.xml: ${staticPaths.length + slugs.length} URLs`);
