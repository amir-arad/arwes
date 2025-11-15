import React, { type ReactElement, useMemo } from 'react'
import { cx } from '@arwes-amir/tools'
import { memo } from '@arwes-amir/react-tools'
import { type CreateFrameCircleSettingsProps, createFrameCircleSettings } from '@arwes-amir/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameCircleProps = Omit<FrameBaseProps, 'settings'> & CreateFrameCircleSettingsProps

const FrameCircle = memo((props: FrameCircleProps): ReactElement => {
  const { styled, animated, padding, strokeWidth, separation, sideWidth } = props

  const settings = useMemo(
    () =>
      createFrameCircleSettings({ styled, animated, padding, strokeWidth, separation, sideWidth }),
    [styled, animated, padding, strokeWidth, separation, sideWidth]
  )
  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-framecircle', props.className)}
      settings={settings}
    />
  )
})

export type { FrameCircleProps }
export { FrameCircle }
