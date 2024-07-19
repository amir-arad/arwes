import lerna from '../../../../lerna.json'
import { DEPLOY_TIME } from '../dynamics'

export const settings = Object.freeze({
  title: 'ARWES',
  description: 'Futuristic Sci-Fi UI Web Framework',
  background: 'hsl(180, 20%, 4%)',
  version: lerna.version,
  deployTime: DEPLOY_TIME
} as const)
