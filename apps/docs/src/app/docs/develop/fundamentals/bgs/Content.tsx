'use client'

import type { ReactElement } from 'react'

import { AR } from '@/ui'
import { ExampleBgs } from './ExampleBgs'

export default (): ReactElement => (
  <>
    <AR.Header>Background Fundamentals</AR.Header>

    <AR.P>
      Ambient visual effects such as background patterns and simulation environments can be an
      option to create creative apps. ARWES provides a few configurable background components with
      common sci-fi effects.
    </AR.P>

    <ExampleBgs />

    <AR.P>
      They are 2D Canvas HTML elements with configurable visual effects. Some of them offer common
      futuristic sci-fi environments. They can be an starting point of design for some apps. There
      are many other libraries which offer these kinds of background effects too such as{' '}
      <a href="https://www.vantajs.com" target="_blank">
        VantaJS
      </a>{' '}
      and{' '}
      <a href="https://github.com/tsparticles/tsparticles" target="_blank">
        tsparticles
      </a>
      .
    </AR.P>

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/frames"
      prev="Frames"
      nextHref="/docs/develop/fundamentals"
      next="Fundamentals"
    />
  </>
)
