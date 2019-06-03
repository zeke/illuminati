const { BrowserWindow } = require('electron').remote || require('electron')

const store = new (require('electron-store'))({
  defaults: {
    preferences: {
      'always-on-top': true
    }
  }
})

// Apply 'always-on-top' toggling
store.onDidChange('preferences.always-on-top', (newValue, oldValue) => {
  BrowserWindow.getAllWindows().forEach(win => {
    console.log('newValue', newValue)
    win.setAlwaysOnTop(!!newValue) // coerce to boolean in case null or undefined
    if (win.updateCamera) {
      console.log('updateCamera!')
      win.updateCamera()
    }
  })
})

store.onDidChange('preferences', (newValue, oldValue) => {
  // on any change...
})

module.exports = store
