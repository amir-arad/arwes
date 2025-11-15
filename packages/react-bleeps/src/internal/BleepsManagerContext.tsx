import type { BleepsManager } from '@arwes-amir/bleeps'
import { createContext } from 'react'

const BleepsManagerContext = createContext<BleepsManager | null>(null)

export { BleepsManagerContext }
