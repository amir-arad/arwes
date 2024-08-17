'use client'

import { AR } from '@/ui'
import { ExampleText } from './ExampleText'

export default (): JSX.Element => (
  <>
    <AR.Header>Text Fundamentals</AR.Header>

    <AR.P>
      Text effects are very common for creative content. There are a few available options to
      animate text rendering. To prevent over-animating content, it is recommended to animate the
      most important text such as titles and headings.
    </AR.P>

    <ExampleText />

    <AR.P>It supports nested HTML elements with inline and block layouts.</AR.P>

    <AR.P>
      The deciphering/ciphering animation is recommended only for short, or centered, or monospace
      typograhy texts.
    </AR.P>

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/audio"
      prev="Audio"
      nextHref="/docs/develop/fundamentals/frames"
      next="Frames"
    />
  </>
)
