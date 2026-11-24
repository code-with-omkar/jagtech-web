import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="toggle"
      (click)="theme.toggle()"
      [attr.aria-label]="label()"
      [attr.title]="label()"
    >
      @if (isDark()) {
        <!-- sun -->
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      } @else {
        <!-- moon -->
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
      }
    </button>
  `,
  styles: `
    .toggle {
      display: grid; place-items: center; width: 2.5rem; height: 2.5rem;
      background: transparent; border: 1px solid hsl(var(--border)); border-radius: var(--radius-button);
      cursor: pointer; color: hsl(var(--foreground));
      transition: border-color var(--dur-fast) ease, color var(--dur-fast) ease;
      &:hover { border-color: hsl(var(--primary)); color: hsl(var(--primary)); }
    }
    svg { width: 1.1rem; height: 1.1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  protected readonly isDark = computed(() => this.theme.theme() === 'dark');
  protected readonly label = computed(() => (this.isDark() ? 'Switch to light theme' : 'Switch to dark theme'));
}
