import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { InMemoryProjectRepository, ProjectRepository } from '../../core/repositories/project.repository';
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

    expect(count()).toBe('4 projects');
    expect(el.querySelectorAll('app-project-card')).toHaveLength(4);

    const mobile = [...el.querySelectorAll<HTMLButtonElement>('.filter')].find((b) => b.textContent?.trim() === 'Mobile App');
    mobile!.click();
    await fixture.whenStable();

    expect(count()).toBe('1 project');
    expect(el.querySelectorAll('app-project-card')).toHaveLength(1);
    expect(mobile!.getAttribute('aria-pressed')).toBe('true');
  });

  it('sets the page title', async () => {
    const fixture = TestBed.createComponent(ProjectsPage);
    await fixture.whenStable();
    expect(document.title).toBe('Projects — JagTech');
  });
});
