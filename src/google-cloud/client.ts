import { HttpHeader, Response, Mime, ApiError, ParseError, InvalidArgumentError, UnimplementedError, PreconditionFailedError, PermissionDeniedError, NotFoundError, AbortedError, ExistsError, RateLimitedError, InternalServerError, UnavailableError, TimedOutError, HttpContentType, KV, Json } from 'js-common';
import { AccessToken, ApiKey, ApiRequest, Client, Credentials, HttpClients, InvalidCredentialsError } from 'mosaic';
import { GoogleCookie } from './credentials';

import { Code, codeFromJSON } from 'protobuf-ts/protos/google/rpc/code';
import { Status } from 'protobuf-ts/protos/google/rpc/status';
import { Error } from '@protos/google/rest/json_error';

export class GoogleClient extends Client{
	private async setRequestCredentials(request: ApiRequest, credentials: Credentials[], forceRefresh = false){
		let refreshed = false;

		for(let credential of credentials){
			if(credential instanceof ApiKey)
				request.setHeader('X-Goog-Api-Key', credential.key);
			else if(credential instanceof AccessToken){
				if(credential.expired || forceRefresh){
					await credential.refresh();

					refreshed = true;
				}

				request.setHeader(HttpHeader.AUTHORIZATION, credential.toString());
			}else if(credential instanceof GoogleCookie){
				request.setHeader(HttpHeader.ORIGIN, request.url.origin);
				request.setHeader(HttpHeader.COOKIE, credential.getCookie());
				request.setHeader(HttpHeader.AUTHORIZATION, credential.getAuthorization(request.url.origin, request.https));
				request.setHeader('X-Goog-Authuser', credential.authuser);
			}else{
				throw new InvalidArgumentError('Invalid credentials. Expected one of ApiKey, AccessToken, or GoogleCookie');
			}
		}

		return refreshed;
	}

	private async perform(request: ApiRequest){
		let res = await request.execute();

		if(res.ok && this.xssi?.json === undefined)
			return res;
		let type = res.headers.get(HttpHeader.CONTENT_TYPE);

		if(!type)
			throw new ApiError(`${HttpHeader.CONTENT_TYPE} header missing`);
		let mime = Mime.parse(type);
		let isJson = Mime.typeEquals(mime, HttpContentType.JSON);

		if(isJson){
			let prefix = Buffer.from(this.xssi!.json, 'utf8');

			if(res.body.subarray(0, prefix.length).equals(prefix))
				res.body = res.body.subarray(prefix.length);
		}

		if(res.ok)
			return res;
		let status: Code | undefined, message;

		if(isJson){
			let json = Json.decode(res.body.toString());
			let error = Error.fromJSON(json).error;

			status = error?.status;
			message = error?.message;
		}else if(Mime.typeEquals(mime, HttpContentType.PROTOBUF)){
			let error;

			try{
				error = Status.decode(res.body);
			}catch(e){
				throw new ParseError(e);
			}

			if(error.code !== undefined)
				status = codeFromJSON(error.code);
			message = error.message;
		}else{
			throw new ApiError(`Unknown content type: ${type}`);
		}

		switch(status){
			case Code.INVALID_ARGUMENT:
				throw new InvalidArgumentError(message);
			case Code.FAILED_PRECONDITION:
				throw new PreconditionFailedError(message);
			case Code.UNAUTHENTICATED:
				throw new InvalidCredentialsError(message);
			case Code.PERMISSION_DENIED:
				throw new PermissionDeniedError(message);
			case Code.NOT_FOUND:
				throw new NotFoundError(message);
			case Code.ALREADY_EXISTS:
				throw new ExistsError(message);
			case Code.RESOURCE_EXHAUSTED:
				throw new RateLimitedError(message);
			case Code.CANCELLED:
				throw new AbortedError(message);
			case Code.INTERNAL:
			case Code.UNKNOWN:
				throw new InternalServerError(message);
			case Code.UNIMPLEMENTED:
				throw new UnimplementedError(message);
			case Code.UNAVAILABLE:
				throw new UnavailableError(message);
			case Code.DEADLINE_EXCEEDED:
				throw new TimedOutError(message);
			default:
				throw HttpClients.makeError(res, message, status);
		}
	}

	override async request(request: ApiRequest, options?: KV<any>): Promise<Response>{
		if(options?.credentials)
			await this.setRequestCredentials(request, options.credentials);
		let promise = this.perform(request);

		if(!options?.retryExpiredCredentials || !options?.credentials)
			return promise;
		try{
			return await promise;
		}catch(e){
			if(!(e instanceof InvalidCredentialsError))
				throw e;
			if(!await this.setRequestCredentials(request, options.credentials, true))
				throw e;
			return this.perform(request)
		}
	}
}