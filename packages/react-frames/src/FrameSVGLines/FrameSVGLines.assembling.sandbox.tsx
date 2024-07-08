import React, { type ReactElement, useRef, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Animator } from '@arwes/react-animator'
import { FrameSVGLines, useFrameSVGAssembler } from '@arwes/react-frames'

const Frame = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  useFrameSVGAssembler(svgRef)

  return (
    <>
      <style>{`
        .frame {
          width: 300px;
          height: 150px;
        }
        .frame [data-name=bg] {
          color: hsl(180, 75%, 10%);
        }
        .frame [data-name=line] {
          color: hsl(180, 75%, 50%);
        }
      `}</style>

      <FrameSVGLines className="frame" elementRef={svgRef} />
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
