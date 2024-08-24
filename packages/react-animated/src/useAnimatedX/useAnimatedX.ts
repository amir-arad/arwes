import { type MutableRefObject, useRef, useEffect } from 'react'
import {
  type AnimatedXProp,
  type AnimatedXElementProps,
  type AnimatedXElement,
  createAnimatedXElement
} from '@arwes/animated'

const useAnimatedX = <
  States extends string,
  Element extends HTMLElement | SVGElement = HTMLElement
>(
  state: States | undefined | null,
  elementRef: MutableRefObject<Element | null>,
  animated: AnimatedXProp<States> | undefined,
  props?: Omit<AnimatedXElementProps<States, Element>, 'element' | 'state' | 'animated'>
): void => {
  const animatedRef = useRef(animated)
  const propsRef = useRef(props)
  const animatedXElementRef = useRef<undefined | AnimatedXElement<States, Element>>(undefined)

  animatedRef.current = animated
  propsRef.current = props

  useEffect(() => {
    const element = elementRef.current

    if (state === undefined || state === null || !element) {
      return
    }

    const animatedXElement = createAnimatedXElement({
      ...propsRef.current,
      state,
      element,
      animated: animatedRef.current
    })

    animatedXElementRef.current = animatedXElement

    return () => animatedXElement.cancel()
  }, [])

  useEffect(() => {
    if (state === undefined || state === null) {
      return
    }

    const animatedXElement = animatedXElementRef.current

    if (animatedXElement) {
      animatedXElement.update({ ...props, state, animated })
    }
  }, [state, animated, props])
}

export { useAnimatedX }
