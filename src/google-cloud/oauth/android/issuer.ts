import { InvalidArgumentError, GenericError, UnsupportedError, Json, ConcurrentPromise } from 'js-common';
import { MobileServices } from '@/index';
import { OAuthIssuer, Config, CredentialStore, RefreshToken, OAuthClient, AccessToken, Scopes, OAuthOptions, UserDeniedError, DefaultOAuthProvider, OAuthTools } from 'mosaic';
import { ROOT } from '@/path';

export class AndroidOAuth extends OAuthIssuer{
	private androidId = new ConcurrentPromise(() => this.createAndroidId());

	private async createAndroidId(){
		let device = Config.get('oauth/android.googleapis.com/deviceInfo');

		if(!device)
			throw new GenericError('Device configuration not found');
		let response = await MobileServices.createAndroidId(device);

		return response.androidId;
	}

	private async getAndroidId(){
		let androidIdKey = 'mosaic.google-cloud.androidId';
		let androidId = await CredentialStore.getKey(androidIdKey);

		if(androidId)
			return androidId;
		androidId = await this.androidId.run();

		CredentialStore.setKey(androidIdKey, androidId);

		return androidId;
	}

	private async login(code: string): Promise<RefreshToken>{
		let token = await MobileServices.Auth.login(code);
		let profile = [];

		if(token.firstName)
			profile.push(token.firstName);
		if(token.lastName)
			profile.push(token.lastName);
		return new RefreshToken({
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

	private async issue(refresh: RefreshToken, client: OAuthClient, scopes: Scopes): Promise<AccessToken>{
		let androidId = await this.getAndroidId();
		let token = await MobileServices.Auth.issueToken(androidId, {
			name: client.package!,
			signature: client.fingerprint!
		}, refresh.secret, scopes);

		return new AccessToken({
			issuer: this,
			client: client.id,
			type: 'Bearer',
			refresher: refresh,
			...token
		});
	}

	override async perform(client: OAuthClient, scopes: Scopes, options?: OAuthOptions): Promise<AccessToken>{
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

		code = await OAuthTools.launchElectronApplication(`${ROOT}/google-cloud/oauth/android/login`, opts);

		if(!code.length)
			throw new UserDeniedError();
		refresh = await this.login(code[0]);
		access = await this.issue(refresh, client, scopes);

		return access;
	}

	override async exchange(code: string, client: OAuthClient): Promise<AccessToken>{
		void code;
		void client;

		throw new UnsupportedError();
	}

	override refresh(access: AccessToken, refresh: RefreshToken): Promise<AccessToken>{
		let client = DefaultOAuthProvider.getClient(access.client);

		return this.issue(refresh, client, access.scopes);
	}

	override async revoke(access: AccessToken){

	}
}