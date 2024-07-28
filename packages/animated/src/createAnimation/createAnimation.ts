import { type Easing, easing } from '../easing/index.js'

interface AnimationProps {
  /**
   * Duration in seconds.
   */
  duration: number
  easing?: Easing
  direction?: 'normal' | 'reverse'
  onUpdate: (progress: number) => void
  onFinish?: () => void
  onCancel?: () => void
}

interface Animation {
  finished: Promise<void>
  isPending: () => boolean
  cancel: () => void
}

const createAnimation = (props: AnimationProps): Animation => {
  if (props.duration !== undefined && props.duration < 0) {
    throw new Error('Arwes createAnimation() does not support negative durations.')
  }

  const {
    duration: durationProvided,
    easing: easingName = 'outSine',
    direction = 'normal',
    onUpdate,
    onFinish,
    onCancel
  } = props

  const ease = typeof easingName === 'function' ? easingName : easing[easingName]
  const duration = durationProvided * 1_000 // seconds to ms

  let currentAnimationFrame: number | null = null
  let start: number
  let slapsed = 0
  let resolvePromise: () => void

  const finished = new Promise<void>((resolve) => {
    resolvePromise = resolve
  })

  const nextAnimation = (timestamp: number): void => {
    if (!start) {
      start = timestamp
    }

    slapsed = Math.max(timestamp - start, 0)

    const progress = ease(duration === 0 ? 1 : Math.min(1, Math.max(0, slapsed / duration)))

    onUpdate(direction === 'normal' ? progress : 1 - progress)

    const continueAnimation = duration > 0 && slapsed < duration

    if (continueAnimation) {
      currentAnimationFrame = window.requestAnimationFrame(nextAnimation)
    } else {
      currentAnimationFrame = null
      onFinish?.()
      resolvePromise()
    }
  }

  const isPending = (): boolean => {
    return currentAnimationFrame !== null
  }

  const cancel = (): void => {
    if (currentAnimationFrame !== null) {
      window.cancelAnimationFrame(currentAnimationFrame)
      onCancel?.()
      currentAnimationFrame = null
    }
  }

  currentAnimationFrame = window.requestAnimationFrame(nextAnimation)

  return { finished, isPending, cancel }
}

export type { AnimationProps, Animation }
export { createAnimation }
