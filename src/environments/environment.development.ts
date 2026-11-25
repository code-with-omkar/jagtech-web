import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  // e.g. 'https://localhost:7001/api' once the .NET API is running
  apiUrl: '',
  social: {
    github: 'https://github.com/code-with-omkar',
    linkedin: 'https://www.linkedin.com/in/omkar-jagtap-305574121/',
    x: 'https://x.com',
    email: '',
  },
};
