import type { CSSProperties, HTMLProps, SVGProps } from 'react'
import type { MotionKeyframesDefinition, AnimationOptionsWithOverrides } from '@motionone/dom'
import type { AnimatorState } from '@arwes/animator'

export interface AnimatedCSSPropsShorthands {
  x?: number | string
  y?: number | string
  z?: number | string
  rotate?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  skew?: number | string
  skewX?: number | string
  skewY?: number | string
  scale?: number | string
  scaleX?: number | string
  scaleY?: number | string
  scaleZ?: number | string
}

export type AnimatedCSSProps = Omit<CSSProperties, keyof AnimatedCSSPropsShorthands> &
  AnimatedCSSPropsShorthands

export type AnimatedTransitionDefinition = MotionKeyframesDefinition & {
  duration?: number
  delay?: AnimationOptionsWithOverrides['delay']
  easing?: AnimationOptionsWithOverrides['easing']
  repeat?: AnimationOptionsWithOverrides['repeat']
  direction?: AnimationOptionsWithOverrides['direction']
  options?: AnimationOptionsWithOverrides
}

export interface AnimatedTransitionFunctionConfig {
  /**
   * Root element.
   */
  element: HTMLElement | SVGElement
  /**
   * Query children elements inside the root element.
   * @param query - CSS selector.
   * @returns Array<HTMLElement | SVGElement>
   */
  $: <T = HTMLElement | SVGElement>(query: string) => T[]
  /**
   * Corresponding animator animation duration.
   */
  duration: number
}

export interface AnimatedTransitionFunctionReturn {
  /**
   * A promise which resolves when the animation is finished.
   */
  finished?: Promise<void>
  /**
   * Cancel the animation inmediately and remove its underlying animated properties
   * from the element.
   */
  cancel: () => void
}

export type AnimatedTransitionFunction =
  | ((config: AnimatedTransitionFunctionConfig) => AnimatedTransitionFunctionReturn)
  | ((config: AnimatedTransitionFunctionConfig) => void)

export type AnimatedTransitionTypes = AnimatedTransitionFunction | AnimatedTransitionDefinition

export type AnimatedTransition = AnimatedTransitionTypes | AnimatedTransitionTypes[]

export interface AnimatedSettings {
  initialAttributes?: HTMLProps<HTMLDivElement> | SVGProps<SVGPathElement>
  initialStyle?: AnimatedCSSProps
  transitions?: {
    [P in AnimatorState]?: AnimatedTransition | undefined
  }
}

export type AnimatedProp = AnimatedSettings | Array<AnimatedSettings | undefined> | undefined

export interface AnimatedXSettings<States extends string> {
  initialAttributes?: HTMLProps<HTMLDivElement> | SVGProps<SVGPathElement>
  initialStyle?: AnimatedCSSProps
  transitions?: {
    [P in States]?: AnimatedTransition | undefined
  }
}

export type AnimatedXProp<States extends string> =
  | AnimatedXSettings<States>
  | Array<AnimatedXSettings<States> | undefined>
  | undefined
