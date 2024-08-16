'use client'

import Link from 'next/link'
import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.H1>Develop</AR.H1>

    <AR.HR />

    <AR.P>
      ARWES is a low-to-medium level API web framework to build design systems with special effects.
      It does not provide an out-of-the-box UI toolkit (such as{' '}
      <a href="https://mui.com" target="_blank">
        MUI
      </a>
      ,{' '}
      <a href="https://www.radix-ui.com" target="_blank">
        Radix
      </a>
      , or{' '}
      <a href="https://getbootstrap.com" target="_blank">
        Bootstrap
      </a>
      ) but rather primitives, utilities, and base UI components to build one along with other
      libraries or frameworks. This is mostly because futuristic sci-fi apps normally have very
      particular/different aesthetics/ux.
    </AR.P>

    <AR.P>Check out the framework development guides:</AR.P>

    <AR.UL>
      <li>
        <Link href="/docs/develop/fundamentals">Fundamentals</Link>
      </li>
      <li>
        <Link href="/docs/develop/vanilla">Vanilla</Link>
      </li>
      <li>
        <Link href="/docs/develop/tailwind">Tailwind</Link>
      </li>
      <li>
        <Link href="/docs/develop/react">React</Link>
      </li>
      <li>
        <Link href="/docs/develop/solid">Solid</Link>
      </li>
      <li>
        <Link href="/docs/develop/svelte">Svelte</Link>
      </li>
    </AR.UL>

    <AR.H2>Deliverables</AR.H2>

    <AR.P>
      The framework is delivered for the web platform as{' '}
      <a href="https://www.npmjs.com" target="_blank">
        NPM
      </a>{' '}
      packages in the <code>@arwes/[package]</code> scope for ESModules and CommonJS formats in
      JavaScript ES2022 version with strict{' '}
      <a href="https://www.typescriptlang.org" target="_blank">
        TypeScript
      </a>{' '}
      v5+ type definitions.
    </AR.P>

    <AR.H2>Compatibility</AR.H2>

    <AR.P>
      Latest versions of Chrome, Firefox, and Safari, for Android, iOS and desktop are supported.
      Server-side rendering with Node.js is supported.
    </AR.P>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs"
      prev="Index"
      nextHref="/docs/develop/fundamentals"
      next="Fundamentals"
    />
  </>
)
