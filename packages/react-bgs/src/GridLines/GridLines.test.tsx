import { test, expect, afterEach } from 'vitest'
import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { GridLines } from './index'

afterEach(cleanup)

test('Should render canvas element with arwes class', () => {
  const { container } = render(<GridLines lineColor="cyan" />)
  const element = container.firstChild as HTMLElement
  expect(element.tagName).toBe('CANVAS')
  expect(element.classList.contains('arwes-bgs-gridlines')).toBeTruthy()
})
