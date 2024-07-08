import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { styleSteps } from '@arwes/styles'

const Sandbox = (): ReactElement => {
  return (
    <div style={{ display: 'grid', gap: '1rem', width: 300 }}>
      <div style={{ height: 50, background: styleSteps(7, 'green') }} />
      <div style={{ height: 50, background: styleSteps(7, 'cyan', '45deg') }} />
      <div style={{ height: 50, background: styleSteps(7, 'yellow', '-45deg') }} />
    </div>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
