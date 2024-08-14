'use client'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.H1>Fundamentals</AR.H1>

    <AR.HR />

    <AR.P>
      Futuristic science fiction user experiences are very varied and particular, drawing
      inspiration from many sources. But certain elements and effects are shared among them. ARWES
      tries to provide a few solutions.
    </AR.P>

    <AR.P>
      The tools offered by the framework are mostly low level to allow high customization and
      extension. If an app only requires sound effects, ARWES audio tools can be used alone. If an
      app requires a different styling solution, i.e.{' '}
      <a href="https://tailwindcss.com" target="_blank">
        Tailwind CSS
      </a>{' '}
      or{' '}
      <a href="https://mui.com" target="_blank">
        MUI
      </a>
      , they can be integrated together with ARWES visual tools since they are not coupled to a
      specific one. If an app requires some complex animation effects,{' '}
      <a href="https://www.framer.com/motion" target="_blank">
        Framer Motion
      </a>{' '}
      or{' '}
      <a href="https://gsap.com" target="_blank">
        GSAP
      </a>{' '}
      can be integrated with ARWES motion tools. And so on.
    </AR.P>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs/develop"
      prev="Develop"
      nextHref="/docs/develop/fundamentals/visual"
      next="Visual"
    />
  </>
)
