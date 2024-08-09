'use client'

import { Animated, Animator, Text } from '@arwes/react'
import Link from 'next/link'

import { theme } from '@/config'
import { Article, Button } from '@/ui'
import { ArrowRight } from 'iconoir-react'

const PageSolid = (): JSX.Element => {
  return (
    <Animator combine>
      <Article className="flex flex-col gap-6">
        <Animator>
          <Text as="h1" fixed>
            Solid
          </Text>
        </Animator>

        <Animator>
          <Animated as="hr" animated={['flicker']} />
        </Animator>

        <Animator>
          <Animated as="p" animated={['flicker']}>
            TODO.
          </Animated>
        </Animator>

        <nav className="flex justify-end gap-4">
          <Link href="/docs/develop">
            <Animator>
              <Button tabIndex={-1} animated={['flicker', ['x', theme.space(4), 0]]}>
                Develop <ArrowRight />
              </Button>
            </Animator>
          </Link>
        </nav>
      </Article>
    </Animator>
  )
}

export { PageSolid }
