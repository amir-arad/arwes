'use client'

import { Animated, Animator } from '@arwes/react'

import { settings } from '@/config'
import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.Header>Background Fundamentals</AR.Header>

    <AR.P>
      Ambient visual effects such as background patterns and simulation environments can be an
      option to create creative apps. ARWES provides a few configurable background components with
      common sci-fi effects.
    </AR.P>

    <Animator>
      <Animated
        as="iframe"
        data-name="playground"
        className="block w-full h-[30rem]"
        src={`${settings.apps.play.url}?code=&type=predefined&sandbox=Examples%7CReact%7Cbackgrounds&explorer=false&editor=false&preview=true`}
        animated={['flicker']}
      />
    </Animator>

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/frames"
      prev="Frames"
      nextHref="/docs/develop/fundamentals"
      next="Fundamentals"
    />
  </>
)
