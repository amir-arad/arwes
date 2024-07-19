import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameSVGKranoxProps, createFrameSVGKranox } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGKranoxProps
  extends Omit<FrameSVGProps, keyof CreateFrameSVGKranoxProps>,
    CreateFrameSVGKranoxProps {}

const FrameSVGKranox = memo((props: FrameSVGKranoxProps): ReactElement => {
  const {
    styled,
    padding,
    strokeWidth,
    bgStrokeWidth,
    squareSize,
    smallLineLength,
    largeLineLength,
    className,
    ...otherProps
  } = props

  const frameSVGSettings = useMemo(
    () => createFrameSVGKranox(props),
    [styled, padding, strokeWidth, bgStrokeWidth, squareSize, smallLineLength, largeLineLength]
  )

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvgkranox', className)}
      {...frameSVGSettings}
    />
  )
})

export type { FrameSVGKranoxProps }
export { FrameSVGKranox }
