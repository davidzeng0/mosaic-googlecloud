import { OAuth } from 'mosaic';

export * from './issuer';

import issuers from '@config/google-cloud/oauth/android/oauth';

OAuth.DefaultOAuthProvider.registerIssuers(issuers);