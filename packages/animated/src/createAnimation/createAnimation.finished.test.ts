import { test, expect } from 'vitest'
import { createAnimation } from './createAnimation'

test('Should resolve finished promise on animation finish', async () => {
  const animation = createAnimation({
    duration: 0.1,
    onUpdate() {}
  })
  expect(animation.isPending()).toBe(true)
  await animation.finished
  expect(animation.isPending()).toBe(false)
})
