import type { CSSProperties, HTMLProps, SVGProps } from 'react'
import type { MotionKeyframesDefinition, AnimationOptionsWithOverrides } from '@motionone/dom'
import type { Easing } from '@arwes/animated'
import type { AnimatorState, AnimatorDuration } from '@arwes/animator'

// Animated

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
  easing?: AnimationOptionsWithOverrides['easing'] | Easing
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
   * Corresponding animator current animation transition duration.
   * For `'entering'` and `'entered'` states, it is `duration.enter`.
   * For `'exiting'` and `'exited'` states, it is `duration.exit`.
   */
  duration: number
  /**
   * Associated node duration object.
   */
  nodeDuration: AnimatorDuration
}

export interface AnimatedTransitionFunctionReturn {
  /**
   * A promise which resolves when the animation is finished.
   */
  finished: Promise<void>
  /**
   * Cancel the animation inmediately and remove its underlying animated properties
   * from the element.
   */
  cancel: () => void
}

export type AnimatedTransitionFunction =
  | ((config: AnimatedTransitionFunctionConfig) => AnimatedTransitionFunctionReturn)
  | ((config: AnimatedTransitionFunctionConfig) => void)

export type AnimatedTransition = AnimatedTransitionFunction | AnimatedTransitionDefinition

export interface AnimatedSettings {
  initialAttributes?: HTMLProps<HTMLDivElement> | SVGProps<SVGPathElement>
  initialStyle?: AnimatedCSSProps
  transitions?: {
    [P in AnimatorState]?: AnimatedTransition | undefined
  }
}

type AnimatedPropPreset = 'fade' | 'flicker' | 'draw'

type AnimatedPropTransition = [
  string,
  number | string,
  number | string,
  (number | string)?,
  (AnimationOptionsWithOverrides['easing'] | Easing)?
]

export type AnimatedProp =
  | AnimatedSettings
  | Array<AnimatedPropPreset | AnimatedPropTransition | AnimatedSettings | undefined>
  | undefined

// AnimatedX

export type AnimatedXTransitionDefinition = AnimatedTransitionDefinition
export type AnimatedXTransitionFunctionConfig = Omit<
  AnimatedTransitionFunctionConfig,
  'duration' | 'nodeDuration'
>
export type AnimatedXTransitionFunctionReturn = AnimatedTransitionFunctionReturn
export type AnimatedXTransitionFunction =
  | ((config: AnimatedXTransitionFunctionConfig) => AnimatedXTransitionFunctionReturn)
  | ((config: AnimatedXTransitionFunctionConfig) => void)
export type AnimatedXTransition = AnimatedXTransitionDefinition | AnimatedXTransitionFunction

export interface AnimatedXSettings<States extends string> {
  initialAttributes?: HTMLProps<HTMLDivElement> | SVGProps<SVGPathElement>
  initialStyle?: AnimatedCSSProps
  transitions?: {
    [P in States]?: AnimatedXTransition | undefined
  }
}

export type AnimatedXProp<States extends string> =
  | AnimatedXSettings<States>
  | Array<AnimatedXSettings<States> | undefined>
  | undefined
