import React, {
  type SVGProps,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type CSSProperties,
  useRef,
  useCallback
} from 'react'
import { cx } from '@arwes/tools'
import { mergeRefs } from '@arwes/react-tools'
import { type FrameSVGPathGeneric, renderFrameSVGPaths } from '@arwes/frames'
import { useFrameSVGRenderer } from '../useFrameSVGRenderer/index.js'

interface FrameSVGProps extends SVGProps<SVGSVGElement> {
  paths?: FrameSVGPathGeneric[]
  positioned?: boolean
  onRender?: (svg: SVGSVGElement, width: number, height: number) => void
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGSVGElement>
  children?: ReactNode
}

const positionedStyle: CSSProperties = {
  position: 'absolute',
  zIndex: -1,
  inset: 0,
  display: 'block',
  border: 0,
  margin: 0,
  padding: 0,
  width: 'round(down, 100%, 1px)',
  height: 'round(down, 100%, 1px)'
}

const FrameSVG = (props: FrameSVGProps): ReactElement => {
  const {
    paths,
    positioned = true,
    onRender: onRenderExternal,
    className,
    style,
    elementRef,
    children,
    ...otherProps
  } = props

  const svgRef = useRef<SVGSVGElement>(null)

  const onRender = useCallback(
    (svg: SVGSVGElement, width: number, height: number) => {
      if (paths) {
        renderFrameSVGPaths(svg, width, height, paths)
      }
      onRenderExternal?.(svg, width, height)
    },
    [paths]
  )

  useFrameSVGRenderer(svgRef, onRender)

  return (
    <svg
      role="presentation"
      ref={mergeRefs(svgRef, elementRef)}
      className={cx('arwes-frames-framesvg', className)}
      xmlns="http://www.w3.org/2000/svg"
      // Even if it is still resized automatically, in case there is a delay
      // or the ResizeObserver API is not available, the SVG should be resized.
      preserveAspectRatio="none"
      style={{
        ...(positioned ? positionedStyle : null),
        ...style
      }}
      {...otherProps}
    >
      {children}
    </svg>
  )
}

export type { FrameSVGProps }
export { FrameSVG }
