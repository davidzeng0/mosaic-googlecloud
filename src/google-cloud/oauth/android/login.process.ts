import { Session, Event, Cookie, BrowserWindow, app } from 'electron';
import { URLBuilder } from 'js-common';

function exit(e: any){
	console.error(e);

	process.exit(-1);
}

process.on('uncaughtException', exit);
process.on('unhandledRejection', exit);

let options: any = {};

function loginComplete(session: Session){
	return new Promise<string>((resolve, _) => {
		let changed = (_: Event, cookie: Cookie) => {
			if(cookie.domain != 'accounts.google.com' || cookie.name != 'oauth_token')
				return;
			session.cookies.off('changed', changed);

			resolve(cookie.value);
		};

		session.cookies.on('changed', changed);
	});
}

async function auth(){
	let win = new BrowserWindow({ width: 450, height: 580 });
	let session = win.webContents.session;

	let code;

	if(options.userAgent)
		win.webContents.setUserAgent(options.userAgent);
	try{
		let url = new URLBuilder('https://accounts.google.com/embedded/setup/v2/android');

		url.setParams(options.form);
		win.setMenu(null);

		await win.loadURL(url.href);

		code = await loginComplete(session);

		if(process.send){
			process.send({
				event: 'output',
				data: code
			});
		}else{
			console.log(code);
		}
	}catch(e){
		console.error(e);
	}

	session.clearStorageData();
	win.close();
}

app.on('window-all-closed', () => {
	app.quit();
});

if(process.send){
	process.send({
		event: 'ready'
	});

	process.on('message', (message: any) => {
		switch(message.event){
			case 'start':
				app.whenReady().then(auth);

				break;
			case 'options':
				options = message.data;

				break;
		}
	});
}else{
	app.whenReady().then(auth);
}