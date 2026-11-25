import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { Component } from '@angular/core';

import { PROJECTS } from '../../core/data/projects.data';
import { ProjectCard } from './project-card';

@Component({ template: '' })
class Blank {}

describe('ProjectCard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'projects/:slug', component: Blank }])],
    });
  });

  for (const variant of ['preview', 'detailed'] as const) {
    it(`renders "Case study" as a real link to the detail page (${variant})`, async () => {
      const project = PROJECTS[0];
      const fixture = TestBed.createComponent(ProjectCard);
      fixture.componentRef.setInput('project', project);
      fixture.componentRef.setInput('variant', variant);
      await fixture.whenStable();

      const link = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>(
        '[data-testid="case-study-link"]',
      );
      expect(link?.tagName).toBe('A');
      expect(link?.getAttribute('href')).toBe(`/projects/${project.slug}`);
      expect(link?.getAttribute('aria-label')).toBe(`Case study: ${project.title}`);

      link!.click();
      await fixture.whenStable();
      expect(TestBed.inject(Router).url).toBe(`/projects/${project.slug}`);
    });
  }
});
