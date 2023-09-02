import { DefaultServiceProvider } from 'mosaic';

export * as MobileServices from './gms';
export * from './oauth';
export * from './projects';
export * from './credentials';

import clients from '@config/google-cloud/clients';

DefaultServiceProvider.registerClients(clients);