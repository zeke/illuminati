const {app} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

module.exports = function watcher (windows) {
  if (isDev) { 
    require('elemon')({
      app: app,
      mainFile: path.join(__dirname, '../main.js'),
      bws: windows.map(win => {
        return {bw: win.win, res: []}
      })
    })
  }
}
