'use client'

import { AR } from '@/ui'
import { ExampleFrames } from './ExampleFrames'
import { ExampleSVG } from './ExampleSVG'
import { Animated, Animator } from '@arwes/react'

export default (): JSX.Element => (
  <>
    <AR.Header>Frames Fundamentals</AR.Header>

    <AR.P>
      Simple "rectangles" may not be enough for creative designs. ARWES Frames are{' '}
      <b>responsive vector graphics</b> which can be used to create complex shapes and decorative
      elements. They are pretty much{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/SVG" target="_blank">
        SVG
      </a>{' '}
      with configurable and dynamic values which react to their relative size. This is because SVG
      does not support partially responsive elements nor calculations such as CSS{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" target="_blank">
        <code>calc()</code>
      </a>{' '}
      for its values.
    </AR.P>

    <AR.P>
      The framework provides a few out-of-the-box frame components which can be styled and animated.
    </AR.P>

    <ExampleFrames />

    <AR.H2>Simple SVG</AR.H2>

    <AR.P>
      It is better to use/import simple SVG files directly into your app if possible due to all the
      benefits it has. This mostly applies if the graphs do not require dynamic responsive
      calculations.
    </AR.P>

    <AR.P>Take for example this SVG:</AR.P>

    <AR.CodeBlock
      lang="html"
      code={`<svg
  viewBox="0 0 202 152"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M186 149.5H16L1 134.5L79.5 0.5H122.5L201 134.5L186 149.5Z" fill="#20DFDF" fill-opacity="0.1" stroke="#0D5959" />
  <path d="M17.8 152L14.7998 149H65.9995L64.9995 150H36.9995L34.4995 152H17.8Z" fill="#20DFDF" />
  <path d="M184.2 152L187.2 149H136.001L137.001 150H165.001L167.501 152H184.2Z" fill="#20DFDF" />
  <path d="M75 6.4V8.22656L79.7709 1H86L87 0H79.2L75 6.4Z" fill="#20DFDF" />
  <path d="M127 6.41406V8.22656L122.229 1H116L115 0H122.8L127 6.41406Z" fill="#20DFDF" />
</svg>`}
    />

    <AR.P>Which renders to this image:</AR.P>

    <Animator>
      <Animated data-name="example">
        <svg
          className="relative"
          width="202"
          viewBox="0 0 202 152"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M186 149.5H16L1 134.5L79.5 0.5H122.5L201 134.5L186 149.5Z"
            fill="#20DFDF"
            fillOpacity="0.1"
            stroke="#0D5959"
          />
          <path
            d="M17.8 152L14.7998 149H65.9995L64.9995 150H36.9995L34.4995 152H17.8Z"
            fill="#20DFDF"
          />
          <path
            d="M184.2 152L187.2 149H136.001L137.001 150H165.001L167.501 152H184.2Z"
            fill="#20DFDF"
          />
          <path d="M75 6.4V8.22656L79.7709 1H86L87 0H79.2L75 6.4Z" fill="#20DFDF" />
          <path d="M127 6.41406V8.22656L122.229 1H116L115 0H122.8L127 6.41406Z" fill="#20DFDF" />
        </svg>
      </Animated>
    </Animator>

    <AR.P>
      This shape would normally only resize with the same aspect ratio of{' '}
      <code>202/152 = 1.3289473684210527</code> which is perfectly supported everywhere. That is one
      of the purposes of SVG. Unless there are some other dynamic settings, anything like ARWES
      Frames is not required and the SVG can be simply used directly in the source code.
    </AR.P>

    <AR.P>
      For example, it can be dynamically resized with other HTML elements, such as texts, preserving
      the aspect ratio using CSS <code>font-size</code> along with SVG attribute{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/vector-effect"
        target="_blank"
      >
        <code>vector-effect</code>
      </a>
      .
    </AR.P>

    <AR.CodeBlock
      lang="html"
      highlightLines={[5, 10, 20, 25, 30, 35, 40, 49]}
      code={`<div
  style="
    position: relative;
    display: inline-block;
    font-size: 15rem;
  "
>
  <svg
    style="position: relative;"
    width="1em"
    viewBox="0 0 202 152"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M186 149.5H16L1 134.5L79.5 0.5H122.5L201 134.5L186 149.5Z"
      fill="#20DFDF"
      fill-opacity="0.1"
      stroke="#0D5959"
      vector-effect="non-scaling-stroke"
    />
    <path
      d="M17.8 152L14.7998 149H65.9995L64.9995 150H36.9995L34.4995 152H17.8Z"
      fill="#20DFDF"
      vector-effect="non-scaling-stroke"
    />
    <path
      d="M184.2 152L187.2 149H136.001L137.001 150H165.001L167.501 152H184.2Z"
      fill="#20DFDF"
      vector-effect="non-scaling-stroke"
    />
    <path
      d="M75 6.4V8.22656L79.7709 1H86L87 0H79.2L75 6.4Z"
      fill="#20DFDF"
      vector-effect="non-scaling-stroke"
    />
    <path
      d="M127 6.41406V8.22656L122.229 1H116L115 0H122.8L127 6.41406Z"
      fill="#20DFDF"
      vector-effect="non-scaling-stroke"
    />
  </svg>
  <div
    style="
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate(-50%, -50%);
      font-size: 0.2em;
    "
  >
    74.9%
  </div>
</div>`}
    />

    <ExampleSVG />

    <AR.P>
      There are a ton of tricks to use to create effects using SVG but when the graphs need to be
      resized dynamically with calculated coordinates, then they can be designed and implemented
      with ARWES Frames.
    </AR.P>

    <AR.H2>Designing Frames</AR.H2>

    <AR.P>
      Custom SVG frames can be created. Unfortunately, there is no visual way to create them, it has
      to be a manual process, it is limited in the type of SVG elements to create, and a decent
      amount of knowledge and experience in SVG is required. There are great resources on Internet
      to learn about SVG in depth if needed.
    </AR.P>

    <AR.Links
      links={[
        {
          text: 'Introducing SVG from scratch',
          href: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Introduction',
          target: '_blank'
        },
        {
          text: 'SVG Paths',
          href: 'https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths',
          target: '_blank'
        }
      ]}
    />

    <AR.P>TODO.</AR.P>

    <AR.H2>Developing Frames</AR.H2>

    <AR.P>TODO.</AR.P>

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/text"
      prev="Text"
      nextHref="/docs/develop/fundamentals/bgs"
      next="Backgrounds"
    />
  </>
)
