import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { ProjectRepository } from '../../core/repositories/project.repository';
import { SeoService } from '../../core/seo/seo.service';
import {
  PROJECT_FILTERS,
  ProjectFilter,
  filterProjects,
  projectCountLabel,
} from '../../core/services/project-filter';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ProjectCard } from '../../shared/ui/project-card';

@Component({
  selector: 'app-projects-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ProjectCard, RevealDirective],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Work</span>
        <h1 class="h1 title">Projects</h1>
        <p class="lead">
          A selection of things I've built — web applications, mobile apps, and everything in between.
          Angular on the front, .NET on the back, SQL at the core.
        </p>
      </div>
    </section>

    <section class="section list" aria-label="Project list">
      <div class="container">
        <div class="toolbar">
          <div class="filters" role="group" aria-label="Filter projects by category">
            @for (f of filters; track f) {
              <button
                type="button"
                class="filter"
                [class.is-active]="filter() === f"
                [attr.aria-pressed]="filter() === f"
                (click)="filter.set(f)"
              >{{ f }}</button>
            }
          </div>
          <p class="count mono" aria-live="polite" data-testid="project-count">{{ countLabel() }}</p>
        </div>

        <div class="grid grid-2">
          @for (project of visible(); track project.slug; let i = $index) {
            <app-project-card [project]="project" variant="detailed" [appReveal]="(i % 2) * 100" />
          } @empty {
            <p class="muted">No projects in this category yet.</p>
          }
        </div>
      </div>
    </section>

    <section class="section section--bordered cta-band">
      <div class="container">
        <h2>Have a project in mind?</h2>
        <p>I'm open to freelance work and collaborations.</p>
        <div class="actions">
          <a routerLink="/contact" class="btn btn--primary">Get in touch →</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .title { margin-bottom: var(--space-base); }
    .list { padding-top: 0; }
    .toolbar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-sm); margin-bottom: var(--space-lg); }
    .filters { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .filter {
      padding: 0.5rem 1rem; cursor: pointer;
      background: transparent; border: 1px solid hsl(var(--border)); border-radius: 999px;
      font-family: var(--font-heading); font-size: 0.8125rem; color: hsl(var(--muted-foreground));
      transition: all var(--dur-fast) ease;
      &:hover { color: hsl(var(--foreground)); border-color: hsl(var(--foreground) / 0.4); }
      &.is-active { background: hsl(var(--primary)); border-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }
    }
    .count { font-size: 0.8125rem; color: hsl(var(--muted-foreground)); }
  `,
})
export class ProjectsPage {
  private readonly projects = toSignal(inject(ProjectRepository).getAll(), { initialValue: [] });

  protected readonly filters = PROJECT_FILTERS;
  readonly filter = signal<ProjectFilter>('All');
  readonly visible = computed(() => filterProjects(this.projects(), this.filter()));
  readonly countLabel = computed(() => projectCountLabel(this.visible().length));

  constructor() {
    inject(SeoService).update({
      title: 'Projects — JagTech',
      description:
        'Web applications, mobile apps and APIs built by Omkar Jagtap with Angular, ASP.NET Core and SQL Server.',
      path: '/projects',
    });
  }
}
