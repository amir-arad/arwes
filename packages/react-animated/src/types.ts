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

export type AnimatedSettingsTransitionDefinition = MotionKeyframesDefinition & {
  duration?: number
  delay?: AnimationOptionsWithOverrides['delay']
  easing?: AnimationOptionsWithOverrides['easing']
  repeat?: AnimationOptionsWithOverrides['repeat']
  direction?: AnimationOptionsWithOverrides['direction']
  options?: AnimationOptionsWithOverrides
}

export interface AnimatedSettingsTransitionFunctionConfig {
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

export interface AnimatedSettingsTransitionFunctionReturn {
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

export type AnimatedSettingsTransitionFunction =
  | ((config: AnimatedSettingsTransitionFunctionConfig) => AnimatedSettingsTransitionFunctionReturn)
  | ((config: AnimatedSettingsTransitionFunctionConfig) => void)

export type AnimatedSettingsTransitionTypes =
  | AnimatedSettingsTransitionFunction
  | AnimatedSettingsTransitionDefinition

export type AnimatedSettingsTransition =
  | AnimatedSettingsTransitionTypes
  | AnimatedSettingsTransitionTypes[]

export interface AnimatedSettings {
  initialAttributes?: HTMLProps<HTMLDivElement> | SVGProps<SVGPathElement>
  initialStyle?: AnimatedCSSProps
  transitions?: {
    [P in AnimatorState]?: AnimatedSettingsTransition | undefined
  } & {
    [P in string]?: AnimatedSettingsTransition | undefined
  }
}

export type AnimatedProp = AnimatedSettings | Array<AnimatedSettings | undefined> | undefined
