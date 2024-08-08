'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useMedia } from 'react-use'
import {
  Animated,
  Animator,
  BleepsOnAnimator,
  FrameSVGLines,
  Illuminator,
  Text,
  useFrameSVGAssembler
} from '@arwes/react'
import { DroneXmark as IconDevelopment, Page as IconDocs, Codepen as IconPlay } from 'iconoir-react'

import { type BleepNames, theme } from '@/config'
import { Button } from '@/ui'
import { spring } from 'motion'

const Frame = (): JSX.Element => {
  const isMD = useMedia(theme.breakpoints.up('md', { strip: true }), false)
  const frameRef = useRef<SVGSVGElement>(null)

  useFrameSVGAssembler(frameRef)

  return (
    <Animated
      role="presentation"
      className="absolute inset-0"
      style={{
        background: `repeating-linear-gradient(-45deg, ${theme.colors.error(3, { alpha: 0.01 })}, ${theme.colors.error(3, { alpha: 0.01 })} 5px, transparent 5px, transparent 10px)`
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {isMD && (
          <Illuminator size={theme.spacen(100)} color={theme.colors.error(5, { alpha: 0.1 })} />
        )}

        <Animator>
          <Animated
            className="absolute -left-20 right-0 top-0 h-[10%] text-error-7/20"
            style={{
              background: `repeating-linear-gradient(-45deg, currentcolor, currentcolor 0.75rem, transparent 0.75rem, transparent 1.5rem)`
            }}
            animated={['fade', ['x', theme.space(20), 0, 0, spring()]]}
          />
          <Animated
            className="absolute left-0 -right-20 bottom-0 h-[10%] text-error-7/20"
            style={{
              background: `repeating-linear-gradient(-45deg, currentcolor, currentcolor 0.75rem, transparent 0.75rem, transparent 1.5rem)`
            }}
            animated={['fade', ['x', theme.space(-20), 0, 0, spring()]]}
          />
        </Animator>
      </div>

      <FrameSVGLines
        elementRef={frameRef}
        style={{
          filter: `drop-shadow(0 0 ${theme.space(1)} ${theme.colors.error(5, { alpha: 0.1 })})`,

          // @ts-expect-error variables
          '--arwes-frames-bg-color': theme.colors.error(12, { alpha: 0.5 }),
          '--arwes-frames-line-color': theme.colors.error(7)
        }}
        largeLineWidth={isMD ? 2 : 1}
        smallLineWidth={isMD ? 4 : 2}
        smallLineLength={theme.spacen(isMD ? 6 : 4)}
      />
    </Animated>
  )
}

const DemosPage = (): JSX.Element => {
  return (
    <Animator combine>
      <BleepsOnAnimator<BleepNames> transitions={{ entering: 'error' }} continuous />

      <div className="flex-1 flex justify-center items-center p-4">
        <div className="relative flex px-6 py-12 md:p-12 xl:p-20">
          <Animator duration={{ enter: 0.6 }}>
            <Frame />
          </Animator>

          <main className="relative flex flex-col items-center gap-6">
            <Animator duration={{ delay: 0.6 }}>
              <Animated
                className="text-error-4 text-[4rem]"
                animated={['flicker', ['y', theme.space(4), 0]]}
              >
                <IconDevelopment />
              </Animated>
            </Animator>

            <Animator>
              <Text as="h1" className="font-header text-size-2 leading-none text-error-5" fixed>
                Demos
              </Text>
            </Animator>

            <Animator duration={{ delay: 0.6 }}>
              <Animated
                as="p"
                className="font-body text-size-8 md:text-size-7 text-error-3"
                animated={['flicker', ['y', theme.space(-4), 0]]}
              >
                Demo projects are under construction.
              </Animated>
            </Animator>

            <Animator duration={{ delay: 0.6 }}>
              <Animated
                className="flex flex-row items-center gap-4"
                animated={['flicker', ['y', theme.space(-6), 0]]}
              >
                <Link href="/docs">
                  <Button tabIndex={-1}>
                    Docs <IconDocs />
                  </Button>
                </Link>
                <Link href="/play">
                  <Button tabIndex={-1}>
                    Play <IconPlay />
                  </Button>
                </Link>
              </Animated>
            </Animator>
          </main>
        </div>
      </div>
    </Animator>
  )
}

export { DemosPage }
