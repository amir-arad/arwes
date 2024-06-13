import React, { type ReactElement, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { Puffs } from '@arwes/react-bgs'

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const iid = setInterval(() => setActive((active) => !active), 3000)
    return () => clearInterval(iid)
  }, [])

  return (
    <Animator
      active={active}
      duration={{
        // The duration of an individual animation sequence.
        interval: 2
      }}
    >
      <Puffs
        style={{ width: '90vw', height: '90vh' }}
        color="hsla(180, 100%, 75%, 0.5)"
        quantity={20}
      />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
