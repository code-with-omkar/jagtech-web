import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Logo } from '../logo/logo';
import { NAV_LINKS } from '../nav-links';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Logo, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'closeMenu(true)',
  },
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  protected readonly links = NAV_LINKS;
  protected readonly githubUrl = environment.social.github;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef)),
      )
      .subscribe(() => this.closeMenu());
  }

  onScroll(): void {
    const y = this.document.defaultView?.scrollY ?? 0;
    this.scrolled.set(y > 10);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (restoreFocus) this.menuButton()?.nativeElement.focus();
  }
}
