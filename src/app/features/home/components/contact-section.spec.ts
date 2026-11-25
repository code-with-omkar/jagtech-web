import { TestBed } from '@angular/core/testing';

import { PROFILE } from '../../../core/data/profile.data';
import { ContactSection, buildContactMethods, telHref } from './contact-section';

describe('contact-section helpers', () => {
  const social = { email: 'me@example.com', phone: '' };

  it('builds email and location rows, skipping an empty phone', () => {
    const rows = buildContactMethods(social, 'Navi Mumbai, India');
    expect(rows.map((r) => r.label)).toEqual(['Email', 'Based in']);
    expect(rows[0].href).toBe('mailto:me@example.com');
    expect(rows[1].href).toBeUndefined();
  });

  it('adds a tel: row when a phone number is set', () => {
    const rows = buildContactMethods({ ...social, phone: '+91 98765 43210' }, '');
    expect(rows.map((r) => r.label)).toEqual(['Email', 'Phone']);
    expect(rows[1].href).toBe('tel:+919876543210');
    expect(telHref('(022) 1234-5678')).toBe('tel:02212345678');
  });
});

describe('ContactSection', () => {
  it('shows email and location, and no GitHub or LinkedIn links', async () => {
    const fixture = TestBed.createComponent(ContactSection);
    fixture.componentRef.setInput('profile', PROFILE);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('a[href^="mailto:"]')).not.toBeNull();
    expect(el.textContent).toContain(PROFILE.location);
    expect(el.querySelector('a[href*="github.com"], a[href*="linkedin.com"]')).toBeNull();
    expect(el.querySelectorAll('li.item')).toHaveLength(2);
  });
});
