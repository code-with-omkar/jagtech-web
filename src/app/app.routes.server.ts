import { RenderMode, ServerRoute } from '@angular/ssr';

import { PROJECTS } from './core/data/projects.data';

/**
 * Known pages are prerendered to static HTML at build time (fast, SEO-friendly).
 * Anything else is rendered on demand by the Node server as a 404 page.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'projects', renderMode: RenderMode.Prerender },
  {
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PROJECTS.map((p) => ({ slug: p.slug })),
  },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
