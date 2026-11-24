import { PROJECTS } from '../data/projects.data';
import { PROJECT_FILTERS, filterProjects, projectCountLabel } from './project-filter';

describe('project filter', () => {
  it('returns every project for "All"', () => {
    expect(filterProjects(PROJECTS, 'All')).toHaveLength(PROJECTS.length);
  });

  // Fixture data, so the filter logic is tested independently of the live
  // portfolio content (which changes whenever a project is added).
  const fixture = (['Web App', 'Web App', 'Mobile App', 'API / Backend'] as const).map((category, i) => ({
    ...PROJECTS[0]!,
    slug: `fixture-${i}`,
    category,
  }));

  it.each([
    ['Web App', 2],
    ['Mobile App', 1],
    ['API / Backend', 1],
  ] as const)('filters by %s', (category, expected) => {
    const result = filterProjects(fixture, category);
    expect(result).toHaveLength(expected);
    expect(result.every((p) => p.category === category)).toBe(true);
  });

  it('only returns live projects of the requested category', () => {
    for (const filter of PROJECT_FILTERS.filter((f) => f !== 'All')) {
      const result = filterProjects(PROJECTS, filter);
      expect(result).toEqual(PROJECTS.filter((p) => p.category === filter));
    }
  });

  it('pluralises the count label', () => {
    expect(projectCountLabel(0)).toBe('0 projects');
    expect(projectCountLabel(1)).toBe('1 project');
    expect(projectCountLabel(4)).toBe('4 projects');
  });

  it('has unique slugs (they are route params)', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
