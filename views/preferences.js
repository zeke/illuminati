const html = require('nanohtml')
const store = require('../lib/store')
const isNumber = require('is-number')
const inputs = require('../lib/inputs')

document.addEventListener('DOMContentLoaded', () => {
  render()
})

// Save preferences whenever the form inputs change
// 
const onchange = function (event) {
  event.preventDefault()
  const form = document.querySelector('form')
  const formData = new FormData(form)
  const newPrefs = inputs
    // sort keys to make a deterministic object
    .sort((a, b) => a.id.localeCompare(b.id))
    .reduce((acc, input) => {
      const {id, type, defaultValue} = input
      switch(type) {
        case 'checkbox':
          acc[id] = !!formData.has(id)
        case 'number':
        case 'range':
          acc[id] = Number(formData.get(id))
        default:
          acc[id] = formData.get(id)
      }
      return acc
    }, {})

  store.set('preferences', newPrefs)
  // store.openInEditor()
}

function render () {
  const $inputs = inputs.map(input => {
    const {id, label, type, defaultValue, min, max, step} = input
    const value = store.get(`preferences.${id}`, defaultValue)
    switch (type) {
      case 'checkbox':
        return html`
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
      case 'color':
          return html`
          <div class="input ${type}">
            <label for="${id}">${label}</label>
            <input 
              onchange="${onchange}"
              id="${id}" 
              name="${id}" 
              type="${type}"  
              value="${value}"
            >
          </div>`
      case 'range':
        return html`
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

  const $form = html`<form>${$inputs}</form>`
  document.querySelector('body').appendChild($form)
}
