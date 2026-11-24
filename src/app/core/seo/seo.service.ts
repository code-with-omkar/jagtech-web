import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

export interface SeoData {
  readonly title: string;
  readonly description: string;
  /** Path relative to site root, e.g. '/about'. */
  readonly path: string;
  readonly type?: 'website' | 'article' | 'profile';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(data: SeoData): void {
    const url = new URL(data.path, environment.siteUrl).toString();
    const image = new URL('/og-image.png', environment.siteUrl).toString();

    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });

    this.meta.updateTag({ property: 'og:type', content: data.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'JagTech' });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
