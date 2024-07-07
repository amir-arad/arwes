import { animate } from 'motion'
import type { AnimatedSettings } from '../types.js'
import { easing } from '@arwes/animated'

const transition = (
  prop: string,
  from: number | string,
  to: number | string,
  back?: number | string
): AnimatedSettings => ({
  transitions: {
    entering: { [prop]: [from, to] },
    exiting: { [prop]: [to, back ?? from] }
  }
})

const fade = (): AnimatedSettings => ({
  transitions: {
    entering: { opacity: [0, 1] },
    exiting: { opacity: [1, 0] }
  }
})

const flicker = (): AnimatedSettings => ({
  transitions: {
    entering: { opacity: [0, 1, 0.5, 1], easing: easing.outSine },
    exiting: { opacity: [1, 0, 0.5, 0], easing: easing.outSine }
  }
})

const draw = (
  durationCustom?: undefined | number,
  easing?: (x: number) => number
): AnimatedSettings => ({
  transitions: {
    entering: ({ element, duration }) => {
      if (!(element instanceof SVGPathElement)) {
        return
      }

      const length = element.getTotalLength()

      element.style.strokeDashoffset = String(length)
      element.style.strokeDasharray = String(length)

      return animate(
        element,
        { strokeDashoffset: [length, 0] },
        { easing, duration: durationCustom ?? duration }
      )
    },
    exiting: ({ element, duration }) => {
      if (!(element instanceof SVGPathElement)) {
        return
      }

      const length = element.getTotalLength()

      element.style.strokeDashoffset = '0'
      element.style.strokeDasharray = String(length)

      return animate(
        element,
        { strokeDashoffset: [0, length] },
        { easing, duration: durationCustom ?? duration }
      )
    }
  }
})

export { transition, fade, flicker, draw }
