'use client'

import React, { type ReactNode } from 'react'
import { AnimatorGeneralProvider, BleepsProvider, Animator } from '@arwes/react'
import { Titillium_Web } from 'next/font/google'
import { IconoirProvider } from 'iconoir-react'
import { useAtom } from 'jotai'

import {
  iconProviderProps,
  animatorGeneralSettings,
  bleepsSettings,
  atomMotionEnabled,
  atomAudioEnabled,
  theme
} from '@/config'
import { Background, Header } from '@/ui'

const fontTitilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  preload: false
})

const LayoutRoot = (props: { children: ReactNode }): JSX.Element => {
  const [isMotionEnabled] = useAtom(atomMotionEnabled)
  const [isAudioEnabled] = useAtom(atomAudioEnabled)

  return (
    <IconoirProvider {...iconProviderProps}>
      <AnimatorGeneralProvider {...animatorGeneralSettings} disabled={!isMotionEnabled}>
        <BleepsProvider {...bleepsSettings} common={{ disabled: !isAudioEnabled }}>
          <div
            className="absolute inset-0 overflow-hidden flex flex-col"
            style={{
              // @ts-expect-error link `next/font` font families to TailwindCSS
              '--app-font-family-title': fontTitilliumWeb.style.fontFamily,
              '--app-font-family-header': fontTitilliumWeb.style.fontFamily,
              '--app-font-family-body': fontTitilliumWeb.style.fontFamily,
              '--app-font-family-cta': fontTitilliumWeb.style.fontFamily,
              '--app-font-family-code': '',
              '--app-scrollbar-color': theme.colors.secondary.main(4),
              '--app-scrollbar-color-hover': theme.colors.secondary.high(2)
            }}
          >
            <Animator combine>
              <Animator combine>
                <Background />
              </Animator>

              <Animator combine manager="sequence">
                <div className="relative flex-1 flex flex-col min-w-0 min-h-0">
                  <Animator combine>
                    <Header />
                  </Animator>

                  <div className="flex-1 flex min-w-0 min-h-0">{props.children}</div>
                </div>
              </Animator>
            </Animator>
          </div>
        </BleepsProvider>
      </AnimatorGeneralProvider>
    </IconoirProvider>
  )
}

export { LayoutRoot }
