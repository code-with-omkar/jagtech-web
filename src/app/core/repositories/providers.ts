import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpProjectRepository, InMemoryProjectRepository, ProjectRepository } from './project.repository';

/** Local seed data when apiUrl is empty, HTTP otherwise. */
export function provideDataAccess(useApi = environment.apiUrl.length > 0): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ProjectRepository, useClass: useApi ? HttpProjectRepository : InMemoryProjectRepository },
  ]);
}
