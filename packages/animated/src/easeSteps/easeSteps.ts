import type { EasingFn } from '../easing/index.js'

// Extracted from https://github.com/motiondivision/motionone/blob/v10.18.0/packages/easing/src/steps.ts
const easeSteps =
  (steps: number, direction: 'start' | 'end' = 'end'): EasingFn =>
  (progress: number): number => {
    progress = direction === 'end' ? Math.min(progress, 0.999) : Math.max(progress, 0.001)

    const expanded = progress * steps
    const rounded = direction === 'end' ? Math.floor(expanded) : Math.ceil(expanded)

    return Math.min(1, Math.max(0, rounded / steps))
  }

export { easeSteps }
