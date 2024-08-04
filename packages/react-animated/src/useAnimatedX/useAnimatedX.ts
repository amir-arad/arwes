import { type MutableRefObject, useRef, useEffect } from 'react'
import { animate } from 'motion'
import { filterProps } from '@arwes/tools'
import { type EasingName, easing } from '@arwes/animated'

import type {
  AnimatedXProp,
  AnimatedXSettings,
  AnimatedXTransition,
  AnimatedXTransitionFunctionReturn
} from '../types.js'
import { formatAnimatedCSSPropsShorthands } from '../internal/formatAnimatedCSSPropsShorthands/index.js'

interface UseAnimatedXOptions<States extends string> {
  hideOnStates?: States[] | undefined
  renderInitials?: boolean | undefined
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
  const animationsRef = useRef<Set<AnimatedXTransitionFunctionReturn>>(new Set())

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

    const options = {
      ...defaultOptions,
      ...(filterProps(optionsRef.current ?? ({} as any)) as Required<UseAnimatedXOptions<States>>)
    }

    element.style.visibility = options.hideOnStates.includes(state) ? 'hidden' : 'visible'

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
            throw new Error('Arwes useAnimated() animation duration must be greater than 0.')
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

            animationsRef.current.add(animation)

            void animation.finished.then(() => {
              animationsRef.current.delete(animation)
            })
          } catch (err) {
            throw new Error(`Arwes useAnimatedX() animation error:\n${String(err)}`)
          }
        }
      })

    return () => {
      animationsRef.current.forEach((animation) => animation.cancel())
      animationsRef.current.clear()
    }
  }, [state])
}

export { useAnimatedX }
