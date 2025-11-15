import type { AnimatorInterface } from '@arwes-amir/animator'
import { createContext } from 'react'

const AnimatorContext = createContext<AnimatorInterface | undefined>(undefined)

export { AnimatorContext }
