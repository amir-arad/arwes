import React, { type ReactElement, useState, useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { animate } from 'motion'
import { type AnimatorNode } from '@arwes/animator'
import { Animator, useAnimator } from '@arwes/react-animator'

const AnimatorUIListener = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null)
  const animator = useAnimator()!

  useEffect(() => {
    const element = elementRef.current

    // If the animator are disabled/dismissed, ignore animations.
    // Also, if the element doesn't exist, ignore animations too.
    if (!animator || !element) {
      return
    }

    let animation: { cancel: () => void } | undefined

    // A subscription function to be called every time the state changes.
    const unsubscribe = animator.node.subscribe((node: AnimatorNode) => {
      switch (node.state) {
        case 'entering': {
          animation?.cancel() // Cancel current animation.
          animation = animate(
            element,
            { x: [0, 100], background: ['#0ff', '#ff0'] },
            { duration: node.settings.duration.enter }
          )
          break
        }
        case 'exiting': {
          animation?.cancel() // Cancel current animation.
          animation = animate(
            element,
            { x: [100, 0], background: ['#ff0', '#0ff'] },
            { duration: node.settings.duration.exit }
          )
          break
        }
      }
    })

    return () => {
      animation?.cancel()
      unsubscribe()
    }
  }, [animator])

  return <div ref={elementRef} style={{ margin: 10, width: 40, height: 40, background: '#777' }} />
}

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive((active) => !active), 2_000)
    return () => clearInterval(tid)
  }, [])

  return (
    <Animator active={active}>
      <AnimatorUIListener />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
