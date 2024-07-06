import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { FrameSVGCorners } from '@arwes/react-frames'

const Sandbox = (): ReactElement => {
  return (
    <>
      <style>{`
        .frame {
          width: 300px;
          height: 150px;
        }
        .frame [data-name=bg] {
          color: hsl(120, 75%, 10%);
        }
        .frame [data-name=line] {
          color: hsl(120, 75%, 50%);
        }
      `}</style>

      <FrameSVGCorners className="frame" cornerLength={32} strokeWidth={2} />
    </>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
