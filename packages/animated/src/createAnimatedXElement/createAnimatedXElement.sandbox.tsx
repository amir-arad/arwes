import { createAnimatedXElement } from '@arwes/animated'

const root = document.querySelector('#root')!
root.innerHTML = `
  <style>
    .box {
      width: 50px;
      height: 50px;
      background: #777;
    }
  </style>
  <div class="box"><div>
`
const element = document.querySelector<HTMLElement>('.box')!

type States = 'a' | 'b' | 'c'

let state: States = 'a'
let isCancelled = false

const animatedXElement = createAnimatedXElement<States>({
  state,
  element,
  animated: {
    transitions: {
      a: { x: 0, background: '#0ff' },
      b: { x: 50, background: '#ff0' },
      c: { x: 100, background: '#f0f' }
    }
  }
})

const update = (): void => {
  if (isCancelled) {
    return
  }
  switch (state) {
    case 'a':
      state = 'b'
      break
    case 'b':
      state = 'c'
      break
    default:
      state = 'a'
      break
  }
  animatedXElement.update({ state })
  setTimeout(update, 1_000)
}

element.addEventListener('dblclick', () => {
  animatedXElement.cancel()
  isCancelled = true
})

update()
