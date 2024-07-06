import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { FrameSVGUnderline } from '@arwes/react-frames'

const Sandbox = (): ReactElement => {
  return (
    <>
      <style>{`
        .frame {
          width: 300px;
          height: 200px;
        }
        .frame [data-name=bg] {
          color: hsl(120, 75%, 10%);
        }
        .frame [data-name=line] {
          color: hsl(120, 75%, 50%);
        }
      `}</style>

      <FrameSVGUnderline className="frame" squareSize={32} strokeWidth={3} />
    </>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
