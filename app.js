const store = new (require('electron-store'))()
const mousetrap = require('mousetrap')

navigator.mediaDevices.getUserMedia({video: true})
  .then(function (stream) {
    console.log('ready')
    const $camera = document.getElementById('camera')
    $camera.src = URL.createObjectURL(stream)
    $camera.addEventListener('loadeddata', () => {
      $camera.classList.remove('hidden')
    })
  }).catch(function (err) {
    alert('could not connect to camera stream: ' + err.message)
    console.error('could not connect to camera stream', err)
  })

const theme = {
  id: store.get('themeId', 0),
  count: 4,
  next: () => {
    document.querySelector('#camera').classList.remove(`theme${theme.id}`)
    theme.id = theme.id === theme.count-1 ? 0 : theme.id + 1
    theme.apply()
  },

  apply: () => {
    document.querySelector('#camera').classList.add(`theme${theme.id}`)
    store.set('themeId', theme.id)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  mousetrap.bind('space', theme.next)
  theme.apply()
})
