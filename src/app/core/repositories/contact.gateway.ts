import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ContactMessage } from '../models/portfolio.models';

export abstract class ContactGateway {
  abstract send(message: ContactMessage): Observable<void>;
}

/** Used until the .NET API exists: simulates latency and always succeeds. */
@Injectable()
export class MockContactGateway extends ContactGateway {
  override send(_message: ContactMessage): Observable<void> {
    return of(undefined).pipe(delay(800));
  }
}

/** POST {apiUrl}/contact  →  204 No Content (or any 2xx). */
@Injectable()
export class HttpContactGateway extends ContactGateway {
  private readonly http = inject(HttpClient);

  override send(message: ContactMessage): Observable<void> {
    return this.http
      .post(`${environment.apiUrl}/contact`, message, { observe: 'response' })
      .pipe(map(() => undefined));
  }
}
