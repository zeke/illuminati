const path = require('path')
const { app, BrowserWindow } = require('electron')
const windowStateKeeper = require('electron-window-state')
const store = require('../lib/store')
let win

module.exports = function createWindow () {
  const windowState = windowStateKeeper({
    file: 'camera.json',
    defaultWidth: 400,
    defaultHeight: 300
  })

  win = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    alwaysOnTop: store.get('preferences.always-on-top'),
    titleBarStyle: 'hiddenInset',
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.once('ready-to-show', () => {
    win.show()
    // if (!app.isPackaged) win.webContents.openDevTools()
  })

  win.on('closed', () => {
    win = null
  })

  windowState.manage(win)

  win.loadURL('file://' + path.join(__dirname, '../views/camera.html'))

  return win
}
