import { type RefObject, useEffect } from 'react'
import { type AnimationControls, animate } from 'motion'
import { useAnimator } from '@arwes/react-animator'

const useFrameSVGAssembler = (svgRef: RefObject<SVGSVGElement>): void => {
  const animator = useAnimator()

  useEffect(() => {
    const svg = svgRef.current

    if (!animator || !svg) {
      return
    }

    let animation: AnimationControls

    const unsubscribe = animator.node.subscribe((node) => {
      animation?.cancel()

      const bgs = Array.from(svg.querySelectorAll<SVGPathElement>('[data-name=bg]'))
      const lines = Array.from(svg.querySelectorAll<SVGPathElement>('[data-name=line]'))
      const elements = [...bgs, ...lines]

      switch (node.state) {
        case 'exited': {
          elements.forEach((element) => {
            element.style.opacity = '0'
          })
          lines.forEach((line) => {
            line.style.strokeDasharray = ''
            line.style.strokeDashoffset = ''
          })
          break
        }

        case 'entering': {
          for (const line of lines) {
            const length = line.getTotalLength()
            line.style.opacity = '1'
            line.style.strokeDasharray = String(length)
            line.dataset.length = String(length)
          }

          animation = animate(
            (progress) => {
              for (const bg of bgs) {
                bg.style.opacity = String(progress)
              }

              for (const line of lines) {
                const length = Number(line.dataset.length)
                line.style.strokeDashoffset = String((1 - progress) * length)
              }
            },
            { duration: node.settings.duration.enter }
          )
          break
        }

        case 'entered': {
          elements.forEach((element) => {
            element.style.opacity = '1'
          })
          lines.forEach((line) => {
            line.style.strokeDasharray = ''
            line.style.strokeDashoffset = ''
          })
          break
        }

        case 'exiting': {
          for (const line of lines) {
            const length = line.getTotalLength()
            line.style.strokeDasharray = String(length)
            line.dataset.length = String(length)
          }

          animation = animate(
            (progress) => {
              for (const bg of bgs) {
                bg.style.opacity = String(1 - progress)
              }

              for (const line of lines) {
                const length = Number(line.dataset.length)
                line.style.strokeDashoffset = String(progress * length)
              }
            },
            { duration: node.settings.duration.exit }
          )
          break
        }
      }
    })

    return () => {
      animation?.cancel()
      unsubscribe()

      const bgs = Array.from(svg.querySelectorAll<SVGPathElement>('[data-name=bg]'))
      const lines = Array.from(svg.querySelectorAll<SVGPathElement>('[data-name=line]'))
      const elements = [...bgs, ...lines]

      elements.forEach((element) => {
        element.style.opacity = '1'
      })
      lines.forEach((line) => {
        line.style.strokeDasharray = ''
        line.style.strokeDashoffset = ''
      })
    }
  }, [animator])
}

export { useFrameSVGAssembler }
