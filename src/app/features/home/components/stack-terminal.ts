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

const COMMAND = 'dotnet list skills --all';
const CHAR_MS = 28;
const ITEM_PAUSE_MS = 90;

/**
 * Tech stack rendered as a terminal: the command, then each skill, are typed out
 * once the block scrolls into view.
 *
 * SSR, no-JS and reduced-motion users get the full list immediately. Screen readers
 * always get the full list (the typed text is aria-hidden). Every cell keeps a fixed
 * size while typing, so the grid never shifts.
 */
@Component({
  selector: 'app-stack-terminal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="terminal">
      <div class="bar" aria-hidden="true">
        <span class="dot dot--r"></span><span class="dot dot--y"></span><span class="dot dot--g"></span>
        <span class="path">~/jagtech — skills</span>
      </div>

      <div class="body">
        <p class="cmd" aria-hidden="true">
          <span class="prompt">$</span>
          <span>{{ commandText() }}</span>
          @if (phase() === 'command') {
            <span class="cursor"></span>
          }
        </p>

        <ul class="sr-only" aria-label="Tech stack">
          @for (item of items(); track item) {
            <li>{{ item }}</li>
          }
        </ul>

        <ol class="grid" aria-hidden="true">
          @for (item of items(); track item; let i = $index) {
            <li class="cell" [class.is-typed]="typedChars(i) > 0">
              <span class="idx">{{ pad(i) }}</span>
              <span class="name">{{ item.slice(0, typedChars(i)) }}</span>
              @if (activeIndex() === i) {
                <span class="cursor"></span>
              }
            </li>
          }
        </ol>

        @if (phase() === 'done') {
          <p class="cmd done" aria-hidden="true">
            <span class="prompt">$</span><span class="cursor"></span>
          </p>
        }
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }

    .terminal {
      overflow: hidden;
      background: hsl(var(--surface));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius);
      box-shadow: var(--shadow-card);
      font-family: var(--font-heading);
    }

    .bar {
      display: flex; align-items: center; gap: 0.45rem;
      padding: 0.7rem 1rem;
      background: hsl(var(--muted));
      border-bottom: 1px solid hsl(var(--border));
    }
    .dot { width: 0.7rem; height: 0.7rem; border-radius: 50%; }
    .dot--r { background: #ff5f57; }
    .dot--y { background: #febc2e; }
    .dot--g { background: #28c840; }
    .path { margin-left: 0.75rem; font-size: 0.75rem; color: hsl(var(--muted-foreground)); }

    .body { padding: 1.25rem 1.25rem 1.5rem; }
    @media (min-width: 768px) { .body { padding: 1.5rem 2rem 2rem; } }

    .cmd {
      display: flex; align-items: center; gap: 0.6rem;
      min-height: 1.5rem;
      font-size: 0.9375rem;
      color: hsl(var(--foreground));
    }
    .prompt { color: hsl(var(--success)); font-weight: 700; }
    .done { margin-top: 1.25rem; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
      gap: 0.6rem 1.5rem;
      margin-top: 1.25rem;
      list-style: none;
      padding: 0;
    }

    .cell {
      display: flex; align-items: center; gap: 0.75rem;
      height: 2.75rem;
      padding: 0 0.9rem;
      border: 1px dashed hsl(var(--border));
      border-radius: calc(var(--radius) - 2px);
      font-size: 0.875rem;
      white-space: nowrap;
      transition: border-color var(--dur-base) ease, background-color var(--dur-base) ease;
    }
    .cell.is-typed {
      border-style: solid;
      background: hsl(var(--primary) / 0.06);
      border-color: hsl(var(--primary) / 0.35);
    }
    .idx { color: hsl(var(--muted-foreground)); font-size: 0.75rem; font-variant-numeric: tabular-nums; }
    .name { color: hsl(var(--foreground)); overflow: hidden; text-overflow: ellipsis; }

    .cursor {
      display: inline-block; flex: none;
      width: 0.55rem; height: 1.05rem;
      margin-left: -0.5rem;
      background: hsl(var(--primary));
      animation: blink 1s steps(1) infinite;
    }
    .cmd .cursor { margin-left: -0.35rem; }
    @media (prefers-reduced-motion: reduce) { .cursor { animation: none; } }
  `,
})
export class StackTerminal {
  readonly items = input.required<readonly string[]>();

  /** -1 = not started (SSR / no animation shows everything). */
  private readonly progress = signal(-1);
  protected readonly phase = signal<'idle' | 'command' | 'items' | 'done'>('done');

  /** Character offset at which each item starts typing, after the command. */
  private readonly offsets = computed(() => {
    let acc = COMMAND.length;
    return this.items().map((item) => {
      const start = acc;
      acc += item.length;
      return start;
    });
  });

  protected readonly commandText = computed(() => {
    const p = this.progress();
    return p < 0 ? COMMAND : COMMAND.slice(0, p);
  });

  protected readonly activeIndex = computed(() => {
    if (this.phase() !== 'items') return -1;
    const p = this.progress();
    const offsets = this.offsets();
    const items = this.items();
    return offsets.findIndex((start, i) => p >= start && p < start + items[i].length);
  });

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // Hide the text until the block is on screen, then type it out.
      this.progress.set(0);
      this.phase.set('idle');

      let timer: ReturnType<typeof setTimeout> | undefined;
      const total = COMMAND.length + this.items().reduce((n, s) => n + s.length, 0);
      const itemEnds = new Set(this.offsets().map((start, i) => start + this.items()[i].length));

      const tick = (): void => {
        const next = this.progress() + 1;
        this.progress.set(next);
        if (next >= total) {
          this.phase.set('done');
          return;
        }
        if (next === COMMAND.length) this.phase.set('items');
        const pause = next === COMMAND.length ? 400 : itemEnds.has(next) ? ITEM_PAUSE_MS : 0;
        timer = setTimeout(tick, CHAR_MS + pause);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer.disconnect();
          this.phase.set('command');
          timer = setTimeout(tick, 300);
        },
        { threshold: 0.25 },
      );
      observer.observe(host);

      destroyRef.onDestroy(() => {
        observer.disconnect();
        clearTimeout(timer);
      });
    });
  }

  protected typedChars(index: number): number {
    const p = this.progress();
    if (p < 0) return this.items()[index].length;
    return Math.max(0, Math.min(this.items()[index].length, p - this.offsets()[index]));
  }

  protected pad(index: number): string {
    return String(index + 1).padStart(2, '0');
  }
}
