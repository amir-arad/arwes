import { type AnimationControls, animate } from 'motion'
import { easing } from '@arwes/animated'
import type { AnimatorInterface } from '@arwes/animator'

import { getDistanceFromOriginToCornerProgress } from './getDistanceFromOriginToCornerProgress.js'

type DotsOrigin = 'left' | 'right' | 'top' | 'bottom' | 'center' | [number, number]

interface CreateBackgroundDotsSettings {
  /**
   * Dot color.
   */
  color?: string
  /**
   * Shape of the "dot".
   */
  type?: 'box' | 'circle' | 'cross'
  /**
   * Distance between each dot center in pixels.
   */
  distance?: number
  /**
   * Dot size in pixels.
   */
  size?: number
  /**
   * If type cross, its size in pixels.
   */
  crossSize?: number
  /**
   * Rectangle container axis or point [x, y] as percentages of the rectangle
   * dimensions from 0 (0%) to 1 (100%).
   * @example
   * [0.2, 0.8] is x=20% and y=80% as origin.
   */
  origin?: DotsOrigin
  /**
   * Invert the animation to work "to origin" point instead "from origin" point.
   */
  originInverted?: boolean
  /**
   * Animation easing.
   */
  easing?: (x: number) => number
}

interface CreateBackgroundDotsProps {
  settings: { current: CreateBackgroundDotsSettings }
  canvas: HTMLCanvasElement
  animator?: AnimatorInterface
}

interface CreateBackgroundDots {
  start: () => void
  stop: () => void
}

const defaultProps: Required<CreateBackgroundDotsSettings> = {
  color: '#777',
  type: 'box',
  distance: 30,
  size: 4,
  crossSize: 1,
  origin: 'center',
  originInverted: false,
  easing: easing.inSine
}

const createBackgroundDots = (props: CreateBackgroundDotsProps): CreateBackgroundDots => {
  const { canvas, animator } = props
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return { start: () => {}, stop: () => {} }
  }

  const dpr = Math.min(window.devicePixelRatio || 2, 2)

  let transitionControl: AnimationControls | undefined
  let resizeObserver: ResizeObserver | undefined
  let unsubscribe: (() => void) | undefined

  const getSettings = (): Required<CreateBackgroundDotsSettings> => ({
    ...defaultProps,
    ...props.settings.current
  })

  const resize = (): void => {
    const { width, height } = canvas.getBoundingClientRect()

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr
      canvas.height = height * dpr
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset scale to identical.
    ctx.scale(dpr, dpr)
  }

  const draw = (isEntering: boolean, progress: number): void => {
    if (!ctx) {
      return
    }

    const { color, type, distance, size, crossSize, origin, originInverted } = getSettings()

    const { width, height } = canvas

    const xLength = 1 + Math.floor(width / distance)
    const yLength = 1 + Math.floor(height / distance)

    const xMargin = width % distance
    const yMargin = height % distance

    ctx.clearRect(0, 0, width, height)

    for (let xIndex = 0; xIndex < xLength; xIndex++) {
      const x = xMargin / 2 + xIndex * distance

      for (let yIndex = 0; yIndex < yLength; yIndex++) {
        const y = yMargin / 2 + yIndex * distance

        const distanceFromOriginProgress = getDistanceFromOriginToCornerProgress(
          width / dpr,
          height / dpr,
          x,
          y,
          origin
        )

        const distancePercentage =
          (isEntering && originInverted) || (!isEntering && !originInverted)
            ? 1 - distanceFromOriginProgress
            : distanceFromOriginProgress

        const alphaProgress = progress / distancePercentage
        const alpha = Math.max(0, Math.min(1, alphaProgress))

        ctx.beginPath()
        ctx.globalAlpha = isEntering ? alpha : 1 - alpha

        if (type === 'circle') {
          ctx.arc(x, y, size, 0, 2 * Math.PI)
        }
        //
        else if (type === 'cross') {
          const l = size / 2
          const b = crossSize / 2

          // left
          ctx.moveTo(x - l, y + b)
          ctx.lineTo(x - l, y - b)
          ctx.lineTo(x - b, y - b)

          // top
          ctx.lineTo(x - b, y - l)
          ctx.lineTo(x + b, y - l)
          ctx.lineTo(x + b, y - b)

          // right
          ctx.lineTo(x + l, y - b)
          ctx.lineTo(x + l, y + b)
          ctx.lineTo(x + b, y + b)

          // bottom
          ctx.lineTo(x + b, y + l)
          ctx.lineTo(x - b, y + l)
          ctx.lineTo(x - b, y + b)
        }
        //
        else {
          ctx.rect(x - size / 2, y - size / 2, size, size)
        }

        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
      }
    }
  }

  const setup = (): void => {
    canvas.style.opacity = '1'

    if (typeof window !== 'undefined' && !resizeObserver) {
      resizeObserver = new window.ResizeObserver(() => {
        resize()

        if (animator) {
          switch (animator.node.state) {
            case 'entered': {
              draw(true, 1)
              break
            }
          }
        } else {
          draw(true, 1)
        }
      })
      resizeObserver.observe(canvas)
      resize()
    }
  }

  const cancel = (): void => {
    canvas.style.opacity = '0'

    resizeObserver?.disconnect()
    resizeObserver = undefined

    transitionControl?.cancel()
    transitionControl = undefined
  }

  const start = (): void => {
    if (!animator) {
      setup()
      draw(true, 1)
      return
    }

    unsubscribe = animator.node.subscribe((node) => {
      const settings = getSettings()

      switch (node.state) {
        case 'entering': {
          setup()
          transitionControl?.cancel()
          transitionControl = animate((progress) => draw(true, progress), {
            duration: node.duration.enter,
            easing: settings.easing
          })
          break
        }

        case 'entered': {
          setup()
          transitionControl?.cancel()
          draw(true, 1)
          break
        }

        case 'exiting': {
          setup()
          transitionControl?.cancel()
          transitionControl = animate((progress) => draw(false, progress), {
            duration: node.duration.exit,
            easing: settings.easing
          })
          break
        }

        case 'exited': {
          cancel()
          break
        }
      }
    })
  }

  const stop = (): void => {
    unsubscribe?.()
    cancel()
  }

  return { start, stop }
}

export type { CreateBackgroundDotsSettings, CreateBackgroundDotsProps }
export { createBackgroundDots }
