import type { FrameSVGPathGeneric } from '../types.js'
import { formatFrameSVGPath } from '../formatFrameSVGPath/index.js'

const renderFrameSVGPaths = (
  parentElement: SVGElement,
  widthProvided: number,
  heightProvided: number,
  pathsCustom: FrameSVGPathGeneric[]
): void => {
  // In certain browsers, when the SVG viewBox has values with decimals above the 0.5,
  // the browser clips the values to the edge. Round down the dimensions so it doesn't happen.
  const width = Math.floor(widthProvided)
  const height = Math.floor(heightProvided)

  if (width <= 0 || height <= 0) {
    return
  }

  const pathElementsCurrent = Array.from(
    parentElement.querySelectorAll<SVGPathElement>('path[data-frame]')
  )

  for (let index = 0; index < pathsCustom.length; index++) {
    const pathCustom = pathsCustom[index]
    const pathElementCurrent = pathElementsCurrent[index]
    const pathElement =
      pathElementCurrent ?? document.createElementNS('http://www.w3.org/2000/svg', 'path')

    const isCommands = Array.isArray(pathCustom)
    const path = isCommands ? pathCustom : pathCustom.path

    pathElement.dataset.frame = ''

    Object.assign(pathElement.style, {
      vectorEffect: 'non-scaling-stroke'
    })

    if (!isCommands) {
      const { name, id, className, style } = pathCustom

      if (pathElement.dataset.name !== name && name !== undefined) {
        pathElement.dataset.name = name
      }

      if (pathElement.id !== id && id !== undefined) {
        pathElement.id = id
      }

      if (pathElement.classList.value !== className && className !== undefined) {
        pathElement.classList.value = className
      }

      Object.assign(pathElement.style, style)
    }

    pathElement.setAttribute('d', formatFrameSVGPath(width, height, path))

    if (pathElement.parentNode !== parentElement) {
      parentElement.appendChild(pathElement)
    }
  }

  // TODO: If the number of polygons change, remove the excess unneeded elements.
}

export { renderFrameSVGPaths }
