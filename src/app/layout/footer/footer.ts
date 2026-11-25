import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { environment } from '../../../environments/environment';
import { NAV_LINKS } from '../nav-links';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container inner">
        <nav class="links" aria-label="Footer">
          @for (link of links; track link.path) {
            <a [routerLink]="link.path" [fragment]="link.fragment">{{ link.label }}</a>
          }
        </nav>

        <div class="social">
          <a [href]="social.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
          </a>
          <a [href]="social.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>
          </a>
        </div>
      </div>
      <div class="container legal">
        <p>© {{ year }} JagTech. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: `
    .footer { border-top: 1px solid hsl(var(--border)); padding-block: var(--space-xl) var(--space-lg); }
    .inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-base); }
    .links { display: flex; gap: var(--space-lg); }
    .links a { font-family: var(--font-heading); font-size: 0.875rem; color: hsl(var(--muted-foreground)); transition: color var(--dur-fast) ease; }
    .links a:hover { color: hsl(var(--foreground)); }
    .social { display: flex; gap: var(--space-sm); }
    .social a { color: hsl(var(--muted-foreground)); transition: color var(--dur-fast) ease; }
    .social a:hover { color: hsl(var(--primary)); }
    .social svg { width: 1.2rem; height: 1.2rem; fill: currentColor; }
    .legal { margin-top: var(--space-lg); font-size: 0.8125rem; color: hsl(var(--muted-foreground)); }
  `,
})
export class Footer {
  protected readonly links = NAV_LINKS;
  protected readonly social = environment.social;
  protected readonly year = new Date().getFullYear();
}
