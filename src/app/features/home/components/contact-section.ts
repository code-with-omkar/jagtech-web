import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { Profile } from '../../../core/models/portfolio.models';
import { environment } from '../../../../environments/environment';

type ContactIcon = 'mail' | 'phone' | 'linkedin' | 'github' | 'pin';

interface ContactMethod {
  readonly label: string;
  readonly value: string;
  readonly icon: ContactIcon;
  /** Omitted for non-link rows (location). */
  readonly href?: string;
  readonly external?: boolean;
}

/** Normalises a display number like "+91 98765 43210" to "+919876543210" for tel: links. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** Builds the visible contact rows; empty values (e.g. no phone) are left out. */
export function buildContactMethods(
  social: { readonly email: string; readonly phone: string; readonly linkedin: string; readonly github: string },
  location: string,
): ContactMethod[] {
  const rows: (ContactMethod | null)[] = [
    social.email ? { label: 'Email', value: social.email, icon: 'mail', href: `mailto:${social.email}` } : null,
    social.phone ? { label: 'Phone', value: social.phone, icon: 'phone', href: telHref(social.phone) } : null,
    social.linkedin
      ? { label: 'LinkedIn', value: 'omkar-jagtap', icon: 'linkedin', href: social.linkedin, external: true }
      : null,
    social.github
      ? { label: 'GitHub', value: social.github.replace(/^https?:\/\/(www\.)?/, ''), icon: 'github', href: social.github, external: true }
      : null,
    location ? { label: 'Based in', value: location, icon: 'pin' } : null,
  ];
  return rows.filter((r): r is ContactMethod => r !== null);
}

/** Home-page contact block (anchor: /#contact). Replaces the former /contact page and form. */
@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
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
        @for (m of methods(); track m.label) {
          <li>
            @if (m.href) {
              <a
                class="method card card--interactive"
                [href]="m.href"
                [attr.target]="m.external ? '_blank' : null"
                [attr.rel]="m.external ? 'noopener noreferrer' : null"
              >
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
          @case ('linkedin') {
            <svg viewBox="0 0 24 24" class="filled"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>
          }
          @case ('github') {
            <svg viewBox="0 0 24 24" class="filled"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
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
        <span class="arrow" aria-hidden="true">{{ m.external ? '↗' : '→' }}</span>
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

    .method { display: flex; align-items: center; gap: var(--space-sm); height: 100%; padding: 1rem 1.25rem; color: inherit; }
    a.method:hover .arrow { color: hsl(var(--primary)); transform: translate(2px, -2px); }
    .icon {
      display: grid; place-items: center; flex: none; width: 2.5rem; height: 2.5rem;
      border-radius: calc(var(--radius) - 2px); background: hsl(var(--primary) / 0.1); color: hsl(var(--primary));
    }
    svg { width: 1.2rem; height: 1.2rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    svg.filled { fill: currentColor; stroke: none; }
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
