import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameSVGUnderlineProps, createFrameSVGUnderline } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGUnderlineProps
  extends Omit<FrameSVGProps, keyof CreateFrameSVGUnderlineProps>,
    CreateFrameSVGUnderlineProps {}

const FrameSVGUnderline = memo((props: FrameSVGUnderlineProps): ReactElement => {
  const { styled, squareSize, strokeWidth, padding, className, ...otherProps } = props

  const frameSVGSettings = useMemo(
    () => createFrameSVGUnderline(props),
    [styled, squareSize, strokeWidth, padding]
  )

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvgunderline', className)}
      {...frameSVGSettings}
    />
  )
})

export type { FrameSVGUnderlineProps }
export { FrameSVGUnderline }
