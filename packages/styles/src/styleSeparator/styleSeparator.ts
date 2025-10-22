type StyleSeparatorProps = {
  colorActive: string
  colorStatic: string
  isVertical?: boolean
  direction?: 'left' | 'right' | 'both'
  width?: string
  space?: string
}

const styleSeparator = (props: StyleSeparatorProps): string => {
  const {
    colorActive,
    colorStatic,
    isVertical = false,
    direction = 'right',
    width = '0.5rem',
    space = '0.25rem'
  } = props

  return (
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
  )
}

export type { StyleSeparatorProps }
export { styleSeparator }
