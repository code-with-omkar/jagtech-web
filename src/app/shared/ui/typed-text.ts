import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Types `text` out character by character once it scrolls into view, then leaves a
 * blinking cursor.
 *
 * SSR, no-JS and reduced-motion users get the full text immediately. Screen readers
 * always read the full text (the animated copy is aria-hidden). An invisible copy of
 * the full text reserves the final width and height, so nothing reflows while typing.
 */
@Component({
  selector: 'app-typed-text',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="sr-only">{{ text() }}</span>
    <span class="stack" aria-hidden="true">
      <span class="ghost">{{ text() }}</span>
      <span class="live">{{ shown() }}@if (cursor()) {<span class="cursor" [class.cursor--typing]="typing()"></span>}</span>
    </span>
  `,
  styles: `
    :host { display: inline-block; }
    .stack { display: inline-grid; }
    .ghost, .live { grid-area: 1 / 1; }
    .ghost { visibility: hidden; }
    .cursor {
      display: inline-block;
      width: 0.55em;
      height: 1.1em;
      margin-left: 0.15em;
      vertical-align: -0.2em;
      background: hsl(var(--primary));
      animation: blink 1s steps(1) infinite;
    }
    /* Solid while characters are appearing, like a real terminal. */
    .cursor--typing { animation: none; }
    @media (prefers-reduced-motion: reduce) { .cursor { animation: none; } }
  `,
})
export class TypedText {
  readonly text = input.required<string>();
  /** Delay after the element becomes visible, in ms. */
  readonly startDelay = input(0);
  readonly charMs = input(55);
  readonly cursor = input(true);

  /** -1 = not animating: show everything (SSR / no-JS / reduced motion). */
  private readonly count = signal(-1);
  protected readonly shown = computed(() => {
    const n = this.count();
    return n < 0 ? this.text() : this.text().slice(0, n);
  });
  protected readonly typing = computed(() => {
    const n = this.count();
    return n >= 0 && n < this.text().length;
  });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      this.count.set(0);
      let timer: ReturnType<typeof setTimeout> | undefined;

      const tick = (): void => {
        const next = this.count() + 1;
        this.count.set(next);
        if (next < this.text().length) timer = setTimeout(tick, this.charMs());
      };

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer.disconnect();
          timer = setTimeout(tick, this.startDelay());
        },
        { threshold: 0.5 },
      );
      observer.observe(host);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        clearTimeout(timer);
      });
    });
  }
}
