import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Project } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @let p = project();
    <article class="card card--interactive project" [class.project--detailed]="variant() === 'detailed'">
      <div class="top">
        <span class="chip chip--primary">{{ p.category }}</span>
        <span class="status" [class]="statusClass()">{{ p.status }}</span>
      </div>

      <img
        class="preview"
        [src]="p.image"
        [alt]="p.imageAlt"
        width="640"
        height="360"
        loading="lazy"
        decoding="async"
      />

      <h3 class="h3 title">
        <a [routerLink]="['/projects', p.slug]" class="stretched">{{ p.title }}</a>
      </h3>
      <p class="summary">{{ p.summary }}</p>

      @if (variant() === 'detailed') {
        <ul class="features">
          @for (f of p.features; track f) {
            <li>{{ f }}</li>
          }
        </ul>
      }

      <ul class="chip-list" aria-label="Tech stack">
        @for (t of p.tech; track t) {
          <li class="chip">{{ t }}</li>
        }
      </ul>

      <div class="foot">
        @if (variant() === 'detailed') {
          <span class="muted mono small">{{ p.liveUrl ? 'Live' : 'Live link coming' }}</span>
        }
        <a
          class="link-arrow cta"
          [routerLink]="['/projects', p.slug]"
          [attr.aria-label]="'Case study: ' + p.title"
          data-testid="case-study-link"
        >Case study →</a>
      </div>
    </article>
  `,
  styles: `
    :host { display: block; height: 100%; }
    .project { display: flex; flex-direction: column; gap: var(--space-sm); height: 100%; }
    .top { display: flex; align-items: center; justify-content: space-between; }
    .preview {
      display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover;
      background: hsl(var(--muted));
      border: 1px solid hsl(var(--border)); border-radius: calc(var(--radius) - 2px);
    }
    .title { margin-top: var(--space-xs); }
    .stretched::after { content: ''; position: absolute; inset: 0; border-radius: inherit; }
    .stretched:focus-visible { outline: none; }
    .project:has(.stretched:focus-visible) { outline: 2px solid hsl(var(--ring)); outline-offset: 2px; }
    .summary { color: hsl(var(--muted-foreground)); font-size: 0.9375rem; }
    .features { display: grid; gap: 0.4rem; font-size: 0.875rem; }
    .features li { display: flex; gap: 0.5rem; align-items: baseline; }
    .features li::before { content: '▹'; color: hsl(var(--primary)); font-family: var(--font-heading); }
    .chip-list { margin-top: auto; padding-top: var(--space-xs); }
    .foot { display: flex; justify-content: space-between; align-items: center; gap: var(--space-sm); padding-top: var(--space-sm); border-top: 1px solid hsl(var(--border)); }
    /* A real link above the card-wide overlay, so the visible call to action always navigates. */
    .cta { position: relative; z-index: 1; margin-left: auto; padding-block: 0.25rem; cursor: pointer; }
    .small { font-size: 0.75rem; }
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly variant = input<'preview' | 'detailed'>('preview');

  protected readonly statusClass = computed(() =>
    this.project().status === 'Live' ? 'status status--live' : 'status status--progress',
  );
}
