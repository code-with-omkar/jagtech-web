import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  // e.g. 'https://localhost:7001/api' once the .NET API is running
  apiUrl: '',
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    email: '',
  },
};
