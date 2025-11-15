import { type Bleep, useBleeps } from '@arwes-amir/react'

import { type BleepNames } from '@/config'

const useAppBleeps = (): Record<BleepNames, Bleep | null> => {
  return useBleeps<BleepNames>()
}

export { useAppBleeps }
