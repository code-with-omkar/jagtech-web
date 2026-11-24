import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Fades an element up when it scrolls into view.
 * Runs only in the browser: SSR / no-JS output stays fully visible.
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  /** Stagger delay in ms. */
  readonly appReveal = input<number | ''>('');

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) return; // already on screen: don't hide it

      const delay = this.appReveal();
      if (typeof delay === 'number' && delay > 0) el.style.transitionDelay = `${delay}ms`;
      el.classList.add('reveal-init');

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible');
              observer.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
      );
      observer.observe(el);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
