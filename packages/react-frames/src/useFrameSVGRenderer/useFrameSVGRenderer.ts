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
      const { width, height } = svg.getBoundingClientRect()

      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

      onRenderExternal?.(svg, width, height)
    }

    const observer = new window.ResizeObserver(onRender)

    observer.observe(svg)

    return () => {
      observer.disconnect()
    }
  }, [onRenderExternal])
}

export { useFrameSVGRenderer }
