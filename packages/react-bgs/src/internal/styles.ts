import type { CSSProperties } from 'react'

export const positionedStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'block',
  border: 0,
  margin: 0,
  padding: 0,
  // In certain browsers, when a canvas has sizes with decimals above the 0.5,
  // the browser clips the values to the edge. Round down the size so it doesn't happen.
  width: 'round(down, 100%, 1px)',
  height: 'round(down, 100%, 1px)'
}
