'use client'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.H1>Solid</AR.H1>

    <AR.HR />

    <AR.P>TODO.</AR.P>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs/develop/react"
      prev="React"
      nextHref="/docs/develop"
      next="Develop"
    />
  </>
)
