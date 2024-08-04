import { test, expect } from 'vitest'
import { createAnimation } from './createAnimation'

test('Should resolve promise on animation finish', async () => {
  const animation = createAnimation({
    duration: 0.1,
    onUpdate() {}
  })
  expect(animation.isPending()).toBe(true)
  await animation
  expect(animation.isPending()).toBe(false)
})

test('Should resolve promise on animation cancel', async () => {
  const animation = createAnimation({
    duration: 0.1,
    onUpdate() {}
  })
  expect(animation.isPending()).toBe(true)
  animation.cancel()
  await animation
  expect(animation.isPending()).toBe(false)
})
