import { type MutableRefObject, useRef, useEffect } from 'react'
import { animate } from 'motion'
import { filterProps } from '@arwes/tools'

import type {
  AnimatedXProp,
  AnimatedXSettings,
  AnimatedTransition,
  AnimatedTransitionFunctionReturn
} from '../types.js'
import { formatAnimatedCSSPropsShorthands } from '../internal/formatAnimatedCSSPropsShorthands/index.js'

interface UseAnimatedXOptions<States extends string> {
  hideOnStates?: States[]
  renderInitials?: boolean
}

const defaultOptions: UseAnimatedXOptions<string> = {
  hideOnStates: [],
  renderInitials: true
}

const useAnimatedX = <States extends string, E extends HTMLElement | SVGElement = HTMLElement>(
  state: States | undefined | null,
  elementRef: MutableRefObject<E | null>,
  animatedProp: AnimatedXProp<States> | undefined,
  optionsProp?: UseAnimatedXOptions<States>
): void => {
  const animatedRef = useRef<AnimatedXProp<States>>(animatedProp)
  const optionsRef = useRef<UseAnimatedXOptions<States> | undefined>(optionsProp)
  const animationsRef = useRef<Set<AnimatedTransitionFunctionReturn>>(new Set())

  animatedRef.current = animatedProp
  optionsRef.current = optionsProp

  useEffect(() => {
    const element = elementRef.current

    if (state === undefined || state === null || !element) {
      return
    }

    const optionsInitial = { ...defaultOptions, ...filterProps(optionsRef.current ?? ({} as any)) }

    if (optionsInitial.renderInitials) {
      const animated = animatedRef.current
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
  }, [])

  useEffect(() => {
    const element = elementRef.current

    if (state === undefined || state === null || !element) {
      return
    }

    const animated = animatedRef.current
    const animatedListReceived = Array.isArray(animated) ? animated : [animated]
    const animatedList = animatedListReceived.filter(Boolean) as Array<AnimatedXSettings<States>>

    const options = { ...defaultOptions, ...filterProps(optionsRef.current ?? ({} as any)) }

    element.style.visibility = options.hideOnStates.includes(state) ? 'hidden' : 'visible'

    animatedList
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      .map((settingsItem) => settingsItem.transitions?.[state] as AnimatedTransition)
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
            duration: -1
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
          const { duration, delay, easing, repeat, direction, options, ...definition } = transition

          const animation = animate(element, definition, {
            duration,
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

    return () => {
      animationsRef.current.forEach((animation) => animation.cancel())
      animationsRef.current.clear()
    }
  }, [state])
}

export { useAnimatedX }
