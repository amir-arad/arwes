import { type MutableRefObject, useRef, useEffect } from 'react'
import {
  type AnimatedProp,
  type AnimatedElementProps,
  type AnimatedElement,
  createAnimatedElement
} from '@arwes/animated'
import { useAnimator } from '@arwes/react-animator'

const useAnimated = <E extends HTMLElement | SVGElement = HTMLElement>(
  elementRef: MutableRefObject<E | null>,
  animated: undefined | AnimatedProp,
  props?: undefined | Omit<AnimatedElementProps<E>, 'element' | 'animator' | 'animated'>
): void => {
  const animator = useAnimator()
  const animatedElementRef = useRef<undefined | AnimatedElement<E>>(undefined)
  const animatedRef = useRef(animated)
  const propsRef = useRef(props)

  animatedRef.current = animated
  propsRef.current = props

  useEffect(() => {
    const element = elementRef.current

    if (!element || !animator) {
      return
    }

    const animatedElement = createAnimatedElement({
      ...propsRef.current,
      element,
      animator: animator.node,
      animated: animatedRef.current
    })

    animatedElementRef.current = animatedElement

    return () => {
      animatedElement.cancel()
    }
  }, [animator])

  useEffect(() => {
    const animatedElement = animatedElementRef.current

    if (animatedElement) {
      animatedElement.update({ ...props, animated })
    }
  }, [animated, props])
}

export { useAnimated }
