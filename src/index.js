const {app,BrowserWindow} = require('electron');
const path = require('path');

function createWindow () {

    let win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: true,
            contextIsolation: true
        }
    });
    win.setMenu(null);
    win.loadFile("index.html");
}
app.whenReady().then(createWindow);
