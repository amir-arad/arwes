import React, { type ReactElement, Profiler, Fragment, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import { Animator } from '@arwes/react-animator'
import { Animated } from '@arwes/react-animated'

const Test = (): ReactElement => {
  const [total, setTotal] = useState(1000)
  const [active, setActive] = useState(false)
  const [state, setState] = useState('exited')

  useEffect(() => {
    const tid = setInterval(() => setActive((v) => !v), 2_000)
    return () => clearInterval(tid)
  }, [])

  return (
    <Fragment>
      <div className="controls">
        <label>
          Number of children:{' '}
          <select value={total} onChange={(event) => setTotal(+event.currentTarget.value)}>
            <option value="100">100</option>
            <option value="1000">1,000</option>
            <option value="2000">2,000</option>
            <option value="3000">3,000</option>
            <option value="5000">5,000</option>
            <option value="7000">7,000</option>
            <option value="10000">10,000</option>
          </select>
        </label>{' '}
        Active: <b>{String(active)}</b> - State: <b>{state}</b>
      </div>

      <Animator
        active={active}
        duration={{ enter: 0.5, exit: 0.5 }}
        onTransition={(node) => setState(node.state)}
      >
        <div className="items">
          {Array(total)
            .fill(null)
            .map((_, index) => (
              <Animated
                key={index}
                className="item"
                animated={{
                  initialStyle: {
                    scale: 0.2,
                    rotate: 90
                  },
                  transitions: {
                    entering: { scale: [0.2, 1], rotate: [90, 0] },
                    exiting: { scale: [1, 0.2], rotate: [0, 90] }
                  }
                }}
              />
            ))}
        </div>
      </Animator>
    </Fragment>
  )
}

const onProfileRender = (id: string, phase: string, duration: number): void => {
  console.log(`[Profiler] ${phase} = ${duration} ms`)
}

const App = (): ReactElement => {
  return (
    <Profiler id="test" onRender={onProfileRender}>
      <Test />
    </Profiler>
  )
}

createRoot(document.querySelector('#root')!).render(<App />)
