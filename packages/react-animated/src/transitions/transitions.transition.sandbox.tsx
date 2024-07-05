import React, { type ReactElement, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { Animated, transition } from '@arwes/react-animated'

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive((active) => !active), 2_000)
    return () => clearInterval(tid)
  }, [])

  return (
    <Animator active={active} duration={{ enter: 1, exit: 1 }}>
      <Animated
        style={{ width: 50, height: 50, backgroundColor: '#777' }}
        animated={[
          transition('opacity', 0, 1),
          transition('x', 0, 100),
          transition('background', '#ff0', '#0ff')
        ]}
      />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
