import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { Animated } from '@arwes/react-animated'

const Sandbox = (): ReactElement => {
  return (
    <Animator disabled>
      <Animated
        style={{ margin: 10, width: 40, height: 40, background: '#777' }}
        animated={{
          initialStyle: { x: 0, background: '#0ff' },
          transitions: {
            entering: { x: [0, 100], background: '#ff0' },
            exiting: { x: [100, 0], background: '#0ff' }
          }
        }}
      />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
