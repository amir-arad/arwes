import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameSVGLinesProps, createFrameSVGLines } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGLinesProps
  extends Omit<FrameSVGProps, keyof CreateFrameSVGLinesProps>,
    CreateFrameSVGLinesProps {}

const FrameSVGLines = memo((props: FrameSVGLinesProps): ReactElement => {
  const {
    styled,
    padding,
    largeLineWidth,
    smallLineWidth,
    smallLineLength,
    className,
    ...otherProps
  } = props

  const frameSettings = useMemo(
    () => createFrameSVGLines(props),
    [styled, padding, largeLineWidth, smallLineWidth, smallLineLength]
  )

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvglines', className)}
      {...frameSettings}
    />
  )
})

export type { FrameSVGLinesProps }
export { FrameSVGLines }
