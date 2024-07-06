import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { FrameSVGCorners } from '@arwes/react-frames'

const Sandbox = (): ReactElement => {
  return (
    <>
      <style>{`
        .frame {
          width: 300px;
          height: 300px;
        }
        .frame [data-name=bg] {
          color: hsl(180, 75%, 10%);
        }
        .frame [data-name=line] {
          color: hsl(180, 75%, 50%);
        }
      `}</style>

      <FrameSVGCorners className="frame" />
    </>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
