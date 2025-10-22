// BLEEP

export type BleepCategory = 'background' | 'transition' | 'interaction' | 'notification'

export type BleepGeneralProps = {
  preload?: boolean
  volume?: number
  muted?: boolean
  fetchHeaders?: Headers
  maxPlaybackDelay?: number
  category?: BleepCategory
  disabled?: boolean
}

export type BleepProps = BleepGeneralProps & {
  sources: Array<Readonly<{ src: string; type: string }>>
  loop?: boolean
  context?: AudioContext
  masterGain?: GainNode
}

export type BleepPropsUpdatable = {
  volume?: number
  muted?: boolean
}

export type Bleep = {
  /**
   * Get audio duration in seconds.
   */
  duration: number
  volume: number
  muted: boolean
  isLoaded: boolean
  isPlaying: boolean
  play: (callerID?: string) => void
  stop: (callerID?: string) => void
  load: () => void
  unload: () => void
  update: (props: BleepPropsUpdatable) => void
}

// BLEEPS MANAGER

export type BleepMasterProps = {
  volume?: number
}

export type BleepsManagerProps<Names extends string = string> = {
  master?: BleepMasterProps
  common?: BleepGeneralProps
  categories?: {
    [P in BleepCategory]?: BleepGeneralProps
  }
  bleeps: Record<Names, Omit<BleepProps, 'context' | 'masterGain'> & { category?: BleepCategory }>
}

export type BleepsManagerPropsMasterUpdatable = {
  volume?: number
}

export type BleepsManagerPropsGeneralUpdatable = BleepPropsUpdatable & {
  disabled?: boolean
}

export type BleepsManagerPropsBleepUpdatable = BleepPropsUpdatable & {
  disabled?: boolean
}

export type BleepsManagerPropsUpdatable<Names extends string = string> = {
  master?: BleepsManagerPropsMasterUpdatable
  common?: BleepsManagerPropsGeneralUpdatable
  categories?: {
    [P in BleepCategory]?: BleepsManagerPropsGeneralUpdatable
  }
  bleeps?: Record<Names, BleepsManagerPropsBleepUpdatable>
}

export type BleepsManager<Names extends string = string> = {
  bleeps: Record<Names, Bleep | null>
  unload: () => void
  update: (props: BleepsManagerPropsUpdatable<Names>) => void
}
