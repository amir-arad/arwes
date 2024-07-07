import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { GridLines, Dots, MovingLines } from '@arwes/react-bgs'

const Sandbox = (): ReactElement => {
  return (
    <Animator duration={{ interval: 10 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000906',
          backgroundImage:
            'radial-gradient(85% 85% at 50% 50%, hsla(185, 100%, 25%, 0.25) 0%, hsla(185, 100%, 25%, 0.12) 50%, hsla(185, 100%, 25%, 0) 100%)'
        }}
      >
        <GridLines
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          lineColor="hsla(180, 100%, 75%, 0.05)"
          distance={30}
        />
        <Dots
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          color="hsla(180, 100%, 75%, 0.05)"
          distance={30}
        />
        <MovingLines
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          lineColor="hsla(180, 100%, 75%, 0.07)"
          distance={30}
          sets={20}
        />
      </div>
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
