import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="page-hero container">
      <span class="eyebrow">404</span>
      <h1 class="h1">Page not found</h1>
      <p class="lead">The page you're looking for doesn't exist.</p>
      <a routerLink="/" class="btn btn--primary">Back home</a>
    </section>
  `,
  styles: `.lead { margin: var(--space-base) 0 var(--space-lg); } section { min-height: 60vh; }`,
})
export class NotFoundPage {
  constructor() {
    inject(SeoService).update({ title: 'Not found — JagTech', description: 'Page not found.', path: '/404' });
  }
}
