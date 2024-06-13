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

interface GridLinesProps extends CreateBackgroundGridLinesSettings {
  elementRef?: ForwardedRef<HTMLCanvasElement>
  className?: string
  style?: CSSProperties
}

const GridLines = memo((props: GridLinesProps): ReactElement => {
  const { elementRef: elementRefExternal, className, style } = props

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
      className={cx('arwes-bgs-gridlines', className)}
      style={style}
    />
  )
})

export type { GridLinesProps }
export { GridLines }
