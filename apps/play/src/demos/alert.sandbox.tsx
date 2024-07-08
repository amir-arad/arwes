import React, { ReactNode, useEffect, useMemo, useRef, useState, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createThemeUnit,
  createThemeMultiplier,
  createThemeColor,
  styleGradientSteps,
  Animator,
  Animated,
  AnimatedProp,
  transition,
  flicker,
  Dots,
  FrameSVGPathGeneric,
  createFrameOctagonClip,
  useFrameSVGAssembler,
  FrameSVG,
  FrameSVGCorners,
  FrameSVGNefrex,
  Illuminator,
  BleepsProviderSettings,
  BleepsProvider,
  useBleeps,
  BleepsOnAnimator
} from '@arwes/react'

const addStyles = (css: string) => {
  const style = document.createElement('style')
  style.innerHTML = css
  document.body.appendChild(style)
}

const theme = {
  // REMs as HTML unit.
  space: createThemeUnit((index) => `${index * 0.25}rem`),

  // Pixels as number unit.
  spacen: createThemeMultiplier((index) => index * 4),

  colors: {
    background: 'hsla(180, 100%, 3%)',
    primary: createThemeColor((i) => [180, 100, 100 - i * 10]),
    secondary: createThemeColor((i) => [60, 100, 100 - i * 10])
  },

  fontFamily: 'Titillium Web'
}

addStyles(`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family: ${theme.fontFamily};
    background: ${theme.colors.background};
  }
`)

type BleepsNames = 'intro' | 'assemble' | 'type' | 'click'

// WEBM for Chromium and Firefox browsers and MP3 for Safari and iOS.
const bleepsSettings: BleepsProviderSettings<BleepsNames> = {
  master: {
    volume: 0.9
  },
  bleeps: {
    intro: {
      sources: [
        { src: '/assets/sounds/intro.webm', type: 'audio/webm' },
        { src: '/assets/sounds/intro.mp3', type: 'audio/mpeg' }
      ]
    },
    assemble: {
      sources: [
        { src: '/assets/sounds/assemble.webm', type: 'audio/webm' },
        { src: '/assets/sounds/assemble.mp3', type: 'audio/mpeg' }
      ]
    },
    type: {
      sources: [
        { src: '/assets/sounds/type.webm', type: 'audio/webm' },
        { src: '/assets/sounds/type.mp3', type: 'audio/mpeg' }
      ]
    },
    click: {
      sources: [
        { src: '/assets/sounds/click.webm', type: 'audio/webm' },
        { src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }
      ]
    }
  }
}

addStyles(`
  .page-frame [data-name=line] {
    stroke: ${theme.colors.primary(5)};
    stroke-width: 1;
    fill: none;
  }
`)
const PageFrame = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement>(null)
  useFrameSVGAssembler(svgRef)
  const paths = useMemo<FrameSVGPathGeneric[]>(
    () => [
      {
        name: 'line',
        path: [
          ['M', 10, 10],
          ['h', '10%'],
          ['v', '20'],
          ['h', '10%']
        ]
      },
      {
        name: 'line',
        path: [
          ['M', '100%-10', 10],
          ['h', '-10%'],
          ['v', '20'],
          ['h', '-10%']
        ]
      },
      {
        name: 'line',
        path: [
          ['M', '100%-10', '100%-10'],
          ['h', '-10%'],
          ['v', '-20'],
          ['h', '-10%']
        ]
      },
      {
        name: 'line',
        path: [
          ['M', '10', '100%-10'],
          ['h', '10%'],
          ['v', '-20'],
          ['h', '10%']
        ]
      }
    ],
    []
  )
  return <FrameSVG elementRef={svgRef} className="page-frame" paths={paths} />
}

addStyles(`
  .main-frame {
    z-index: -1;
    position: absolute;
    inset: 0;
  }
  .main-frame [data-name=bg] {
    color: ${theme.colors.primary(3, { alpha: 0.05 })};
  }
  .main-frame [data-name=line] {
    color: ${theme.colors.primary(5)};
  }
  .main-frame-bg {
    z-index: -2;
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(-45deg, ${theme.colors.primary(3, { alpha: 0.01 })}, ${theme.colors.primary(3, { alpha: 0.01 })} 5px, transparent 5px, transparent 10px);
  }
`)
const MainFrame = (): ReactElement => {
  const svgRef = useRef<SVGSVGElement>(null)
  useFrameSVGAssembler(svgRef)
  return (
    <div
      className="main-frame"
      style={{
        clipPath: createFrameOctagonClip({
          leftBottom: false,
          rightTop: false
        })
      }}
    >
      <div className="main-frame-bg" />
      <FrameSVGNefrex elementRef={svgRef} />
      <Illuminator color={theme.colors.primary(7, { alpha: 0.05 })} />
    </div>
  )
}

addStyles(`
  .button {
    position: relative;
    outline: none;
    margin: 0;
    border: none;
    padding: 0 2rem;
    line-height: 2rem;
    font-size: 0.75rem;
    font-family: inherit;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${theme.colors.secondary(5)};
    background: transparent;
    cursor: pointer;
    transition-property: opacity, color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }
  .button .arwes-frames-framesvg {
    transition-property: opacity, transform;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }
  .button:hover .arwes-frames-framesvg,
  .button:focus .arwes-frames-framesvg {
    transform: scale(1.05);
  }
  .button [data-frame] {
    transition-property: opacity, transform, color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }
  .button [data-name=line] {
    color: ${theme.colors.secondary(5)};
  }
  .button:hover [data-name=line],
  .button:focus [data-name=line] {
    color: ${theme.colors.secondary(4)};
  }
  .button [data-name=bg] {
    color: ${theme.colors.secondary(9)};
  }
  .button:hover [data-name=bg],
  .button:focus [data-name=bg] {
    color: ${theme.colors.secondary(8)};
  }
`)
const Button = (props: { animated?: AnimatedProp; children: ReactNode }): ReactElement => {
  const bleeps = useBleeps<BleepsNames>()
  const svgRef = useRef<SVGSVGElement>(null)
  useFrameSVGAssembler(svgRef)
  return (
    <Animated
      as="button"
      className="button"
      animated={props.animated}
      onClick={() => bleeps.click?.play()}
    >
      <FrameSVGCorners elementRef={svgRef} cornerLength={8} />
      {props.children}
    </Animated>
  )
}

addStyles(`
  .page {
    position: fixed;
    inset: 0;
    display: flex;
    padding: 1rem;
    text-align: center;
  }

  .page-main {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    gap: 1.5rem;
    padding: 3rem;
    width: 100%;
    max-width: 550px;
  }

  .page-separator {
    position: relative;
    width: 50%;
    height: 0.5rem;
    color: ${theme.colors.primary(8)};
  }

  .page-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }

  .page-header,
  .page-footer {
    position: absolute;
    font-size: 0.625rem;
    color: ${theme.colors.primary(9)};
  }
  .page-header {
    right: 4px;
    top: 4px;
  }
  .page-footer {
    left: 4px;
    bottom: 4px;
  }

  .page img {
    margin: 0 auto;
    width: 100%;
    max-width: 200px;
  }

  .page h1 {
    line-height: 1;
    font-size: 1.5rem;
    font-weight: normal;
    font-family: inherit;
    color: ${theme.colors.primary(6)};
  }

  .page p {
    font-size: 1rem;
    color: ${theme.colors.primary(7)};
  }
`)
const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive(!active), active ? 5_000 : 1_000)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <BleepsProvider {...bleepsSettings}>
      <Animator active={active}>
        <div className="page">
          <Dots
            className="background"
            color={theme.colors.primary(2, { alpha: 0.05 })}
            distance={30}
            type="cross"
            crossSize={1}
            size={6}
            originInverted
          />
          <PageFrame />
          <BleepsOnAnimator<BleepsNames> transitions={{ entering: 'assemble' }} />

          <Animator combine manager="stagger">
            <Animated as="main" className="page-main" animated={transition('scale', 0.8, 1)}>
              <MainFrame />

              <BleepsOnAnimator<BleepsNames> transitions={{ entering: 'intro' }} />
              <Animator merge duration={{ delay: 0.6, enter: 0.5 }}>
                <BleepsOnAnimator<BleepsNames> transitions={{ entering: 'type' }} />
              </Animator>

              <Animator>
                <Animated<HTMLImageElement>
                  as="img"
                  src="/logotype.png"
                  animated={[
                    flicker(),
                    {
                      transitions: {
                        entering: { y: [100, 0], delay: 0.6, duration: 0.2 }
                      }
                    }
                  ]}
                />
              </Animator>

              <Animator duration={{ offset: 0.8 }}>
                <Animated as="h1" animated={[flicker(), transition('y', 20, 0)]}>
                  Futuristic SciFi UI Web Framework
                </Animated>
              </Animator>

              <Animator>
                <Animated
                  className="page-separator"
                  style={{ background: styleGradientSteps(20, 'currentcolor', '-45deg') }}
                  animated={[flicker(), transition('y', 20, 1, 0)]}
                />
              </Animator>

              <Animator>
                <Animated as="p" animated={[flicker(), transition('y', 20, 0, 0)]}>
                  Arwes is a web framework to build user interfaces based on futuristic science
                  fiction designs, animations, and sound effects.
                </Animated>
              </Animator>

              <Animator>
                <Animated className="page-buttons" animated={transition('y', 20, 0, 0)}>
                  <Button animated={[flicker(), transition('x', 10, 0, 0)]}>Exit</Button>
                  <Button animated={[flicker(), transition('x', -10, 0, 0)]}>Enter</Button>
                </Animated>
              </Animator>

              <Animator>
                <Animated
                  className="page-header"
                  animated={[flicker(), transition('x', -10, 0, 0)]}
                >
                  Arwes Demo Project |
                </Animated>
                <Animated className="page-footer" animated={[flicker(), transition('x', 10, 0, 0)]}>
                  | Futuristic SciFi UI Web Framework
                </Animated>
              </Animator>
            </Animated>
          </Animator>
        </div>
      </Animator>
    </BleepsProvider>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
