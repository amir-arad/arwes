'use client'

import Link from 'next/link'
import { Animated, Animator } from '@arwes/react'
import { Cube as IconVanilla, Codepen as IconPlay } from 'iconoir-react'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.Header>React</AR.Header>

    <Animator>
      <Animated data-name="links" className="flex flex-row gap-2" animated={['flicker']}>
        <img
          className="!m-0"
          alt="bundle size"
          src="https://img.shields.io/bundlephobia/minzip/@arwes/react.svg"
        />
        <img
          className="!m-0"
          alt="installs"
          src="https://img.shields.io/npm/dm/@arwes/react?label=installs&style=flat-square"
        />
      </Animated>
    </Animator>

    <AR.P>
      ARWES offers{' '}
      <a href="https://react.dev" target="_blank">
        React
      </a>{' '}
      v18 specific packages with Server-Side Rendering (SSR) support. Most of the functionalities
      simplify the use of{' '}
      <Link href="/docs/develop/vanilla">
        <IconVanilla /> ARWES vanilla packages
      </Link>{' '}
      and some others are specific React APIs. You can/should still use the vanilla packages when
      applicable.
    </AR.P>

    <AR.Blockquote>
      <p>ARWES does not work with React strict mode nor React Server Components (RSC).</p>
    </AR.Blockquote>

    <AR.H2>Get Started</AR.H2>

    <AR.P>
      In any project with React already configured, such as with{' '}
      <a href="https://nextjs.org" target="_blank">
        Next.js
      </a>{' '}
      or{' '}
      <a href="https://remix.run" target="_blank">
        Remix
      </a>
      , install the package:
    </AR.P>

    <AR.CodeBlock lang="bash" code="npm install @arwes/react" />

    <AR.P>Make sure to disable React strict mode and use Client-Side Rendering (CSR).</AR.P>

    <AR.P>Check out the following guides:</AR.P>

    <AR.Links
      links={[
        { href: '/docs/develop/react/animators', text: 'React Animators' },
        { href: '/docs/develop/react/bleeps', text: 'React Bleeps' },
        { href: '/docs/develop/react/text', text: 'React Text' },
        { href: '/docs/develop/react/frames', text: 'React Frames' },
        { href: '/docs/develop/react/bgs', text: 'React Backgrounds' }
      ]}
    />

    <AR.P>Check out the following playground examples:</AR.P>

    <AR.Links
      links={[
        {
          href: '/play?code=&type=predefined&sandbox=Examples%7CReact%7Cbutton&explorer=true&editor=true&preview=true',
          text: 'Button',
          icon: <IconPlay />
        },
        {
          href: '/play?code=&type=predefined&sandbox=Examples%7CReact%7Cbackgrounds&explorer=true&editor=true&preview=true',
          text: 'Backgrounds',
          icon: <IconPlay />
        },
        {
          href: '/play?code=&type=predefined&sandbox=Examples%7CReact%7Calert&explorer=true&editor=true&preview=true',
          text: 'Alert',
          icon: <IconPlay />
        },
        {
          href: '/play?code=&type=predefined&sandbox=Examples%7CReact%7CscrollList&explorer=true&editor=true&preview=true',
          text: 'Scroll List',
          icon: <IconPlay />
        },
        {
          href: '/play?code=&type=predefined&sandbox=Examples%7CReact%7Csubsystems&explorer=true&editor=true&preview=true',
          text: 'Subsystems',
          icon: <IconPlay />
        }
      ]}
    />

    <AR.H2>Packages</AR.H2>

    <AR.P>These are the available React packages:</AR.P>

    <AR.Table>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell isHeader>Package</AR.Cell>
        <AR.Cell isHeader>Description</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/react-tools</code>
        </AR.Cell>
        <AR.Cell>React general utilities</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/react-animator</code>
        </AR.Cell>
        <AR.Cell>React interfaces assembling</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/react-animated</code>
        </AR.Cell>
        <AR.Cell>React elements animations</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/react-bleeps</code>
        </AR.Cell>
        <AR.Cell>React short sounds management</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/react-text</code>
        </AR.Cell>
        <AR.Cell>React text rendering effects</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/react-frames</code>
        </AR.Cell>
        <AR.Cell>React responsive scalable vector graphics</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/react-bgs</code>
        </AR.Cell>
        <AR.Cell>React passive background ambiences</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/react-core</code>
        </AR.Cell>
        <AR.Cell>React integration functionalities</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/react</code>
        </AR.Cell>
        <AR.Cell>All vanilla and React packages bundle</AR.Cell>
      </AR.Row>
    </AR.Table>

    <AR.Navigation
      prevHref="/docs/develop"
      prev="Develop"
      nextHref="/docs/develop/react/animators"
      next="Animators"
    />
  </>
)
