'use client'

import { Animated, Animator } from '@arwes/react'

import { AR } from '@/ui'
import { ExampleFrames } from './ExampleFrames'
import { ExampleSimpleSVG } from './ExampleSimpleSVG'
import { ExampleFrame } from './ExampleFrame'

export default (): JSX.Element => (
  <>
    <AR.Header>Frames Fundamentals</AR.Header>

    <AR.P>
      Simple rectangles and ellipses might not be enough for creative designs.{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/SVG" target="_blank">
        SVG
      </a>{' '}
      offers a solution for rich and lightweight graphs using vectors. When these vectors need to be
      responsive in [x, y] axes and dynamically configured, ARWES Frames may be a solution. This is
      because SVG does not support such responsiveness nor calculations such as CSS{' '}
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/calc" target="_blank">
        <code>calc()</code>
      </a>{' '}
      for its values and creating motion effects such as{' '}
      <a href="https://css-tricks.com/svg-line-animation-works" target="_blank">
        line drawing
      </a>{' '}
      becomes difficult.
    </AR.P>

    <AR.P>
      The framework provides a few out-of-the-box frame components which can be styled and animated.
    </AR.P>

    <ExampleFrames />

    <AR.P>
      They all create SVG elements dynamically with different names and CSS variables for easy
      customization.
    </AR.P>

    <AR.UL>
      <li>
        <code>[data-name="line"]</code> for SVG <code>path</code> elements as lines or polylines.
        <ul>
          <li>
            <code>--arwes-frames-line-color</code> for stroke color.
          </li>
          <li>
            <code>--arwes-frames-line-filter</code> for filter effect.
          </li>
        </ul>
      </li>
      <li>
        <code>[data-name="bg"]</code> for background shapes.
        <ul>
          <li>
            <code>--arwes-frames-bg-color</code> for fill color.
          </li>
          <li>
            <code>--arwes-frames-bg-filter</code> for filter effect.
          </li>
        </ul>
      </li>
      <li>
        <code>[data-name="deco"]</code> for decorative elements.
        <ul>
          <li>
            <code>--arwes-frames-deco-color</code> for fill or stroke color.
          </li>
          <li>
            <code>--arwes-frames-deco-filter</code> for filter effect.
          </li>
        </ul>
      </li>
    </AR.UL>

    <AR.H2>Simple SVG</AR.H2>

    <AR.P>
      If possible, it is better to use/import SVG files directly into your app due to all the
      benefits it has.
    </AR.P>

    <AR.P>Take for example this SVG:</AR.P>

    <AR.CodeBlock
      lang="html"
      code={`<svg width="203" height="152" viewBox="0 0 203 152" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M186.738 149.5H16.0617L1.00195 124.5L69.7746 0.5H133.025L201.798 124.5L186.738 149.5Z" fill="#20DFDF" fill-opacity="0.1" stroke="#0D5959"/>
  <path d="M16.4504 151L15.1982 149H66.2605L65.2566 150H37L36 151H16.4504Z" fill="#20DFDF"/>
  <path d="M186.368 151L187.62 149H136.558L137.562 150H165.818L166.818 151H186.368Z" fill="#20DFDF"/>
  <path d="M65.2568 7.6V9.70703L70.0467 1H76.3006L77.3046 0H69.4736L65.2568 7.6Z" fill="#20DFDF"/>
  <path d="M137.544 7.6V9.70703L132.754 1H126.5L125.496 0H133.327L137.544 7.6Z" fill="#20DFDF"/>
  <path d="M0.400391 124.5L6.14276 134L7.60857 134.5L1.60477 124.5L7.40778 114L5.97209 114.5L0.400391 124.5Z" fill="#20DFDF"/>
  <path d="M202.4 124.5L196.658 134L195.192 134.5L201.196 124.5L195.393 114L196.829 114.5L202.4 124.5Z" fill="#20DFDF"/>
</svg>`}
    />

    <AR.P>Which renders to this image:</AR.P>

    <Animator>
      <Animated data-name="example">
        <svg
          width="203"
          height="152"
          viewBox="0 0 203 152"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M186.738 149.5H16.0617L1.00195 124.5L69.7746 0.5H133.025L201.798 124.5L186.738 149.5Z"
            fill="#20DFDF"
            fillOpacity="0.1"
            stroke="#0D5959"
          />
          <path
            d="M16.4504 151L15.1982 149H66.2605L65.2566 150H37L36 151H16.4504Z"
            fill="#20DFDF"
          />
          <path
            d="M186.368 151L187.62 149H136.558L137.562 150H165.818L166.818 151H186.368Z"
            fill="#20DFDF"
          />
          <path
            d="M65.2568 7.6V9.70703L70.0467 1H76.3006L77.3046 0H69.4736L65.2568 7.6Z"
            fill="#20DFDF"
          />
          <path
            d="M137.544 7.6V9.70703L132.754 1H126.5L125.496 0H133.327L137.544 7.6Z"
            fill="#20DFDF"
          />
          <path
            d="M0.400391 124.5L6.14276 134L7.60857 134.5L1.60477 124.5L7.40778 114L5.97209 114.5L0.400391 124.5Z"
            fill="#20DFDF"
          />
          <path
            d="M202.4 124.5L196.658 134L195.192 134.5L201.196 124.5L195.393 114L196.829 114.5L202.4 124.5Z"
            fill="#20DFDF"
          />
        </svg>
      </Animated>
    </Animator>

    <AR.P>
      This shape would normally only resize with the same aspect ratio of{' '}
      <code>203/152 = 1.33</code> which is perfectly supported everywhere. That is one of the
      purposes of SVG.
    </AR.P>

    <AR.P>
      For example, it can be dynamically resized with other HTML elements, such as texts, preserving
      the aspect ratio using simple CSS <code>width</code> and <code>font-size</code> along with SVG
      attribute{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/vector-effect"
        target="_blank"
      >
        <code>vector-effect</code>
      </a>{' '}
      for SVG elements which have stroke.
    </AR.P>

    <AR.CodeBlock
      lang="html"
      highlightLines={[5, 10, 20, 30]}
      code={`<div
  style="
    position: relative;
    display: inline-block;
    width: 200px;
  "
>
  <svg
    style="position: relative;"
    width="100%"
    viewBox="0 0 203 152"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M186.738 149.5H16.0617L1.00195 124.5L69.7746 0.5H133.025L201.798 124.5L186.738 149.5Z"
      fill="#20DFDF"
      fill-opacity="0.1"
      stroke="#0D5959"
      vector-effect="non-scaling-stroke"
    />
    ...
  </svg>
  <div
    style="
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate(-50%, -50%);
      font-size: 1rem;
    "
  >
    74.9%
  </div>
</div>`}
    />

    <ExampleSimpleSVG />

    <AR.P>
      There are tons of tricks to create graphs with SVG and CSS. If the graphs need to be
      responsive and dynamic, then they can be developed in ARWES Frames.
    </AR.P>

    <AR.H2>Designing Frames</AR.H2>

    <AR.P>
      It is possible to generate any SVG using JavaScript, but since the SVG elements will be
      dynamically created in runtime, the simpler the shapes the better for both performance and
      maintenance.
    </AR.P>

    <AR.P>There are many native and web applications to design SVG such as:</AR.P>

    <AR.Links
      links={[
        {
          text: 'Inkscape',
          href: 'https://inkscape.org',
          target: '_blank'
        },
        {
          text: 'Figma',
          href: 'https://www.figma.com',
          target: '_blank'
        }
      ]}
    />

    <AR.H2>Developing Frames</AR.H2>

    <AR.P>
      Once the SVG to be used as a frame is designed, it can be developed into a responsive and
      dynamic custom SVG. Unfortunately, there is no visual way to implement them, it has to be a
      manual process, it is limited in the type of SVG elements to create, and a decent amount of
      knowledge and experience in SVG is required.
    </AR.P>

    <AR.P>
      There are great resources on Internet to learn about SVG in depth if needed such as:
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

    <AR.P>For example, take this easy SVG to use as a frame:</AR.P>

    <Animator>
      <Animated data-name="example">
        <svg
          width="201"
          height="102"
          viewBox="0 0 201 102"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0.5 1 H 200.5 V 21" stroke="#20DFDF" />
          <path d="M 200.5 101 H 0.5 V 81" stroke="#20DFDF" />
          <rect x="5.5" y="6.5" width="190" height="90" fill="#20DFDF" fillOpacity="0.1" />
        </svg>
      </Animated>
    </Animator>

    <AR.P>With the following SVG source code:</AR.P>

    <AR.CodeBlock
      lang="html"
      code={`<svg
  width="201"
  height="102"
  viewBox="0 0 201 102"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M 0.5 1 H 200.5 V 21" stroke="#20DFDF" />
  <path d="M 200.5 101 H 0.5 V 81" stroke="#20DFDF" />
  <rect x="5.5" y="6.5" width="190" height="90" fill="#20DFDF" fill-opacity="0.1" />
</svg>`}
    />

    <AR.P>
      It consists in 3 SVG elements, two <code>path</code> elements for both the lines, and a{' '}
      <code>rect</code> for the background.
    </AR.P>

    <AR.P>
      The first <code>path</code> element is the top line. It consists in 3 points, left-top corner{' '}
      <code>M 0.5 1</code>, right-top corner <code>H 200.5</code>, then it goes downward for a
      certain length <code>V 21</code>.
    </AR.P>

    <AR.CodeBlock lang="html" code='<path d="M 0.5 1 H 200.5 V 21" stroke="#20DFDF" />' />

    <Animator>
      <Animated data-name="example">
        <svg
          width="201"
          height="22"
          viewBox="0 0 201 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 0.5 1 H 200.5 V 21" stroke="#20DFDF" />
        </svg>
      </Animated>
    </Animator>

    <AR.P>
      The left-top corner point will always be static since no matter how it is resized it will be
      in the same place. But the right-top corner point depends on the size width of the SVG
      container. For this, it can be defined with a dynamic percentage calculation. Finally, the
      last point can be moved downwards a specific length statically.
    </AR.P>

    <AR.P>
      A frame definition would be a JavaScript object with all the elements to render. The first
      line could look like:
    </AR.P>

    <AR.CodeBlock
      code={`{
  path: [
    ['M', 0.5, 1], // x,y pixels
    ['H', '100% - 0.5'], // x = svg_width * 100% - 0.5 pixels
    ['v', 21] // Lowercase "v" which is relative to prev point.
  ]
}`}
    />

    <AR.P>
      All other properties such as <code>stroke</code>, <code>class</code>, or <code>style</code>{' '}
      attributes can be defined like:
    </AR.P>

    <AR.CodeBlock
      code={`{
  name: 'line', // [data-name] attribute
  className: 'my-frame-line', // class attribute
  style: { // CSS properties.
    stroke: '#20DFDF'
  },
  path: [
    ['M', 0.5, 1],
    ['H', '100% - 0.5'],
    ['v', 21]
  ]
}`}
    />

    <AR.P>The final frame elements definition could be like:</AR.P>

    <AR.CodeBlock
      code={`[
  {
    style: { fill: 'none', stroke: '#20DFDF' },
    path: [
      ['M', 0.5, 1],
      ['H', '100% - 0.5'],
      ['v', 21]
    ]
  },
  {
    style: { fill: 'none', stroke: '#20DFDF' },
    path: [
      ['M', '100% - 0.5', '100% - 0.5'],
      ['H', '0.5'],
      ['v', -21]
    ]
  },
  {
    style: { fill: 'hsl(180deg 75% 50% / 10%)', stroke: 'none' },
    path: [
      ['M', 6, 6],
      ['H', '100% - 6'],
      ['V', '100% - 6'],
      ['H', 6]
    ]
  }
]`}
    />

    <AR.Blockquote>
      <p>
        Currently, only SVG <code>path</code> elements are supported in the frames API.
      </p>
    </AR.Blockquote>

    <AR.P>The final frame can be now resized as desired with any other HTML/SVG element:</AR.P>

    <ExampleFrame />

    <AR.P>
      Basic mathematical calculations are supported within the frame elements definition and the
      percentages in [x, y] axes are automatically calculated where it applies.
    </AR.P>

    <AR.Navigation
      prevHref="/docs/develop/fundamentals/text"
      prev="Text"
      nextHref="/docs/develop/fundamentals/bgs"
      next="Backgrounds"
    />
  </>
)
