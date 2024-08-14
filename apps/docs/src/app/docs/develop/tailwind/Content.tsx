'use client'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.H1>Tailwind</AR.H1>

    <AR.HR />

    <AR.P>TODO.</AR.P>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs/develop/vanilla"
      prev="Vanilla"
      nextHref="/docs/develop/react"
      next="React"
    />
  </>
)
