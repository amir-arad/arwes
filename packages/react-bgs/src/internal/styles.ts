import type { CSSProperties } from 'react'

export const positionedStyle: CSSProperties = {
  position: 'absolute',
  zIndex: -1,
  inset: 0,
  display: 'block',
  border: 0,
  margin: 0,
  padding: 0,
  width: 'round(down, 100%, 1px)',
  height: 'round(down, 100%, 1px)'
}
