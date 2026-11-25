# JagTech — Omkar Jagtap's portfolio

Angular 22 · standalone components · Signals · SSR + prerendering · SCSS design tokens · dark/light theme.

## Run

Requires **Node 22.22.3+ or 24.15+** (Angular 22 minimum).

```bash
npm install
npm start            # dev server → http://localhost:4200
npm test             # unit tests (Vitest)
npm run build        # regenerates sitemap.xml, then production build + prerender
npm run serve:ssr    # serve the production build → http://localhost:4000
```

## Structure

```
src/app/
  core/
    models/         portfolio.models.ts — Project, Profile, ContactMessage, …
    data/           projects.data.ts, profile.data.ts — ALL site copy lives here
    repositories/   ProjectRepository, ContactGateway (abstract) + in-memory/mock and HTTP implementations
    services/       ThemeService, project filter, PROFILE_DATA token
    seo/            SeoService — title, description, Open Graph, Twitter, canonical
  layout/           header (mobile menu, scroll state), footer, logo, theme toggle
  shared/           ProjectCard, RevealDirective (scroll fade-in)
  features/         home, projects, project-detail (/projects/:slug), about, contact, not-found
src/styles/         _tokens.scss (colors, fonts, spacing — dark + light), _mixins.scss
public/             favicon, og-image.png, robots.txt, sitemap.xml
scripts/            generate-sitemap.mjs (runs on prebuild)
```

## Editing content

- Text, experience, skills, principles → `src/app/core/data/profile.data.ts`
- Projects and case studies → `src/app/core/data/projects.data.ts` (add `liveUrl` / `repoUrl` when available; new slugs are prerendered and added to the sitemap automatically)
- Social links and site URL → `src/environments/environment.ts`
- Colors / fonts → `src/styles/_tokens.scss`

## Connecting the .NET API

Set `apiUrl` in `src/environments/environment.ts` (e.g. `https://api.jagtech.in/api`). `provideDataAccess()` then switches to the HTTP implementations automatically:

| Endpoint | Used by | Contract |
| --- | --- | --- |
| `GET  {apiUrl}/projects` | Projects, Home | `Project[]` |
| `GET  {apiUrl}/projects/{slug}` | Project detail | `Project` or 404 |
| `POST {apiUrl}/contact` | Contact form | body `ContactMessage`, returns any 2xx |

With `apiUrl` empty (default) projects come from `projects.data.ts` and the contact form uses a mock that always succeeds — **messages are not delivered until the API is connected.** Server-side, validate and rate-limit the contact endpoint; the client already has a honeypot field.

## Deploying

`npm run build` outputs `dist/jagtech-web/`:
- `browser/` — fully prerendered static site. Any static host works (Azure Static Web Apps, Netlify, Vercel, IIS, Nginx). Configure the host's 404 fallback to `index.csr.html` for unknown routes.
- `server/server.mjs` — optional Node/Express server (SSR for unknown URLs with a real 404 status). Allowed host names are set in `angular.json` → `security.allowedHosts`.

## Still to do

- [ ] Real GitHub / LinkedIn / X URLs in `environment.ts`
- [ ] Replace placeholder employer names ("Software Company", "IT Services", "University") in `profile.data.ts`
- [ ] Final résumé PDF
- [ ] Real project screenshots (preview boxes are placeholders)
- [ ] Contact endpoint in the .NET API
