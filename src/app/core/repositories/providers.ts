import { EnvironmentProviders, Provider, makeEnvironmentProviders } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ContactGateway, HttpContactGateway, MockContactGateway } from './contact.gateway';
import { HttpProjectRepository, InMemoryProjectRepository, ProjectRepository } from './project.repository';

/** Picks local seed data / mock contact when apiUrl is empty, HTTP otherwise. */
export function provideDataAccess(useApi = environment.apiUrl.length > 0): EnvironmentProviders {
  const providers: Provider[] = useApi
    ? [
        { provide: ProjectRepository, useClass: HttpProjectRepository },
        { provide: ContactGateway, useClass: HttpContactGateway },
      ]
    : [
        { provide: ProjectRepository, useClass: InMemoryProjectRepository },
        { provide: ContactGateway, useClass: MockContactGateway },
      ];
  return makeEnvironmentProviders(providers);
}
