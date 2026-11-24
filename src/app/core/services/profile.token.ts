import { InjectionToken } from '@angular/core';

import { PROFILE } from '../data/profile.data';
import { Profile } from '../models/portfolio.models';

/** Profile content. Override this token to load it from an API or CMS. */
export const PROFILE_DATA = new InjectionToken<Profile>('PROFILE_DATA', {
  providedIn: 'root',
  factory: () => PROFILE,
});
