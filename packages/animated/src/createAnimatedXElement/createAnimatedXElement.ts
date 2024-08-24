import { animate } from 'motion'
import { filterProps } from '@arwes/tools'

import { formatAnimatedCSSPropsShorthands } from '../formatAnimatedCSSPropsShorthands/index.js'
import { easing } from '../easing/index.js'

import type {
  EasingName,
  AnimatedXProp,
  AnimatedXSettings,
  AnimatedXTransition,
  AnimatedXTransitionFunctionReturn
} from '../types.js'

type AnimatedXElementProps<
  States extends string,
  E extends HTMLElement | SVGElement = HTMLElement
> = {
  element: E
  state: States
  animated: AnimatedXProp<States>
  hideOnStates?: States[] | undefined
  renderInitials?: boolean | undefined
}

type AnimatedXElement<
  States extends string,
  Element extends HTMLElement | SVGElement = HTMLElement
> = {
  update: (newProps: Partial<Omit<AnimatedXElementProps<States, Element>, 'element'>>) => void
  cancel: () => void
}

const createAnimatedXElement = <
  States extends string,
  Element extends HTMLElement | SVGElement = HTMLElement
>(
  propsInitial: AnimatedXElementProps<States, Element>
): AnimatedXElement<States, Element> => {
  const { element } = propsInitial

  const props: AnimatedXElementProps<States, Element> = {
    hideOnStates: [],
    renderInitials: true,
    ...filterProps(propsInitial)
  }

  const animations = new Set<AnimatedXTransitionFunctionReturn>()

  if (props.renderInitials) {
    const { animated } = props
    const animatedListReceived = Array.isArray(animated) ? animated : [animated]
    const animatedList = animatedListReceived.filter(Boolean) as Array<AnimatedXSettings<States>>

    const initialAttributes: Record<string, string> = animatedList
      .map((item) => item?.initialAttributes)
      .reduce((total: object, item: object | undefined) => ({ ...total, ...item }), {})

    Object.keys(initialAttributes).forEach((attribute) => {
      element.setAttribute(attribute, initialAttributes[attribute])
    })

    const dynamicStyles = animatedList
      .map((item) => formatAnimatedCSSPropsShorthands(item?.initialStyle))
      .reduce((total, item) => ({ ...total, ...item }), {})

    Object.assign(element.style, dynamicStyles)
  }

  const runAnimations = (): void => {
    const { state, animated, hideOnStates } = props
    const animatedListReceived = Array.isArray(animated) ? animated : [animated]
    const animatedList = animatedListReceived.filter(Boolean) as Array<AnimatedXSettings<States>>

    element.style.visibility = hideOnStates?.includes(state) ? 'hidden' : ''

    const $ = <T = HTMLElement | SVGElement>(query: string): T[] =>
      Array.from(element.querySelectorAll(query)) as T[]

    animatedList
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      .map((settingsItem) => settingsItem.transitions?.[state] as AnimatedXTransition)
      .filter(Boolean)
      .forEach((transition) => {
        if (typeof transition === 'function') {
          const animation = transition({ element, $ })

          if (animation) {
            animations.add(animation)

            if (animation.then) {
              void animation.then(() => {
                animations.delete(animation)
              })
            } else if (animation.finished) {
              void animation.finished.then(() => {
                animations.delete(animation)
              })
            }
          }
        }
        //
        else {
          const {
            duration,
            delay,
            easing: ease,
            repeat,
            direction,
            options,
            ...definition
          } = transition

          // TODO: Apply final animation state to element if duration is 0.
          // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
          if (Number.isFinite(duration) && (duration as number) <= 0) {
            throw new Error(
              'ARWES createAnimatedXElement() animation duration must be greater than 0.'
            )
          }

          try {
            const animation = animate(element, definition, {
              duration,
              delay,
              easing: typeof ease === 'string' ? easing[ease as EasingName] : ease,
              repeat,
              direction,
              ...options
            })

            animations.add(animation)

            void animation.finished.then(() => {
              animations.delete(animation)
            })
          } catch (err) {
            throw new Error(`ARWES createAnimatedXElement() animation error:\n${String(err)}`)
          }
        }
      })
  }

  runAnimations()

  const update = (
    newProps: Partial<Omit<AnimatedXElementProps<States, Element>, 'element'>>
  ): void => {
    const currentState = props.state

    Object.assign(props, newProps)

    if (newProps.state !== undefined && currentState !== newProps.state) {
      runAnimations()
    }
  }

  const cancel = (): void => {
    animations.forEach((animation) => animation.cancel())
    animations.clear()
  }

  return Object.freeze({ update, cancel })
}

export type { AnimatedXElementProps, AnimatedXElement }
export { createAnimatedXElement }
