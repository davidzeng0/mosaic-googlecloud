'use strict';

var electron = require('electron');
var jsCommon = require('js-common');

function exit(e){console.error(e),process.exit(-1);}process.on("uncaughtException",exit);process.on("unhandledRejection",exit);var options={};function loginComplete(session){return new Promise((resolve,_)=>{let changed=(_2,cookie)=>{cookie.domain!="accounts.google.com"||cookie.name!="oauth_token"||(session.cookies.off("changed",changed),resolve(cookie.value));};session.cookies.on("changed",changed);})}async function auth(){let win=new electron.BrowserWindow({width:450,height:580}),session=win.webContents.session,code;options.userAgent&&win.webContents.setUserAgent(options.userAgent);try{let url=new jsCommon.URLBuilder("https://accounts.google.com/embedded/setup/v2/android");url.setParams(options.form),win.setMenu(null),await win.loadURL(url.href),code=await loginComplete(session),process.send?process.send({event:"output",data:code}):console.log(code);}catch(e){console.error(e);}session.clearStorageData(),win.close();}electron.app.on("window-all-closed",()=>{electron.app.quit();});process.send?(process.send({event:"ready"}),process.on("message",message=>{switch(message.event){case"start":electron.app.whenReady().then(auth);break;case"options":options=message.data;break}})):electron.app.whenReady().then(auth);
//# sourceMappingURL=out.js.map
//# sourceMappingURL=login.js.map