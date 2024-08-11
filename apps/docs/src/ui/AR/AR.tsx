import { type HTMLAttributes } from 'react'
import { Animated, Animator, Text, cx } from '@arwes/react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'iconoir-react'

import { Button } from '../Button'
import { theme } from '@/config'

const AR = {
  H1: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
    <Animator>
      <Text {...props} as="h1">
        {children}
      </Text>
    </Animator>
  ),
  H2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
    <Animator>
      <Text {...props} as="h2">
        {children}
      </Text>
    </Animator>
  ),
  HR: (props: HTMLAttributes<HTMLHRElement>): JSX.Element => (
    <Animator>
      <Animated {...props} as="hr" />
    </Animator>
  ),
  P: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>): JSX.Element => (
    <Animator>
      <Animated {...props} as="p">
        {children}
      </Animated>
    </Animator>
  ),
  Blockquote: ({ children, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <Animator>
      <Animated {...props} as="blockquote">
        {children}
      </Animated>
    </Animator>
  ),
  Navigation: (props: {
    prevHref?: string
    prev?: string
    next?: string
    nextHref?: string
  }): JSX.Element => (
    <Animator>
      <nav
        className={cx(
          'flex gap-4',
          props.prevHref && props.nextHref && 'justify-between',
          props.prevHref && !props.nextHref && 'justify-start',
          !props.prevHref && props.nextHref && 'justify-end'
        )}
      >
        {!!props.prevHref && (
          <Link href={props.prevHref}>
            <Button tabIndex={-1} animated={['flicker', ['x', theme.space(2), 0, 0]]}>
              <ArrowLeft />
              {props.prev}
            </Button>
          </Link>
        )}
        {!!props.nextHref && (
          <Link href={props.nextHref}>
            <Button tabIndex={-1} animated={['flicker', ['x', theme.space(-2), 0, 0]]}>
              {props.next}
              <ArrowRight />
            </Button>
          </Link>
        )}
      </nav>
    </Animator>
  )
}

export { AR }
