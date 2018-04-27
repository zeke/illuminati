const store = require('../lib/store')
const {format} = require('util')
const filters = require('../lib/inputs')
  .filter(input => input.type === 'range')
  .map(input => input.id)

navigator.mediaDevices.getUserMedia({video: true})
  .then(function (stream) {
    const $camera = document.getElementById('camera')
    $camera.src = URL.createObjectURL(stream)
    
    // fade in with CSS to prevent camera flashing on screen
    $camera.addEventListener('loadeddata', () => {
      $camera.classList.remove('hidden')
    })
  }).catch(function (err) {
    alert('could not connect to camera stream: ' + err.message)
    console.error('could not connect to camera stream', err)
  })

document.addEventListener('DOMContentLoaded', () => {
  let timerId = setInterval(() => window.updateCamera(), 1000)
})

window.updateCamera = () => {
  const prefs = store.get('preferences')
  if (!prefs) {
    console.log('no preferences set yet')
    return
  }
  console.log(prefs)
  const cssFilterString = filters
    .map(f => format('%s(%s)', f, prefs[f]))
    .join(' ')
  console.log(cssFilterString)
  document.querySelector('#camera').style.filter = cssFilterString
}