'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Animator,
  AnimatorGeneralProvider,
  FrameSVGNefrex,
  useFrameSVGAssembler
} from '@arwes/react'
import { theme } from '@/config'

const Frame = (): JSX.Element => {
  const frameRef = useRef<SVGSVGElement>(null)
  useFrameSVGAssembler(frameRef)
  return (
    <FrameSVGNefrex
      elementRef={frameRef}
      style={{
        // @ts-expect-error css variables
        '--arwes-frames-bg-color': theme.colors.secondary.main(10),
        '--arwes-frames-bg-filter': `drop-shadow(0 0 2px ${theme.colors.secondary.main(10)})`,
        '--arwes-frames-line-color': theme.colors.secondary.main(3),
        '--arwes-frames-line-filter': `drop-shadow(0 0 2px ${theme.colors.secondary.main(3)})`
      }}
      padding={4}
      strokeWidth={2}
      squareSize={20}
      smallLineLength={20}
      largeLineLength={40}
    />
  )
}

const Example = (): JSX.Element => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const tid = setTimeout(() => setActive(!active), active ? 2_500 : 1_500)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <AnimatorGeneralProvider disabled={false} dismissed={false} duration={{ enter: 1, exit: 1 }}>
      <Animator root active={active}>
        <Animated className="relative w-48 h-24" hideOnExited={false}>
          <Frame />
        </Animated>
      </Animator>
    </AnimatorGeneralProvider>
  )
}

const ExampleFrames = (): JSX.Element => {
  return (
    <Animator unmountOnExited>
      <Animated data-name="example">
        <Example />
      </Animated>
    </Animator>
  )
}

export { ExampleFrames }
