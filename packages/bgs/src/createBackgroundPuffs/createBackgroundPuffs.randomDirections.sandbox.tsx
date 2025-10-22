import { createAnimatorSystem } from '@arwes/animator'
import { createBackgroundPuffs } from '@arwes/bgs'

const root = document.querySelector('#root')!
const canvas = document.createElement('canvas')
Object.assign(canvas.style, { position: 'absolute', inset: 0, width: '100%', height: '100%' })
root.appendChild(canvas)

const system = createAnimatorSystem()
const animator = system.register(undefined, {
  getSettings: () => ({ duration: { interval: 3 } }),
  setSettings: () => {},
  getForeignRef: () => {},
  setForeignRef: () => {}
})

const bg = createBackgroundPuffs({
  canvas,
  animator,
  settings: {
    current: {
      color: 'hsla(120, 100%, 75%, 0.5)',
      quantity: 1000,
      padding: 20,
      xOffset: [50, -100],
      yOffset: [50, -100],
      radiusOffset: [4, 0]
    }
  }
})

bg.start()
animator.send('setup')
