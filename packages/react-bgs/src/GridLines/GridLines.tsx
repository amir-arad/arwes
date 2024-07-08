import React, {
  type ForwardedRef,
  type CSSProperties,
  type ReactElement,
  useRef,
  useEffect
} from 'react'
import { cx } from '@arwes/tools'
import { memo, mergeRefs } from '@arwes/react-tools'
import { useAnimator } from '@arwes/react-animator'
import { type CreateBackgroundGridLinesSettings, createBackgroundGridLines } from '@arwes/bgs'

import { positionedStyle } from '../internal/styles.js'

interface GridLinesProps extends CreateBackgroundGridLinesSettings {
  elementRef?: ForwardedRef<HTMLCanvasElement>
  id?: string
  className?: string
  style?: CSSProperties
  positioned?: boolean
}

const GridLines = memo((props: GridLinesProps): ReactElement => {
  const { elementRef: elementRefExternal, id, className, style, positioned = true } = props

  const animator = useAnimator()
  const elementRef = useRef<HTMLCanvasElement>(null)
  const propsRef = useRef(props)

  propsRef.current = props

  useEffect(() => {
    const canvas = elementRef.current

    if (!canvas) {
      return
    }

    const background = createBackgroundGridLines({
      settings: propsRef,
      canvas,
      animator
    })

    background.start()

    return () => {
      background.stop()
    }
  }, [animator])

  return (
    <canvas
      role="presentation"
      ref={mergeRefs(elementRef, elementRefExternal)}
      id={id}
      className={cx('arwes-bgs-gridlines', className)}
      style={{ ...(positioned ? positionedStyle : null), ...style }}
    />
  )
})

export type { GridLinesProps }
export { GridLines }
