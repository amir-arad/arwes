import React, { memo } from 'react'
import { type AnimatedProp, Animated, cx } from '@arwes/react'

import { theme } from '@/config'

type HrProps = {
  className?: string
  color?: 'primary' | 'secondary' | 'neutral' | 'error'
  size?: 1 | 2
  direction?: 'left' | 'right' | 'both'
  isVertical?: boolean
  animated?: AnimatedProp
}

const width = theme.space(2)
const space = theme.space(1)

const Hr = memo((props: HrProps): JSX.Element => {
  const {
    className,
    color = 'primary',
    size = 1,
    direction = 'right',
    isVertical,
    animated
  } = props

  const colorFn =
    color === 'primary'
      ? theme.colors.primary.main
      : color === 'secondary'
        ? theme.colors.secondary.main
        : color === 'error'
          ? theme.colors.error
          : theme.colors.neutral

  const colorStatic = colorFn(9, { alpha: 0.8 })
  const colorActive = colorFn(7, { alpha: 0.8 })

  return (
    <Animated
      as="hr"
      className={cx(
        'block outline-none border-none',
        !isVertical && 'w-full',
        !isVertical && size === 1 && 'h-[1px]',
        !isVertical && size === 2 && 'h-[2px]',
        isVertical && 'h-full',
        isVertical && size === 1 && 'w-[1px]',
        isVertical && size === 2 && 'w-[2px]',
        className
      )}
      style={{
        background:
          `linear-gradient(to ${isVertical ? 'bottom' : 'right'}, ` +
          [
            ...(direction === 'left' || direction === 'both'
              ? [
                  `${colorActive} 0px`,
                  `${colorActive} ${width}`,
                  `transparent ${width}`,
                  `transparent calc(${width} + ${space})`,
                  `${colorActive} calc(${width} + ${space})`,
                  `${colorActive} calc(${width} * 2 + ${space})`,
                  `transparent calc(${width} * 2 + ${space})`,
                  `transparent calc(${width} * 2 + ${space} * 2)`,
                  `${colorStatic} calc(${width} * 2 + ${space} * 2)`
                ]
              : [`${colorStatic} 0%`]),
            ...(direction === 'right' || direction === 'both'
              ? [
                  `${colorStatic} calc(100% - ${width} * 2 - ${space} * 2)`,
                  `transparent calc(100% - ${width} * 2 - ${space} * 2)`,
                  `transparent calc(100% - ${width} * 2 - ${space})`,
                  `${colorActive} calc(100% - ${width} * 2 - ${space})`,
                  `${colorActive} calc(100% - ${width} - ${space})`,
                  `transparent calc(100% - ${width} - ${space})`,
                  `transparent calc(100% - ${width})`,
                  `${colorActive} calc(100% - ${width})`,
                  `${colorActive} 100%`
                ]
              : [`${colorStatic} 100%`])
          ].join(',') +
          ')'
      }}
      animated={animated}
    />
  )
})

export type { HrProps }
export { Hr }
