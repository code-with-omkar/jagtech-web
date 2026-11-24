import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../../core/seo/seo.service';
import { PROFILE_DATA } from '../../core/services/profile.token';
import { ContactFormComponent } from './contact-form';

@Component({
  selector: 'app-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactFormComponent],
  template: `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">Contact</span>
        <h1 class="h1 title">Get in touch</h1>
        <p class="lead">Have a project in mind? Want to collaborate? Or just want to talk tech? I'm open to it.</p>
      </div>
    </section>

    <section class="section body">
      <div class="container layout">
        <div class="card form-card">
          <span class="eyebrow">Send a message</span>
          <app-contact-form />
        </div>

        <aside class="card availability" aria-label="Availability">
          <p class="avail-head mono"><span class="pulse-dot" aria-hidden="true"></span> Currently available</p>
          <dl>
            <div><dt>Open to</dt><dd>{{ profile.openTo }}</dd></div>
            <div><dt>Response time</dt><dd>{{ profile.responseTime }}</dd></div>
            <div><dt>Based in</dt><dd>{{ profile.location }}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  `,
  styles: `
    .title { margin-bottom: var(--space-base); }
    .body { padding-top: 0; }
    .layout { display: grid; gap: var(--space-base); align-items: start; }
    @media (min-width: 1024px) { .layout { grid-template-columns: 2fr 1fr; } }
    .form-card { padding: var(--space-lg); }
    .avail-head { display: flex; align-items: center; gap: 0.6rem; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: hsl(var(--success)); margin-bottom: var(--space-base); }
    dl { display: grid; gap: var(--space-base); margin: 0; }
    dt { font-family: var(--font-heading); font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: hsl(var(--muted-foreground)); }
    dd { margin: 0.25rem 0 0; font-weight: 500; }
  `,
})
export class ContactPage {
  protected readonly profile = inject(PROFILE_DATA);

  constructor() {
    inject(SeoService).update({
      title: 'Contact — Omkar Jagtap | JagTech',
      description: 'Get in touch with Omkar Jagtap for freelance projects, collaborations or job opportunities.',
      path: '/contact',
    });
  }
}
