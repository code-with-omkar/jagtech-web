import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders header, main landmark and footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('app-header')).toBeTruthy();
    expect(el.querySelector('main#main')).toBeTruthy();
    expect(el.querySelector('app-footer')?.textContent).toContain('JagTech. All rights reserved.');
  });

  it('has a skip link to the main content', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const skip = (fixture.nativeElement as HTMLElement).querySelector<HTMLAnchorElement>('.skip-link');
    expect(skip?.getAttribute('href')).toBe('#main');
  });
});
