import { ApiError, KV} from 'js-common';
import { Client, OAuth } from 'mosaic';

function getOrThrow(map: Map<string, string>, key: string){
	if(!map.has(key))
		throw new ApiError(`${key} missing in response`);
	return map.get(key)!;
}

export interface AndroidApp{
	name: string;
	signature: string;
}

export interface GoogleAuthService{
	auth(form: KV<any>): Promise<Map<string, string>>;
}

export const GOOGLE_PLAY_SERVICES_VERSION = 22_50_14_000; /* com.google.android.gms 22.50.14 */

export class Auth{
	private constructor(){}

	private static authService: GoogleAuthService | undefined;

	private static async oauth(token: string, form: KV<any>){
		if(!this.authService)
			this.authService = Client.DefaultServiceProvider.create('android.googleapis.com://auth') as GoogleAuthService;
		return await this.authService.auth({
			...form,

			service: form.service.join(':'),
			google_play_services_version: GOOGLE_PLAY_SERVICES_VERSION,
			Token: token
		});
	}

	static async login(code: string){
		let res = await this.oauth(code, {
			service: ['ac2dm'], /* https://stackoverflow.com/questions/3397512/what-the-name-of-service-in-clientlogin-for-android-cloud-to-device */
			add_account: 1,
			get_accountid: 1,
			ACCESS_TOKEN: 1
		});

		return {
			secret: getOrThrow(res, 'Token'),

			email: getOrThrow(res, 'Email'),
			firstName: res.get('firstName'),
			lastName: res.get('lastName'),
			accountId: res.get('accountId')
		};
	}

	static async issueToken(androidId: string, app: AndroidApp, refreshToken: string, scopes: OAuth.Scope[]){
		let res = await this.oauth(refreshToken, {
			androidId,
			app: app.name,
			client_sig: app.signature,
			service: ['oauth2', OAuth.Scopes.stringify(scopes)]
		});

		let expire: number | undefined = undefined;

		if(res.has('Expiry')){
			expire = parseInt(res.get('Expiry')!, 10)

			if(!Number.isFinite(expire))
				expire = undefined;
		}

		return {
			secret: getOrThrow(res, 'Auth'),
			expire,
			scopes: OAuth.Scopes.parse(getOrThrow(res, 'grantedScopes'))
		};
	}
}