import type { TOScheduler } from '@arwes/tools'

export type AnimatorControl = {
  /**
   * Get the animator settings.
   * @returns Animator settings.
   */
  readonly getSettings: () => AnimatorSettingsPartial
  /**
   * Set the animator settings.
   * @param settings - New dynamic settings.
   */
  readonly setSettings: (settings: AnimatorSettingsPartial | null) => void
  /**
   * Get the foreign value stored for this animator.
   */
  readonly getForeign: () => unknown
  /**
   * Set a foreign value to store for this animator.
   * It is like a data which can be used for any purpose in the animator.
   * @param foreign - Any value.
   */
  readonly setForeign: (foreign: unknown) => void
}

export type AnimatorState = 'entered' | 'entering' | 'exiting' | 'exited'

export type AnimatorAction =
  | 'setup'
  | 'enter'
  | 'enterEnd'
  | 'exit'
  | 'exitEnd'
  | 'update'
  | 'refresh'

export type AnimatorManagerName =
  | 'parallel'
  | 'stagger'
  | 'staggerReverse'
  | 'sequence'
  | 'sequenceReverse'
  | 'switch'

export type AnimatorSubscriber = (node: AnimatorNode) => void
export type AnimatorWatcher = (node: AnimatorNode) => void

export interface AnimatorManager {
  readonly name: AnimatorManagerName
  readonly getDurationEnter: (childrenNodes?: AnimatorNode[]) => number
  readonly enterChildren: (childrenNodes: AnimatorNode[]) => void
  readonly exitChildren: (childrenNodes: AnimatorNode[]) => void
  readonly destroy: () => void
}

export interface AnimatorNode {
  readonly _parent?: AnimatorNode
  readonly _children: Set<AnimatorNode>
  readonly _subscribers: Set<AnimatorSubscriber>
  readonly _watchers: Set<AnimatorWatcher>
  readonly _scheduler: TOScheduler
  readonly _getUserSettings: () => AnimatorSettings
  _manager: AnimatorManager

  readonly id: string
  readonly state: AnimatorState
  readonly control: AnimatorControl
  readonly settings: AnimatorSettings
  readonly subscribe: (subscriber: AnimatorSubscriber) => () => void
  readonly unsubscribe: (subscriber: AnimatorSubscriber) => void
  readonly send: (newAction: AnimatorAction) => void
}

export type AnimatorSystemRegisterSetup = {
  getSettings: () => AnimatorSettingsPartial
}

export interface AnimatorSystem {
  readonly id: string
  readonly root: AnimatorNode | null
  readonly register: (
    parentNode?: undefined | null | AnimatorNode,
    setup?: AnimatorSystemRegisterSetup
  ) => AnimatorNode
  readonly unregister: (node: AnimatorNode) => void
}

export interface AnimatorDuration {
  enter: number
  exit: number
  delay: number
  offset: number
  stagger: number
  limit: number
  [duration: string]: number
}

export interface AnimatorSettings {
  active: boolean
  duration: AnimatorDuration
  manager: AnimatorManagerName
  merge: boolean
  combine: boolean
  initialState: 'exited' | 'entered'
  condition?: boolean | ((node: AnimatorNode) => boolean)
  onTransition?: (node: AnimatorNode) => void
}

export type AnimatorSettingsPartial = Partial<Omit<AnimatorSettings, 'duration'>> & {
  duration?: Partial<AnimatorDuration>
}

export interface AnimatorInterface {
  readonly system: AnimatorSystem
  readonly node: AnimatorNode
}
