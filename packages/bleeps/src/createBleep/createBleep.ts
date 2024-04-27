import type { BleepProps, Bleep, BleepPropsUpdatable } from '../types.js'

const createBleep = (props: BleepProps): Bleep | null => {
  const isBrowser: boolean = typeof window !== 'undefined'
  const isBrowserSafari: boolean =
    isBrowser &&
    window.navigator.userAgent.includes('Safari') &&
    !window.navigator.userAgent.includes('Chrome')

  const isBleepsAvailable = isBrowser && !!window.AudioContext

  if (!isBleepsAvailable) {
    return null
  }

  const {
    sources,
    preload = true,
    loop = false,
    volume = 1.0,
    fetchHeaders,
    masterGain,
    maxPlaybackDelay = 0.25
  } = props

  let isBufferLoading = false
  let isBufferError = false
  let isBufferPlaying = false
  let playbackCallbackTime = 0
  let hasPlaybackCallback = false

  let source: AudioBufferSourceNode | null = null
  let buffer: AudioBuffer | null = null
  let duration = 0
  let fetchPromise: Promise<void>

  const context = props.context ?? new window.AudioContext()
  const gain = context.createGain()
  const callersAccount = new Set<string>()

  const getDuration = (): number => duration
  const getIsPlaying = (): boolean => isBufferPlaying
  const getIsLoaded = (): boolean => !!buffer

  function fetchAudioBuffer(): void {
    if (buffer || isBufferLoading || isBufferError) {
      return
    }

    if (!sources.length) {
      isBufferError = true
      console.error(
        'Every bleep must have at least one source with a valid audio file URL and type.'
      )
      return
    }

    const audioTest = new window.Audio()
    const source = sources.find((source) => {
      // "webm" and "weba" file formats are not supported on Safari.
      if (isBrowserSafari && source.type.includes('audio/webm')) {
        return false
      }

      const support = audioTest.canPlayType(source.type || '')
      return support === 'probably' || support === 'maybe'
    })

    if (!source) {
      isBufferError = true
      console.error(
        `The bleep sources "${JSON.stringify(sources)}" are not supported on this navigator.`
      )
      return
    }

    const { src, type } = source

    isBufferLoading = true

    fetchPromise = window
      .fetch(src, {
        method: 'GET',
        headers: fetchHeaders
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Bleep source could not be fetched.')
        }
        return response
      })
      .then((response) => response.arrayBuffer())
      .then((audioArrayBuffer) => context.decodeAudioData(audioArrayBuffer))
      .then((audioBuffer) => {
        buffer = audioBuffer
        duration = buffer.duration
      })
      .catch((err) => {
        isBufferError = true
        console.error(
          `The bleep with source URL "${src}" and type "${type}" could not be used:`,
          err
        )
      })
      .then(() => {
        isBufferLoading = false
      })
  }

  function play(caller?: string): void {
    if (!buffer) {
      if (isBufferError) {
        return
      }

      // Allow multiple playback schedules since user clicks may change the time difference.
      playbackCallbackTime = Date.now()

      if (hasPlaybackCallback) {
        return
      }

      fetchAudioBuffer()

      // Schedule the playback for when the audio buffer is loaded.
      // If the buffer is loaded after `maxPlaybackDelay` seconds have passed
      // since the last time the user tried to play the audio, ignore the playback.
      hasPlaybackCallback = true
      void fetchPromise.then(() => {
        const now = Date.now()
        const isStillGoodToPlay = Number.isFinite(maxPlaybackDelay)
          ? now <= playbackCallbackTime + maxPlaybackDelay * 1_000
          : true

        if (buffer && isStillGoodToPlay) {
          play()
        }

        hasPlaybackCallback = false
      })

      return
    }

    if (loop && isBufferPlaying) {
      return
    }

    // If the user has not yet interacted with the browser, audio is locked
    // so try to unlock it.
    if (context.state === 'suspended') {
      let isResumeError = false

      context.resume().catch((err: Event) => {
        isResumeError = true
        console.error(
          `The bleep audio context with sources "${JSON.stringify(
            sources
          )}" could not be resumed to be played:`,
          err
        )
      })

      if (isResumeError) {
        return
      }
    }

    if (caller) {
      callersAccount.add(caller)
    }

    isBufferPlaying = true

    if (source) {
      source.stop()
      source.disconnect(gain)
      source = null
    }

    source = context.createBufferSource()
    source.buffer = buffer
    source.loop = loop

    if (loop) {
      source.loopStart = 0
      source.loopEnd = buffer.duration
    }

    source.connect(gain)
    source.start()

    source.onended = () => {
      isBufferPlaying = false

      if (source) {
        source.stop()
        source.disconnect(gain)
        source = null
      }
    }
  }

  function stop(caller?: string): void {
    if (!buffer) {
      return
    }

    if (caller) {
      callersAccount.delete(caller)
    }

    const canStop = loop ? !callersAccount.size : true

    if (canStop) {
      if (source) {
        source.stop()
        source.disconnect(gain)
        source = null
      }

      isBufferPlaying = false
    }
  }

  function load(): void {
    fetchAudioBuffer()
  }

  function unload(): void {
    if (source) {
      source.stop()
      source.disconnect(gain)
      source = null
    }

    // Remove audio buffer from memory.
    buffer = null

    isBufferLoading = false
    isBufferError = false
  }

  function update(props: BleepPropsUpdatable): void {
    if (props.volume !== undefined) {
      const bleepVolume = Math.max(0, Math.min(1, props.volume))
      gain.gain.setValueAtTime(bleepVolume, context.currentTime)
    }
  }

  const bleep = {} as unknown as Bleep
  const bleepAPI: { [P in keyof Bleep]: PropertyDescriptor } = {
    duration: {
      get: getDuration,
      enumerable: true
    },
    isPlaying: {
      get: getIsPlaying,
      enumerable: true
    },
    isLoaded: {
      get: getIsLoaded,
      enumerable: true
    },
    play: {
      value: play,
      enumerable: true
    },
    stop: {
      value: stop,
      enumerable: true
    },
    load: {
      value: load,
      enumerable: true
    },
    unload: {
      value: unload,
      enumerable: true
    },
    update: {
      value: update,
      enumerable: true
    }
  }

  Object.defineProperties(bleep, bleepAPI)

  // If there is a master GainNode provided, subscribe to it so a global volume
  // can be set from there. Otherwise, subscribe to the context directly.
  if (masterGain) {
    gain.connect(masterGain)
  } else {
    gain.connect(context.destination)
  }

  // Set initial bleep volume.
  update({ volume })

  if (preload) {
    fetchAudioBuffer()
  }

  return bleep
}

export { createBleep }
