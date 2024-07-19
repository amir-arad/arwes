import React, { type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { renderFrameSVGElements } from '@arwes/frames'
import { FrameSVG } from '@arwes/react-frames'

const clipPathId = 'clipPathId'
const contentId = 'contentId'

const onFrameRender = (svg: SVGSVGElement, width: number, height: number): void => {
  const clipPathElement = svg.querySelector<SVGElement>(`#${clipPathId}`)!
  const contentElement = svg.querySelector<SVGElement>(`#${contentId}`)!

  // A tetragon, the shape element to clip content.
  renderFrameSVGElements(clipPathElement, width, height, [
    {
      path: [
        ['M', 20, 20],
        ['L', 20, '100% - 20'],
        ['L', '100% - 20', '50% + 100'],
        ['L', '100% - 20', '50% - 100'],
        'Z'
      ]
    }
  ])
  // A box, the actual rendered clipped elements.
  renderFrameSVGElements(contentElement, width, height, [
    {
      style: {
        fill: 'hsla(180, 50%, 15%)'
      },
      path: [['M', 0, 0], ['L', '100%', 0], ['L', '100%', '100%'], ['L', 0, '100%'], 'Z']
    }
  ])
}

const Sandbox = (): ReactElement => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 500 }}>
      <FrameSVG onRender={onFrameRender}>
        <defs>
          <clipPath id={clipPathId} />
        </defs>
        <g id={contentId} style={{ clipPath: `url(#${clipPathId})` }} />
      </FrameSVG>
    </div>
  )
}

createRoot(document.querySelector('#root')!).render(<Sandbox />)
