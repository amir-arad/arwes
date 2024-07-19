import { Children, useRef, type ReactNode } from 'react'
import {
  Animated,
  Animator,
  cx,
  fade,
  flicker,
  FrameSVGKranox,
  memo,
  transition,
  useBleeps,
  useFrameSVGAssembler
} from '@arwes/react'
import { Xmark as IconClose } from 'iconoir-react'

import { theme, type BleepNames } from '@/config'
import styles from './Modal.module.css'

interface ModalProps {
  className?: string
  contentClassName?: string
  header: ReactNode
  footer?: ReactNode
  children: ReactNode
  onClose?: () => void
}

const Modal = memo((props: ModalProps): JSX.Element => {
  const { className, contentClassName, header, footer, children, onClose } = props

  const frameRef = useRef<SVGSVGElement>(null)
  const bleeps = useBleeps<BleepNames>()

  useFrameSVGAssembler(frameRef)

  return (
    <article
      role="dialog"
      className={cx(
        'z-20 fixed inset-0 flex justify-center items-center p-6',
        styles.root,
        className
      )}
    >
      <Animated
        role="presentation"
        className="absolute inset-0 bg-primary-main-12/80"
        style={{
          backdropFilter: 'blur(0.5rem)'
        }}
        animated={fade()}
      />

      <Animated
        className="relative flex-1 flex flex-col m-auto py-6 min-h-0 max-h-full"
        animated={transition('y', theme.space(-8), 0, 0)}
      >
        <FrameSVGKranox
          elementRef={frameRef}
          className={styles.frame}
          styled={false}
          padding={2}
          strokeWidth={2}
          bgStrokeWidth={1}
        />

        <Animator combine manager="stagger">
          <Animator>
            <Animated
              as="header"
              className="relative flex flex-col gap-3 px-10"
              animated={flicker()}
            >
              <div className="flex-1 flex flex-row gap-4 justify-between items-center">
                <h1
                  className={cx(
                    'font-title font-light text-size-6 text-primary-main-1',
                    'sm:text-size-5'
                  )}
                >
                  {header}
                </h1>

                <button
                  className="text-size-5 sm:text-size-4 text-secondary-main-3"
                  autoFocus
                  onClick={() => {
                    onClose?.()
                    bleeps.click?.play()
                  }}
                >
                  <IconClose />
                </button>
              </div>
            </Animated>
          </Animator>

          <main className="relative overflow-y-auto flex-1 flex px-10 pt-3 min-h-0">
            <div className={cx('flex-1 flex flex-col', contentClassName)}>{children}</div>
          </main>

          {!!Children.count(footer) && <footer className="relative">{footer}</footer>}
        </Animator>
      </Animated>
    </article>
  )
})

export { Modal }
