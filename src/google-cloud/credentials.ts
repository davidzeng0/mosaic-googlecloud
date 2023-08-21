import { Client, OAuth } from 'mosaic';
import { Cookie } from 'js-common';
import { createHash } from 'crypto';

enum CookiePrefix{
	SECURE_FIRST_PARTY = '__Secure-1P',
	SECURE_THIRD_PARTY = '__Secure-3P',
	HOST_FIRST_PARTY = '__Host-1P',
	HOST_THIRD_PARTY = '__Host-3P'
}

enum GoogleCookies{
	SID = 'SID',
	LSID = 'LSID',
	HSID = 'HSID',
	SSID = 'SSID',
	APISID = 'APISID',
	SAPISID = 'SAPISID' /* APISID for https */
}

function makeCookie(prefix: CookiePrefix, cookie: GoogleCookies){
	return `${prefix}${cookie}`;
}

export class GoogleCookie extends Client.Credentials{
	private cookies;
	private string;
	readonly authuser;

	constructor(cookies: string, authuser = 0){
		super();
		this.cookies = Cookie.parse(cookies);
		this.string = cookies;
		this.authuser = authuser
	}

	getAuthorization(origin: string, https = true, time: number = Date.now()){
		let apisid = this.cookies[https ? GoogleCookies.SAPISID : GoogleCookies.APISID];

		if(!apisid)
			apisid = this.cookies[makeCookie(CookiePrefix.SECURE_THIRD_PARTY, GoogleCookies.APISID)];
		if(!apisid)
			throw new OAuth.InvalidCredentialsError();
		let hash = createHash('sha1').update(`${time} ${apisid} ${origin}`).digest('hex');

		return `${https ? GoogleCookies.SAPISID : GoogleCookies.APISID}HASH ${time}_${hash}`;
	}

	getCookie(){
		return this.string;
	}
}