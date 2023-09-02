'use strict';

var electron = require('electron');
var jsCommon = require('js-common');

function i(e){console.error(e);process.exit(-1);}process.on("uncaughtException",i);process.on("unhandledRejection",i);var s={};function u(e){return new Promise((n,t)=>{let o=(p,r)=>{if(r.domain!="accounts.google.com"||r.name!="oauth_token")return;e.cookies.off("changed",o);n(r.value);};e.cookies.on("changed",o);})}async function c(){let e=new electron.BrowserWindow({width:450,height:580});let n=e.webContents.session;let t;if(s.userAgent)e.webContents.setUserAgent(s.userAgent);try{let o=new jsCommon.URLBuilder("https://accounts.google.com/embedded/setup/v2/android");o.setParams(s.form);e.setMenu(null);await e.loadURL(o.href);t=await u(n);if(process.send){process.send({event:"output",data:t});}else {console.log(t);}}catch(o){console.error(o);}n.clearStorageData();e.close();}electron.app.on("window-all-closed",()=>{electron.app.quit();});if(process.send){process.send({event:"ready"});process.on("message",e=>{switch(e.event){case"start":electron.app.whenReady().then(c);break;case"options":s=e.data;break}});}else {electron.app.whenReady().then(c);}
