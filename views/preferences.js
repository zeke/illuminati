const yo = require('nanohtml')
const store = require('../lib/store')
const isNumber = require('is-number')
const inputs = require('../lib/inputs')
// store.clear()

document.addEventListener('DOMContentLoaded', () => {
  render()

  // console.log(store.get('preferences'))
  store.onDidChange('preferences', (newValue, oldValue) => {
    // console.log('new prefs', newValue)
  })
})

const onchange = function (event) {
  event.preventDefault()
  const form = document.querySelector('form')
  const formData = new FormData(form)
  const newPrefs = inputs
    // sort keys to make a deterministic object
    .sort((a, b) => a.id.localeCompare(b.id))
    .reduce((acc, input) => {
      const {id, type, defaultValue} = input
      if (type === 'checkbox') {
        acc[id] = formData.has(id) ? true : false
      } else if (type === 'number' || type === 'range') {
        acc[id] = Number(formData.get(id))
      }
        else {
        acc[id] = formData.get(id)
      }
      return acc
    }, {})

  store.set('preferences', newPrefs)
}

function render() {
  const $inputs = inputs.map(input => {
    const {id, label, type, defaultValue, min, max, step} = input
    const value = store.get(`preferences.${id}`, defaultValue)
    switch (type) {
      case 'checkbox':
        return yo`
        <div class="input ${type}">
          <input 
            onchange="${onchange}"
            id="${id}" 
            name="${id}" 
            type="${type}"  
            ${value ? 'checked' : ''}
          >
          <label for="${id}">${label}</label>
        </div>`
        break
      case 'range':
      return yo`
      <div class="input ${type}">
        <input 
          onchange="${onchange}"
          id="${id}" 
          name="${id}" 
          type="${type}"  
          value="${value}"
          min="${min}"
          max="${max}"
          step="${step}"
        >
        <label for="${id}">${label}</label>
      </div>`
      break
    }

  })

  const $form = yo`<form>${$inputs}</form>`
  document.querySelector('body').appendChild($form)
}

