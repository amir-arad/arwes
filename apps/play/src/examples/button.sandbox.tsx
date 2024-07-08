import React, {
  type ReactElement,
  type ReactNode,
  type MouseEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import { createRoot } from 'react-dom/client'
import {
  createThemeUnit,
  createThemeMultiplier,
  createThemeColor,
  Animator,
  Animated,
  AnimatedProp,
  useFrameSVGAssembler,
  fade,
  FrameSVGOctagon,
  BleepsProviderSettings,
  BleepsProvider,
  useBleeps,
  memo,
  cx
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

type BleepsNames = 'click'

// WEBM for Chromium and Firefox browsers and MP3 for Safari and iOS.
const bleepsSettings: BleepsProviderSettings<BleepsNames> = {
  master: {
    volume: 0.9
  },
  bleeps: {
    click: {
      sources: [
        { src: '/assets/sounds/click.webm', type: 'audio/webm' },
        { src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }
      ]
    }
  }
}

type ButtonProps = {
  className?: string
  color?: 'primary' | 'secondary'
  variant?: 'fill' | 'outline'
  animated?: AnimatedProp
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}
const Button = memo((props: ButtonProps): ReactElement => {
  const { className, color = 'primary', variant = 'fill', animated, children, onClick } = props

  const bleeps = useBleeps<BleepsNames>()
  const frameRef = useRef<SVGSVGElement>(null)

  useFrameSVGAssembler(frameRef)

  return (
    <Animated<HTMLButtonElement>
      as="button"
      className={cx('button', `button-${color}`, `button-${variant}`, className)}
      animated={[fade(), ...(Array.isArray(animated) ? animated : [animated])]}
      onClick={(event) => {
        bleeps.click?.play()
        onClick?.(event)
      }}
    >
      <FrameSVGOctagon elementRef={frameRef} style={{ zIndex: 0 }} squareSize={theme.spacen(2)} />
      <div className="button-content">{children}</div>
    </Animated>
  )
})
addStyles(`
  .button {
    position: relative;
    display: inline-flex;
    outline: none;
    margin: 0;
    border: none;
    padding: 0 ${theme.space(8)};
    line-height: ${theme.space(8)};
    font-size: 0.75rem;
    font-family: ${theme.fontFamily};
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${theme.colors.primary(5)};
    background: transparent;
    cursor: pointer;
    user-select: none;
    transition-property: opacity, color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }

  .button-content {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: ${theme.space(2)};
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
    transition-property: opacity, color;
    transition-duration: 0.2s;
    transition-timing-function: ease-out;
  }
  .button [data-name=line] {
    color: ${theme.colors.primary(5)};
  }
  .button:hover [data-name=line],
  .button:focus [data-name=line] {
    color: ${theme.colors.primary(4)};
  }
  .button [data-name=bg] {
    color: ${theme.colors.primary(9)};
  }
  .button:hover [data-name=bg],
  .button:focus [data-name=bg] {
    color: ${theme.colors.primary(8)};
  }

  .button-secondary {
    color: ${theme.colors.secondary(5)};
  }
  .button-secondary [data-name=line] {
    color: ${theme.colors.secondary(5)};
  }
  .button-secondary:hover [data-name=line],
  .button-secondary:focus [data-name=line] {
    color: ${theme.colors.secondary(4)};
  }
  .button-secondary [data-name=bg] {
    color: ${theme.colors.secondary(9)};
  }
  .button-secondary:hover [data-name=bg],
  .button-secondary:focus [data-name=bg] {
    color: ${theme.colors.secondary(8)};
  }

  .button-fill {}

  .button-outline {}
  .button-outline [data-name=bg] {
    display: none;
  }
`)

const IconExample = memo(
  (props: { className?: string }): ReactElement => (
    <svg
      className={props.className}
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13 6L19 12L13 18" stroke="currentcolor" strokeWidth="1.5" />
      <path d="M5 6L11 12L5 18" stroke="currentcolor" strokeWidth="1.5" />
    </svg>
  )
)

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true)

  useEffect(() => {
    const tid = setInterval(() => setActive(!active), active ? 5_000 : 1_000)
    return () => clearTimeout(tid)
  }, [active])

  return (
    <BleepsProvider {...bleepsSettings}>
      <Animator active={active} combine manager="stagger" duration={{ stagger: 0.1 }}>
        <div className="group">
          <div className="group-row">
            <Animator>
              <Button>
                Button <IconExample />
              </Button>
            </Animator>
            <Animator>
              <Button variant="outline">
                Button <IconExample />
              </Button>
            </Animator>
          </div>
          <div className="group-row">
            <Animator>
              <Button color="secondary">
                Button <IconExample />
              </Button>
            </Animator>
            <Animator>
              <Button color="secondary" variant="outline">
                Button <IconExample />
              </Button>
            </Animator>
          </div>
        </div>
      </Animator>
    </BleepsProvider>
  )
}
addStyles(`
  .group {
    display: flex;
    flex-direction: column;
    padding: ${theme.space(4)};
    gap: ${theme.space(4)};
  }
  .group-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${theme.space(4)};
  }
`)

createRoot(document.querySelector('#root')!).render(<Sandbox />)
