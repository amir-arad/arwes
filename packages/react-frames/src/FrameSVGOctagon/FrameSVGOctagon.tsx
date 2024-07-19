import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameSVGOctagonProps, createFrameSVGOctagon } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGOctagonProps
  extends Omit<FrameSVGProps, keyof CreateFrameSVGOctagonProps>,
    CreateFrameSVGOctagonProps {}

const FrameSVGOctagon = memo((props: FrameSVGOctagonProps): ReactElement => {
  const {
    styled,
    leftTop,
    rightTop,
    rightBottom,
    leftBottom,
    squareSize,
    strokeWidth,
    padding,
    className,
    ...otherProps
  } = props

  const frameSVGSettings = useMemo(
    () => createFrameSVGOctagon(props),
    [styled, leftTop, rightTop, rightBottom, leftBottom, squareSize, strokeWidth, padding]
  )

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvgoctagon', className)}
      {...frameSVGSettings}
    />
  )
})

export type { FrameSVGOctagonProps }
export { FrameSVGOctagon }
