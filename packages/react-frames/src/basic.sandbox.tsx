import React, { type ReactElement, useRef, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { Animated, flicker } from '@arwes/react-animated'
import { FrameSVGCorners } from '@arwes/react-frames'
import { useFrameSVGAssembler } from '@arwes/react-core'

const Frame = (): ReactElement => {
  const frameRef = useRef<SVGSVGElement>(null)
  useFrameSVGAssembler(frameRef)
  return (
    <FrameSVGCorners
      elementRef={frameRef}
      style={{
        // @ts-expect-error css variables
        '--arwes-frames-bg-color': 'hsl(180, 75%, 10%)',
        '--arwes-frames-line-color': 'hsl(180, 75%, 50%)'

        // The frame elements properties can be changed using CSS like:
        // ```css
        // [data-frame=bg] {
        //   color: hsl(180, 75%, 10%);
        // }
        // [data-frame=line] {
        //   color: hsl(180, 75%, 50%);
        // }
        // ```
      }}
    />
  )
}

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive(!active), active ? 2_000 : 1_000)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <Animator active={active}>
      {/* The parent element of the frame component should be positioned. */}
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          margin: '1rem',
          padding: '1rem 2rem'
        }}
      >
        {/* Any frame component by default will take all space inside the nearest
            positioned parent. You can change this behaviour by using frame property
            `positioned = false`. */}
        <Frame />

        {/* The frame component is positioned so the other elements which need
            to be on top should also be positioned. You can change this behaviour
            by using z-index property of any of them. */}
        <Animated
          style={{ position: 'relative', color: 'hsl(180, 75%, 50%)' }}
          animated={flicker()}
        >
          Futuristic Sci-Fi UI Web Framework
        </Animated>
      </div>
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
