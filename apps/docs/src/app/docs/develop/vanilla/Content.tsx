'use client'

import Link from 'next/link'
import { Animated, Animator } from '@arwes/react'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.H1>Vanilla</AR.H1>

    <AR.HR />

    <Animator>
      <Animated className="flex flex-row gap-2" animated={['flicker']}>
        <img
          className="!m-0"
          alt="bundle size"
          src="https://img.shields.io/bundlephobia/minzip/arwes.svg"
        />
        <img
          className="!m-0"
          alt="installs"
          src="https://img.shields.io/npm/dm/arwes?label=installs&style=flat-square"
        />
      </Animated>
    </Animator>

    <AR.P>
      Vanilla packages are the core of the framework. They do not have major external dependencies
      but most tools are low level APIs and sometimes require elaborated setups/configurations. Many
      of these APIs are simplified using the other implementation packages such as{' '}
      <Link href="/docs/develop/react">React</Link> or <Link href="/docs/develop/solid">Solid</Link>
      .
    </AR.P>

    <AR.H2>Packages</AR.H2>

    <AR.P>These are the available vanilla packages:</AR.P>

    <AR.Table>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell isHeader>Package</AR.Cell>
        <AR.Cell isHeader>Description</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/tools</code>
        </AR.Cell>
        <AR.Cell>General browser utilities</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/theme</code>
        </AR.Cell>
        <AR.Cell>Visual themes scaffolding</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/styles</code>
        </AR.Cell>
        <AR.Cell>Special visual styles</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/animator</code>
        </AR.Cell>
        <AR.Cell>Interfaces assembling</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/animated</code>
        </AR.Cell>
        <AR.Cell>Animation sequences effects</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/bleeps</code>
        </AR.Cell>
        <AR.Cell>Short sounds management</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/text</code>
        </AR.Cell>
        <AR.Cell>Text rendering effects</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/frames</code>
        </AR.Cell>
        <AR.Cell>Responsive scalable vector graphics</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/bgs</code>
        </AR.Cell>
        <AR.Cell>Passive background ambiences</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>@arwes/core</code>
        </AR.Cell>
        <AR.Cell>Integration functionalities</AR.Cell>
      </AR.Row>
      <AR.Row className="grid grid-cols-[10rem_1fr] lg:grid-cols-[15rem_1fr]">
        <AR.Cell>
          <code>arwes</code>
        </AR.Cell>
        <AR.Cell>All vanilla packages bundle</AR.Cell>
      </AR.Row>
    </AR.Table>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs/develop/fundamentals"
      prev="Fundamentals"
      nextHref="/docs/develop/react"
      next="React"
    />
  </>
)
