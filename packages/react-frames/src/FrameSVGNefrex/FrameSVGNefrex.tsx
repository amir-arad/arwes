import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type FrameSVGPath, type FrameSVGStyle, type FrameSVGPathGeneric } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGNefrexProps extends FrameSVGProps {
  squareSize?: number
  padding?: number
  strokeWidth?: number
  smallLineLength?: number
  largeLineLength?: number
}

type Point = [number | string, number | string]

const toPath = (points: Point[]): FrameSVGPath => points.map((p, i) => [i === 0 ? 'M' : 'L', ...p])

const FrameSVGNefrex = memo((props: FrameSVGNefrexProps): ReactElement => {
  const {
    squareSize: ss = 16,
    strokeWidth = 1,
    smallLineLength: sll = 16,
    largeLineLength: lll = 64,
    padding: p = 0,
    className,
    ...otherProps
  } = props

  const paths = useMemo(() => {
    const so = strokeWidth / 2 // Stroke offset.

    const polylineStyle: FrameSVGStyle = {
      filter: 'var(--arwes-frames-line-filter)',
      stroke: 'var(--arwes-frames-line-color, currentcolor)',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: String(strokeWidth),
      fill: 'none'
    }

    const leftTopLine: Point[] = [
      [so + p, sll + ss + so + p],
      [so + p, ss + so + p],
      [ss + so + p, so + p],
      [ss + lll + so + p, so + p]
    ]

    const rightBottomLine: Point[] = [
      [`100% - ${so + p}`, `100% - ${sll + ss + so + p}`],
      [`100% - ${so + p}`, `100% - ${ss + so + p}`],
      [`100% - ${ss + so + p}`, `100% - ${so + p}`],
      [`100% - ${ss + lll + so + p}`, `100% - ${so + p}`]
    ]

    const paths: FrameSVGPathGeneric[] = [
      {
        name: 'bg',
        style: {
          strokeWidth: 0,
          fill: 'var(--arwes-frames-bg-color, currentcolor)',
          filter: 'var(--arwes-frames-bg-filter)'
        },
        path: toPath(
          leftTopLine
            .concat([[`100% - ${so + p}`, so + p]])
            .concat(rightBottomLine)
            .concat([[so + p, `100% - ${so + p}`]])
        )
      },
      {
        name: 'line',
        style: polylineStyle,
        path: toPath(leftTopLine)
      },
      {
        name: 'line',
        style: polylineStyle,
        path: toPath(rightBottomLine)
      }
    ]

    return paths
  }, [sll, lll, ss, strokeWidth, p])

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvgnefrex', className)}
      paths={paths}
    />
  )
})

export type { FrameSVGNefrexProps }
export { FrameSVGNefrex }
