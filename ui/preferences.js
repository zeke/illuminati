const path = require('path')
const windowStateKeeper = require('electron-window-state')
const store = require('../lib/store')
let win

module.exports = function preferences () {
  const windowState = windowStateKeeper({
    file: 'preferences.json',
    defaultWidth: 600,
    defaultHeight: 400
  })

  const {app, BrowserWindow} = require('electron')

  if (win) {
    win.show()
    return
  }

  win = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    alwaysOnTop: store.get('preferences.always-on-top'),
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

  win.loadURL('file://' + path.join(__dirname, '../views/preferences.html'))

  return win
}
