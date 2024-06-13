import React, {
  type ReactElement,
  type CSSProperties,
  type ForwardedRef,
  useRef,
  useEffect
} from 'react'
import { cx } from '@arwes/tools'

interface IlluminatorProps {
  color?: string
  size?: number
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGGElement>
}

const Illuminator = (props: IlluminatorProps): ReactElement => {
  const { color = 'hsl(0 0% 50% / 5%)', size = 300, className, style } = props

  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current!
    const parentElement = element.parentElement as Element

    let bounds: DOMRect
    let x: number
    let y: number
    let isVisible: boolean
    let opacity: string

    const onMove = (event: MouseEvent): void => {
      bounds = parentElement.getBoundingClientRect()
      x = event.clientX - bounds.left
      y = event.clientY - bounds.top
      isVisible =
        x >= -(size / 2) &&
        x <= bounds.width + size / 2 &&
        y >= -(size / 2) &&
        y <= bounds.height + size / 2
      opacity = isVisible ? '1' : '0'

      if (element.style.opacity !== opacity) element.style.opacity = opacity

      if (isVisible) {
        element.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
      }
    }

    const onHide = (): void => {
      if (element.style.opacity !== '0') {
        element.style.opacity = '0'
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onHide)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onHide)
    }
  }, [])

  return (
    <div
      role="presentation"
      className={cx('arwes-frames-illuminator', className)}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: size,
        height: size,
        transition: 'opacity 200ms ease-out',
        opacity: 0,
        pointerEvents: 'none',
        borderRadius: '50%',
        background: `radial-gradient(${color} 0%, transparent 70%)`,
        ...style
      }}
      ref={elementRef}
    />
  )
}

export type { IlluminatorProps }
export { Illuminator }
