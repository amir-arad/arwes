'use client'

import Link from 'next/link'
import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.Header>React Frames</AR.Header>

    <AR.P>
      ARWES provides an frames API to create responsive vector graphics. Make sure to read the{' '}
      <Link href="/docs/develop/fundamentals/frames">Frames Fundamentals</Link> for context.
    </AR.P>

    <AR.P>TODO.</AR.P>

    <AR.Navigation
      prevHref="/docs/develop/react/text"
      prev="Text"
      nextHref="/docs/develop/react/bgs"
      next="Backgrounds"
    />
  </>
)
