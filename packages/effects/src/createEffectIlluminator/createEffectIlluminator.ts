import type { Properties as CSSProperties } from 'csstype'

type CreateEffectIlluminatorProps = {
  container: HTMLElement
  color?: string
  size?: number
  className?: string
  style?: CSSProperties
}

type EffectIlluminator = {
  cancel: () => void
}

const createEffectIlluminator = (props: CreateEffectIlluminatorProps): EffectIlluminator => {
  const { container, color = 'hsl(0 0% 50% / 5%)', size = 300, className, style } = props

  const element = document.createElement('div')

  element.role = 'presentation'
  element.dataset.name = 'illuminator'

  if (className) {
    element.className = className
  }

  Object.assign(element.style, {
    position: 'absolute',
    left: 0,
    top: 0,
    width: `${size}px`,
    height: `${size}px`,
    background: `radial-gradient(closest-side, ${color}, transparent)`,
    opacity: 0,
    transition: 'opacity 200ms ease-out',
    pointerEvents: 'none',
    ...style
  })

  let bounds: DOMRect
  let x: number
  let y: number
  let isVisible: boolean
  let opacity: string

  const onMove = (event: MouseEvent): void => {
    bounds = container.getBoundingClientRect()
    x = event.clientX - bounds.left
    y = event.clientY - bounds.top

    isVisible =
      x >= -(size / 2) &&
      x <= bounds.width + size / 2 &&
      y >= -(size / 2) &&
      y <= bounds.height + size / 2

    opacity = isVisible ? '1' : '0'

    if (element.style.opacity !== opacity) {
      element.style.opacity = opacity
    }

    if (isVisible) {
      element.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
    }
  }

  const onHide = (): void => {
    if (element.style.opacity !== '0') {
      element.style.opacity = '0'
    }
  }

  container.appendChild(element)
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseleave', onHide)

  const cancel = (): void => {
    element.remove()
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseleave', onHide)
  }

  return Object.freeze({ cancel })
}

export type { CreateEffectIlluminatorProps, EffectIlluminator }
export { createEffectIlluminator }
