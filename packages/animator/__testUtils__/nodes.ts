/* istanbul ignore file */

import type { AnimatorControl, AnimatorInterface, AnimatorSettingsPartial } from '../src/types'
import { createAnimatorSystem } from '../src/createAnimatorSystem'

const createAnimator = (
  parentInterface?: AnimatorInterface,
  initialSettings?: AnimatorSettingsPartial
): AnimatorInterface => {
  let settings: AnimatorSettingsPartial = {
    ...initialSettings,
    duration: { ...initialSettings?.duration }
  }
  let foreign: any = null

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

export { createAnimator }
