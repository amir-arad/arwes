'use client'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.H1>React Text</AR.H1>

    <AR.HR />

    <AR.P>TODO.</AR.P>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs/develop/react/bleeps"
      prev="Bleeps"
      nextHref="/docs/develop/react/frames"
      next="Frames"
    />
  </>
)
