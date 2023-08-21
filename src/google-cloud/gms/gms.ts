import { Client } from 'mosaic';
import { ApiError } from 'js-common';

import { AndroidCheckin } from '@protos/google/android/gsf/checkin/android_checkin';
import { AndroidCheckinRequest } from '@protos/google/android/gsf/checkin/android_checkin_request';

import clients from '@config/google-cloud/gms/clients';
import transports from '@config/google-cloud/gms/transports';
import services from '@config/google-cloud/gms/services';

export interface DeviceConfig{
	imei?: string;
	otaCert?: string;
	model?: string;
	manufacturer?: string;
	device?: string;
	client?: string;
	bootloader?: string;
	radio?: string;
	carrier?: string;
	product?: string;
	id?: string;
}

Client.DefaultServiceProvider.registerClients(clients);
Client.DefaultServiceProvider.registerTransports(transports);
Client.DefaultServiceProvider.registerServices(services);

let checkinService: AndroidCheckin | undefined;

export function checkin(request: AndroidCheckinRequest){
	if(!checkinService){
		checkinService = Client.DefaultServiceProvider.create('android.googleapis.com://checkin', {
			transport: 'application/x-protobuffer'
		});
	}

	return checkinService!.checkin(request);
}

export async function createAndroidId(config: DeviceConfig, request?: AndroidCheckinRequest){
	let build = {
		id: config.id,
		product: config.product,
		carrier: config.carrier,
		radio: config.radio,
		bootloader: config.bootloader,
		client: config.client,
		manufacturer: config.manufacturer,
		buildProduct: config.product,
		device: config.device,
		model: config.product
	}

	let payload = {
		imei: config.imei,
		id: 0n,
		otaCert: config.otaCert ? [config.otaCert] : [],
		fragment: 0,
		version: 3,
		securityToken: 0n,
		checkin: { build },
		...request
	};

	let response = await checkin(payload);

	if(!response.androidId || response.androidId === 0n)
		throw new ApiError('Failed to get androidId');
	return {
		response,
		androidId: response.androidId.toString(16)
	};
}