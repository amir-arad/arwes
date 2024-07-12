import { isBrowser } from '@arwes/tools'

import type { AnimatorNode, AnimatorState, AnimatorAction } from '../../types.js'
import { ANIMATOR_STATES as STATES, ANIMATOR_ACTIONS as ACTIONS } from '../../constants.js'
import { createAnimatorManager } from '../../internal/createAnimatorManager/index.js'

type ActionProcedure =
  | (() => AnimatorState)
  | (() => { duration: number; state: AnimatorState })
  | (() => void)

type StatesMap = {
  [P in AnimatorState | '*']?: {
    onEntry?: {
      execute?: () => void
      schedule?: () => { duration: number; action: AnimatorAction }
    }
    onActions?: {
      [P in AnimatorAction]?: AnimatorState | ActionProcedure
    }
  }
}

interface AnimatorMachine {
  getState: () => AnimatorState
  send: (action: AnimatorAction) => void
}

const createAnimatorMachine = (
  node: AnimatorNode,
  initialState: AnimatorState
): AnimatorMachine => {
  let state: AnimatorState = initialState

  const statesMap: StatesMap = {
    [STATES.exited]: {
      onActions: {
        [ACTIONS.enter]: STATES.entering,

        [ACTIONS.setup]: () => {
          const settings = node._getUserSettings()

          if (node._parent) {
            const parentSettings = node._parent._getUserSettings()

            switch (node._parent.state) {
              case STATES.entering: {
                if (
                  (parentSettings.combine || settings.merge) &&
                  (settings.condition ? settings.condition(node) : true)
                ) {
                  node._parent._manager.enterChildren([node])
                }
                break
              }
              // If the parent has already entered, enter the incoming children whether
              // they have "merge" setting or the parent is in "combine" setting.
              case STATES.entered: {
                if (settings.condition ? settings.condition(node) : true) {
                  node._parent._manager.enterChildren([node])
                }
                break
              }
            }
          } else {
            const isActive = settings.active === undefined || settings.active

            if (isActive) {
              if (settings.duration.delay > 0) {
                return {
                  duration: settings.duration.delay,
                  state: STATES.entering
                }
              }
              return STATES.entering
            }
          }
        }
      }
    },

    [STATES.entering]: {
      onEntry: {
        execute: () => {
          const settings = node._getUserSettings()
          const children = Array.from(node._children).filter((child) => {
            const childSettings = child._getUserSettings()
            if (childSettings.condition ? !childSettings.condition(child) : false) {
              return false
            }
            if (settings.combine) {
              return true
            }
            return childSettings.merge
          })

          node._manager.enterChildren(children)
        },

        schedule: () => ({
          duration: node.settings.duration.enter,
          action: ACTIONS.enterEnd
        })
      },

      onActions: {
        [ACTIONS.enterEnd]: STATES.entered,
        [ACTIONS.exit]: STATES.exiting
      }
    },

    [STATES.entered]: {
      onEntry: {
        execute: () => {
          const settings = node._getUserSettings()

          if (settings.combine) {
            return
          }

          const children = Array.from(node._children).filter((child) => {
            const childSettings = child._getUserSettings()
            return (
              !childSettings.merge &&
              (childSettings.condition ? childSettings.condition(child) : true)
            )
          })

          node._manager.enterChildren(children)
        }
      },

      onActions: {
        [ACTIONS.exit]: STATES.exiting
      }
    },

    [STATES.exiting]: {
      onEntry: {
        execute: () => {
          Array.from(node._children).forEach((child) => {
            if (child.state === STATES.entering || child.state === STATES.entered) {
              child.send(ACTIONS.exit)
            } else if (child.state === STATES.exited) {
              child._scheduler.stopAll()
            }
            // If the child is EXITING, it will go to EXITED soon.
          })
        },

        schedule: () => ({
          duration: node.settings.duration.exit,
          action: ACTIONS.exitEnd
        })
      },

      onActions: {
        [ACTIONS.exitEnd]: STATES.exited,
        [ACTIONS.enter]: STATES.entering
      }
    },

    '*': {
      onActions: {
        [ACTIONS.update]: () => {
          const settings = node._getUserSettings()

          if (settings.manager !== node._manager.name) {
            node._manager.destroy?.()
            node._manager = createAnimatorManager(node, settings.manager)
          }

          if (!node._parent) {
            const isActive =
              (settings.active as boolean | undefined) === true || settings.active === undefined

            if ((state === STATES.exited || state === STATES.exiting) && isActive) {
              if (settings.duration.delay > 0) {
                return {
                  duration: settings.duration.delay,
                  state: STATES.entering
                }
              }
              return STATES.entering
            }
            //
            else if ((state === STATES.entered || state === STATES.entering) && !isActive) {
              return STATES.exiting
            }
          }
        },

        [ACTIONS.refresh]: () => {
          const settings = node._getUserSettings()

          // Get each child settings once in this scope for performance.
          const childrenWithSettings = Array.from(node._children).map((child) => ({
            node: child,
            settings: child._getUserSettings()
          }))

          // Exit the applicable children inmediately by sending the exit action right away,
          // and then enter the applicable children asynchronously with `node._manager.enterChildren()`.
          if (node.state === STATES.entering || node.state === STATES.entered) {
            const childrenInEnterToExit = childrenWithSettings
              .filter(
                (child) =>
                  child.node.state === STATES.entering || child.node.state === STATES.entered
              )
              .filter((child) => {
                if (node.state === STATES.entering) {
                  return settings.combine || child.settings.merge
                }
                return true
              })
              .filter((child) => {
                const { condition } = child.settings
                return condition ? !condition(child.node) : false
              })
              .map((child) => child.node)

            const childrenInExitToEnter = childrenWithSettings
              .filter(
                (child) => child.node.state === STATES.exiting || child.node.state === STATES.exited
              )
              .filter((child) => {
                const { condition } = child.settings
                return condition ? condition(child.node) : true
              })
              .map((child) => child.node)

            childrenInEnterToExit.forEach((child) => child.send(ACTIONS.exit))

            node._manager.enterChildren(childrenInExitToEnter)
          }
        }
      }
    }
  }

  const transition = (newState: AnimatorState): void => {
    if (!newState || state === newState) {
      return
    }

    state = newState

    const { onEntry } = statesMap[state] || {}
    const { onTransition } = node.control.getSettings()

    node._scheduler.stopAll()

    if (onEntry?.execute) {
      onEntry.execute()
    }

    if (onEntry?.schedule) {
      const task = onEntry.schedule()
      node._scheduler.start(task.duration, () => send(task.action))
    }

    onTransition?.(node)

    for (const subscriber of node._subscribers) {
      subscriber(node)
    }
  }

  const processAction = (procedure: AnimatorState | ActionProcedure | undefined): void => {
    if (procedure === undefined) {
      return
    }

    if (typeof procedure === 'string') {
      transition(procedure)
    } else {
      const newState = procedure()
      if (typeof newState === 'object' && newState !== null) {
        node._scheduler.start(newState.duration, () => transition(newState.state))
      } else if (newState) {
        transition(newState)
      }
    }
  }

  const getState = (): AnimatorState => state

  const send = (action: AnimatorAction): void => {
    // In non-browser environments, there are no transitions.
    if (!isBrowser()) {
      return
    }

    processAction(statesMap[state]?.onActions?.[action])
    processAction(statesMap['*']?.onActions?.[action])
  }

  const machine: AnimatorMachine = Object.freeze({ getState, send })

  return machine
}

export { createAnimatorMachine }
