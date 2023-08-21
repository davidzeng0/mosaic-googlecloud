const { Tasks, generate } = require('protobuf-toolkit');

Tasks.enableDisplay(true);

generate(`${__dirname}/gms.yaml`, `protos/generated`, {
	defaultPackage: 'google.android.gsf.defpackage',
	casing: {
		fields: 'camel',
		json: 'snake',
		files: 'snake'
	}
});