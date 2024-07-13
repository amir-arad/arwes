import type { AnimatorManagerName, AnimatorManager, AnimatorNode } from '../../types.js'
import {
  ANIMATOR_MANAGER_NAMES as MANAGERS,
  ANIMATOR_ACTIONS as ACTIONS,
  ANIMATOR_STATES as STATES
} from '../../constants.js'

type AnimatorManagerCreator = (node: AnimatorNode, name: AnimatorManagerName) => AnimatorManager

const createAnimatorManagerParallel: AnimatorManagerCreator = (node) => {
  const getDurationEnter = (childrenProvided?: AnimatorNode[]): number => {
    const children = childrenProvided || Array.from(node._children)
    return children.reduce((total, child) => {
      const { duration } = child._getUserSettings()
      return Math.max(total, duration.delay + duration.enter)
    }, 0)
  }

  const enterChildren = (children: AnimatorNode[]): void => {
    for (const child of children) {
      const { duration } = child._getUserSettings()
      child._scheduler.start(duration.delay, () => child.send(ACTIONS.enter))
    }
  }

  return Object.freeze({ name: MANAGERS.parallel, getDurationEnter, enterChildren })
}

const createAnimatorManagerStagger: AnimatorManagerCreator = (node, name) => {
  let reservedUntilTimeMS = 0

  const getDurationEnter = (childrenProvided?: AnimatorNode[]): number => {
    let children = childrenProvided || Array.from(node._children)

    if (!children.length) {
      return 0
    }

    if (name === MANAGERS.staggerReverse) {
      children = children.reverse()
    }

    const {
      duration: { stagger }
    } = node._getUserSettings()

    let total = 0
    let totalOffset = 0
    let index = 0

    for (const child of children) {
      const { enter, offset = 0, delay = 0 } = child.settings.duration

      totalOffset += offset
      total = Math.max(total, index * stagger + totalOffset + enter + delay)

      index++
    }

    return total
  }

  const enterChildren = (childrenProvided: AnimatorNode[]): void => {
    let children = childrenProvided || Array.from(node._children)

    if (name === MANAGERS.staggerReverse) {
      children = children.reverse()
    }

    const now = Date.now()
    const parentSettings = node._getUserSettings()
    const staggerMS = (parentSettings.duration.stagger || 0) * 1_000 // seconds to ms

    reservedUntilTimeMS = Math.max(reservedUntilTimeMS, now)

    for (const child of children) {
      const { offset = 0, delay = 0 } = child.settings.duration
      const offsetMS = offset * 1_000 // seconds to ms

      reservedUntilTimeMS = reservedUntilTimeMS + offsetMS

      const time = (reservedUntilTimeMS - now) / 1_000 // ms to seconds

      reservedUntilTimeMS = reservedUntilTimeMS + staggerMS

      child._scheduler.start(time + delay, () => child.send(ACTIONS.enter))
    }
  }

  return Object.freeze({ name, getDurationEnter, enterChildren })
}

const createAnimatorManagerSequence: AnimatorManagerCreator = (node, name) => {
  // [startTimeInMilliseconds, enterDurationInMilliseconds]
  const timelineCache = new Map<AnimatorNode, [number, number]>()

  const getDurationEnter = (childrenProvided?: AnimatorNode[]): number => {
    let children = childrenProvided || Array.from(node._children)

    if (!children.length) {
      return 0
    }

    if (name === MANAGERS.sequenceReverse) {
      children = [...children].reverse()
    }

    let total = 0
    let endTime = 0

    for (const child of children) {
      const { enter, offset = 0, delay = 0 } = child.settings.duration
      endTime += offset + enter
      total = Math.max(total, endTime + delay)
    }

    return total
  }

  const enterChildren = (childrenProvided: AnimatorNode[]): void => {
    let children = childrenProvided || Array.from(node._children)

    if (!children.length) {
      return
    }

    if (name === MANAGERS.sequenceReverse) {
      children = [...children].reverse()
    }

    const now = Date.now()

    for (const child of children) {
      const isChildAlreadyEntering = Array.from(timelineCache)
        .map(([timelineChild]) => timelineChild)
        .includes(child)

      if (isChildAlreadyEntering) {
        continue
      }

      const { duration } = child.settings
      const enterDurationInMS = duration.enter * 1_000 + duration.offset * 1_000

      const timeline = Array.from(timelineCache)
        .map(([, durations]) => durations)
        .filter(([startTime, enterDuration]) => startTime + enterDuration >= now)
        .sort((a, b) => a[0] - b[0]) // Order ascendingly.

      let startTimeInMS = 0
      let index = 0

      for (const timelineItem of timeline) {
        const itemStartTime = timelineItem[0]
        const itemEnterDuration = timelineItem[1]
        const itemEndTime = itemStartTime + itemEnterDuration
        if (index === timeline.length - 1) {
          startTimeInMS = Math.max(0, itemEndTime - now)
          break
        }
        const nextItem = timeline[index + 1]
        const nextItemStartTime = nextItem[0]

        if (nextItemStartTime - itemEndTime >= enterDurationInMS) {
          startTimeInMS = Math.max(0, itemEndTime - now)
          break
        }
        index++
      }

      timelineCache.set(child, [now + startTimeInMS, enterDurationInMS])

      const onRemove = (): void => {
        timelineCache.delete(child)
      }
      const onTransition = (): void => {
        if (child.state !== STATES.entering) {
          onRemove()
          child._watchers.delete(onRemove)
          child._subscribers.delete(onTransition)
        }
      }

      child._watchers.add(onRemove)
      child._subscribers.add(onTransition)

      const scheduleTime = startTimeInMS / 1_000 + duration.offset + duration.delay
      child._scheduler.start(scheduleTime, () => child.send(ACTIONS.enter))
    }
  }

  const destroy = (): void => {
    timelineCache.clear()
  }

  return Object.freeze({ name, getDurationEnter, enterChildren, destroy })
}

const createAnimatorManagerSwitch: AnimatorManagerCreator = (node) => {
  let nodeHiding: AnimatorNode | undefined
  let nodeVisible: AnimatorNode | undefined
  let nodeSubscriberUnsubscribe: (() => void) | undefined

  const getDurationEnter = (): number => {
    if (nodeVisible) {
      return nodeVisible.settings.duration.enter
    }

    const nodeVisibleCurrent = Array.from(node._children).find((child) => {
      const { condition } = child._getUserSettings()
      return condition ? condition(child) : true
    })

    if (nodeVisibleCurrent) {
      return nodeVisibleCurrent.settings.duration.enter
    }

    return 0
  }

  const enterChildren = (): void => {
    nodeSubscriberUnsubscribe?.()
    nodeSubscriberUnsubscribe = undefined

    const children = Array.from(node._children)
    const nodeVisibleNew = children.find((child) => {
      const { condition } = child._getUserSettings()
      return condition ? condition(child) : true
    })

    const onNextEnter = (): void => {
      if (nodeVisibleNew) {
        if (nodeVisibleNew === nodeVisible) {
          nodeVisibleNew.send(ACTIONS.enter)
        } else {
          if (nodeVisible) {
            nodeHiding = nodeVisible
            nodeSubscriberUnsubscribe = nodeHiding.subscribe((nodeHidingSubscribed) => {
              if (nodeHidingSubscribed.state === STATES.exited) {
                nodeSubscriberUnsubscribe?.()
                nodeSubscriberUnsubscribe = undefined
                nodeHiding = undefined
                nodeVisibleNew.send(ACTIONS.enter)
              }
            })
            nodeHiding?.send(ACTIONS.exit)
          } else {
            nodeVisibleNew.send(ACTIONS.enter)
            nodeHiding = undefined
          }
          nodeVisible = nodeVisibleNew
        }
      } else {
        nodeHiding = nodeVisible
        nodeVisible = undefined
      }
    }

    if (nodeHiding) {
      nodeSubscriberUnsubscribe = nodeHiding.subscribe((nodeHiding) => {
        if (nodeHiding.state === STATES.exited) {
          onNextEnter()
        }
      })
    } else {
      onNextEnter()
    }

    children
      .filter((child) => child !== nodeVisibleNew)
      .forEach((child) => child.send(ACTIONS.exit))
  }

  const destroy = (): void => {
    nodeHiding = undefined
    nodeVisible = undefined

    nodeSubscriberUnsubscribe?.()
    nodeSubscriberUnsubscribe = undefined
  }

  return Object.freeze({ name: MANAGERS.switch, getDurationEnter, enterChildren, destroy })
}

const createAnimatorManager = (
  node: AnimatorNode,
  manager: AnimatorManagerName
): AnimatorManager => {
  switch (manager) {
    case MANAGERS.stagger:
      return createAnimatorManagerStagger(node, MANAGERS.stagger)
    case MANAGERS.staggerReverse:
      return createAnimatorManagerStagger(node, MANAGERS.staggerReverse)
    case MANAGERS.sequence:
      return createAnimatorManagerSequence(node, MANAGERS.sequence)
    case MANAGERS.sequenceReverse:
      return createAnimatorManagerSequence(node, MANAGERS.sequenceReverse)
    case MANAGERS.switch:
      return createAnimatorManagerSwitch(node, MANAGERS.switch)
    default:
      return createAnimatorManagerParallel(node, MANAGERS.parallel)
  }
}

export { createAnimatorManager }
