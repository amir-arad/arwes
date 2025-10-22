'use client'

import type { ReactElement } from 'react'

import { AR } from '@/ui'

export default (): ReactElement => (
  <>
    <AR.Header>Svelte</AR.Header>

    <AR.P>TODO.</AR.P>

    <AR.Navigation prevHref="/docs/develop" prev="Develop" />
  </>
)
