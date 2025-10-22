/** @jsx jsx */
import { jsx } from '@emotion/react'
import { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { FrameSVGKranox } from '@arwes/react-frames'

const Sandbox = (): ReactElement => {
  return (
    <div
      style={{
        position: 'relative',
        width: 300,
        height: 300
      }}
    >
      <FrameSVGKranox
        css={{
          '[data-name=bg]': {
            color: 'hsl(180, 75%, 10%)'
          },
          '[data-name=line]': {
            color: 'hsl(180, 75%, 50%)'
          }
        }}
        positioned
      />
    </div>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
