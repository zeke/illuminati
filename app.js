const yo = require('yo-yo')
const {format} = require('util')
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

document.addEventListener('DOMContentLoaded', () => {
  // mousetrap.bind('space', theme.next)
  drawFilters()
})

function drawFilters() {
  const filters = [
    // 'blur',
    'brightness', 
    'contrast',
    // 'hue-rotate',
    // 'invert',
    // 'opacity',
    // 'saturate',
    // 'sepia'
  ]

  const onchange = function (event) {
    const filterString = filters.map(filter => {
      return format('%s(%s)', filter, document.getElementById(filter).value)
    }).join(' ')
    console.log(filterString)
    document.querySelector('#camera').style.filter = filterString
  }

  const el = yo`<form>
    ${filters.map(function (filter) {
      return yo`
        <div class="input">
          <label for="${filter}">${filter}</label>
          <input id="${filter}" onchange="${onchange}" type="range" min="1" max="10" step="1" value="1">
        </div>
        `
    })}
  </form>`

  document.querySelector('#wrapper').appendChild(el)
}


