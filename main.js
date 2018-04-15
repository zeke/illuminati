const windowStateKeeper = require('electron-window-state')

const isDev = require('electron-is-dev')
require('electron-debug')
const elemon = require('elemon')
const path = require('path')
const {app, BrowserWindow} = require('electron')
let win

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit() }
})

app.on('ready', () => {
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
    frame: false
  })

  windowState.manage(win)

  win.loadURL('file://' + path.join(__dirname, 'index.html'))

  // Dereference the window object
  win.on('closed', () => {
    win = null
  })

  elemon({
    app: app,
    mainFile: 'main.js',
    bws: [
      {bw: win, res: []}
    ]
  })
})
