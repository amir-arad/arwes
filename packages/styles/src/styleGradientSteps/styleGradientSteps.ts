const styleGradientSteps = (
  length: number,
  color: string,
  direction: string = 'to right'
): string => {
  if (length < 2) {
    return color
  }

  const total = length + length - 1

  const steps = Array(total)
    .fill(null)
    .map((_, index) => {
      if (index % 2 === 0) {
        return [
          `${color} ${(index / total) * 100}%`,
          `${color} ${((index + 1) / total) * 100}%`
        ].join(', ')
      }
      return [
        `transparent ${(index / total) * 100}%`,
        `transparent ${((index + 1) / total) * 100}%`
      ].join(', ')
    })
    .join(', ')

  return `linear-gradient(${direction}, ${steps})`
}

export { styleGradientSteps }
