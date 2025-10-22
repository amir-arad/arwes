// A child Animator as root, will create a new system of Animator nodes.

import React, { type ReactNode, type ReactElement, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator, type AnimatorProps } from '@arwes/react-animator'
import { Animated } from '@arwes/react-animated'

interface ItemProps {
  animator?: AnimatorProps
  children?: ReactNode
}

const Item = (props: ItemProps): ReactElement => {
  return (
    <Animator {...props.animator}>
      <Animated
        style={{ margin: 10, width: 40, height: 20, backgroundColor: '#777' }}
        animated={{
          transitions: {
            entering: { x: [0, 50], backgroundColor: ['#0ff', '#ff0'] },
            exiting: { x: [50, 0], backgroundColor: ['#ff0', '#0ff'] }
          }
        }}
        hideOnExited={false}
      />
      <div style={{ marginLeft: 20 }}>{props.children}</div>
    </Animator>
  )
}

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive((active) => !active), 2000)
    return () => clearInterval(tid)
  }, [])

  return (
    <Animator active={active} combine>
      <Item>
        <Item>
          <Item>
            <Item />
            <Item />
          </Item>
          <Item>
            <Item />
            <Item />
          </Item>
        </Item>
        <Item>
          <Item animator={{ root: true, active: !active }}>
            <Item />
            <Item />
          </Item>
          <Item>
            <Item />
            <Item />
          </Item>
        </Item>
      </Item>
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
