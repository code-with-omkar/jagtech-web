import { TestBed } from '@angular/core/testing';

import { PROFILE } from '../../../core/data/profile.data';
import { ContactSection, buildContactMethods, telHref } from './contact-section';

describe('contact-section helpers', () => {
  const social = {
    email: 'me@example.com',
    phone: '',
    linkedin: 'https://www.linkedin.com/in/someone/',
    github: 'https://github.com/someone',
  };

  it('builds email, LinkedIn, GitHub and location rows, skipping an empty phone', () => {
    const rows = buildContactMethods(social, 'Navi Mumbai, India');
    expect(rows.map((r) => r.label)).toEqual(['Email', 'LinkedIn', 'GitHub', 'Based in']);
    expect(rows[0].href).toBe('mailto:me@example.com');
    expect(rows[2].value).toBe('github.com/someone');
    expect(rows[3].href).toBeUndefined();
  });

  it('adds a tel: row when a phone number is set', () => {
    const rows = buildContactMethods({ ...social, phone: '+91 98765 43210' }, '');
    const phone = rows.find((r) => r.label === 'Phone');
    expect(phone?.href).toBe('tel:+919876543210');
    expect(telHref('(022) 1234-5678')).toBe('tel:02212345678');
  });
});

describe('ContactSection', () => {
  it('renders the contact links with safe external link attributes', async () => {
    const fixture = TestBed.createComponent(ContactSection);
    fixture.componentRef.setInput('profile', PROFILE);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const mail = el.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');
    expect(mail).not.toBeNull();
    expect(mail?.getAttribute('target')).toBeNull();

    const external = [...el.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]')];
    expect(external.length).toBeGreaterThanOrEqual(2);
    for (const a of external) expect(a.rel).toBe('noopener noreferrer');

    expect(el.textContent).toContain(PROFILE.location);
  });
});
