import React, { type ReactElement, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { MovingLines } from '@arwes/react-bgs'

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
        // Duration of an individual animation sequence.
        interval: 4
      }}
    >
      <MovingLines
        style={{ width: '90vw', height: '90vh' }}
        lineColor="hsla(180, 100%, 75%, 0.5)"
      />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
