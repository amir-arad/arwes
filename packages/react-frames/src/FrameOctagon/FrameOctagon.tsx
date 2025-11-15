import React, { type ReactElement, useMemo } from 'react'
import { cx } from '@arwes-amir/tools'
import { memo } from '@arwes-amir/react-tools'
import {
  type CreateFrameOctagonSettingsProps,
  createFrameOctagonSettings
} from '@arwes-amir/frames'

import { type FrameBaseProps, FrameBase } from '../FrameBase/index.js'

type FrameOctagonProps = Omit<FrameBaseProps, 'settings'> & CreateFrameOctagonSettingsProps

const FrameOctagon = memo((props: FrameOctagonProps): ReactElement => {
  const {
    styled,
    animated,
    padding,
    leftTop,
    rightTop,
    rightBottom,
    leftBottom,
    squareSize,
    strokeWidth
  } = props

  const settings = useMemo(
    () =>
      createFrameOctagonSettings({
        styled,
        animated,
        padding,
        leftTop,
        rightTop,
        rightBottom,
        leftBottom,
        squareSize,
        strokeWidth
      }),
    [styled, animated, padding, leftTop, rightTop, rightBottom, leftBottom, squareSize, strokeWidth]
  )

  return (
    <FrameBase
      {...props}
      className={cx('arwes-frames-frameoctagon', props.className)}
      settings={settings}
    />
  )
})

export type { FrameOctagonProps }
export { FrameOctagon }
