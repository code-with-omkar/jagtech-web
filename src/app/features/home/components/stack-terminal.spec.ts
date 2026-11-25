import { TestBed } from '@angular/core/testing';

import { StackTerminal } from './stack-terminal';

describe('StackTerminal', () => {
  const items = ['ASP.NET Core', 'Angular', 'SQL Server'];

  it('lists every skill for screen readers and renders one fixed cell per skill', async () => {
    const fixture = TestBed.createComponent(StackTerminal);
    fixture.componentRef.setInput('items', items);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const srItems = [...el.querySelectorAll('ul.sr-only li')].map((li) => li.textContent?.trim());
    expect(srItems).toEqual(items);
    expect(el.querySelectorAll('ol.grid .cell')).toHaveLength(items.length);
    expect(el.querySelector('ol.grid')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('numbers cells with zero-padded indexes', async () => {
    const fixture = TestBed.createComponent(StackTerminal);
    fixture.componentRef.setInput('items', items);
    await fixture.whenStable();
    const idx = [...(fixture.nativeElement as HTMLElement).querySelectorAll('.idx')].map((n) => n.textContent);
    expect(idx).toEqual(['01', '02', '03']);
  });
});
