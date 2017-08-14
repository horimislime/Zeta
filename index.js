'use strict';
const electron = require('electron');
const config = require('./config');

const app = electron.app;

require('electron-debug')();

let mainWindow;

function onClosed() {
	mainWindow = null;
}

function createMainWindow() {
	const url = config.get('url');
	const windowState = config.get('windowState');
	const win = new electron.BrowserWindow({
		width: windowState.width,
		height: windowState.height
	});

	win.loadURL(url);
	win.on('closed', onClosed);

	win.webContents.on('did-navigate-in-page', (e, url) => {
		config.set('url', url);
	});

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});

app.on('before-quit', () => {
	if (!mainWindow.isFullScreen()) {
		config.set('windowState', mainWindow.getBounds());
	}
});
