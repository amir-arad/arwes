import { test, expect } from 'vitest'

import { easeAmong } from './easeAmong'

test('Should return first value if 0', () => {
  expect(easeAmong(0, [5, 10])).toBe(5)
})

test('Should return last value if 1', () => {
  expect(easeAmong(1, [5, 10])).toBe(10)
})

test('Should return percentage among two values', () => {
  expect(easeAmong(0, [5, 10])).toBe(5)
  expect(easeAmong(0.25, [5, 10])).toBe(6.25)
  expect(easeAmong(0.5, [5, 10])).toBe(7.5)
  expect(easeAmong(0.75, [5, 10])).toBe(8.75)
  expect(easeAmong(1, [5, 10])).toBe(10)
})

test('Should return percentage among ascending and descending values', () => {
  expect(easeAmong(0, [4, 10, 2])).toBe(4) // 4 + (10 - 4) * 0
  expect(easeAmong(0.2, [4, 10, 2])).toBe(6.4) // 4 + (10 - 4) * 0.4
  expect(easeAmong(0.25, [4, 10, 2])).toBe(7) // 4 + (10 - 4) * 0.5
  expect(easeAmong(0.4, [4, 10, 2])).toBe(8.8) // 4 + (10 - 4) * 0.8
  expect(easeAmong(0.5, [4, 10, 2])).toBe(10) // 10 - (10 - 2) * 0
  expect(easeAmong(0.6, [4, 10, 2])).toBe(8.4) // 10 - (10 - 2) * 0.2
  expect(easeAmong(0.75, [4, 10, 2])).toBe(6) // 10 - (10 - 2) * 0.5
  expect(easeAmong(0.8, [4, 10, 2])).toBe(5.199999999999999) // 10 - (10 - 2) * 0.6 (JavaScript Glitch)
  expect(easeAmong(1, [4, 10, 2])).toBe(2) // 10 - (10 - 2) * 1
})

test('Should return percentage among multiple values', () => {
  expect(easeAmong(0, [1, 2, 3, 4, 5])).toBe(1)
  expect(easeAmong(0.25, [1, 2, 3, 4, 5])).toBe(2)
  expect(easeAmong(0.3, [1, 2, 3, 4, 5])).toBe(2.2)
  expect(easeAmong(0.5, [1, 2, 3, 4, 5])).toBe(3)
  expect(easeAmong(0.6, [1, 2, 3, 4, 5])).toBe(3.4)
  expect(easeAmong(0.75, [1, 2, 3, 4, 5])).toBe(4)
  expect(easeAmong(1, [1, 2, 3, 4, 5])).toBe(5)
})
