import { animate } from 'motion'
import { filterProps } from '@arwes/tools'
import type { AnimatorNode } from '@arwes/animator'

import type { EasingName, AnimatedProp, AnimatedTransitionFunctionReturn } from '../types.js'
import { easing } from '../easing/index.js'
import { formatAnimatedCSSPropsShorthands } from '../formatAnimatedCSSPropsShorthands/index.js'
import { transition, fade, flicker, draw } from '../transitions/index.js'

type AnimatedElementProps<E = HTMLElement | SVGElement> = {
  element: E
  animator: AnimatorNode
  animated: AnimatedProp
  hideOnExited?: undefined | boolean
  hideOnEntered?: undefined | boolean
  renderInitials?: undefined | boolean
  onTransition?: undefined | ((element: E, node: AnimatorNode) => void)
}

type AnimatedElement<E extends HTMLElement | SVGElement = HTMLElement> = {
  update: (newProps: Omit<AnimatedElementProps<E>, 'element' | 'animator'>) => void
  cancel: () => void
}

const animatedPresets = {
  fade,
  flicker,
  draw
} as const

const createAnimatedElement = <E extends HTMLElement | SVGElement = HTMLElement>(
  propsInitial: AnimatedElementProps<E>
): AnimatedElement<E> => {
  const { element, animator } = propsInitial

  const props: AnimatedElementProps<E> = {
    hideOnExited: true,
    renderInitials: true,
    ...filterProps(propsInitial)
  }

  const animations = new Set<AnimatedTransitionFunctionReturn>()

  if (props.renderInitials) {
    const { animated } = props
    const animatedListReceived = Array.isArray(animated) ? animated : [animated]
    const animatedList = animatedListReceived
      .map((item) => (typeof item === 'string' || Array.isArray(item) ? undefined : item))
      .filter(Boolean)

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

  const unsubscribe = animator.subscribe((node) => {
    const { animated, hideOnExited, hideOnEntered, onTransition } = props

    element.style.visibility =
      (hideOnExited && node.state === 'exited') || (hideOnEntered && node.state === 'entered')
        ? 'hidden'
        : ''

    const nodeSettings = node.settings
    const nodeDuration = nodeSettings.duration
    const transitionDuration =
      node.state === 'entering' || node.state === 'entered' ? nodeDuration.enter : nodeDuration.exit

    const $ = <T = HTMLElement | SVGElement>(query: string): T[] =>
      Array.from(element.querySelectorAll(query)) as T[]

    const animatedListReceived = Array.isArray(animated) ? animated : [animated]
    const animatedList = animatedListReceived.filter(Boolean)

    animatedList
      .filter(Boolean)
      .map((item) => {
        if (typeof item === 'string') {
          const preset = animatedPresets[item]
          if (!preset) {
            throw new Error(`Arwes createAnimatedElement() unexpected animated preset "${item}".`)
          }
          return preset()
        }
        if (Array.isArray(item)) {
          return transition(...item)
        }
        return item
      })
      .map((settingsItem) => settingsItem?.transitions?.[node.state])
      .filter(Boolean)
      .forEach((transition) => {
        if (typeof transition === 'function') {
          const animation = transition({
            element,
            $,
            duration: transitionDuration,
            nodeDuration
          })

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
        else if (transition) {
          const {
            duration: durationInitial,
            delay,
            easing: ease,
            repeat,
            direction,
            options,
            ...definition
          } = transition

          const duration = durationInitial || transitionDuration

          // TODO: Apply final animation state to element if duration is 0.
          if (duration <= 0) {
            throw new Error(
              'ARWES createAnimatedElement() animation duration must be greater than 0.'
            )
          }

          try {
            const animation = animate(element, definition, {
              duration,
              delay,
              easing: typeof ease === 'string' ? (easing[ease as EasingName] ?? ease) : ease,
              repeat,
              direction,
              ...options
            })

            animations.add(animation)

            void animation.finished.then(() => {
              animations.delete(animation)
            })
          } catch (err) {
            throw new Error(`ARWES createAnimatedElement() animation error:\n${String(err)}`)
          }
        }
      })

    onTransition?.(element, node)
  })

  const update = (newProps: Omit<AnimatedElementProps<E>, 'element' | 'animator'>): void => {
    Object.assign(props, newProps)
  }

  const cancel = (): void => {
    unsubscribe()
    animations.forEach((animation) => animation.cancel())
    animations.clear()
  }

  return Object.freeze({ update, cancel })
}

export type { AnimatedElementProps, AnimatedElement }
export { createAnimatedElement }
