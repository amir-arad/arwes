'use client'

import { useEffect, useState } from 'react'
import { Animated, Animator, useAnimator } from '@arwes/react'

import { theme } from '@/config'

const ExampleText = (): JSX.Element => {
  const animator = useAnimator()!
  const [state, setState] = useState('')

  useEffect(() => animator.node.subscribe((node) => setState(node.state)), [])

  return <>{state}</>
}

const Example = (): JSX.Element => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const tid = setTimeout(() => setActive(!active), 2_000)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <Animator
      root
      disabled={false}
      dismissed={false}
      active={active}
      duration={{ enter: 1, exit: 1 }}
    >
      <Animated
        className="flex justify-center items-center w-[6rem] h-[3rem] min-w-0 text-center text-neutral-1 bg-neutral-7"
        animated={[
          ['x', 0, 100],
          ['background', theme.colors.neutral(7), theme.colors.secondary.main(7)]
        ]}
        hideOnExited={false}
      >
        <ExampleText />
      </Animated>
    </Animator>
  )
}

const ExampleAnimatorNodeState = (): JSX.Element => (
  <Animator unmountOnExited>
    <Animated data-name="example">
      <Example />
    </Animated>
  </Animator>
)

export { ExampleAnimatorNodeState }
