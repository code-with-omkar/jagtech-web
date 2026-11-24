import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { InMemoryProjectRepository, ProjectRepository } from '../../core/repositories/project.repository';
import { PROJECTS } from '../../core/data/projects.data';
import { projectCountLabel } from '../../core/services/project-filter';
import { ProjectsPage } from './projects.page';

describe('ProjectsPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectsPage],
      providers: [provideRouter([]), { provide: ProjectRepository, useClass: InMemoryProjectRepository }],
    });
  });

  it('updates the list and count when a filter is clicked', async () => {
    const fixture = TestBed.createComponent(ProjectsPage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const count = () => el.querySelector('[data-testid="project-count"]')?.textContent?.trim();

    // Expected counts come from the live data, so adding a project never breaks this test.
    expect(count()).toBe(projectCountLabel(PROJECTS.length));
    expect(el.querySelectorAll('app-project-card')).toHaveLength(PROJECTS.length);

    const mobile = [...el.querySelectorAll<HTMLButtonElement>('.filter')].find((b) => b.textContent?.trim() === 'Mobile App');
    mobile!.click();
    await fixture.whenStable();

    const mobileCount = PROJECTS.filter((p) => p.category === 'Mobile App').length;
    expect(count()).toBe(projectCountLabel(mobileCount));
    expect(el.querySelectorAll('app-project-card')).toHaveLength(mobileCount);
    expect(mobile!.getAttribute('aria-pressed')).toBe('true');
  });

  it('sets the page title', async () => {
    const fixture = TestBed.createComponent(ProjectsPage);
    await fixture.whenStable();
    expect(document.title).toBe('Projects — JagTech');
  });
});
