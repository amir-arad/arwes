import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { FrameSVGLines } from '@arwes/react-frames'

const Sandbox = (): ReactElement => {
  return (
    <div style={{ position: 'relative', width: 300, height: 200 }}>
      <FrameSVGLines
        style={{
          // @ts-expect-error css variables
          '--arwes-frames-bg-color': 'hsl(120, 75%, 10%)',
          '--arwes-frames-line-color': 'hsl(120, 75%, 50%)'
        }}
        largeLineWidth={2}
        smallLineWidth={2}
        smallLineLength={32}
      />
    </div>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
