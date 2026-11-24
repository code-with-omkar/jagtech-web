import { ChangeDetectionStrategy, Component, RESPONSE_INIT, effect, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { ProjectRepository } from '../../core/repositories/project.repository';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-project-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './project-detail.page.html',
  styleUrl: './project-detail.page.scss',
})
export class ProjectDetailPage {
  /** Bound from the :slug route param (withComponentInputBinding). */
  readonly slug = input.required<string>();

  private readonly repo = inject(ProjectRepository);
  private readonly seo = inject(SeoService);
  /** Present only during server rendering. */
  private readonly responseInit = inject(RESPONSE_INIT, { optional: true });

  protected readonly project = rxResource({
    params: () => this.slug(),
    stream: ({ params }) => this.repo.getBySlug(params),
  });

  constructor() {
    effect(() => {
      const p = this.project.value();
      if (p) {
        this.seo.update({
          title: `${p.title} — JagTech`,
          description: p.summary,
          path: `/projects/${p.slug}`,
          type: 'article',
        });
      } else if (!this.project.isLoading()) {
        if (this.responseInit) this.responseInit.status = 404;
        this.seo.update({ title: 'Project not found — JagTech', description: 'This project does not exist.', path: '/projects' });
      }
    });
  }
}
