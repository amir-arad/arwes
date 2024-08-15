'use client'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.H1>Visual Fundamentals</AR.H1>

    <AR.HR />

    <AR.P>
      For certain user experiences, visual design effects can be dynamically generated in different
      formats such as CSS, SVG, 2D Canvas, and 3D WebGL. ARWES provides a few tools to create and
      share visual configurations and effects across them.
    </AR.P>

    <AR.H2>Theming</AR.H2>

    <AR.P>
      A theme is the design configuration for an app. It is mostly visual design settings and tokens
      but it can also contain other configurations for motion design or even audio design.
    </AR.P>

    <AR.UL>
      <li>
        <a
          href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units"
          target="_blank"
        >
          Units
        </a>{' '}
        such as pixels or REMs.
      </li>
      <li>
        Colors such as hexadecimal,{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl" target="_blank">
          hsl
        </a>
        ,{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb" target="_blank">
          rgb
        </a>
        .
      </li>
      <li>Device viewport breakpoints for CSS media queries.</li>
      <li>Styles of any CSS property such as typographies or shadows.</li>
      <li>Feature toggle booleans such as light and dark mode, or if to reduce motion effects.</li>
    </AR.UL>

    <AR.P>
      ARWES does not provide nor enforce a particular design theme but rather offers a few tools to
      create individual pieces of configuration and compose them into a theme as flexible as
      required and integrate it with any styling solution such as{' '}
      <a href="https://tailwindcss.com" target="_blank">
        Tailwind
      </a>{' '}
      or{' '}
      <a href="https://mui.com" target="_blank">
        MUI
      </a>
      .
    </AR.P>

    <AR.P>
      For an app with complex designs, a theme can be defined as an object in JavaScript in one
      place and then be used in:
    </AR.P>

    <AR.UL>
      <li>
        HTML/SVG with the{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style"
          target="_blank"
        >
          <code>style</code>
        </a>{' '}
        attribute.
      </li>
      <li>
        SVG with any SVG attribute such as{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill" target="_blank">
          <code>fill</code>
        </a>{' '}
        or{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke" target="_blank">
          <code>stroke</code>
        </a>
        .
      </li>
      <li>
        CSS classes via a class utility tool like{' '}
        <a href="https://tailwindcss.com" target="_blank">
          Tailwind
        </a>
        .
      </li>
      <li>
        CSS classes by just defining their properties in a dynamically generated{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style" target="_blank">
          <code>&lt;style&gt;</code>
        </a>
        .
      </li>
      <li>In 2D Canvas or 3D WebGL, by defining styles programatically.</li>
      <li>
        JavaScript animations by defining the animated properties directly in the animation library
        API.
      </li>
      <li>JavaScript animations using the ARWES motion tools.</li>
    </AR.UL>

    <AR.H2>Style Effects</AR.H2>

    <AR.P>
      ARWES provides a few styling effects such as background patterns and{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path" target="_blank">
        <code>clip-path</code>
      </a>{' '}
      tricks.
    </AR.P>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs/develop/fundamentals"
      prev="Fundamentals"
      nextHref="/docs/develop/fundamentals/motion"
      next="Motion"
    />
  </>
)
