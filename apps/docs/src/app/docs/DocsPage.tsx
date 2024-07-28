'use client'

import React from 'react'
import { Animated, Animator } from '@arwes/react'

const DocsPage = (): JSX.Element => {
  return (
    <Animator>
      <Animated
        as="h1"
        className="mx-auto my-12 font-title text-size-1 text-primary-main-1"
        animated={['flicker']}
      >
        DocsPage
      </Animated>
    </Animator>
  )
}

export { DocsPage }
