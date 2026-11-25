import { TestBed } from '@angular/core/testing';

import { TypedText } from './typed-text';

describe('TypedText', () => {
  it('renders the full text for screen readers and a cursor by default', async () => {
    const fixture = TestBed.createComponent(TypedText);
    fixture.componentRef.setInput('text', 'Mobile app');
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.sr-only')?.textContent).toBe('Mobile app');
    expect(el.querySelector('.stack')?.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelector('.ghost')?.textContent).toBe('Mobile app');
    expect(el.querySelector('.cursor')).not.toBeNull();
  });

  it('can hide the cursor', async () => {
    const fixture = TestBed.createComponent(TypedText);
    fixture.componentRef.setInput('text', 'x');
    fixture.componentRef.setInput('cursor', false);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('.cursor')).toBeNull();
  });
});
