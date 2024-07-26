import React, {
  type SVGAttributes,
  type ForwardedRef,
  type ReactElement,
  type CSSProperties,
  useRef,
  useEffect
} from 'react'
import { cx } from '@arwes/tools'
import { memo, mergeRefs } from '@arwes/react-tools'
import { type FrameSVGSettings, renderFrameSVG } from '@arwes/frames'

interface FrameSVGProps extends SVGAttributes<SVGSVGElement>, Partial<FrameSVGSettings> {
  elementRef?: ForwardedRef<SVGSVGElement>
  positioned?: boolean
  onRender?: (svg: SVGSVGElement, width: number, height: number) => void
}

const positionedStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'block',
  border: 0,
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%'
}

const FrameSVG = memo((props: FrameSVGProps): ReactElement => {
  const {
    elementRef,
    className,
    style,
    positioned = true,
    children,
    elements,
    onRender: onRenderExternal,
    ...otherProps
  } = props

  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current

    if (!svg) {
      return
    }

    const onRender = (): void => {
      const { width, height } = renderFrameSVG(svg, { elements: elements || [] })
      onRenderExternal?.(svg, width, height)
    }

    onRender()

    const observer = new window.ResizeObserver(onRender)
    observer.observe(svg)

    return () => {
      observer.disconnect()
    }
  }, [elements, onRenderExternal])

  return (
    <svg
      role="presentation"
      ref={mergeRefs(svgRef, elementRef)}
      className={cx('arwes-frames-framesvg', className)}
      style={{
        ...(positioned ? positionedStyle : null),
        ...style
      }}
      xmlns="http://www.w3.org/2000/svg"
      // Even if it is still resized automatically, in case there is a delay
      // or the ResizeObserver API is not available, the SVG should be resized.
      preserveAspectRatio="none"
      {...otherProps}
    >
      {children}
    </svg>
  )
})

export type { FrameSVGProps }
export { FrameSVG }
