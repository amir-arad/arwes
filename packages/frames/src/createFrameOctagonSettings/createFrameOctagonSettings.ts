import { filterProps } from '@arwes/tools'
import { type AnimatedProp, type AnimatedCSSProps, animateDraw } from '@arwes/animated'
import type { FrameSettingsPathDefinition, FrameSettings } from '../types.js'

type CreateFrameOctagonSettingsProps = {
  styled?: boolean
  animated?: boolean
  leftTop?: boolean
  rightTop?: boolean
  rightBottom?: boolean
  leftBottom?: boolean
  squareSize?: number
  padding?: number
  strokeWidth?: number
}

const defaultProps: Required<CreateFrameOctagonSettingsProps> = {
  styled: true,
  animated: true,
  padding: 0,
  leftTop: true,
  rightTop: true,
  rightBottom: true,
  leftBottom: true,
  squareSize: 16,
  strokeWidth: 1
}

type Point = [number | string, number | string]

const toPath = (points: Point[]): FrameSettingsPathDefinition =>
  points.map((p, i) => [i === 0 ? 'M' : 'L', ...p])

const createFrameOctagonSettings = (props?: CreateFrameOctagonSettingsProps): FrameSettings => {
  const {
    styled,
    animated,
    padding: p,
    leftTop,
    rightTop,
    rightBottom,
    leftBottom,
    squareSize,
    strokeWidth
  } = { ...defaultProps, ...(props ? filterProps(props) : null) }

  const so = strokeWidth / 2

  const polylineStyle: AnimatedCSSProps = {
    filter: styled ? 'var(--arwes-frames-line-filter)' : undefined,
    fill: styled ? 'none' : undefined,
    stroke: styled ? 'var(--arwes-frames-line-color, currentcolor)' : undefined,
    strokeLinecap: styled ? 'round' : undefined,
    strokeLinejoin: styled ? 'round' : undefined,
    strokeWidth: String(strokeWidth)
  }

  const polylineAnimated: false | AnimatedProp = animated && {
    transitions: {
      entering: ({ element, duration }) =>
        animateDraw({ element: element as SVGPathElement, duration, isEntering: true }),
      exiting: ({ element, duration }) =>
        animateDraw({ element: element as SVGPathElement, duration, isEntering: false })
    }
  }

  const leftTopPoints: Point[] = leftTop
    ? [
        [squareSize + so + p, so + p],
        [so + p, squareSize + so + p]
      ]
    : [[so + p, so + p]]

  const leftBottomPoints: Point[] = leftBottom
    ? [
        [so + p, `100% - ${squareSize + p}`],
        [squareSize + so + p, `100% - ${so + p}`]
      ]
    : [[so + p, `100% - ${so + p}`]]

  const rightBottomPoints: Point[] = rightBottom
    ? [
        [`100% - ${squareSize + so + p}`, `100% - ${so + p}`],
        [`100% - ${so + p}`, `100% - ${squareSize + so + p}`]
      ]
    : [[`100% - ${so + p}`, `100% - ${so + p}`]]

  const rightTopPoints: Point[] = rightTop
    ? [
        [`100% - ${so + p}`, squareSize - so + p],
        [`100% - ${squareSize - so + p}`, so + p]
      ]
    : [[`100% - ${so + p}`, so + p]]

  // leftTop > leftBottom > rightBottom
  const polyline1 = toPath([...leftTopPoints, ...leftBottomPoints, rightBottomPoints[0]])

  // rightBottom > rightTop > leftTop
  const polyline2 = toPath([...rightBottomPoints, ...rightTopPoints, leftTopPoints[0]])

  return {
    elements: [
      {
        name: 'bg',
        style: {
          filter: styled ? 'var(--arwes-frames-bg-filter)' : undefined,
          fill: styled ? 'var(--arwes-frames-bg-color, currentcolor)' : undefined,
          strokeWidth: 0
        },
        animated: animated && ['fade'],
        path: polyline1.concat(polyline2)
      },
      {
        name: 'line',
        style: polylineStyle,
        animated: polylineAnimated,
        path: polyline1
      },
      {
        name: 'line',
        style: polylineStyle,
        animated: polylineAnimated,
        path: polyline2
      }
    ]
  }
}

export type { CreateFrameOctagonSettingsProps }
export { createFrameOctagonSettings }
