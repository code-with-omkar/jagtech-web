import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Profile } from '../../../core/models/portfolio.models';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { environment } from '../../../../environments/environment';

type ContactIcon = 'mail' | 'phone' | 'pin';

interface ContactMethod {
  readonly label: string;
  readonly value: string;
  readonly icon: ContactIcon;
  /** Omitted for non-link rows (location). */
  readonly href?: string;
}

/** Normalises a display number like "+91 98765 43210" to "+919876543210" for tel: links. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** Builds the visible contact rows; empty values (e.g. no phone) are left out. */
export function buildContactMethods(
  social: { readonly email: string; readonly phone: string },
  location: string,
): ContactMethod[] {
  const rows: (ContactMethod | null)[] = [
    social.email ? { label: 'Email', value: social.email, icon: 'mail', href: `mailto:${social.email}` } : null,
    social.phone ? { label: 'Phone', value: social.phone, icon: 'phone', href: telHref(social.phone) } : null,
    location ? { label: 'Based in', value: location, icon: 'pin' } : null,
  ];
  return rows.filter((r): r is ContactMethod => r !== null);
}

/** Home-page contact block (anchor: /#contact). Replaces the former /contact page and form. */
@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RevealDirective],
  template: `
    @let p = profile();
    <div class="layout">
      <div class="intro">
        <p class="lead">Have a project in mind, a role to discuss, or just want to talk tech? Reach me directly.</p>
        <p class="avail mono"><span class="pulse-dot" aria-hidden="true"></span> Currently available</p>
        <dl class="facts">
          <div><dt>Open to</dt><dd>{{ p.openTo }}</dd></div>
          <div><dt>Response time</dt><dd>{{ p.responseTime }}</dd></div>
        </dl>
      </div>

      <ul class="methods" aria-label="Contact details">
        @for (m of methods(); track m.label; let i = $index) {
          <li class="item" [appReveal]="150 + i * 140">
            @if (m.href) {
              <a class="method card card--interactive" [href]="m.href">
                <ng-container *ngTemplateOutlet="row; context: { $implicit: m }" />
              </a>
            } @else {
              <div class="method card">
                <ng-container *ngTemplateOutlet="row; context: { $implicit: m }" />
              </div>
            }
          </li>
        }
      </ul>
    </div>

    <ng-template #row let-m>
      <span class="icon" aria-hidden="true">
        @switch (m.icon) {
          @case ('mail') {
            <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
          }
          @case ('phone') {
            <svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
          }
          @case ('pin') {
            <svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
          }
        }
      </span>
      <span class="text">
        <span class="label">{{ m.label }}</span>
        <span class="value">{{ m.value }}</span>
      </span>
      @if (m.href) {
        <span class="arrow" aria-hidden="true">→</span>
      }
    </ng-template>
  `,
  styles: `
    :host { display: block; }
    .layout { display: grid; gap: var(--space-xl); }
    @media (min-width: 1024px) { .layout { grid-template-columns: 1fr 1fr; align-items: start; } }

    .lead { font-size: 1.125rem; color: hsl(var(--muted-foreground)); max-width: 32rem; }
    .avail {
      display: flex; align-items: center; gap: 0.6rem; margin-top: var(--space-lg);
      font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: hsl(var(--success));
    }
    .facts { display: grid; gap: var(--space-base); margin: var(--space-base) 0 0; }
    dt { font-family: var(--font-heading); font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: hsl(var(--muted-foreground)); }
    dd { margin: 0.25rem 0 0; font-weight: 500; }

    .methods { display: grid; gap: var(--space-sm); list-style: none; padding: 0; margin: 0; }

    .method {
      display: flex; align-items: center; gap: var(--space-sm); height: 100%; padding: 1rem 1.25rem;
      color: inherit; overflow: hidden; isolation: isolate;
    }
    /* Light sweep across the card on hover. */
    .method::before {
      content: ''; position: absolute; inset: 0; z-index: -1;
      background: linear-gradient(110deg, transparent 30%, hsl(var(--primary) / 0.12) 50%, transparent 70%);
      transform: translateX(-100%);
    }
    a.method:hover::before { transform: translateX(100%); transition: transform 700ms var(--ease); }
    a.method:hover { transform: translateY(-3px); border-color: hsl(var(--primary) / 0.5); }
    a.method:hover .arrow { color: hsl(var(--primary)); transform: translateX(4px); }
    a.method:hover .icon { transform: scale(1.08) rotate(-6deg); background: hsl(var(--primary)); color: hsl(var(--primary-foreground)); }

    .icon {
      position: relative; display: grid; place-items: center; flex: none; width: 2.5rem; height: 2.5rem;
      border-radius: calc(var(--radius) - 2px); background: hsl(var(--primary) / 0.1); color: hsl(var(--primary));
      transition: transform var(--dur-base) var(--ease), background-color var(--dur-base) ease, color var(--dur-base) ease;
    }
    /* Soft ring that pulses outward from each icon. */
    .icon::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      border: 2px solid hsl(var(--primary) / 0.45);
      animation: ring 2.8s var(--ease) infinite;
    }
    .item:nth-child(2) .icon::after { animation-delay: 0.9s; }
    .item:nth-child(3) .icon::after { animation-delay: 1.8s; }
    @keyframes ring {
      0% { transform: scale(1); opacity: 0.9; }
      70%, 100% { transform: scale(1.6); opacity: 0; }
    }

    /* Cards slide in from the right, one after another (RevealDirective adds the classes). */
    .item.reveal-init { transform: translateX(28px); }
    .item.reveal-init.is-visible { transform: none; }

    @media (prefers-reduced-motion: reduce) {
      .icon::after { animation: none; opacity: 0; }
      .method::before { display: none; }
      a.method:hover, a.method:hover .icon { transform: none; }
    }
    svg { width: 1.2rem; height: 1.2rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .text { display: grid; min-width: 0; }
    .label { font-family: var(--font-heading); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: hsl(var(--muted-foreground)); }
    .value { font-weight: 500; overflow-wrap: break-word; }
    .arrow { margin-left: auto; color: hsl(var(--muted-foreground)); transition: transform var(--dur-fast) ease, color var(--dur-fast) ease; }
  `,
})
export class ContactSection {
  readonly profile = input.required<Profile>();
  protected readonly methods = computed(() => buildContactMethods(environment.social, this.profile().location));
}
