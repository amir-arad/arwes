import { createTOScheduler, filterProps } from '@arwes/tools'

import type {
  AnimatorControl,
  AnimatorSubscriber,
  AnimatorWatcher,
  AnimatorNode,
  AnimatorSystem,
  AnimatorSettings
} from '../types.js'
import { ANIMATOR_DEFAULT_SETTINGS } from '../constants.js'
import { createAnimatorMachine } from '../internal/createAnimatorMachine/index.js'
import { createAnimatorManager } from '../internal/createAnimatorManager/index.js'

const createAnimatorSystem = (): AnimatorSystem => {
  const systemId = `s${Math.random()}`.replace('.', '')

  let nodeIdCounter = 0
  let root: AnimatorNode | undefined

  const createNode = (
    parent: AnimatorNode | undefined | null,
    control: AnimatorControl
  ): AnimatorNode => {
    const nodeId = `${systemId}-n${nodeIdCounter++}`

    // The node object reference is passed around in multiple places with some
    // circular references, so this is an object base and later is modified
    // with specific readonly and writable properties.
    const node = { id: nodeId } as unknown as AnimatorNode

    const initialSettings = control.getSettings()
    const machine = createAnimatorMachine(
      node,
      initialSettings?.initialState ?? ANIMATOR_DEFAULT_SETTINGS.initialState
    )
    const manager = createAnimatorManager(
      node,
      initialSettings?.manager ?? ANIMATOR_DEFAULT_SETTINGS.manager
    )

    const nodeProps: { [P in keyof AnimatorNode]: PropertyDescriptor } = {
      _parent: {
        value: parent,
        enumerable: true
      },
      _children: {
        value: new Set<AnimatorNode>(),
        enumerable: true
      },
      _subscribers: {
        value: new Set<AnimatorSubscriber>(),
        enumerable: true
      },
      _watchers: {
        value: new Set<AnimatorWatcher>(),
        enumerable: true
      },
      _scheduler: {
        value: createTOScheduler(),
        enumerable: true
      },
      _getUserSettings: {
        value: () => {
          const settings = node.control.getSettings()
          return {
            ...ANIMATOR_DEFAULT_SETTINGS,
            ...filterProps(settings),
            duration: {
              ...ANIMATOR_DEFAULT_SETTINGS.duration,
              ...(settings.duration ? filterProps(settings.duration) : null)
            }
          }
        },
        enumerable: true
      },
      _manager: {
        value: manager,
        enumerable: true,
        writable: true
      },

      id: {
        value: nodeId,
        enumerable: true
      },
      state: {
        get: () => machine.getState(),
        enumerable: true
      },
      control: {
        value: control,
        enumerable: true
      },
      settings: {
        get: (): AnimatorSettings => {
          const settings = node._getUserSettings()
          let enter = settings.duration.enter
          if (settings.combine) {
            const children = Array.from(node._children).filter((child) => {
              const { condition } = child._getUserSettings()
              return condition ? condition(child) : true
            })
            enter = node._manager.getDurationEnter(children)
          }
          return { ...settings, duration: { ...settings.duration, enter } }
        },
        enumerable: true
      },
      subscribe: {
        value: (subscriber: AnimatorSubscriber): (() => void) => {
          node._subscribers.add(subscriber)
          subscriber(node)
          return () => node._subscribers.delete(subscriber)
        },
        enumerable: true
      },
      unsubscribe: {
        value: (subscriber: AnimatorSubscriber): void => {
          node._subscribers.delete(subscriber)
        },
        enumerable: true
      },
      send: {
        value: machine.send,
        enumerable: true
      }
    }

    Object.defineProperties(node, nodeProps)

    if (parent) {
      parent._children.add(node)
    }

    return node
  }

  const removeNode = (node: AnimatorNode): void => {
    node._scheduler.stopAll()

    for (const child of node._children) {
      removeNode(child)
    }

    if (node._parent) {
      node._parent._children.delete(node)
    }

    node._children.clear()
    node._subscribers.clear()
    node._watchers.clear()
  }

  const register = (
    parentNode: AnimatorNode | undefined | null,
    control: AnimatorControl
  ): AnimatorNode => {
    if (parentNode === undefined || parentNode === null) {
      if (root) {
        throw new Error(
          'The animator root node must be unregistered before registering another root node.'
        )
      }

      root = createNode(undefined, control)

      return root
    }

    if (!root) {
      throw new Error(
        'An animator root node needs to be registered first in the system before registering children nodes.'
      )
    }

    return createNode(parentNode, control)
  }

  const unregister = (node: AnimatorNode): void => {
    if (!root) {
      return
    }

    for (const watcher of node._watchers) {
      watcher(node)
    }

    removeNode(node)

    if (root.id === node.id) {
      root = undefined
    }
  }

  // System object reference so it can have dynamic object properties setup later.
  const system = {} as unknown as AnimatorSystem

  const systemProps: { [P in keyof AnimatorSystem]: PropertyDescriptor } = {
    id: {
      value: systemId,
      enumerable: true
    },
    root: {
      get: () => root,
      enumerable: true
    },
    register: {
      value: register,
      enumerable: true
    },
    unregister: {
      value: unregister,
      enumerable: true
    }
  }

  Object.defineProperties(system, systemProps)

  return system
}

export { createAnimatorSystem }
