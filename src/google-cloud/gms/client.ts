import { ParseError, URLParams, Response, HttpHeader, Mime, HttpContentType, ApiError, KV, InvalidArgumentError } from 'js-common';
import { GoogleAuthError, GoogleAuthErrors } from './errors';
import { Client } from 'mosaic';

export class GoogleAuthClient extends Client.Client{
	override async request(request: Client.ApiRequest, options?: KV<any>): Promise<Response>{
		if(options?.credentials)
			throw new InvalidArgumentError('Credentials not supported for this client');
		request.body = URLParams.toString(request.body as string);

		let res = await request.execute();
		let type = res.headers.get(HttpHeader.CONTENT_TYPE);

		if(!type || !Mime.typeEquals(type, HttpContentType.TEXT)){
			if(!res.ok)
				throw Client.HttpStatus.errorFrom(res);
			throw new ApiError(`Expected content type '${HttpContentType.TEXT}' but got '${type}'`);
		}

		let lines = res.body.toString().split('\n');
		let parsed = new Map();

		for(let line of lines){
			let index = line.indexOf('='), key, value;

			if(index == -1)
				throw new ParseError(`Expected '='`);
			key = line.substring(0, index);
			value = line.substring(index + 1);
			parsed.set(key, value);
		}

		if(parsed.has('Error')){
			let error = parsed.get('Error');

			if(error != GoogleAuthErrors.SUCCESS)
				throw GoogleAuthError.from(error);
		}

		if(!res.ok)
			throw Client.HttpStatus.errorFrom(res);
		res.body = parsed as any;

		return res;
	}
}