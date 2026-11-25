export interface NavLink {
  readonly label: string;
  readonly path: string;
  /** In-page anchor on `path`, e.g. the home-page contact section. */
  readonly fragment?: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Work', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/', fragment: 'contact' },
];

/** routerLinkActive options: a fragment link is active only on its exact URL + fragment. */
export function activeOptions(link: NavLink) {
  return link.fragment
    ? { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'exact' } as const
    : { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } as const;
}
