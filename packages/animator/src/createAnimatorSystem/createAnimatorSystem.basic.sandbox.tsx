// The "createAnimatorSystem" API is supposed to be used with abstractions APIs
// such as packages "@arwes/react-animator" and "@arwes/react-animated".
// This is just a demostration example on how the API could be used.

import { animate } from 'motion'
import {
  type AnimatorControl,
  type AnimatorNode,
  type AnimatorSettingsPartial,
  type AnimatorInterface,
  createAnimatorSystem
} from '@arwes/animator'

// An example utility to scaffold an animator interface.
// An animator interface contains the current node and the system it belongs to.
const createAnimator = (
  parentInterface?: AnimatorInterface,
  initialSettings?: AnimatorSettingsPartial
): AnimatorInterface => {
  let settings: AnimatorSettingsPartial = {
    ...initialSettings,
    duration: { ...initialSettings?.duration }
  }
  let foreign: any = null

  // Animator node control.
  // It is used as a link between the external components and the animator node.
  const control: AnimatorControl = {
    getSettings: () => settings,
    setSettings: (value) => {
      settings = { ...settings, ...value, duration: { ...settings?.duration, ...value?.duration } }
    },
    getForeignRef: () => foreign,
    setForeignRef: (value) => {
      foreign = value
    }
  }

  if (parentInterface) {
    const system = parentInterface.system
    const node = system.register(parentInterface.node, control)
    return { system, node }
  }

  const system = createAnimatorSystem()
  const node = system.register(undefined, control)
  return { system, node }
}

// An example utility to bind and HTMLElement to an animator node.
const createAnimated = (element: HTMLElement, node: AnimatorNode): void => {
  node.subscribe(() => {
    switch (node.state) {
      case 'entering': {
        animate(
          element,
          { x: [0, 100], background: ['#0ff', '#ff0'] },
          { duration: node.settings.duration.enter }
        )
        break
      }
      case 'exiting': {
        animate(
          element,
          { x: [100, 0], background: ['#ff0', '#0ff'] },
          { duration: node.settings.duration.exit }
        )
        break
      }
    }
  })
}

//
// HTML.
//

const rootElement = document.querySelector('#root')!
rootElement.innerHTML = `
  <style>
    .item {
      margin: 1rem;
      width: 3rem;
      height: 1rem;
      background: #777;
    }
    .margin-left {
      margin-left: 2rem;
    }
  </style>

  <div>
    <div id="parent" class="item"></div>
    <div class="margin-left">
      <div id="child1" class="item"></div>
      <div id="child2" class="item"></div>
      <div id="child3" class="item"></div>
    </div>
  </div>
`

//
// State.
//

let active = true

//
// Setup animators and animated.
//

const parentElement = rootElement.querySelector<HTMLDivElement>('#parent')!
const parent = createAnimator(undefined, { active, combine: true, manager: 'sequence' })
createAnimated(parentElement, parent.node)

const child1Element = rootElement.querySelector<HTMLDivElement>('#child1')!
const child1 = createAnimator(parent)
createAnimated(child1Element, child1.node)

const child2Element = rootElement.querySelector<HTMLDivElement>('#child2')!
const child2 = createAnimator(parent)
createAnimated(child2Element, child2.node)

const child3Element = rootElement.querySelector<HTMLDivElement>('#child3')!
const child3 = createAnimator(parent)
createAnimated(child3Element, child3.node)

//
// Schedule animators setup.
//

queueMicrotask(() => child1.node.send('setup'))
queueMicrotask(() => child2.node.send('setup'))
queueMicrotask(() => child3.node.send('setup'))
queueMicrotask(() => parent.node.send('setup'))

//
// Schedule animators update.
//

const update = (): void => {
  active = !active
  parent.node.control.setSettings({ active })

  queueMicrotask(() => parent.node.send('update'))

  // When a node updates its settings, trigger an update event so it can
  // review the changes and act accordingly.
  setTimeout(update, active ? 2_000 : 1_000)
}

update()
