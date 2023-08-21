import { Client } from 'mosaic';

export * as MobileServices from './gms';
export * as OAuth from './oauth';
export * from './projects';
export * from './credentials';

import clients from '@config/google-cloud/clients';

Client.DefaultServiceProvider.registerClients(clients);