import { useContext } from 'react'

import type { AnimatorInterface } from '@arwes/animator'
import { AnimatorContext } from '../internal/AnimatorContext/index.js'

const useAnimator = (): AnimatorInterface | undefined => {
  return useContext(AnimatorContext)
}

export { useAnimator }
