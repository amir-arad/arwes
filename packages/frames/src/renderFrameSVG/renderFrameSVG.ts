import type { FrameSVGSettings } from '../types.js'
import { renderFrameSVGElements } from '../renderFrameSVGElements/index.js'

type RenderFrameSVGReturn = {
  width: number
  height: number
}

const renderFrameSVG = (svg: SVGSVGElement, settings: FrameSVGSettings): RenderFrameSVGReturn => {
  // In certain browsers, when the SVG viewBox has values with decimals above the 0.5,
  // the browser clips the values to the edge. Round down the dimensions so it doesn't happen.
  const width = Math.floor(svg.clientWidth)
  const height = Math.floor(svg.clientHeight)

  if (svg.getAttribute('viewBox') !== `0 0 ${width} ${height}`) {
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }

  renderFrameSVGElements(svg, width, height, settings.elements)

  return { width, height }
}

export { renderFrameSVG }
