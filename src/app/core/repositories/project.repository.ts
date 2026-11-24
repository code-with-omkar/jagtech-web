import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PROJECTS } from '../data/projects.data';
import { Project } from '../models/portfolio.models';

/** Abstraction the UI depends on. Swap the implementation, not the components. */
export abstract class ProjectRepository {
  abstract getAll(): Observable<readonly Project[]>;
  abstract getBySlug(slug: string): Observable<Project | undefined>;
}

@Injectable()
export class InMemoryProjectRepository extends ProjectRepository {
  override getAll(): Observable<readonly Project[]> {
    return of(PROJECTS);
  }

  override getBySlug(slug: string): Observable<Project | undefined> {
    return of(PROJECTS.find((p) => p.slug === slug));
  }
}

/** Expects GET {apiUrl}/projects and GET {apiUrl}/projects/{slug} returning Project JSON. */
@Injectable()
export class HttpProjectRepository extends ProjectRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/projects`;

  override getAll(): Observable<readonly Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  override getBySlug(slug: string): Observable<Project | undefined> {
    return this.http
      .get<Project>(`${this.baseUrl}/${encodeURIComponent(slug)}`)
      .pipe(
        map((p) => p ?? undefined),
        catchError(() => of(undefined)),
      );
  }
}
