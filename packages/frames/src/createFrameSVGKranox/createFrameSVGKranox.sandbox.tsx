import { createFrameSVGKranox, renderFrameSVG } from '@arwes/frames'

const root = document.querySelector('#root')!
const frame = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
frame.style.setProperty('width', '300px')
frame.style.setProperty('height', '200px')
frame.style.setProperty('--arwes-frames-bg-color', 'hsl(180, 75%, 10%)')
frame.style.setProperty('--arwes-frames-line-color', 'hsl(180, 75%, 50%)')
root.appendChild(frame)

const settings = createFrameSVGKranox({
  // styled: true,
  // padding: 0,
  // strokeWidth: 2,
  // bgStrokeWidth: 0,
  // squareSize: 16,
  // smallLineLength: 16,
  // largeLineLength: 64
})

renderFrameSVG(frame, settings)
