import type { ReactElement } from 'react'
import { type BleepsOnAnimatorProps, BleepsOnAnimator } from '@arwes/react'
import { type BleepNames } from '@/config'

const AppBleepsOnAnimator = (props: BleepsOnAnimatorProps<BleepNames>): ReactElement => {
  return <BleepsOnAnimator<BleepNames> {...props} />
}

export { AppBleepsOnAnimator }
