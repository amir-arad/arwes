import React, { type ReactElement, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { Dots } from '@arwes/react-bgs'

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const iid = setInterval(() => setActive((active) => !active), 1200)
    return () => clearInterval(iid)
  }, [])

  return (
    <Animator active={active} duration={{ enter: 0.75, exit: 0.75 }}>
      <Dots
        style={{ width: '90vw', height: '90vh' }}
        color="hsla(120, 100%, 75%, 0.1)"
        distance={50}
        size={45}
        origin="top"
      />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
