import { AnimatorContext } from '../internal/AnimatorContext/index.js'
import type { AnimatorInterface } from '@arwes-amir/animator'
import { useContext } from 'react'

const useAnimator = (): AnimatorInterface | undefined => {
  return useContext(AnimatorContext)
}

export { useAnimator }
