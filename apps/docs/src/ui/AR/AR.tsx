import { type HTMLAttributes } from 'react'
import { Animated, Animator, Text, cx } from '@arwes/react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'iconoir-react'
import { animate, stagger } from 'motion'

import { type HrProps, Hr } from '../Hr'
import { Button } from '../Button'
import { type TableProps, type RowProps, type CellProps, Table, Row, Cell } from '../Table'
import { theme } from '@/config'

const AR = {
  H1: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
    <Animator>
      <Text {...props} as="h1" fixed>
        {children}
      </Text>
    </Animator>
  ),

  H2: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
    <Animator>
      <Text {...props} as="h2" fixed>
        {children}
      </Text>
    </Animator>
  ),

  H3: ({ children, ...props }: HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
    <Animator>
      <Text {...props} as="h3" fixed>
        {children}
      </Text>
    </Animator>
  ),

  HR: (props: HrProps): JSX.Element => (
    <Animator>
      <Hr
        {...props}
        className={cx('origin-left', props.className)}
        animated={[
          ['scaleX', 0, 1],
          ...(Array.isArray(props.animated) ? props.animated : [props.animated])
        ]}
      />
    </Animator>
  ),

  P: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement>): JSX.Element => (
    <Animator>
      <Animated {...props} as="p" animated={['flicker']}>
        {children}
      </Animated>
    </Animator>
  ),

  Blockquote: ({ children, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => (
    <Animator>
      <Animated {...props} as="blockquote" animated={['flicker']}>
        {children}
      </Animated>
    </Animator>
  ),

  UL: ({ children, ...props }: HTMLAttributes<HTMLUListElement>): JSX.Element => (
    <Animator>
      <Animated<HTMLUListElement> {...props} as="ul" animated={['flicker']}>
        {children}
      </Animated>
    </Animator>
  ),

  OL: ({ children, ...props }: HTMLAttributes<HTMLOListElement>): JSX.Element => (
    <Animator>
      <Animated<HTMLOListElement> {...props} as="ol" animated={['flicker']}>
        {children}
      </Animated>
    </Animator>
  ),

  Table: ({ children, ...props }: TableProps): JSX.Element => (
    <Animator>
      <Table
        {...props}
        animated={{
          transitions: {
            entering: ({ $ }) =>
              animate($('[role="row"]'), { opacity: [0, 1, 0.5, 1] }, { delay: stagger(0.01) }),
            exiting: ({ $ }) => animate($('[role="row"]'), { opacity: 0 })
          }
        }}
      >
        {children}
      </Table>
    </Animator>
  ),
  Row: (props: RowProps) => <Row {...props} />,
  Cell: (props: CellProps) => <Cell {...props} />,

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
