import { HttpContentType } from 'js-common';

export const GoogleAuthTransport = {
	request: HttpContentType.URLFORM,
	response: HttpContentType.TEXT,

	/* no-op, actual transport is handled in the client */
	encode: (message: any) => message,
	decode: (message: Buffer) => message
};