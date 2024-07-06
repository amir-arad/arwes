import { type MutableRefObject, useRef, useEffect } from 'react'
import { animate } from 'motion'
import { filterProps } from '@arwes/tools'
import type { AnimatorNode } from '@arwes/animator'
import { useAnimator } from '@arwes/react-animator'

import type {
  AnimatedProp,
  AnimatedSettings,
  AnimatedTransition,
  AnimatedTransitionFunctionReturn
} from '../types.js'
import { formatAnimatedCSSPropsShorthands } from '../internal/formatAnimatedCSSPropsShorthands/index.js'

interface UseAnimatedOptions<E = HTMLElement | SVGElement> {
  hideOnExited?: boolean
  hideOnEntered?: boolean
  renderInitials?: boolean
  onTransition?: (element: E, node: AnimatorNode) => void
}

const defaultOptions: UseAnimatedOptions = {
  renderInitials: true,
  hideOnExited: true
}

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
      const animatedList = animatedListReceived.filter(Boolean) as AnimatedSettings[]

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
      const animated = animatedRef.current
      const animatedListReceived = Array.isArray(animated) ? animated : [animated]
      const animatedList = animatedListReceived.filter(Boolean) as AnimatedSettings[]

      const options = { ...defaultOptions, ...filterProps(optionsRef.current ?? ({} as any)) }

      element.style.visibility =
        (options.hideOnExited && node.state === 'exited') ||
        (options.hideOnEntered && node.state === 'entered')
          ? 'hidden'
          : 'visible'

      const animatorNodeDuration =
        node.state === 'entering' || node.state === 'entered'
          ? node.duration.enter
          : node.duration.exit

      animatedList
        // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
        .map((settingsItem) => settingsItem.transitions?.[node.state] as AnimatedTransition)
        .filter(Boolean)
        .map((transitions) => (Array.isArray(transitions) ? transitions : [transitions]))
        .flat(1)
        .forEach((transition) => {
          if (typeof transition === 'function') {
            const $ = <T = HTMLElement | SVGElement>(query: string): T[] =>
              Array.from(element.querySelectorAll(query)) as T[]

            const animation = transition({
              element,
              $,
              duration: animatorNodeDuration
            })

            if (animation) {
              animationsRef.current.add(animation)

              if (animation.finished) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                animation.finished.then(() => {
                  animationsRef.current.delete(animation)
                })
              }
            }
          }
          //
          else {
            const { duration, delay, easing, repeat, direction, options, ...definition } =
              transition

            const animation = animate(element, definition, {
              duration: duration || animatorNodeDuration,
              delay,
              easing,
              repeat,
              direction,
              ...options
            })

            animationsRef.current.add(animation)

            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            animation.finished.then(() => {
              animationsRef.current.delete(animation)
            })
          }
        })

      options?.onTransition?.(element, node)
    })

    return () => {
      unsubscribe()
      animationsRef.current.forEach((animation) => animation.cancel())
      animationsRef.current.clear()
    }
  }, [animator])
}

export { useAnimated }
