import type { AnimationControls } from 'motion'
import { type RefObject, useEffect } from 'react'
import { animateFrameSVGAssembler } from '@arwes/effects'
import { useAnimator } from '@arwes/react-animator'

const useFrameSVGAssembler = (svgRef: RefObject<SVGElement | HTMLElement>): void => {
  const animator = useAnimator()

  useEffect(() => {
    const svg = svgRef.current

    if (!animator || !svg) {
      return
    }

    let animation: AnimationControls

    const unsubscribe = animator.node.subscribe((node) => {
      switch (node.state) {
        case 'entering': {
          animation?.cancel()
          animation = animateFrameSVGAssembler({
            element: svg,
            duration: node.settings.duration.enter,
            isEntering: true
          })
          break
        }

        case 'exiting': {
          animation?.cancel()
          animation = animateFrameSVGAssembler({
            element: svg,
            duration: node.settings.duration.exit,
            isEntering: false
          })
          break
        }
      }
    })

    return () => {
      animation?.cancel()
      unsubscribe()
    }
  }, [animator])
}

export { useFrameSVGAssembler }
