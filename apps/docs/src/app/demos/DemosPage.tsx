'use client'

import React from 'react'
import { Animated, Animator, flicker, memo } from '@arwes/react'

const DemosPage = memo((): JSX.Element => {
  return (
    <Animator>
      <Animated
        as="h1"
        className="mx-auto my-12 font-title text-size-1 text-primary-main-1"
        animated={flicker()}
      >
        DemosPage
      </Animated>
    </Animator>
  )
})

export { DemosPage }
