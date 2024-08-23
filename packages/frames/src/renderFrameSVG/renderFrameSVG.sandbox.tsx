import { type FrameSVGSettings, renderFrameSVG } from '@arwes/frames'

const root = document.querySelector('#root')!
const frame = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
Object.assign(frame.style, { width: '300px', height: '200px' })
root.appendChild(frame)

const settings: FrameSVGSettings = {
  elements: [
    // Background shape.
    {
      name: 'bg',
      style: {
        strokeWidth: 0,
        fill: 'hsl(180, 75%, 10%)',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 10%))'
      },
      path: [
        ['M', 20, 20],
        ['L', 20, '100% - 20'],
        ['L', '100% - 20', '100% - 20'],
        ['L', '100% - 20', 20]
      ]
    },
    // Top line.
    {
      name: 'line',
      style: {
        strokeWidth: '1',
        stroke: 'hsl(180, 75%, 50%)',
        fill: 'none',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 50%))'
      },
      path: [
        ['M', 10, 10],
        ['L', '100% - 10', 10],
        ['L', '100% - 10', 40]
      ]
    },
    // Bottom line.
    {
      name: 'line',
      style: {
        strokeWidth: '2',
        stroke: 'hsl(180, 75%, 50%)',
        fill: 'none',
        filter: 'drop-shadow(0 0 2px hsl(180, 75%, 50%))'
      },
      path: [
        ['M', '100% - 10', '100% - 10'],
        ['L', 10, '100% - 10'],
        ['L', 10, '100% - 40']
      ]
    }
  ]
}

renderFrameSVG(frame, settings)
