import React, { type ReactNode, type ReactElement } from 'react'
import { type AnimatedProp, Animated, cx, memo } from '@arwes-amir/react'

interface MenuProps {
  className?: string
  animated?: AnimatedProp
  children: ReactNode
}

const Menu = memo((props: MenuProps): ReactElement => {
  const { className, animated, children } = props

  return (
    <Animated
      as="ul"
      className={cx('flex flex-row justify-center items-center gap-2', 'xl:gap-1', className)}
      animated={animated}
    >
      {children}
    </Animated>
  )
})

export { Menu }
