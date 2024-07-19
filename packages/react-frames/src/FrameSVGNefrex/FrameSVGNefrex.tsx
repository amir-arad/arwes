import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameSVGNefrexProps, createFrameSVGNefrex } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGNefrexProps
  extends Omit<FrameSVGProps, keyof CreateFrameSVGNefrexProps>,
    CreateFrameSVGNefrexProps {}

const FrameSVGNefrex = memo((props: FrameSVGNefrexProps): ReactElement => {
  const {
    styled,
    squareSize,
    strokeWidth,
    smallLineLength,
    largeLineLength,
    padding,
    className,
    ...otherProps
  } = props

  const frameSVGSettings = useMemo(
    () => createFrameSVGNefrex(props),
    [styled, squareSize, strokeWidth, smallLineLength, largeLineLength, padding]
  )

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvgnefrex', className)}
      {...frameSVGSettings}
    />
  )
})

export type { FrameSVGNefrexProps }
export { FrameSVGNefrex }
