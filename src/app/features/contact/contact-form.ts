import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { CONTACT_SUBJECTS, ContactMessage, ContactSubject } from '../../core/models/portfolio.models';
import { ContactGateway } from '../../core/repositories/contact.gateway';

export type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type ContactForm = FormGroup<{
  name: FormControl<string>;
  email: FormControl<string>;
  subject: FormControl<ContactSubject | ''>;
  message: FormControl<string>;
  /** Honeypot — must stay empty. */
  company: FormControl<string>;
}>;

@Component({
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactFormComponent {
  private readonly gateway = inject(ContactGateway);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly subjects = CONTACT_SUBJECTS;
  readonly state = signal<SubmitState>('idle');

  readonly form: ContactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100)] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(254)],
    }),
    subject: new FormControl<ContactSubject | ''>('', { nonNullable: true, validators: [Validators.required] }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(2000)],
    }),
    company: new FormControl('', { nonNullable: true }),
  });

  protected invalid(control: keyof ContactForm['controls']): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    if (this.state() === 'submitting') return;

    // Bot filled the hidden field: pretend success, send nothing.
    if (this.form.controls.company.value.trim() !== '') {
      this.state.set('success');
      this.form.reset();
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, subject, message } = this.form.getRawValue();
    const payload: ContactMessage = {
      name: name.trim(),
      email: email.trim(),
      subject: subject as ContactSubject,
      message: message.trim(),
    };

    this.state.set('submitting');
    this.form.disable();

    this.gateway
      .send(payload)
      .pipe(
        finalize(() => this.form.enable()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.state.set('success');
          this.form.reset();
        },
        error: () => this.state.set('error'),
      });
  }

  sendAnother(): void {
    this.state.set('idle');
  }
}
