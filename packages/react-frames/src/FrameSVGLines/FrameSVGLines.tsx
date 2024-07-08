import React, { useMemo, type ReactElement } from 'react'
import { cx } from '@arwes/tools'
import { memo } from '@arwes/react-tools'
import { type FrameSVGPathGeneric, type FrameSVGPath, type FrameSVGStyle } from '@arwes/frames'

import { type FrameSVGProps, FrameSVG } from '../FrameSVG/index.js'

interface FrameSVGLinesProps extends FrameSVGProps {
  padding?: number
  largeLineWidth?: number
  smallLineWidth?: number
  smallLineLength?: number
}

const FrameSVGLines = memo((props: FrameSVGLinesProps): ReactElement => {
  const {
    padding: p = 0,
    largeLineWidth: llw = 1,
    smallLineWidth: slw = 1,
    smallLineLength: sll = 16,
    className,
    ...otherProps
  } = props

  const paths: FrameSVGPathGeneric[] = useMemo(() => {
    const polylineStyle: FrameSVGStyle = {
      strokeLinecap: 'square',
      stroke: 'var(--arwes-frames-line-color, currentcolor)',
      filter: 'var(--arwes-frames-line-filter)',
      fill: 'none'
    }

    const llo = llw / 2
    const slo = slw / 2

    const largePolylines: FrameSVGPath[] = [
      // Top
      [
        ['M', llo + p, llo + p],
        ['L', '50% + 0.1', llo + p]
      ],
      [
        ['M', `100% - ${llo + p}`, llo + p],
        ['L', '50% - 0.1', llo + p]
      ],

      // Bottom
      [
        ['M', llo + p, `100% - ${llo + p}`],
        ['L', '50% + 0.1', `100% - ${llo + p}`]
      ],
      [
        ['M', `100% - ${llo + p}`, `100% - ${llo + p}`],
        ['L', '50% - 0.1', `100% - ${llo + p}`]
      ]
    ]

    const smallPolylines: FrameSVGPath[] = [
      // Top
      [
        ['M', slo + p, llw + slo + p],
        ['L', sll + slo + p, llw + slo + p]
      ],
      [
        ['M', `100% - ${slo + p}`, llw + slo + p],
        ['L', `100% - ${sll + slo + p}`, llw + slo + p]
      ],

      // Bottom
      [
        ['M', slo + p, `100% - ${llw + slo + p}`],
        ['L', sll + slo + p, `100% - ${llw + slo + p}`]
      ],
      [
        ['M', `100% - ${slo + p}`, `100% - ${llw + slo + p}`],
        ['L', `100% - ${sll + slo + p}`, `100% - ${llw + slo + p}`]
      ]
    ]

    return [
      {
        name: 'bg',
        style: {
          strokeWidth: 0,
          fill: 'var(--arwes-frames-bg-color, currentcolor)',
          filter: 'var(--arwes-frames-bg-filter)'
        },
        path: [
          ['M', p, p],
          ['L', p, `100% - ${p}`],
          ['L', `100% - ${p}`, `100% - ${p}`],
          ['L', `100% - ${p}`, p]
        ]
      },
      ...largePolylines.map((polyline) => ({
        name: 'line',
        style: {
          ...polylineStyle,
          strokeWidth: String(llw)
        },
        path: polyline
      })),
      ...smallPolylines.map((polyline) => ({
        name: 'line',
        style: {
          ...polylineStyle,
          strokeWidth: String(slw)
        },
        path: polyline
      }))
    ]
  }, [p, llw, slw, sll])

  return (
    <FrameSVG
      {...otherProps}
      className={cx('arwes-frames-framesvglines', className)}
      paths={paths}
    />
  )
})

export type { FrameSVGLinesProps }
export { FrameSVGLines }
