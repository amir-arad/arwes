import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type CreateFrameSVGCornersProps, createFrameSVGCorners } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGCornersProps
  extends Omit<FrameSVGProps, keyof CreateFrameSVGCornersProps>,
    CreateFrameSVGCornersProps {}

const FrameSVGCorners = memo((props: FrameSVGCornersProps): ReactElement => {
  const { styled, padding, strokeWidth, cornerLength, className, ...otherProps } = props

  const frameSVGSettings = useMemo(
    () => createFrameSVGCorners(props),
    [styled, padding, strokeWidth, cornerLength]
  )

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvgcorners', className)}
      {...frameSVGSettings}
    />
  )
})

export type { FrameSVGCornersProps }
export { FrameSVGCorners }
