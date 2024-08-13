'use client'

import { AR } from '@/ui'
import Link from 'next/link'

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

    <AR.P>
      Its packages are categorized by <b>vanilla</b> and <b>implementation</b> packages.{' '}
      <Link href="/docs/develop/vanilla">ARWES vanilla packages</Link> do not have major external
      dependencies, while the implementation packages, depend on specific frameworks to simplify
      their use and add custom UI components, such as{' '}
      <Link href="/docs/develop/react">ARWES React packages</Link> depend on React.js.
    </AR.P>

    <AR.Blockquote>
      <p>
        The project is under development and not ready for production yet. It is still in{' '}
        <a href="https://stackoverflow.com/questions/40067469" target="_blank">
          alpha release
        </a>
        , so the components are being tested and their API may change as it gets completed.
      </p>
    </AR.Blockquote>

    <AR.Blockquote>
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
    </AR.Blockquote>

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
