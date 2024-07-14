import { type ReactElement } from 'react'
import Link from 'next/link'
import { ArrowRight, FastArrowRight } from 'iconoir-react'
import { Animator, Animated, Text, BleepsOnAnimator, transition, flicker } from '@arwes/react'
import type { BleepNames } from '@app/types'
import { PageContentLayout, Button } from '@app/ui'

const Page = (): ReactElement => {
  return (
    <Animator combine manager="stagger">
      <PageContentLayout animated={transition('y', 12, 0)}>
        <Animator>
          <Text as="h1" fixed>
            Develop
          </Text>
          <BleepsOnAnimator<BleepNames> transitions={{ entering: 'content' }} continuous />
        </Animator>
        <Animator>
          <Animated as="hr" animated={transition('scaleX', 0, 1)} />
        </Animator>
        <Animator>
          <Text>
            Arwes packages are categorized by "vanilla" and "implementation" packages. Arwes vanilla
            packages do not have UI libraries or frameworks dependencies, while the implementation
            packages depend on specific UI tools to simplify their use and add custom UI components.
          </Text>
        </Animator>
        <Animator>
          <Text>
            Their purpose can be for visual, motion, or audio design, or UI components
            implementations. The <a href="/play">Playground</a> can be used to experiment with
            various use cases in real-time in browser to get a sense of what is possible to do.
          </Text>
        </Animator>

        {/* VANILLA */}

        <Animator>
          <Text as="h2" fixed id="vanilla">
            <FastArrowRight style={{ verticalAlign: 'middle' }} />
            <span> Vanilla</span>
          </Text>
        </Animator>
        <Animator>
          <Text>
            Vanilla packages can be used with any other UI library but many tools are low level APIs
            and require more elaborated configurations. Implementation packages mostly provide
            "sugar-APIs" to facilitate their use.
          </Text>
        </Animator>
        <Animator>
          <Text>Available vanilla packages:</Text>
        </Animator>

        <Animator>
          <Animated
            style={{
              marginBottom: '1.5rem',
              minWidth: 0,
              minHeight: 0,
              maxWidth: '100%',
              overflowX: 'auto'
            }}
            animated={flicker()}
          >
            <table style={{ minWidth: 700 }}>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Stats</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>@arwes/tools</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/tools?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/tools.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>General browser API tools</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/theme</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/theme?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/theme.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Color, units, and general purpose dynamic theming tools</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/animated</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/animated?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/animated.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>HTML element animation utilities</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/animator</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/animator?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/animator.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Assemble and disassemble user interfaces using animation controls</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/bleeps</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/bleeps?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/bleeps.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Define, manage, and control interactive short sound effects</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/text</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/text?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/text.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Text rendering effect tools</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/frames</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/frames?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/frames.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Build responsive vector graphics components</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/bgs</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/bgs?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/bgs.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Passive UI background effects</td>
                </tr>
                <tr>
                  <td>
                    <code>arwes</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/arwes?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/arwes.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>All vanilla packages bundle</td>
                </tr>
              </tbody>
            </table>
          </Animated>
        </Animator>

        {/* REACT.JS */}

        <Animator>
          <Text as="h2" fixed id="react">
            <FastArrowRight style={{ verticalAlign: 'middle' }} />
            <span> React</span>
          </Text>
        </Animator>
        <Animator>
          <Text>
            The framework offers <a href="https://react.dev">React.js</a> v18 specific packages with{' '}
            <a href="https://web.dev/rendering-on-the-web">SSR</a> support. Get started with{' '}
            <a href="https://nextjs.org/docs/getting-started/installation">Next.js</a> or any other
            React setup for a new or existing project.
          </Text>
        </Animator>
        <Animator>
          <Animated as="blockquote" data-arwes-global-palette="error">
            <Text>Arwes does not work with React strict mode nor React Server Components.</Text>
          </Animated>
        </Animator>

        <Animator>
          <Text>Available React packages:</Text>
        </Animator>

        <Animator>
          <Animated
            style={{
              marginBottom: '1.5rem',
              minWidth: 0,
              minHeight: 0,
              maxWidth: '100%',
              overflowX: 'auto'
            }}
            animated={flicker()}
          >
            <table style={{ minWidth: 700 }}>
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Status</th>
                  <th>Stats</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>@arwes/react-tools</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/react-tools?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/react-tools.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>General React API tools</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/react-animator</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/react-animator?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/react-animator.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Animator interface tools</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/react-animated</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/react-animated?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/react-animated.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Animated UI elements using animator tools</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/react-bleeps</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/react-bleeps?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/react-bleeps.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Interactive short sound effects manager</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/react-text</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/react-text?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/react-text.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Text effect components</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/react-frames</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/react-frames?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/react-frames.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Build responsive vector graphics components</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/react-bgs</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/react-bgs?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/react-bgs.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Passive UI background effects</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/react-core</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/react-core?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/react-core.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>Core UI components</td>
                </tr>
                <tr>
                  <td>
                    <code>@arwes/react</code>
                  </td>
                  <td>
                    <small style={{ color: 'hsl(150 100% 50%)' }}>Polishing</small>
                  </td>
                  <td>
                    <img
                      src="https://img.shields.io/bundlephobia/minzip/@arwes/react?style=flat-square"
                      alt="npm bundle size (scoped)"
                    />
                    <img
                      src="https://img.shields.io/npm/dm/@arwes/react.svg?style=flat-square"
                      alt="Downloads"
                    />
                  </td>
                  <td>All vanilla and React packages bundle</td>
                </tr>
              </tbody>
            </table>
          </Animated>
        </Animator>

        <nav
          style={{
            marginTop: '3rem',
            display: 'grid',
            gridAutoFlow: 'column',
            columnGap: '1.5rem',
            justifyContent: 'right'
          }}
        >
          <Animator>
            <a href="/play">
              <Button
                frame="hexagon"
                animated={[flicker(), transition('x', -12, 0)]}
                onHoverAnimateIcons
                tabIndex={-1}
                title="Go to play"
              >
                <span>Play</span>
                <ArrowRight />
              </Button>
            </a>
          </Animator>
          <Animator>
            <Link href="/docs/design">
              <Button
                frame="hexagon"
                animated={[flicker(), transition('x', -12, 0)]}
                onHoverAnimateIcons
                tabIndex={-1}
                title="Go to design"
              >
                <span>Design</span>
                <ArrowRight />
              </Button>
            </Link>
          </Animator>
        </nav>
      </PageContentLayout>
    </Animator>
  )
}

export default Page
