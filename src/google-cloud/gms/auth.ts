import { ApiError, KV} from 'js-common';
import { DefaultServiceProvider, Scopes } from 'mosaic';
import GMSConfig from '@config/google-cloud/gms/gms';

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

export class Auth{
	private constructor(){}

	private static authService: GoogleAuthService | undefined;

	private static oauth(token: string, form: KV<any>){
		if(!this.authService)
			this.authService = DefaultServiceProvider.create('android.googleapis.com://auth') as GoogleAuthService;
		return this.authService.auth({
			...form,

			service: form.service.join(':'),
			google_play_services_version: GMSConfig.version,
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

	static async issueToken(androidId: string, app: AndroidApp, refreshToken: string, scopes: Scopes){
		let res = await this.oauth(refreshToken, {
			androidId,
			app: app.name,
			client_sig: app.signature,
			service: ['oauth2', Scopes.stringify(scopes)]
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
			scopes: Scopes.parse(getOrThrow(res, 'grantedScopes'))
		};
	}
}