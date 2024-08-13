'use client'

import { useEffect, useState } from 'react'
import { AnimatorGeneralProvider, Animator, Animated, useAnimator } from '@arwes/react'

import { theme } from '@/config'

const ExampleNodeTextState = (): JSX.Element => {
  const animator = useAnimator()!
  const [state, setState] = useState('')

  useEffect(() => animator.node.subscribe((node) => setState(node.state)), [])

  return <>{state}</>
}

const ExampleNodeText = (props: { x: string; y: string }): JSX.Element => {
  const { x, y } = props
  return (
    <Animated<SVGTextElement>
      as="text"
      className="stroke-neutral-1"
      style={{ font: 'var(--app-font-body) 300 16px' }}
      hideOnExited={false}
      x={x}
      y={y}
    >
      <ExampleNodeTextState />
    </Animated>
  )
}

const ExampleNodeBg = (props: { x: string; y: string }): JSX.Element => {
  const { x, y } = props
  return (
    <Animated<SVGRectElement>
      as="rect"
      className="fill-neutral-7"
      x={x}
      y={y}
      width="100"
      height="50"
      animated={[['fill', theme.colors.neutral(7), theme.colors.secondary.main(7)]]}
      hideOnExited={false}
    />
  )
}

const Example = (props: { manager?: 'parallel' | 'sequence' }): JSX.Element => {
  const { manager } = props

  const [active, setActive] = useState(false)

  useEffect(() => {
    const tid = setTimeout(() => setActive(!active), active ? 6_000 : 2_000)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <AnimatorGeneralProvider disabled={false} dismissed={false} duration={{ enter: 1, exit: 1 }}>
      <Animator root active={active} combine>
        <svg
          className="w-[500px] max-w-full"
          viewBox="0 0 500 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className="stroke-neutral-5" d="M249.5 45L111.5 103.5" stroke-width="2" />
          <path className="stroke-neutral-5" d="M251 47L390 104.5" stroke-width="2" />
          <path className="stroke-neutral-5" d="M112.5 143.5L36.5 206" stroke-width="2" />
          <path className="stroke-neutral-5" d="M113.5 145.5L183.5 206.5" stroke-width="2" />
          <path className="stroke-neutral-5" d="M382.5 143.5L306.5 206" stroke-width="2" />
          <path className="stroke-neutral-5" d="M383.5 145.5L455 205" stroke-width="2" />

          <Animator manager={manager}>
            <ExampleNodeBg x="200" y="0" />
            <ExampleNodeText x="220" y="30" />

            <Animator manager={manager}>
              <ExampleNodeBg x="65" y="100" />
              <ExampleNodeText x="85" y="130" />

              <Animator manager={manager}>
                <ExampleNodeBg x="0" y="200" />
                <ExampleNodeText x="20" y="230" />
              </Animator>

              <Animator manager={manager}>
                <ExampleNodeBg x="130" y="200" />
                <ExampleNodeText x="150" y="230" />
              </Animator>
            </Animator>

            <Animator manager={manager}>
              <ExampleNodeBg x="335" y="100" />
              <ExampleNodeText x="355" y="130" />

              <Animator manager={manager}>
                <ExampleNodeBg x="270" y="200" />
                <ExampleNodeText x="290" y="230" />
              </Animator>

              <Animator manager={manager}>
                <ExampleNodeBg x="400" y="200" />
                <ExampleNodeText x="420" y="230" />
              </Animator>
            </Animator>
          </Animator>
        </svg>
      </Animator>
    </AnimatorGeneralProvider>
  )
}

const ExampleAnimatorTree = (props: { manager?: 'parallel' | 'sequence' }): JSX.Element => (
  <Animator unmountOnExited>
    <Animated data-name="example">
      <Example manager={props.manager} />
    </Animated>
  </Animator>
)

export { ExampleAnimatorTree }
