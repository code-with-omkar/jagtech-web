export interface Environment {
  readonly production: boolean;
  /** Public origin used for canonical URLs, Open Graph and the sitemap. */
  readonly siteUrl: string;
  /** Base URL of the .NET Web API. Empty string = use local seed data. */
  readonly apiUrl: string;
  readonly social: {
    readonly github: string;
    readonly linkedin: string;
    readonly email: string;
    readonly phone: string;
  };
}
