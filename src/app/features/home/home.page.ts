import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { ProjectRepository } from '../../core/repositories/project.repository';
import { SeoService } from '../../core/seo/seo.service';
import { PROFILE_DATA } from '../../core/services/profile.token';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ProjectCard } from '../../shared/ui/project-card';
import { TypedText } from '../../shared/ui/typed-text';
import { Hero } from './components/hero';
import { ContactSection } from './components/contact-section';
import { StackTerminal } from './components/stack-terminal';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Hero, ProjectCard, RevealDirective, StackTerminal, ContactSection, TypedText],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly profile = inject(PROFILE_DATA);
  private readonly projects = toSignal(inject(ProjectRepository).getAll(), { initialValue: [] });

  protected readonly featured = computed(() => this.projects().filter((p) => p.featured).slice(0, 2));

  constructor() {
    inject(SeoService).update({
      title: 'JagTech — Full-Stack Developer',
      description:
        'Omkar Jagtap — full-stack developer building fast, clean, and purposeful web and mobile applications with Angular, .NET and SQL Server.',
      path: '/',
      type: 'profile',
    });
  }
}
