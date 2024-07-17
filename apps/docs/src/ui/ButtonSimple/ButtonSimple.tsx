import React, { type HTMLProps, type ReactNode } from 'react'
import { Animated, createFrameOctagonClip, cx, memo, useBleeps } from '@arwes/react'
import { type BleepNames, theme } from '@/config'

interface ButtonSimpleProps extends HTMLProps<HTMLButtonElement> {
  className?: string
  children: ReactNode
}

const ButtonSimple = memo((props: ButtonSimpleProps): JSX.Element => {
  const { className, children, ...otherProps } = props
  const bleeps = useBleeps<BleepNames>()
  return (
    <Animated<HTMLButtonElement>
      {...otherProps}
      as="button"
      className={cx(
        'relative overflow-hidden',
        'flex',
        'uppercase font-cta font-normal text-size-10',
        'select-none cursor-pointer transition-[color] duration-200',
        'drop-shadow-size-1 text-secondary-main-2 shadow-secondary-main-2/50',
        'md:text-size-9',
        'xl:text-size-8',
        'hover:text-secondary-high-2',
        // right line
        'before:absolute before:right-2 before:bottom-1 before:border-r before:h-full before:scale-y-[0.25]',
        'before:origin-bottom before:transition-[transform,opacity,border] before:duration-200 before:ease-out',
        'before:border-secondary-main-2',
        'hover:before:translate-x-2 hover:before:translate-y-1 hover:before:scale-y-[1] hover:before:border-secondary-high-2',
        // bottom line
        'after:absolute after:right-2 after:bottom-1 after:border-b after:w-full after:scale-x-[0.25]',
        'after:origin-right after:transition-[transform,opacity,border] after:duration-200 after:ease-out',
        'after:border-secondary-main-2',
        'hover:after:translate-x-2 hover:after:translate-y-1 hover:after:scale-x-[1] hover:after:border-secondary-high-2',
        //
        className
      )}
      style={{
        clipPath: createFrameOctagonClip({
          leftBottom: false,
          rightTop: false,
          rightBottom: false,
          squareSize: theme.space(2)
        })
      }}
      onClick={(event) => {
        otherProps.onClick?.(event)
        bleeps.click?.play()
      }}
    >
      <div
        className={cx(
          'relative',
          'flex-1 flex flex-row justify-center items-center gap-1.5',
          'px-3 py-0 leading-[2rem]',
          'sm:px-4 sm:gap-2'
        )}
      >
        {children}
      </div>
    </Animated>
  )
})

export { ButtonSimple }
