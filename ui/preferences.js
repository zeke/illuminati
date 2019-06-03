const path = require('path')
let win

module.exports = function preferences () {
  const {app, BrowserWindow} = require('electron')

  if (win) {
    win.show()
    return
  }

  win = new BrowserWindow({
    center: true,
    width: 1000,
    height: 500,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.once('ready-to-show', () => {
    win.show()
    if (!app.isPackaged) win.webContents.openDevTools()
  })

  win.on('closed', () => {
    win = null
  })

  win.loadURL('file://' + path.join(__dirname, '../views/preferences.html'))

  return win
}
