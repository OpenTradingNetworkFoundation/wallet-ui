const { shell, Menu } = require('electron');

const config = require('../dist/config/config.json');

module.exports = parentWindow => [
  {
    label: 'Application',
    submenu: [
      {
        role: 'about',
        label: `About OTN Wallet`
      },
      { label: 'Check for Updates...', enabled: false },
      { type: 'separator' },
      { role: 'services', submenu: new Menu() },
      { type: 'separator' },
      {
        role: 'hide',
        label: 'Hide OTN Wallet'
      },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      {
        role: 'quit',
        label: 'Quit OTN Wallet'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'toggleFullScreen' },
      { type: 'separator' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { role: 'resetZoom' }
    ]
  },
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Report Issue',
        click() {
          shell.openExternal(config.app.feedbackUrl);
        }
      },
      {
        label: 'Toggle Developer Tools',
        click() {
          parentWindow.webContents.openDevTools();
        }
      }
    ]
  }
];
