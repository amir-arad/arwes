import { type RefObject, useEffect } from 'react'

const useFrameSVGRenderer = (
  svgRef: RefObject<SVGSVGElement>,
  onRenderExternal: (svg: SVGSVGElement, width: number, height: number) => void
): void => {
  useEffect(() => {
    const svg = svgRef.current

    if (!svg) {
      return
    }

    const onRender = (): void => {
      const box = svg.getBoundingClientRect()

      // In certain browsers, when the SVG viewBox has values with decimals above the 0.5,
      // the browser clips the values to the edge. Round down the dimensions so it doesn't happen.
      const width = Math.floor(box.width)
      const height = Math.floor(box.height)

      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

      onRenderExternal?.(svg, width, height)
    }

    onRender()

    const observer = new window.ResizeObserver(onRender)
    observer.observe(svg)

    return () => {
      observer.disconnect()
    }
  }, [onRenderExternal])
}

export { useFrameSVGRenderer }
