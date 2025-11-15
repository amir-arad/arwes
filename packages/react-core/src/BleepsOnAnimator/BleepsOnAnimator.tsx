import { type ReactElement, useRef } from 'react'
import React, { useId, useEffect } from 'react'
import { type AnimatorState } from '@arwes-amir/animator'
import { useAnimator } from '@arwes-amir/react-animator'
import { type Bleep } from '@arwes-amir/bleeps'
import { useBleeps } from '@arwes-amir/react-bleeps'

type Transitions<BleepsNames extends string> = {
  [p in AnimatorState]?: BleepsNames
}

interface BleepsOnAnimatorProps<BleepsNames extends string = string> {
  id?: string
  transitions: Transitions<BleepsNames>
  continuous?: boolean
}

const BleepsOnAnimator = <BleepsNames extends string = string>(
  props: BleepsOnAnimatorProps<BleepsNames>
): ReactElement => {
  const { id: externalId, transitions, continuous } = props

  const internalId = useId()
  const transitionsRef = useRef<Transitions<BleepsNames>>(transitions)
  const animator = useAnimator()
  const bleeps = useBleeps<BleepsNames>()

  // To prevent multiple executions of the useEffect to check for Animator node updates.
  transitionsRef.current = transitions

  const id = externalId ?? internalId

  useEffect(() => {
    if (!animator) {
      return
    }

    let currentBleep: Bleep | null = null

    const cancelSubscription = animator.node.subscribe((node) => {
      const bleepName = transitionsRef.current[node.state]

      if (!continuous) {
        currentBleep?.stop(id)
      }

      if (bleepName) {
        const newBleep = bleeps[bleepName]

        if (newBleep) {
          currentBleep?.stop(id)
          currentBleep = newBleep
          currentBleep.play(id)
        }
      }
    })

    return () => {
      cancelSubscription()
      currentBleep?.stop(id)
    }
  }, [id, animator, bleeps])

  return <></>
}

export type { BleepsOnAnimatorProps }
export { BleepsOnAnimator }
