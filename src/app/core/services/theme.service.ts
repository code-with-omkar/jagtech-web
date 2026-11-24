import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'jagtech-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** The inline script in index.html sets data-theme before paint; start from it. */
  readonly theme = signal<Theme>(this.readInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      this.document.documentElement.setAttribute('data-theme', theme);
      this.document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', theme === 'dark' ? '#121212' : '#fafafa');
    });
  }

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.theme.set(theme);
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage disabled — theme still applies for this visit */
    }
  }

  private readInitialTheme(): Theme {
    const attr = this.document.documentElement.getAttribute('data-theme');
    return attr === 'light' ? 'light' : 'dark';
  }
}
