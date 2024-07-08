import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { FrameSVGUnderline } from '@arwes/react-frames'

const Sandbox = (): ReactElement => {
  return (
    <div style={{ position: 'relative', width: 300, height: 200 }}>
      <FrameSVGUnderline
        style={{
          // @ts-expect-error css variables
          '--arwes-frames-bg-color': 'hsl(120, 75%, 10%)',
          '--arwes-frames-line-color': 'hsl(120, 75%, 50%)'
        }}
        squareSize={32}
        strokeWidth={3}
      />
    </div>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
