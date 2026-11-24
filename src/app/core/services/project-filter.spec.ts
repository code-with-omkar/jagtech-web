import { PROJECTS } from '../data/projects.data';
import { filterProjects, projectCountLabel } from './project-filter';

describe('project filter', () => {
  it('returns every project for "All"', () => {
    expect(filterProjects(PROJECTS, 'All')).toHaveLength(PROJECTS.length);
  });

  it.each([
    ['Web App', 2],
    ['Mobile App', 1],
    ['API / Backend', 1],
  ] as const)('filters by %s', (category, expected) => {
    const result = filterProjects(PROJECTS, category);
    expect(result).toHaveLength(expected);
    expect(result.every((p) => p.category === category)).toBe(true);
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
