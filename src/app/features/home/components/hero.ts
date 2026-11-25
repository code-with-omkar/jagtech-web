import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface CodeSnippet {
  readonly html: string;
  readonly position: string;
}

const k = (s: string) => `<span class="kw">${s}</span>`;
const f = (s: string) => `<span class="fn">${s}</span>`;
const v = (s: string) => `<span class="var">${s}</span>`;
const str = (s: string) => `<span class="str">${s}</span>`;

/** Decorative background snippets (aria-hidden). Static strings — no user input. */
const SNIPPETS: readonly CodeSnippet[] = [
  { position: 'top: 8%; right: 4%;', html: `${k('const')} ${f('App')} = () =&gt; {\n  ${k('return')} &lt;${v('View')} /&gt;;\n};` },
  { position: 'top: 20%; left: 42%;', html: `${k('async function')} ${f('fetch')}(${v('url')}: ${v('string')}) {\n  ${k('const')} ${v('res')} = ${k('await')} api.${f('get')}(url);\n  ${k('return')} res.data;\n}` },
  { position: 'top: 42%; left: 36%;', html: `${f('useEffect')}(() =&gt; {\n  socket.${f('on')}(${str("'data'")}, handler);\n  ${k('return')} () =&gt; socket.${f('off')}();\n}, []);` },
  { position: 'top: 48%; right: 2%;', html: `${k('struct')} ${v('ContentView')}: ${v('View')} {\n  ${k('var')} body: ${k('some')} ${v('View')} {\n    ${f('Text')}(${str('"Hello"')})\n  }\n}` },
  { position: 'top: 64%; left: 55%;', html: `@app.${f('route')}(${str("'/api/v1'")})\n${k('def')} ${f('handler')}():\n  ${k('return')} ${f('jsonify')}(data)` },
  { position: 'bottom: 10%; left: 40%;', html: `${k('SELECT')} * ${k('FROM')} ${v('users')}\n${k('WHERE')} active = ${k('true')}\n${k('ORDER BY')} created_at ${k('DESC')};` },
];

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly name = input.required<string>();
  readonly roles = input.required<readonly string[]>();
  readonly tagline = input.required<string>();

  protected readonly snippets = SNIPPETS;
  /** SSR / reduced-motion: first role shown in full. */
  protected readonly typed = signal<string | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const roles = this.roles();
      if (roles.length === 0) return;

      let roleIndex = 0;
      let charIndex = roles[0].length;
      let deleting = true;
      let timer: ReturnType<typeof setTimeout>;

      const tick = (): void => {
        const role = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        this.typed.set(role.slice(0, charIndex));

        let wait = deleting ? 40 : 80;
        if (!deleting && charIndex === role.length) {
          deleting = true;
          wait = 2200;
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          wait = 350;
        }
        timer = setTimeout(tick, wait);
      };

      this.typed.set(roles[0]);
      timer = setTimeout(tick, 2500);
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }
}
