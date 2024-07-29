import { type Animation, createAnimation, easeAmong } from '@arwes/animated'

import type { TextTransitionProps } from '../types.js'
import { walkTextNodes } from '../internal/walkTextNodes/index.js'
import { setTextNodesContent } from '../internal/setTextNodesContent/index.js'

const transitionTextSequence = (props: TextTransitionProps): Animation => {
  const {
    rootElement,
    contentElement,
    duration,
    easing = 'linear',
    isEntering = true,
    hideOnExited = true,
    hideOnEntered
  } = props

  // If no valid elements are provided, return an void animation for type safety.
  if (!rootElement || !contentElement) {
    return {
      finished: Promise.resolve(),
      isPending: () => false,
      cancel: () => {}
    }
  }

  const cloneElement = contentElement.cloneNode(true) as HTMLElement
  Object.assign(cloneElement.style, {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    visibility: 'visible',
    opacity: 1
  })

  const blinkElement = document.createElement('span')
  blinkElement.classList.add('arwes-text__blink')
  blinkElement.innerHTML = '&#9614;'
  Object.assign(blinkElement.style, {
    position: 'relative',
    display: 'inline-block',
    width: 0,
    height: 0,
    lineHeight: '0',
    color: 'inherit'
  })

  const textNodes: Node[] = []
  const texts: string[] = []

  walkTextNodes(cloneElement, (child) => {
    textNodes.push(child)
    texts.push(child.textContent || '')

    if (isEntering) {
      child.textContent = ''
    }
  })

  const length = texts.join('').length

  rootElement.appendChild(cloneElement)
  cloneElement.appendChild(blinkElement)
  contentElement.style.visibility = 'hidden'

  const blinkAnimationEaseColor = easeAmong([0, 1, 2])
  const blinkAnimationColors = ['transparent', 'inherit', 'transparent']
  const blinkAnimation = createAnimation({
    duration: 0.1,
    easing: 'linear',
    repeat: Infinity,
    onUpdate(progress) {
      const index = Math.round(blinkAnimationEaseColor(progress))
      blinkElement.style.setProperty('color', blinkAnimationColors[index])
    }
  })

  return createAnimation({
    duration,
    easing,
    direction: isEntering ? 'normal' : 'reverse',
    onUpdate: (progress) => {
      const newLength = Math.round(progress * length)
      setTextNodesContent(textNodes, texts, newLength)
    },
    onFinish: () => {
      contentElement.style.visibility =
        (isEntering && hideOnEntered) || (!isEntering && hideOnExited) ? 'hidden' : 'visible'
      cloneElement.remove()
      blinkAnimation.cancel()
    },
    onCancel: () => {
      contentElement.style.visibility = ''
      cloneElement.remove()
      blinkAnimation.cancel()
    }
  })
}

export { transitionTextSequence }
