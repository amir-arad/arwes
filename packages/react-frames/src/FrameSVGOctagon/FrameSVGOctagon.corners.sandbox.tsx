import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { FrameSVGOctagon } from '@arwes/react-frames'

const Sandbox = (): ReactElement => {
  return (
    <>
      <style>{`
        .frame {
          width: 200px;
          height: 200px;
        }
        .frame [data-name=bg] {
          color: hsl(120, 75%, 10%);
        }
        .frame [data-name=line] {
          color: hsl(120, 75%, 50%);
        }
      `}</style>

      <FrameSVGOctagon
        className="frame"
        leftTop={false}
        rightTop={true}
        rightBottom={true}
        leftBottom={false}
      />
    </>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
