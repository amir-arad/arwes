'use client'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.Header>Fundamentals</AR.Header>

    <AR.P>
      Futuristic science fiction user experiences are very varied and particular, drawing
      inspiration from many sources. But certain design elements and effects are shared among them.
      ARWES tries to provide a few solutions.
    </AR.P>

    <AR.P>
      The tools offered by the framework are mostly low level to allow high customization and
      extension. If an app only requires sound effects, ARWES audio tools can be used alone. If an
      app requires a different styling solution, i.e.{' '}
      <a href="https://tailwindcss.com" target="_blank">
        Tailwind
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

    <AR.P>Check out the guides on the framework fundamentals:</AR.P>

    <AR.Links
      links={[
        { href: '/docs/develop/fundamentals/visuals', text: 'Visual Fundamentals' },
        { href: '/docs/develop/fundamentals/motion', text: 'Motion Fundamentals' },
        { href: '/docs/develop/fundamentals/audio', text: 'Audio Fundamentals' },
        { href: '/docs/develop/fundamentals/ui', text: 'UI Fundamentals' }
      ]}
    />

    <AR.Navigation
      prevHref="/docs/develop"
      prev="Develop"
      nextHref="/docs/develop/fundamentals/visual"
      next="Visual"
    />
  </>
)
