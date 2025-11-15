import type { AnimatorInterface } from '@arwes-amir/animator'
import { createContext } from 'solid-js'

export const AnimatorContext = createContext<() => AnimatorInterface | undefined>()
