'use client'

import React from 'react'
import { Animator, Animated, BleepsOnAnimator, flicker, transition, cx, memo } from '@arwes/react'
import Link from 'next/link'
import { Page, Codepen, CollageFrame, DashboardSpeed } from 'iconoir-react'

import { type BleepNames, settings, theme } from '@/config'
import { ArwesLogoType, ButtonSimple } from '@/ui'

const HomePage = memo((): JSX.Element => {
  return (
    <Animator combine manager="sequenceReverse">
      <BleepsOnAnimator<BleepNames> transitions={{ entering: 'intro' }} continuous />

      <Animated
        className={cx('flex flex-col justify-center items-center gap-4 m-auto p-6', 'md:gap-8')}
        animated={transition('y', theme.space(6), 0)}
      >
        <Animator>
          <Animated as="h1" className="pb-2" title={settings.title}>
            <ArwesLogoType className="w-[200px] md:w-[240px] xl:w-[280px]" />
          </Animated>
        </Animator>

        <Animator>
          <Animated
            className={cx(
              'font-body font-light leading-none text-size-7 select-none',
              'text-primary-main-3',
              'md:text-size-6',
              'xl:text-size-5'
            )}
            animated={flicker()}
          >
            Futuristic Sci-Fi UI Web Framework
          </Animated>
        </Animator>

        <Animator>
          <Animated
            as="nav"
            className="flex flex-row justify-center items-center 2sm:gap-2 md:gap-4"
            animated={flicker()}
          >
            <Animated animated={transition('x', -theme.spacen(6), 0)}>
              <Link href="/docs">
                <ButtonSimple tabIndex={-1} title="Go to Documentation">
                  <Page className="text-size-[1.5em] xhidden x2sm:block" />
                  <span>Docs</span>
                </ButtonSimple>
              </Link>
            </Animated>
            <Animated animated={transition('x', -theme.spacen(3), 0)}>
              <Link href="/demos">
                <ButtonSimple tabIndex={-1} title="Go to Demos">
                  <CollageFrame className="text-size-[1.5em] xhidden x2sm:block" />
                  <span>Demos</span>
                </ButtonSimple>
              </Link>
            </Animated>
            <Animated animated={transition('x', theme.spacen(3), 0)}>
              <a href="/play">
                <ButtonSimple tabIndex={-1} title="Go to Playground">
                  <Codepen className="text-size-[1.5em] xhidden x2sm:block" />
                  <span>Play</span>
                </ButtonSimple>
              </a>
            </Animated>
            <Animated animated={transition('x', theme.spacen(6), 0)}>
              <a href="/perf">
                <ButtonSimple tabIndex={-1} title="Go to Performance">
                  <DashboardSpeed className="text-size-[1.5em] xhidden x2sm:block" />
                  <span>Perf</span>
                </ButtonSimple>
              </a>
            </Animated>
          </Animated>
        </Animator>
      </Animated>
    </Animator>
  )
})

export { HomePage }
