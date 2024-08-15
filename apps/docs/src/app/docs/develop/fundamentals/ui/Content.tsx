'use client'

import { Animated, Animator } from '@arwes/react'

import { settings } from '@/config'
import { AR } from '@/ui'
import { ExampleText } from './ExampleText'
import { ExampleFrames } from './ExampleFrames'

export default (): JSX.Element => (
  <>
    <AR.H1>UI Fundamentals</AR.H1>

    <AR.HR />

    <AR.P>
      To create certain common futuristic science fiction experiences, ARWES provides a few base web
      UI functionalities and components. They can be used along with the visual, motion, and audio
      tools provided by the framework to compose more elaborated elements and effects.
    </AR.P>

    <AR.H2>Text</AR.H2>

    <AR.P>
      Text effects are very common for creative content. There are a few available options to
      animate text rendering. To prevent over-animating content, it is recommended to animate the
      most important text such as titles and headings.
    </AR.P>

    <ExampleText />

    <AR.H2>Frames</AR.H2>

    <AR.P>
      Simple "rectangles" may not be enough for creative designs. ARWES Frames are responsive vector
      graphics which can be used to create complex shapes and decorative elements. They are pretty
      much SVG with configurable and dynamic values which react to their relative size. This is
      because SVG does not support partially responsive elements nor calculations such as CSS{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" target="_blank">
        <code>calc()</code>
      </a>{' '}
      for its values.
    </AR.P>

    <AR.P>
      The framework provides a few out-of-the-box frame components which can be styled and animated.
    </AR.P>

    <ExampleFrames />

    <AR.P>
      It also provides a way to create custom ones. Unfortunately, there is no visual way to create
      custom frames, it is limited in the type of SVG elements to create, and a decent amount of
      knowledge and experience in SVG is required to built them.
    </AR.P>

    <AR.P>
      It is recommended to use SVG directly in your app if possible instead of ARWES frames because
      of performance. And if they are used, it's best to use them esparcily. For example, for
      container panels or main call to actions buttons.
    </AR.P>

    <AR.H2>Backgrounds</AR.H2>

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

    <AR.H2>Design Systems</AR.H2>

    <AR.P>
      All ARWES tools and base components can be used to compose a design system as required or to
      complement an existing one. If a new design system needs to be created, pro ui/ux design
      skills are required, or existing design guidelines should be followed.
    </AR.P>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/audio"
      prev="Audio"
      nextHref="/docs/develop/fundamentals"
      next="Fundamentals"
    />
  </>
)
