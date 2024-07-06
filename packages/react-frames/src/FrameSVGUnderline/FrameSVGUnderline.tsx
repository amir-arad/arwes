import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import type { FrameSVGPathGeneric } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGUnderlineProps extends FrameSVGProps {
  squareSize?: number
  strokeWidth?: number
  padding?: number
  className?: string
}

const FrameSVGUnderline = (props: FrameSVGUnderlineProps): ReactElement => {
  const {
    squareSize: ss = 16,
    strokeWidth: sw = 1,
    padding: p = 0,
    className,
    ...otherProps
  } = props

  const paths: FrameSVGPathGeneric[] = useMemo(() => {
    const so = sw / 2

    return [
      {
        name: 'bg',
        style: {
          strokeWidth: 0,
          fill: 'currentcolor'
        },
        path: [
          ['M', p, p],
          ['L', p, `100% - ${p}`],
          ['L', `100% - ${ss} - ${p}`, `100% - ${p}`],
          ['L', `100% - ${p}`, `100% - ${ss} - ${p}`],
          ['L', `100% - ${p}`, p]
        ]
      },
      {
        name: 'line',
        style: {
          stroke: 'currentcolor',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: String(sw),
          fill: 'none'
        },
        path: [
          ['M', so + p, `100% - ${so} - ${p}`],
          ['L', `100% - ${ss} - ${p}`, `100% - ${so} - ${p}`],
          ['L', `100% - ${so} - ${p}`, `100% - ${ss - so} - ${p}`]
        ]
      }
    ]
  }, [ss, sw, p])

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvgunderline', className)}
      paths={paths}
    />
  )
}

export type { FrameSVGUnderlineProps }
export { FrameSVGUnderline }
