'use client'

import { Animated, Animator, Text } from '@arwes/react'
import Link from 'next/link'

import { theme } from '@/config'
import { Article, Button } from '@/ui'
import { ArrowRight } from 'iconoir-react'

const PageDovelop = (): JSX.Element => {
  return (
    <Animator combine manager="stagger">
      <Article className="flex flex-col gap-6">
        <Animator>
          <Text as="h1" fixed>
            Develop
          </Text>
        </Animator>

        <Animator>
          <Animated as="hr" animated={['flicker']} />
        </Animator>

        <Animator>
          <Animated as="p" animated={['flicker']}>
            ARWES packages are categorized by <b>vanilla</b> and <b>implementation</b> packages.
            ARWES vanilla packages do not have major external dependencies, while the implementation
            packages depend on specific frameworks to simplify their use and add custom UI
            components.
          </Animated>
        </Animator>

        <Animator>
          <Animated as="p" animated={['flicker']}>
            Their functionalities can be for visual design, motion design, audio design, or UI
            implementation. The <Link href="/play">ARWES Playground</Link> can be used to experiment
            with various API use cases in real-time in browser.
          </Animated>
        </Animator>

        <Animator>
          <Animated as="blockquote" animated={['flicker']}>
            <p>
              The project is under development and not ready for production yet. It is still in{' '}
              <a href="https://stackoverflow.com/questions/40067469" target="_blank">
                alpha release
              </a>
              , so the components are being tested and their API may change as it gets completed.
            </p>
          </Animated>
        </Animator>

        <Animator>
          <Animated as="blockquote" animated={['flicker']}>
            <p>
              <a href="https://github.com/arwes/arwes/tree/main" target="_blank">
                Branch main
              </a>{' '}
              is for <code>@alpha</code> version releases and public content deployed at{' '}
              <a href="https://arwes.dev" target="_blank">
                arwes.dev
              </a>
              .
              <br />
              <a href="https://github.com/arwes/arwes/tree/next" target="_blank">
                Branch next
              </a>{' '}
              is for <code>@next</code> version releases and active development deployed at{' '}
              <a href="https://next.arwes.dev" target="_blank">
                next.arwes.dev
              </a>
              .
            </p>
          </Animated>
        </Animator>

        <Animator>
          <Animated as="p" animated={['flicker']}>
            The framework is delivered for the web platform as{' '}
            <a href="https://www.npmjs.com" target="_blank">
              NPM
            </a>{' '}
            packages in the <code>@arwes/[package]</code> scope for ESModules and CommonJS formats
            in JavaScript ES2022 version with strict{' '}
            <a href="https://www.typescriptlang.org" target="_blank">
              TypeScript
            </a>{' '}
            v5+ type definitions.
          </Animated>
        </Animator>

        <Animator>
          <Animated as="p" animated={['flicker']}>
            Latest version of Chrome, Firefox, and Safari, for Android, iOS and desktop are
            supported. Server-side rendering with Node.js is supported. There are custom APIs for{' '}
            <a href="https://react.dev" target="_blank">
              React.js
            </a>{' '}
            v18+ which can be used with tools like <a href="https://nextjs.org">Next.js</a>.
          </Animated>
        </Animator>

        <Animator>
          <Animated as="p" animated={['flicker']}>
            Since sci-fi UIs normally have very particular aesthetics with custom visual workflows
            and user experiences, the tools offered are currently "low/medium level APIs", which
            means that the framework does not provide an entire set of UI components for a common
            web app but rather a set of primitives, utilities, and base components to build a design
            system.
          </Animated>
        </Animator>

        <nav className="flex justify-end gap-4">
          <Link href="/docs/develop/vanilla">
            <Animator>
              <Button tabIndex={-1} animated={['flicker', ['x', theme.space(4), 0]]}>
                Vanilla <ArrowRight />
              </Button>
            </Animator>
          </Link>
          <Link className="hidden sm:block" href="/docs/develop/react">
            <Animator>
              <Button tabIndex={-1} animated={['flicker', ['x', theme.space(4), 0]]}>
                React <ArrowRight />
              </Button>
            </Animator>
          </Link>
          <Link className="hidden sm:block" href="/docs/develop/solid">
            <Animator>
              <Button tabIndex={-1} animated={['flicker', ['x', theme.space(4), 0]]}>
                Solid <ArrowRight />
              </Button>
            </Animator>
          </Link>
        </nav>
      </Article>
    </Animator>
  )
}

export { PageDovelop }
