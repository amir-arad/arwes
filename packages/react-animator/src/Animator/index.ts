import { Animator as Component } from './Animator.js'
import { memo } from '@arwes-amir/react-tools'

// TODO: Optimize props comparision.
const Animator = memo(Component)

export * from './Animator.js'
export { Animator }
