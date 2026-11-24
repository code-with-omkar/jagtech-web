export type ProjectCategory = 'Web App' | 'Mobile App' | 'API / Backend';
export type ProjectStatus = 'Live' | 'In Progress';
export type SkillLevel = 'Expert' | 'Proficient';

export interface CaseStudySection {
  readonly heading: string;
  readonly body: readonly string[];
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly category: ProjectCategory;
  readonly status: ProjectStatus;
  readonly summary: string;
  readonly features: readonly string[];
  readonly tech: readonly string[];
  readonly featured: boolean;
  /** Short label shown inside the preview placeholder on home cards. */
  readonly previewLabel: string;
  readonly liveUrl?: string;
  readonly repoUrl?: string;
  readonly caseStudy: readonly CaseStudySection[];
}

export interface Skill {
  readonly name: string;
  readonly level: SkillLevel;
}

export interface SkillGroup {
  readonly title: string;
  readonly skills: readonly Skill[];
}

export interface ExperienceItem {
  readonly period: string;
  readonly role: string;
  readonly organisation: string;
  readonly description: string;
}

export interface Principle {
  readonly title: string;
  readonly description: string;
}

export interface BrandNamePart {
  readonly word: string;
  readonly meaning: string;
}

export interface Profile {
  readonly name: string;
  readonly brand: string;
  readonly roles: readonly string[];
  readonly tagline: string;
  readonly aboutLead: string;
  readonly aboutTeaser: readonly string[];
  readonly story: readonly string[];
  readonly currentlyBuilding: string;
  readonly openTo: string;
  readonly responseTime: string;
  readonly location: string;
  readonly homeStack: readonly string[];
  readonly brandName: readonly BrandNamePart[];
  readonly experience: readonly ExperienceItem[];
  readonly skillGroups: readonly SkillGroup[];
  readonly principles: readonly Principle[];
  readonly resumeUrl: string;
}

export const CONTACT_SUBJECTS = [
  'Freelance project',
  'Collaboration',
  'Job opportunity',
  'Just saying hello',
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly subject: ContactSubject;
  readonly message: string;
}
