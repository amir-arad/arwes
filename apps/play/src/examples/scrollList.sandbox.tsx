/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { type ReactElement, useState, useEffect, useRef, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatorGeneralProvider, Animator, useAnimator } from '@arwes/react-animator'
import { Animated } from '@arwes/react-animated'

const List = (): ReactElement => {
  const animator = useAnimator()
  const listRef = useRef<HTMLDivElement>(null)

  const isItemVisible = (index: number): boolean => {
    const list = listRef.current
    if (!list) {
      return false
    }
    const item = listRef.current.querySelector<HTMLDivElement>(`[data-index="${index}"]`)
    if (!item) {
      return false
    }
    return item.dataset.visible === 'true'
  }

  useEffect(() => {
    const list = listRef.current

    if (!animator || !list) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = entry.target as HTMLDivElement
          item.dataset.visible = String(entry.isIntersecting)
        })
        setTimeout(() => animator.node.send('refresh'))
      },
      { root: list, threshold: 0.5 }
    )

    const items = Array.from(list.querySelectorAll<HTMLDivElement>('.item'))

    items.forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
    }
  }, [animator])

  return (
    <Animated
      elementRef={listRef}
      className="list"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        padding: '1rem',
        gap: '1rem',
        overflowY: 'auto'
      }}
      animated={{
        transitions: {
          entering: { background: 'hsl(180 50% 10%)', duration: 0.001 },
          exiting: { background: 'hsl(180 50% 5%)', duration: 0.001 }
        }
      }}
      hideOnExited={false}
    >
      {Array(100)
        .fill(null)
        .map((_, index) => (
          <Animator key={index} condition={() => isItemVisible(index)}>
            <Animated
              className="item"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '17vw',
                color: '#fff',
                background: '#555'
              }}
              animated={{
                initialStyle: { opacity: 0.2 },
                transitions: {
                  entering: { opacity: 1 },
                  exiting: { opacity: 0.2 }
                }
              }}
              hideOnExited={false}
              data-index={index}
              data-visible="false"
            >
              {index}
            </Animated>
          </Animator>
        ))}
    </Animated>
  )
}

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive((v) => !v), 5_000)
    return () => clearInterval(tid)
  }, [])

  return (
    <AnimatorGeneralProvider duration={{ enter: 1, exit: 1 }}>
      <Animator active={active} manager="stagger" duration={{ stagger: 0.03 }}>
        <List />
      </Animator>
    </AnimatorGeneralProvider>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
