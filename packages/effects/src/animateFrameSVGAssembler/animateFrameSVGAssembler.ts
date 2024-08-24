import { type Animation, createAnimation, easing, easeAmong } from '@arwes/animated'

type AnimateFrameSVGAssemblerProps = {
  element: HTMLElement | SVGElement
  duration: number
  isEntering?: boolean
}

const animateFrameSVGAssembler = (props: AnimateFrameSVGAssemblerProps): Animation => {
  const { element, duration, isEntering = true } = props

  const bgs = Array.from(element.querySelectorAll<SVGPathElement>('[data-name=bg]'))
  const lines = Array.from(element.querySelectorAll<SVGPathElement>('[data-name=line]'))
  const decos = Array.from(element.querySelectorAll<SVGPathElement>('[data-name=deco]'))
  const elements = [...bgs, ...lines, ...decos]

  for (const line of lines) {
    const length = line.getTotalLength()
    line.style.opacity = '1'
    line.style.strokeDasharray = String(length)
    line.dataset.length = String(length)
  }

  const ease = isEntering ? easing.outSine : easing.inSine
  const easeFade = easeAmong(isEntering ? [0, 1] : [1, 0])
  const easeFlicker = easeAmong(isEntering ? [0, 1, 0.5, 1] : [1, 0, 0.5, 0])
  const easeOffset = easeAmong(isEntering ? [1, 0] : [0, 1])

  const animation = createAnimation({
    duration,
    onUpdate(progressGlobal) {
      const progress = ease(progressGlobal)

      for (const bg of bgs) {
        bg.style.opacity = String(easeFade(progress))
      }

      for (const deco of decos) {
        deco.style.opacity = String(easeFlicker(progress))
      }

      for (const line of lines) {
        const length = Number(line.dataset.length)
        line.style.strokeDashoffset = String(easeOffset(progress) * length)
      }
    },
    onFinish() {
      for (const element of elements) {
        element.style.opacity = isEntering ? '1' : '0'
      }

      for (const line of lines) {
        line.style.strokeDasharray = ''
        line.style.strokeDashoffset = ''
      }
    }
  })

  return animation
}

export type { AnimateFrameSVGAssemblerProps }
export { animateFrameSVGAssembler }
