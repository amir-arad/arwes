import lerna from '../../../../lerna.json'
import { DEPLOY_TIME } from '../dynamics'

export const settings = Object.freeze({
  title: 'ARWES',
  description: 'Futuristic Sci-Fi UI Web Framework',
  background: 'hsl(180, 20%, 4%)',
  version: lerna.version,
  deployTime: DEPLOY_TIME,
  apps: {
    play: {
      url:
        typeof window !== 'undefined' &&
        ['arwes.dev', 'next.arwes.dev'].includes(window.location.host)
          ? '/play'
          : 'http://localhost:9000/play'
    },
    perf: {
      url:
        typeof window !== 'undefined' &&
        ['arwes.dev', 'next.arwes.dev'].includes(window.location.host)
          ? '/perf'
          : 'http://localhost:9001/perf'
    }
  }
} as const)
