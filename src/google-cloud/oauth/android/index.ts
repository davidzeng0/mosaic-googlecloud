import { DefaultOAuthProvider } from 'mosaic';

export * from './issuer';

import issuers from '@config/google-cloud/oauth/android/oauth';

DefaultOAuthProvider.registerIssuers(issuers);