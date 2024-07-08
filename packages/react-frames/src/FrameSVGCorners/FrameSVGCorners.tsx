import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type FrameSVGPathGeneric, type FrameSVGPath } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGCornersProps extends FrameSVGProps {
  strokeWidth?: number
  cornerLength?: number
  padding?: number
}

const FrameSVGCorners = memo((props: FrameSVGCornersProps): ReactElement => {
  const {
    strokeWidth: cw = 1,
    cornerLength: cl = 16,
    padding: p = 0,
    className,
    ...otherProps
  } = props

  const paths: FrameSVGPathGeneric[] = useMemo(() => {
    const co = cw / 2

    const bg: FrameSVGPathGeneric = {
      name: 'bg',
      style: {
        strokeWidth: 0,
        fill: 'var(--arwes-frames-bg-color, currentcolor)',
        filter: 'var(--arwes-frames-bg-filter)'
      },
      path: [
        ['M', cw + p, cw + p],
        ['L', cw + p, `100% - ${cw} - ${p}`],
        ['L', `100% - ${cw} - ${p}`, `100% - ${cw} - ${p}`],
        ['L', `100% - ${cw} - ${p}`, cw + p]
      ]
    }

    const linesPaths: FrameSVGPath[] = [
      // Left top.
      [
        ['M', co + p, co + p],
        ['L', co + p, cl + p]
      ],
      [
        ['M', co + p, co + p],
        ['L', cl + p, co + p]
      ],

      // Right top.
      [
        ['M', `100% - ${co} - ${p}`, co + p],
        ['L', `100% - ${cl} - ${p}`, co + p]
      ],
      [
        ['M', `100% - ${co} - ${p}`, co + p],
        ['L', `100% - ${co} - ${p}`, cl + p]
      ],

      // Right bottom.
      [
        ['M', `100% - ${co} - ${p}`, `100% - ${co} - ${p}`],
        ['L', `100% - ${cl} - ${p}`, `100% - ${co} - ${p}`]
      ],
      [
        ['M', `100% - ${co} - ${p}`, `100% - ${co} - ${p}`],
        ['L', `100% - ${co} - ${p}`, `100% - ${cl} - ${p}`]
      ],

      // Left bottom.
      [
        ['M', co + p, `100% - ${co} - ${p}`],
        ['L', co + p, `100% - ${cl} - ${p}`]
      ],
      [
        ['M', co + p, `100% - ${co} - ${p}`],
        ['L', cl + p, `100% - ${co} - ${p}`]
      ]
    ]

    const lines: FrameSVGPathGeneric[] = linesPaths.map((path) => ({
      name: 'line',
      style: {
        stroke: 'var(--arwes-frames-line-color, currentcolor)',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: String(cw),
        fill: 'none',
        filter: 'var(--arwes-frames-line-filter)'
      },
      path
    }))

    return [bg, ...lines]
  }, [cw, cl, p])

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvgcorners', className)}
      paths={paths}
    />
  )
})

export type { FrameSVGCornersProps }
export { FrameSVGCorners }
