const path = require('path')
const {BrowserWindow} = require('electron')
const windowStateKeeper = require('electron-window-state')
let win

module.exports = function createWindow () {
  const windowState = windowStateKeeper({
    defaultWidth: 400,
    defaultHeight: 300
  })

  win = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    alwaysOnTop: true,
    titleBarStyle: 'hiddenInset',
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.once('ready-to-show', () => {
    win.show()
    win.webContents.openDevTools()
  })

  win.on('closed', () => {
    win = null
  })

  windowState.manage(win)

  win.loadURL('file://' + path.join(__dirname, '../views/camera.html'))

  return win
}
