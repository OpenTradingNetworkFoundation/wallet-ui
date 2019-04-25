const path = require('path');

const electron = require('electron');
const isDev = require('electron-is-dev');

const createApplicationMenu = require('./menu');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow;

const appUrl = 'file://' + path.resolve(__dirname, '../dist/index.html');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: false
    }
  });

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : appUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  Menu.setApplicationMenu(
    Menu.buildFromTemplate(createApplicationMenu(mainWindow))
  );
  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
