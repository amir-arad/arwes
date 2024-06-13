import React, { type ReactElement, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { GridLines } from '@arwes/react-bgs'

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const iid = setInterval(() => setActive((active) => !active), 3000)
    return () => clearInterval(iid)
  }, [])

  return (
    <Animator active={active} duration={{ enter: 0.5, exit: 0.5 }}>
      <GridLines style={{ width: '90vw', height: '90vh' }} lineColor="hsla(180, 100%, 75%, 0.5)" />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
