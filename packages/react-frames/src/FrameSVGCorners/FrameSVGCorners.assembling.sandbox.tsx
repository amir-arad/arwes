import React, { type ReactElement, useRef, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { FrameSVGCorners, useFrameSVGAssemblingAnimation } from '@arwes/react-frames'

const Frame = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const { onRender } = useFrameSVGAssemblingAnimation(svgRef)

  return (
    <>
      <style>{`
        .frame {
          width: 300px;
          height: 150px;
        }
        .frame [data-name=bg] {
          color: hsl(60, 75%, 10%);
        }
        .frame [data-name=line] {
          color: hsl(60, 75%, 50%);
        }
      `}</style>

      <FrameSVGCorners elementRef={svgRef} className="frame" onRender={onRender} />
    </>
  )
}

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive((active) => !active), 2_000)
    return () => clearInterval(tid)
  }, [])

  return (
    <Animator active={active}>
      <Frame />
    </Animator>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
