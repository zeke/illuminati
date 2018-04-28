module.exports = [
  {
    id: 'always-on-top',
    label: 'Always on Top',
    type: 'checkbox',
    defaultValue: true
  },
  {
    id: 'menu-bar',
    label: 'Display in Menu Bar',
    type: 'checkbox',
    defaultValue: false
  },
  {
    id: 'dock',
    label: 'Display in Dock',
    type: 'checkbox',
    defaultValue: true
  },
  {
    id: 'brightness',
    label: 'Brightness',
    type: 'range',
    defaultValue: 1,
    min: 0,
    max: 10,
    step: 0.1
  },
  {
    id: 'contrast',
    label: 'Contrast',
    type: 'range',
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1
  },
  {
    id: 'saturate',
    label: 'Saturation',
    type: 'range',
    defaultValue: 1,
    min: 0,
    max: 10,
    step: 0.1
  },
  // {
  //   id: 'blur',
  //   label: 'Blur',
  //   type: 'range',
  //   unit: 'px',
  //   defaultValue: 0,
  //   min: 0,
  //   max: 20,
  //   step: 1
  // },
  {
    id: 'hue-rotate',
    label: 'Hue',
    type: 'range',
    unit: 'deg',
    defaultValue: 0,
    min: -360,
    max: 360,
    step: 10
  }
  // 'invert',
  // 'opacity',
  // 'sepia'
]

