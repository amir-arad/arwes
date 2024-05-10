import React, { type ReactElement, useRef, useEffect } from 'react'
import { animate } from 'motion'
import { cx } from '@arwes/tools'
import { mergeRefs } from '@arwes/react-tools'
import { ANIMATOR_STATES } from '@arwes/animator'
import { useAnimator } from '@arwes/react-animator'
import { easing } from '@arwes/animated'

import { type DotsProps } from './Dots.types.js'
import { getDistanceFromOriginToCornerProgress } from './getDistanceFromOriginToCornerProgress.js'

const { entering, entered, exiting, exited } = ANIMATOR_STATES

const defaultProps: Required<
  Pick<DotsProps, 'color' | 'type' | 'distance' | 'size' | 'crossSize' | 'origin' | 'easing'>
> = {
  color: '#777',
  type: 'box',
  distance: 30,
  size: 4,
  crossSize: 1,
  origin: 'center',
  easing: easing.inSine
}

const Dots = (props: DotsProps): ReactElement => {
  const propsFull = { ...defaultProps, ...props }
  const { elementRef: elementRefExternal, className, style } = propsFull

  const animator = useAnimator()
  const elementRef = useRef<HTMLCanvasElement>(null)
  const propsFullRef = useRef(propsFull)

  propsFullRef.current = propsFull

  useEffect(() => {
    const canvas = elementRef.current

    if (!canvas) {
      return
    }

    let animationControl: ReturnType<typeof animate> | undefined
    let resizeObserver: ResizeObserver | undefined

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 2, 2)

    const resize = (): void => {
      if (!ctx) {
        return
      }

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

      const { color, type, distance, size, crossSize, origin, originInverted } =
        propsFullRef.current

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

    const start = (): void => {
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (typeof window !== 'undefined' && window.ResizeObserver) {
        resizeObserver?.disconnect()
        resizeObserver = new window.ResizeObserver(() => {
          resize()

          if (animator) {
            switch (animator.node.state) {
              case entered: {
                draw(true, 1)
                break
              }
            }
          } else {
            draw(true, 1)
          }
        })
        resizeObserver.observe(canvas)
      }

      resize()
    }

    const cancel = (): void => {
      animationControl?.cancel()
      animationControl = undefined

      resizeObserver?.disconnect()
      resizeObserver = undefined
    }

    if (!animator) {
      start()

      return () => {
        cancel()
      }
    }

    const unsubscribe = animator.node.subscribe((node) => {
      switch (node.state) {
        case entering: {
          start()
          animationControl?.cancel()
          animationControl = animate((progress) => draw(true, progress), {
            duration: node.duration.enter,
            easing: propsFullRef.current.easing
          })
          break
        }

        case entered: {
          start()
          animationControl?.cancel()
          draw(true, 1)
          break
        }

        case exiting: {
          start()
          animationControl?.cancel()
          animationControl = animate((progress) => draw(false, progress), {
            duration: node.duration.exit,
            easing: propsFullRef.current.easing
          })
          break
        }

        case exited: {
          cancel()
          break
        }
      }
    })

    return () => {
      unsubscribe()
      cancel()
    }
  }, [animator])

  return (
    <canvas
      role="presentation"
      ref={mergeRefs(elementRef, elementRefExternal)}
      className={cx('arwes-react-bgs-dots', className)}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'block',
        border: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        ...style
      }}
    />
  )
}

export { Dots }
