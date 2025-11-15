import React, { type ReactElement, useMemo } from 'react'
import { cx } from '@arwes-amir/tools'
import { memo } from '@arwes-amir/react-tools'
import {
  type CreateFrameCornersSettingsProps,
  createFrameCornersSettings
} from '@arwes-amir/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameCornersProps = Omit<FrameBaseProps, 'settings'> & CreateFrameCornersSettingsProps

const FrameCorners = memo((props: FrameCornersProps): ReactElement => {
  const { styled, animated, padding, strokeWidth, cornerLength } = props

  const settings = useMemo(
    () => createFrameCornersSettings({ styled, animated, padding, strokeWidth, cornerLength }),
    [styled, animated, padding, strokeWidth, cornerLength]
  )
  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-framecorners', props.className)}
      settings={settings}
    />
  )
})

export type { FrameCornersProps }
export { FrameCorners }
