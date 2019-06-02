const store = require('../lib/store')
const {format} = require('util')
const inputs = require('../lib/inputs')
const rangeInputs = inputs.filter(input => input.type === 'range')

navigator.mediaDevices.getUserMedia({video: true})
  .then(function (stream) {
    const $camera = document.getElementById('camera')
    $camera.srcObject = stream
    
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
  // console.log(prefs)
  
  const cssFilterString = rangeInputs
    // examples: brightness(4), hue-rotate(270deg)
    .map(({id, unit=''}) => format('%s(%s%s)', id, prefs[id], unit)) 
    .join(' ')
  console.log(cssFilterString)
  document.querySelector('#camera').style.filter = cssFilterString
}