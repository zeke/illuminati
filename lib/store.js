const { BrowserWindow } = require('electron').remote
const store = new (require('electron-store'))()

store.onDidChange('preferences.always-on-top', (newValue, oldValue) => {
  console.log('always-on-top changed from %s to %s', newValue, oldValue)
  BrowserWindow.getAllWindows().forEach(win => {
    win.setAlwaysOnTop(newValue)
  })
})

module.exports = store
