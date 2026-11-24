import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo/seo.service';
import { PROFILE_DATA } from '../../core/services/profile.token';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RevealDirective],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
})
export class AboutPage {
  protected readonly profile = inject(PROFILE_DATA);

  constructor() {
    inject(SeoService).update({
      title: 'About — Omkar Jagtap | JagTech',
      description:
        "Omkar Jagtap's story, experience, tech stack and principles — building software with Angular, .NET and SQL Server.",
      path: '/about',
      type: 'profile',
    });
  }

  protected index(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}
