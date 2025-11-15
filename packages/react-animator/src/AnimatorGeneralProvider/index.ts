import { AnimatorGeneralProvider as Component } from './AnimatorGeneralProvider.js'
import { memo } from '@arwes-amir/react-tools'

// TODO: Optimize props comparision.
const AnimatorGeneralProvider = memo(Component)

export * from './AnimatorGeneralProvider.js'
export { AnimatorGeneralProvider }
