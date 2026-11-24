import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { THEME_STORAGE_KEY, ThemeService } from './theme.service';

describe('ThemeService', () => {
  let doc: Document;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    doc = TestBed.inject(DOCUMENT);
    doc.documentElement.setAttribute('data-theme', 'dark');
  });

  it('starts from the data-theme attribute set by the inline script', () => {
    doc.documentElement.setAttribute('data-theme', 'light');
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('light');
  });

  it('toggles, applies the attribute and persists the choice', () => {
    const service = TestBed.inject(ThemeService);
    service.toggle();
    TestBed.tick();

    expect(service.theme()).toBe('light');
    expect(doc.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });
});
