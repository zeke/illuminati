const { BrowserWindow } = require('electron').remote || require('electron')

const store = new (require('electron-store'))({
  defaults: {
    preferences: {
      'always-on-top': true
    }
  }
})

store.onDidChange('preferences.always-on-top', (newValue, oldValue) => {
  console.log('always-on-top changed from %s to %s', newValue, oldValue)
  BrowserWindow.getAllWindows().forEach(win => {
    win.setAlwaysOnTop(newValue)
  })
})

module.exports = store
