import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAtom } from 'jotai'
import {
  type AnimatedProp,
  Animated,
  Animator,
  createFrameOctagonClip,
  cx,
  flicker,
  Illuminator,
  memo,
  transition,
  useBleeps
} from '@arwes/react'
import {
  X,
  Page,
  Codepen,
  CollageFrame,
  DashboardSpeed,
  Github,
  Discord,
  Keyframes,
  KeyframesMinus,
  SoundHigh,
  SoundOff,
  Heart,
  AtSign
} from 'iconoir-react'

import { type BleepNames, atomAudioEnabled, atomMotionEnabled, settings, theme } from '@/config'
import { ArwesLogoImage } from '../ArwesLogoImage'
import { ArwesLogoType } from '../ArwesLogoType'
import { Menu } from '../Menu'
import { MenuItem } from '../MenuItem'
import styles from './Header.module.css'

interface HeaderProps {
  className?: string
  animated?: AnimatedProp
}

const Header = memo((props: HeaderProps): JSX.Element => {
  const { className, animated } = props

  const pathname = usePathname()
  const bleeps = useBleeps<BleepNames>()
  const [isMotionEnabled, setIsMotionEnabled] = useAtom(atomMotionEnabled)
  const [isAudioEnabled, setIsAudioEnabled] = useAtom(atomAudioEnabled)

  const isIndex = pathname === '/'

  return (
    <Animated
      as="header"
      className={cx(
        'relative flex justify-center items-center select-none',
        styles.root,
        className
      )}
      animated={animated}
    >
      {!isIndex && (
        <div
          className="absolute inset-x-8 inset-y-2 overflow-hidden"
          style={{
            clipPath: createFrameOctagonClip({
              squareSize: theme.space(2)
            })
          }}
        >
          <Illuminator color={theme.colors.primary.main(3, { alpha: 0.1 })} size={400} />
        </div>
      )}

      <div className="relative flex-1 flex flex-row justify-between items-center px-8 py-2">
        <Animator combine manager="stagger" refreshOn={[isIndex]}>
          <Animated
            className="flex flex-row gap-4 px-4"
            animated={transition('x', theme.spacen(4), 0, 0)}
          >
            <Link className={styles.logo} href="/" onClick={() => bleeps.click?.play()}>
              <h1
                className="flex flex-row justify-center items-center gap-2 h-[3rem]"
                title={settings.title}
              >
                <Animator>
                  <ArwesLogoImage
                    className={cx('w-6 h-6', styles.logoImage)}
                    animated={flicker()}
                  />
                </Animator>

                <Animator
                  merge
                  condition={() => !isIndex}
                  unmountOnExited
                  unmountOnDisabled={isIndex}
                >
                  <ArwesLogoType className="h-4" animated={flicker()} />
                </Animator>
              </h1>
            </Link>

            <Animator
              combine
              manager="stagger"
              condition={() => !isIndex}
              unmountOnExited
              unmountOnDisabled={isIndex}
            >
              <Menu className="h-[3rem]">
                <Animator>
                  <MenuItem active={pathname.startsWith('/docs')} animated={flicker()}>
                    <Link href="/docs" title="Go to Documentation">
                      <Page /> <span>Docs</span>
                    </Link>
                  </MenuItem>
                </Animator>
                <Animator>
                  <MenuItem active={pathname.startsWith('/demos')} animated={flicker()}>
                    <Link href="/demos" title="Go to Demos">
                      <CollageFrame /> <span>Demos</span>
                    </Link>
                  </MenuItem>
                </Animator>
                <Animator>
                  <MenuItem active={pathname.startsWith('/play')} animated={flicker()}>
                    <a href="/play" title="Go to Playground">
                      <Codepen /> <span>Play</span>
                    </a>
                  </MenuItem>
                </Animator>
                <Animator>
                  <MenuItem active={pathname.startsWith('/perf')} animated={flicker()}>
                    <a href="/perf" title="Go to Performance">
                      <DashboardSpeed /> <span>Perf</span>
                    </a>
                  </MenuItem>
                </Animator>
              </Menu>
            </Animator>
          </Animated>
        </Animator>

        <Animator combine manager="staggerReverse">
          <Animated
            className="flex flex-row gap-4 px-4"
            animated={transition('x', -theme.spacen(4), 0, 0)}
          >
            <Menu className="h-[3rem]">
              <Animator>
                <MenuItem className="group hover:!text-fuchsia-300" animated={flicker()}>
                  <a
                    className="!gap-0 group-hover:text-fuchsia-300"
                    href="https://github.com/sponsors/romelperez"
                    target="sponsor"
                  >
                    <Heart />
                    <div
                      className={cx(
                        'grid grid-flow-row grid-cols-[0fr]',
                        'transition-all ease-out duration-200',
                        'group-hover:grid-cols-[1fr] group-hover:pl-2'
                      )}
                    >
                      <div className="overflow-hidden">Sponsor</div>
                    </div>
                  </a>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem animated={flicker()}>
                  <a
                    href="https://github.com/arwes/arwes/tree/next"
                    target="version"
                    title="Version @next (Deployed 2024-07-15)"
                  >
                    <AtSign />
                  </a>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem animated={flicker()}>
                  <a href="https://github.com/arwes/arwes" target="github" title="Go to Github">
                    <Github />
                  </a>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem animated={flicker()}>
                  <a href="https://x.com/arwesjs" target="twitter" title="Go to X (Twitter)">
                    <X />
                  </a>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem animated={flicker()}>
                  <a href="https://discord.gg/s5sbTkw" target="discord" title="Go to Discord">
                    <Discord />
                  </a>
                </MenuItem>
              </Animator>
            </Menu>

            <Menu className="h-[3rem]">
              <Animator>
                <MenuItem animated={flicker()}>
                  <button
                    title={isMotionEnabled ? 'Disable motion' : 'Enable motion'}
                    onClick={() => setIsMotionEnabled(!isMotionEnabled)}
                  >
                    {isMotionEnabled ? <Keyframes /> : <KeyframesMinus />}
                  </button>
                </MenuItem>
              </Animator>
              <Animator>
                <MenuItem animated={flicker()}>
                  <button
                    title={isAudioEnabled ? 'Disable audio' : 'Enable audio'}
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  >
                    {isAudioEnabled ? <SoundHigh /> : <SoundOff />}
                  </button>
                </MenuItem>
              </Animator>
            </Menu>
          </Animated>
        </Animator>
      </div>
    </Animated>
  )
})

export { Header }
