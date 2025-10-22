import type { EasingFn } from '../easing/index.js'

const easeAmong =
  (breakpoints: [number, ...number[]]): EasingFn =>
  (progress: number): number => {
    if (breakpoints.length === 1) {
      return progress * breakpoints[0]
    }
    if (progress <= 0) {
      return breakpoints[0]
    }
    if (progress >= 1) {
      return breakpoints[breakpoints.length - 1]
    }

    const portion = 1 / (breakpoints.length - 1)
    const portionBase = Math.floor(progress / portion)
    const portionProgress = progress / portion - portionBase

    const current = Math.floor(progress * (breakpoints.length - 1))
    const next = current + 1
    const from = breakpoints[current]
    const to = breakpoints[next]

    if (to > from) {
      const diff = to - from
      return from + diff * portionProgress
    }

    const diff = from - to
    return from - diff * portionProgress
  }

export { easeAmong }
