import type { Properties as CSSProperties } from 'csstype'

type CreateEffectIlluminatorSVGProps = {
  svg: SVGSVGElement
  container: SVGElement
  color?: string
  size?: number
  className?: string
  style?: CSSProperties
}

type EffectIlluminatorSVG = {
  cancel: () => void
}

const createEffectIlluminatorSVG = (
  props: CreateEffectIlluminatorSVGProps
): EffectIlluminatorSVG => {
  const { svg, container, color = 'hsl(0 0% 50% / 5%)', size = 300, className, style } = props

  const element = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  const gradientId = `illuminator-${Math.random()}`

  element.dataset.name = 'illuminator'

  if (className) {
    element.classList.add(className)
  }

  Object.assign(element.style, style)

  element.innerHTML = `
    <defs>
      <radialGradient id="${gradientId}">
        <stop offset="0%" stop-color="${color}" />
        <stop offset="100%" stop-color="transparent" />
      </radialGradient>
    </defs>
    <circle
      r="${size / 2}"
      style="
        position: absolute;
        transition: opacity 200ms ease-out;
        opacity: 0;
      "
      fill="url(#${gradientId})"
    />
  `

  const illuminator = element.querySelector('circle')!

  illuminator.style.transform = `translate(-${size / 2}px, -${size / 2}px)`

  const onMove = (event: MouseEvent): void => {
    const bounds = svg.getBoundingClientRect()
    const x = event.clientX - bounds.left + size / 2
    const y = event.clientY - bounds.top + size / 2
    illuminator.style.opacity = '1'
    illuminator.setAttribute('cx', String(x))
    illuminator.setAttribute('cy', String(y))
  }

  const onHide = (): void => {
    illuminator.style.opacity = '0'
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

export type { CreateEffectIlluminatorSVGProps, EffectIlluminatorSVG }
export { createEffectIlluminatorSVG }
