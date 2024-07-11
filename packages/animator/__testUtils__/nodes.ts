/* istanbul ignore file */

import type { AnimatorControl, AnimatorInterface, AnimatorSettingsPartial } from '../src/types'
import { ANIMATOR_DEFAULT_SETTINGS } from '../src/constants'
import { createAnimatorSystem } from '../src/createAnimatorSystem'

const createAnimatorInterface = (
  parentInterface?: AnimatorInterface,
  settings?: AnimatorSettingsPartial
): AnimatorInterface => {
  let dynamic: AnimatorSettingsPartial | null = {}
  let foreign: any = null
  const control: AnimatorControl = {
    getSettings: () => ({
      ...ANIMATOR_DEFAULT_SETTINGS,
      ...settings,
      ...dynamic,
      // @ts-expect-error accept unknown duration values
      duration: {
        ...ANIMATOR_DEFAULT_SETTINGS.duration,
        ...settings?.duration,
        ...dynamic?.duration
      }
    }),
    getDynamicSettings: () => dynamic,
    setDynamicSettings: (value) => {
      dynamic = value === null ? null : { ...dynamic, ...value }
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

export { createAnimatorInterface }
