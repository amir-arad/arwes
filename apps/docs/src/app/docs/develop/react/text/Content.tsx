'use client'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.Header>React Text</AR.Header>

    <AR.P>TODO.</AR.P>

    <AR.Navigation
      prevHref="/docs/develop/react/bleeps"
      prev="Bleeps"
      nextHref="/docs/develop/react/frames"
      next="Frames"
    />
  </>
)
