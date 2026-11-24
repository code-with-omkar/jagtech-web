export interface NavLink {
  readonly label: string;
  readonly path: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Work', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];
