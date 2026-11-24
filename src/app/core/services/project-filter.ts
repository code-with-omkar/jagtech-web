import { Project, ProjectCategory } from '../models/portfolio.models';

export type ProjectFilter = 'All' | ProjectCategory;

export const PROJECT_FILTERS: readonly ProjectFilter[] = ['All', 'Web App', 'Mobile App', 'API / Backend'];

export function filterProjects(projects: readonly Project[], filter: ProjectFilter): readonly Project[] {
  return filter === 'All' ? projects : projects.filter((p) => p.category === filter);
}

export function projectCountLabel(count: number): string {
  return `${count} ${count === 1 ? 'project' : 'projects'}`;
}
