import { type MutableRefObject, useRef, useEffect } from 'react'
import { animate } from 'motion'
import { filterProps } from '@arwes/tools'
import type { AnimatorNode } from '@arwes/animator'
import { type EasingName, easing } from '@arwes/animated'
import { useAnimator } from '@arwes/react-animator'

import type { AnimatedProp, AnimatedTransitionFunctionReturn } from '../types.js'
import { transition, fade, flicker, draw } from '../transitions/index.js'
import { formatAnimatedCSSPropsShorthands } from '../internal/formatAnimatedCSSPropsShorthands/index.js'

type UseAnimatedOptions<E = HTMLElement | SVGElement> = {
  hideOnExited?: boolean | undefined
  hideOnEntered?: boolean | undefined
  renderInitials?: boolean | undefined
  onTransition?: ((element: E, node: AnimatorNode) => void) | undefined
}

const defaultOptions: UseAnimatedOptions = {
  renderInitials: true,
  hideOnExited: true
}

const animatedPresets = {
  fade,
  flicker,
  draw
} as const

const useAnimated = <E extends HTMLElement | SVGElement = HTMLElement>(
  elementRef: MutableRefObject<E | null>,
  animatedProp: AnimatedProp | undefined,
  optionsProp?: UseAnimatedOptions<E>
): void => {
  const animator = useAnimator()
  const animatedRef = useRef<AnimatedProp>(animatedProp)
  const optionsRef = useRef<UseAnimatedOptions<E> | undefined>(optionsProp)
  const animationsRef = useRef<Set<AnimatedTransitionFunctionReturn>>(new Set())

  animatedRef.current = animatedProp
  optionsRef.current = optionsProp

  useEffect(() => {
    const element = elementRef.current

    if (!element || !animator) {
      return
    }

    const optionsInitial = { ...defaultOptions, ...filterProps(optionsRef.current ?? ({} as any)) }

    if (optionsInitial.renderInitials) {
      const animated = animatedRef.current
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

    const unsubscribe = animator.node.subscribe((node) => {
      const options = {
        ...defaultOptions,
        ...(optionsRef.current ? filterProps(optionsRef.current) : null)
      }

      element.style.visibility =
        (options.hideOnExited && node.state === 'exited') ||
        (options.hideOnEntered && node.state === 'entered')
          ? 'hidden'
          : 'visible'

      const nodeSettings = node.settings
      const nodeDuration = nodeSettings.duration
      const transitionDuration =
        node.state === 'entering' || node.state === 'entered'
          ? nodeDuration.enter
          : nodeDuration.exit

      const $ = <T = HTMLElement | SVGElement>(query: string): T[] =>
        Array.from(element.querySelectorAll(query)) as T[]

      const animated = animatedRef.current
      const animatedListReceived = Array.isArray(animated) ? animated : [animated]
      const animatedList = animatedListReceived.filter(Boolean)

      animatedList
        .filter(Boolean)
        .map((item) => {
          if (typeof item === 'string') {
            const preset = animatedPresets[item]
            if (!preset) {
              throw new Error(`Arwes useAnimated() unexpected animated preset "${item}".`)
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
              animationsRef.current.add(animation)

              if (animation.then) {
                void animation.then(() => {
                  animationsRef.current.delete(animation)
                })
              } else if (animation.finished) {
                void animation.finished.then(() => {
                  animationsRef.current.delete(animation)
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
              throw new Error('ARWES useAnimated() animation duration must be greater than 0.')
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

              animationsRef.current.add(animation)

              void animation.finished.then(() => {
                animationsRef.current.delete(animation)
              })
            } catch (err) {
              throw new Error(`ARWES useAnimated() animation error:\n${String(err)}`)
            }
          }
        })

      options.onTransition?.(element, node)
    })

    return () => {
      unsubscribe()
      animationsRef.current.forEach((animation) => animation.cancel())
      animationsRef.current.clear()
    }
  }, [animator])
}

export { useAnimated }
