import { InvalidArgumentError, GenericError, UnsupportedError, Json } from 'js-common';
import { MobileServices } from '@/index';
import { Config } from 'protobuf-ts';
import { OAuth } from 'mosaic';
import { ROOT } from '@/path';

export class AndroidOAuth extends OAuth.OAuthIssuer{
	private androidIdPromise?: Promise<string>;

	private async getAndroidId(){
		let androidIdKey = 'mosaic.google-cloud.androidId';
		let androidId = await OAuth.Store.getKey(androidIdKey);

		if(androidId)
			return androidId;
		if(this.androidIdPromise)
			return await this.androidIdPromise;
		let device = Config.get('oauth/android.googleapis.com/deviceInfo');

		if(!device)
			throw new GenericError('Device configuration not found');
		this.androidIdPromise = MobileServices.createAndroidId(device).then(response => response.androidId);

		try{
			androidId = await this.androidIdPromise;
		}finally{
			this.androidIdPromise = undefined;
		}

		OAuth.Store.setKey(androidIdKey, androidId);

		return androidId;
	}

	private async login(code: string): Promise<OAuth.RefreshToken>{
		let token = await MobileServices.Auth.login(code);
		let profile = [];

		if(token.firstName)
			profile.push(token.firstName);
		if(token.lastName)
			profile.push(token.lastName);
		return new OAuth.RefreshToken({
			issuer: this,
			type: 'Bearer',
			secret: token.secret,
			metadata: {
				...token,
				secret: undefined,
				profile: profile.length ? profile.join(' ') : undefined
			}
		});
	}

	private async issue(refresh: OAuth.RefreshToken, client: OAuth.OAuthClient, scopes: OAuth.Scope[]): Promise<OAuth.AccessToken>{
		let androidId = await this.getAndroidId();
		let token = await MobileServices.Auth.issueToken(androidId, {
			name: client.package!,
			signature: client.fingerprint!
		}, refresh.secret, scopes);

		return new OAuth.AccessToken({
			issuer: this,
			client: client.id,
			type: 'Bearer',
			refresher: refresh,
			...token
		});
	}

	override async perform(client: OAuth.OAuthClient, scopes: OAuth.Scope[], options?: OAuth.OAuthOptions): Promise<OAuth.AccessToken>{
		if(options?.noUI)
			throw new InvalidArgumentError('No UI not supported for this login method');
		if(options?.email || options?.password)
			throw new InvalidArgumentError('Username and/or password is not supported for this login method');
		if(!options?.form && options?.formOptions)
			options.form = Json.decode(options.formOptions);
		let opts = {
			form: options?.form,
			userAgent: Config.get('oauth/accounts.google.com/userAgent/embedded.setup.v2/android')
		};

		let code, refresh, access;

		code = await OAuth.launch(`${ROOT}/google-cloud/oauth/android/login`, opts);

		if(!code.length)
			throw new OAuth.UserDeniedError();
		refresh = await this.login(code[0]);
		access = await this.issue(refresh, client, scopes);

		return access;
	}

	override async exchange(code: string, client: OAuth.OAuthClient): Promise<OAuth.AccessToken>{
		void code;
		void client;

		throw new UnsupportedError();
	}

	override async refresh(access: OAuth.AccessToken, refresh: OAuth.RefreshToken): Promise<OAuth.AccessToken>{
		let client = OAuth.DefaultOAuthProvider.getClient(access.client);

		return await this.issue(refresh, client, access.scopes);
	}

	override async revoke(access: OAuth.AccessToken){

	}
}