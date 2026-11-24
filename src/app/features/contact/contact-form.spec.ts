import { TestBed } from '@angular/core/testing';
import { Observable, Subject, of, throwError } from 'rxjs';

import { ContactMessage } from '../../core/models/portfolio.models';
import { ContactGateway } from '../../core/repositories/contact.gateway';
import { ContactFormComponent } from './contact-form';

class FakeGateway extends ContactGateway {
  readonly sent: ContactMessage[] = [];
  response: () => Observable<void> = () => of(undefined);

  override send(message: ContactMessage): Observable<void> {
    this.sent.push(message);
    return this.response();
  }
}

describe('ContactFormComponent', () => {
  let gateway: FakeGateway;
  let component: ContactFormComponent;

  const fillValid = () =>
    component.form.setValue({
      name: '  Priya  ',
      email: 'priya@example.com',
      subject: 'Freelance project',
      message: 'I need an Angular dashboard.',
      company: '',
    });

  beforeEach(() => {
    gateway = new FakeGateway();
    TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [{ provide: ContactGateway, useValue: gateway }],
    });
    component = TestBed.createComponent(ContactFormComponent).componentInstance;
  });

  it('does not send an invalid form and marks fields touched', () => {
    component.submit();
    expect(gateway.sent).toHaveLength(0);
    expect(component.form.controls.name.touched).toBe(true);
    expect(component.state()).toBe('idle');
  });

  it('validates email format and message length', () => {
    fillValid();
    component.form.controls.email.setValue('not-an-email');
    component.form.controls.message.setValue('short');
    expect(component.form.controls.email.hasError('email')).toBe(true);
    expect(component.form.controls.message.hasError('minlength')).toBe(true);
  });

  it('sends a trimmed payload and shows success', () => {
    fillValid();
    component.submit();

    expect(gateway.sent).toEqual([
      { name: 'Priya', email: 'priya@example.com', subject: 'Freelance project', message: 'I need an Angular dashboard.' },
    ]);
    expect(component.state()).toBe('success');
    expect(component.form.controls.name.value).toBe('');
  });

  it('shows submitting state while the request is in flight', () => {
    const pending = new Subject<void>();
    gateway.response = () => pending;
    fillValid();

    component.submit();
    expect(component.state()).toBe('submitting');
    expect(component.form.disabled).toBe(true);

    pending.next();
    pending.complete();
    expect(component.state()).toBe('success');
    expect(component.form.enabled).toBe(true);
  });

  it('shows error state and keeps values when sending fails', () => {
    gateway.response = () => throwError(() => new Error('500'));
    fillValid();
    component.submit();

    expect(component.state()).toBe('error');
    expect(component.form.controls.email.value).toBe('priya@example.com');
  });

  it('silently drops submissions that fill the honeypot', () => {
    fillValid();
    component.form.controls.company.setValue('Spam Inc');
    component.submit();

    expect(gateway.sent).toHaveLength(0);
    expect(component.state()).toBe('success');
  });
});
