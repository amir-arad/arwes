import { createFrameSVGLines, renderFrameSVG } from '@arwes/frames'
import { animateFrameSVGAssembler } from '@arwes/effects'

const root = document.querySelector('#root')!
root.innerHTML = `
  <svg
    style="
      --arwes-frames-bg-color: hsl(180, 75%, 10%);
      --arwes-frames-line-color: hsl(180, 75%, 50%);
    "
    width="300"
    height="200"
    viewBox="0 0 300 200"
    xmlns="http://www.w3.org/2000/svg"
  >
  </svg>
`

const svg = root.querySelector('svg')!
const settings = createFrameSVGLines()

renderFrameSVG(svg, settings)

let isEntering = false

const animate = (): void => {
  isEntering = !isEntering

  animateFrameSVGAssembler({
    element: svg,
    duration: 1,
    isEntering
  })

  setTimeout(animate, 2_000)
}

animate()
