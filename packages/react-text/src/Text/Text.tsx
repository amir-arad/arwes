import {
  type ReactNode,
  type ReactElement,
  type HTMLProps,
  type ForwardedRef,
  type CSSProperties,
  createElement,
  useMemo,
  useState,
  useRef,
  useEffect
} from 'react'
import { cx } from '@arwes/tools'
import { mergeRefs } from '@arwes/react-tools'
import { type Animation, type easing } from '@arwes/animated'
import { useAnimator } from '@arwes/react-animator'
import {
  type TextTransitionManager,
  getTransitionTextDuration,
  transitionTextSequence,
  transitionTextDecipher
} from '@arwes/text'

interface TextProps<E extends HTMLElement = HTMLSpanElement> extends HTMLProps<E> {
  as?: keyof HTMLElementTagNameMap
  className?: string
  contentClassName?: string
  contentStyle?: CSSProperties
  elementRef?: ForwardedRef<E>
  manager?: TextTransitionManager
  easing?: keyof typeof easing
  /**
   * If the duration of the animation should be fixed by the parent Animator
   * or dynamic according to its children.
   */
  fixed?: boolean
  hideOnEntered?: boolean
  hideOnExited?: boolean
  children: ReactNode
}

const Text = <E extends HTMLElement = HTMLSpanElement>(props: TextProps<E>): ReactElement => {
  const {
    as: asProvided = 'p',
    className,
    contentClassName,
    contentStyle,
    children,
    manager,
    easing,
    fixed,
    hideOnEntered,
    hideOnExited = true,
    elementRef: elementRefProvided,
    ...otherProps
  } = props

  const as = useMemo(() => asProvided, [])
  const [childrenText, setChildrenText] = useState('')
  const elementRef = useRef<E>(null)
  const contentElementRef = useRef<HTMLSpanElement>(null)
  const transitionControl = useRef<Animation | null>(null)
  const animator = useAnimator()
  const [isExited, setIsExited] = useState(() => animator?.node.state === 'exited')
  const [isEntered, setIsEntered] = useState(() => animator?.node.state === 'entered')

  const contentVisibility = useMemo(
    () =>
      animator &&
      ((!isEntered && !isExited) || (hideOnEntered && isEntered) || (hideOnExited && isExited))
        ? 'hidden'
        : 'visible',
    [animator, hideOnEntered, isEntered, hideOnExited, isExited]
  )

  useEffect(() => {
    setChildrenText(contentElementRef.current?.textContent ?? '')
  }, [children])

  useEffect(() => {
    if (!animator) {
      if (contentElementRef.current) {
        contentElementRef.current.style.visibility = 'visible'
      }
      return
    }

    // If there is no text, there is nothing to animate.
    if (!childrenText.length) {
      return
    }

    const rootElement = elementRef.current
    const contentElement = contentElementRef.current

    if (!rootElement || !contentElement) {
      return
    }

    if (!fixed) {
      const settings = animator.node.control.getSettings()
      const durationEnter = getTransitionTextDuration({
        length: childrenText.length,
        maxDuration: settings.duration.enter
      })
      const durationExit = getTransitionTextDuration({
        length: childrenText.length,
        maxDuration: settings.duration.exit
      })

      animator.node.control.setDynamicSettings({
        duration: { enter: durationEnter, exit: durationExit }
      })
    }

    const transition = (duration: number, isEntering: boolean): void => {
      const transitioner = manager === 'decipher' ? transitionTextDecipher : transitionTextSequence

      transitionControl.current?.cancel()
      transitionControl.current = transitioner({
        rootElement,
        contentElement,
        duration,
        isEntering,
        easing,
        hideOnExited,
        hideOnEntered
      })
    }

    const cancelSubscription = animator.node.subscribe((node) => {
      setIsEntered(node.state === 'entered')
      setIsExited(node.state === 'exited')

      switch (node.state) {
        case 'entered': {
          if (!transitionControl.current) {
            transition(node.duration.enter, true)
          }
          break
        }
        case 'entering': {
          transition(node.duration.enter, true)
          break
        }
        case 'exiting': {
          transition(node.duration.exit, false)
          break
        }
      }
    })

    return () => {
      cancelSubscription()
      transitionControl.current?.cancel()
      transitionControl.current = null
    }
  }, [animator, childrenText])

  useEffect(() => {
    if (contentElementRef.current) {
      contentElementRef.current.style.visibility = contentVisibility
    }
  }, [contentVisibility])

  return createElement(
    as,
    {
      ...otherProps,
      className: cx('arwes-text-text', className),
      style: {
        position: 'relative',
        ...otherProps.style
      },
      ref: mergeRefs<E>(elementRefProvided, elementRef)
    },
    createElement(
      'span',
      {
        ref: contentElementRef,
        className: cx('arwes-text-text__content', contentClassName),
        style: {
          position: 'relative',
          zIndex: 1,
          display: 'inline-block',
          ...contentStyle,
          visibility: contentVisibility
        }
      },
      children
    )
  )
}

export type { TextProps }
export { Text }
