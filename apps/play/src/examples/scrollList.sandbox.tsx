/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { type ReactElement, useState, useRef, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { type AnimationControls, animate, stagger } from 'motion'
import { Animator, useAnimator } from '@arwes/react-animator'

const ScrollList = (): ReactElement => {
  const listElementRef = useRef<HTMLDivElement>(null)
  const itemsElementsRef = useRef<HTMLDivElement[]>([])
  const animator = useAnimator()

  useEffect(() => {
    const listElement = listElementRef.current

    if (!animator || !listElement) {
      return
    }

    const animations = new Set<AnimationControls>()

    const observer = new window.IntersectionObserver(
      (entries) => {
        const items = [...entries]
          .filter((entry) => entry.target && entry.isIntersecting)
          .map((entry) => entry.target as HTMLDivElement)
          .filter((target) => !target.dataset.visible)
          .sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index))

        if (!items.length) {
          return
        }

        const { duration } = animator.node.settings
        const staggerDelay = duration.stagger
        const staggerMaxItems = duration.staggerMaxItems ?? 30
        const staggerTime = Math.min(
          staggerDelay,
          staggerDelay * (1 / (items.length / staggerMaxItems))
        )

        items.forEach((item) => {
          item.dataset.visible = 'true'
        })

        const animation = animate(
          items,
          { opacity: 1 },
          {
            duration: duration.enter,
            delay: stagger(staggerTime)
          }
        )

        animations.add(animation)
        animation.finished.then(() => {
          animations.delete(animation)
        })
      },
      {
        root: listElement,
        rootMargin: '0px',
        threshold: 0.5
      }
    )

    const unsubscribe = animator.node.subscribe((node) => {
      switch (node.state) {
        case 'entering': {
          itemsElementsRef.current.forEach((element) => observer.observe(element))
          break
        }
        case 'exiting': {
          if (itemsElementsRef.current.length) {
            itemsElementsRef.current.forEach((element) => {
              element.dataset.visible = ''
              observer.unobserve(element)
            })
            const animation = animate(
              itemsElementsRef.current,
              { opacity: 0.2 },
              { duration: node.settings.duration.exit }
            )
            animations.add(animation)
            animation.finished.then(() => {
              animations.delete(animation)
            })
          }
          break
        }
      }
    })

    return () => {
      animations.forEach((animation) => animation.cancel())
      animations.clear()
      unsubscribe()
      observer.disconnect()
    }
  }, [animator])

  return (
    <div
      ref={listElementRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1rem',
        overflowY: 'auto',
        width: 300,
        height: 300
      }}
    >
      {Array(100)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            ref={(ref) => {
              if (ref) {
                itemsElementsRef.current.push(ref)
              }
            }}
            data-index={index}
            data-visible=""
            style={{
              padding: '0.5rem',
              textAlign: 'center',
              color: '#fff',
              background: '#555',
              opacity: 0.2
            }}
          >
            {index}
          </div>
        ))}
    </div>
  )
}

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive((active) => !active), 3_000)
    return () => clearInterval(tid)
  }, [])

  return (
    <Animator active={active} duration={{ enter: 1, exit: 1, stagger: 0.03, staggerMaxItems: 30 }}>
      <div style={{ color: active ? '#0ff' : '#077', marginBottom: 20 }}>
        {active ? 'Active' : 'Inactive'}
      </div>

      <ScrollList />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
