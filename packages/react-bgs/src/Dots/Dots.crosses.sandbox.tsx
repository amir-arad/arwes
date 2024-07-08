import React, { type ReactElement, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { Dots } from '@arwes/react-bgs'

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive(!active), active ? 2_000 : 1_500)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <Animator active={active} duration={{ enter: 1, exit: 1 }}>
      <Dots color="hsla(180, 100%, 75%, 0.25)" type="cross" distance={40} size={10} crossSize={1} />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
