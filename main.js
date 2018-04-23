require('electron-debug')
const {app} = require('electron')
const ui = require('./ui')

app.on('ready', () => {
  ui.menu()
  ui.camera()
  ui.preferences()
  require('./lib/watcher')([ui.camera, ui.preferences])
})