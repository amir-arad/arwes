import type { FrameSVGSettingsElement } from '../types.js'
import { formatFrameSVGPath } from '../internal/formatFrameSVGPath/index.js'

/**
 * Render a list of frame elements inside a parent SVGElement.
 * Currently, only `<path/>` elements are supported.
 */
const renderFrameSVGElements = (
  parent: SVGElement,
  width: number,
  height: number,
  elements: FrameSVGSettingsElement[]
): void => {
  const elementsCurrent = Array.from(parent.querySelectorAll<SVGPathElement>('[data-frame]'))

  if (width <= 0 || height <= 0) {
    elementsCurrent.forEach((path) => path.remove())

    return
  }

  for (let index = 0; index < elements.length; index++) {
    const elementCustom = elements[index]
    const elementCurrent = elementsCurrent[index]
    const pathElement =
      elementCurrent ?? document.createElementNS('http://www.w3.org/2000/svg', 'path')

    const isCommands = Array.isArray(elementCustom)
    const path = isCommands ? elementCustom : elementCustom.path

    if (pathElement.dataset.frame !== '') {
      pathElement.dataset.frame = ''
    }

    if (!isCommands) {
      const { name, id, className, style } = elementCustom

      if (pathElement.dataset.name !== name && name !== undefined) {
        pathElement.dataset.name = name
      }

      if (pathElement.id !== id && id !== undefined) {
        pathElement.id = id
      }

      if (pathElement.classList.value !== className && className !== undefined) {
        pathElement.classList.value = className
      }

      if (style) {
        Object.keys(style).forEach((styleProp) => {
          const prop = styleProp as any
          if (pathElement.style[prop] !== style[prop as keyof typeof style]) {
            pathElement.style[prop] = style[prop as keyof typeof style] as any
          }
        })
      }
    }

    // For most use cases, a frame's lines/borders, which are rendered using SVG `stroke`,
    // should not be re-scaled when the SVG is unexpectedly re-scaled and the frame is not
    // re-scaled accordingly. These lines/borders should be presented the same way.
    if ((pathElement.style as any).vectorEffect !== 'non-scaling-stroke') {
      ;(pathElement.style as any).vectorEffect = 'non-scaling-stroke'
    }

    const d = formatFrameSVGPath(width, height, path)

    if (pathElement.getAttribute('d') !== d) {
      pathElement.setAttribute('d', d)
    }

    if (pathElement.parentNode !== parent) {
      parent.appendChild(pathElement)
    }
  }

  // Remove previously rendered elements which are no more required.
  if (elementsCurrent.length > elements.length) {
    for (
      let index = elementsCurrent.length - elements.length - 1;
      index < elementsCurrent.length;
      index++
    ) {
      elementsCurrent[index].remove()
    }
  }
}

export { renderFrameSVGElements }
