import { ChangeDetectionStrategy, Component } from '@angular/core';

/** JagTech wordmark: bracket mark + "JAG" (bold) + "TECH" (light). */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'logo' },
  template: `
    <svg class="mark" viewBox="0 0 40 28" aria-hidden="true" focusable="false">
      <path d="M11 3 3 14l8 11" />
      <path d="M29 3l8 11-8 11" />
      <path d="M16 20h8" />
    </svg>
    <span class="word"><strong>JAG</strong><span>TECH</span></span>
  `,
  styles: `
    :host { display: inline-flex; align-items: center; gap: 0.6rem; color: hsl(var(--foreground)); }
    .mark { width: 2.1rem; height: auto; fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .word { font-family: var(--font-heading); font-size: 1.35rem; letter-spacing: 0.08em; line-height: 1; }
    strong { font-weight: 800; }
    .word span { font-weight: 300; opacity: 0.85; }
  `,
})
export class Logo {}
