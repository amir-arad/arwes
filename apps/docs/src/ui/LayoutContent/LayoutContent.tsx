import {
  Animated,
  FrameSVGOctagon,
  Illuminator,
  styleFrameClipOctagon,
  memo,
  cx,
  Animator,
  BleepsOnAnimator
} from '@arwes/react'
import { useMedia } from 'react-use'

import { type BleepNames, theme } from '@/config'

type LayoutContentProps = {
  className?: string
  children: React.ReactNode
}

const LayoutContent = memo((props: LayoutContentProps): JSX.Element => {
  const { className, children } = props

  const isMD = useMedia(theme.breakpoints.up('md', { strip: true }), false)

  const cornerSquareSize = isMD ? 4 : 2

  return (
    <Animator combine manager="stagger" duration={{ stagger: 0.05 }}>
      <div
        className={cx(
          'relative flex-1 flex flex-col justify-start items-center w-full min-w-0 min-h-0',
          className
        )}
      >
        <div
          role="presentation"
          className="absolute inset-0 flex p-4"
          style={{
            clipPath: styleFrameClipOctagon({ squareSize: theme.space(cornerSquareSize) })
          }}
        >
          <Animator>
            <Animated
              className="relative overflow-hidden flex-1 mx-auto w-full max-w-[50rem]"
              animated={['flicker']}
            >
              <FrameSVGOctagon
                style={{
                  // @ts-expect-error css variables
                  '--arwes-frames-bg-color': theme.colors.primary.main(9, { alpha: 0.1 }),
                  '--arwes-frames-line-color': theme.colors.primary.main(9, { alpha: 0.5 })
                }}
                squareSize={theme.spacen(cornerSquareSize)}
              />
              {isMD && (
                <Illuminator
                  color={theme.colors.primary.main(5, { alpha: 0.1 })}
                  size={theme.spacen(100)}
                />
              )}
            </Animated>
          </Animator>
        </div>

        <div className="relative flex-1 flex justify-center py-4 w-full min-w-0 min-h-0">
          <div className="flex-1 overflow-y-auto flex justify-center px-4 w-full min-w-0 min-h-0">
            <main
              className={cx(
                'flex flex-col mb-auto p-4 w-full min-w-0 min-h-0 max-w-[50rem]',
                'md:p-8',
                'xl:p-12'
              )}
            >
              <BleepsOnAnimator<BleepNames> transitions={{ entering: 'type' }} />

              {children}
            </main>
          </div>
        </div>
      </div>
    </Animator>
  )
})

export { LayoutContent }
