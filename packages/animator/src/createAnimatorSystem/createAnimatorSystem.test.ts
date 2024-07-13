import { test, expect } from 'vitest'

import type { AnimatorControl } from '../types'
import { ANIMATOR_DEFAULT_SETTINGS } from '../constants'
import { createAnimatorSystem } from './createAnimatorSystem'

test('Should create a system with predefined structure', () => {
  const system = createAnimatorSystem()
  expect(system).toEqual({
    id: expect.any(String),
    register: expect.any(Function),
    unregister: expect.any(Function)
  })
})

test('Should create system id with format "s#"', () => {
  const system = createAnimatorSystem()
  expect(system.id).toMatch(/^s\d+$/)
})

test('Should register new root node with predefined structure', () => {
  const system = createAnimatorSystem()
  const control: AnimatorControl = {
    getSettings: () => ({}),
    setSettings: () => {},
    getForeignRef: () => {},
    setForeignRef: () => {}
  }
  const node = system.register(undefined, control)
  expect(node).toEqual({
    _parent: undefined,
    _children: expect.any(Set),
    _subscribers: expect.any(Set),
    _watchers: expect.any(Set),
    _scheduler: expect.any(Object),
    _getUserSettings: expect.any(Function),
    _manager: expect.any(Object),
    id: expect.any(String),
    state: ANIMATOR_DEFAULT_SETTINGS.initialState,
    control,
    settings: ANIMATOR_DEFAULT_SETTINGS,
    subscribe: expect.any(Function),
    unsubscribe: expect.any(Function),
    send: expect.any(Function)
  })
})

test('Should create node id with format "s#-n#" with parent system id', () => {
  const system = createAnimatorSystem()
  const control: AnimatorControl = {
    getSettings: () => ({}),
    setSettings: () => {},
    getForeignRef: () => {},
    setForeignRef: () => {}
  }
  const node = system.register(undefined, control)
  expect(node.id).toMatch(/^s\d+-n\d+$/)
  expect(node.id.startsWith(system.id + '-')).toBeTruthy()
})
