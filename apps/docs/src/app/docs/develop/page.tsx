import type { Metadata } from 'next'

import { settings } from '@/config/settings'
import { PageDovelop } from './PageDovelop'

export const metadata: Metadata = {
  title: `Develop | ${settings.title}`,
  description: settings.description
}

export default (): JSX.Element => <PageDovelop />
