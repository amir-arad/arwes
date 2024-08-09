import type { Metadata } from 'next'

import { settings } from '@/config/settings'
import { PageReact } from './PageReact'

export const metadata: Metadata = {
  title: `React | ${settings.title}`,
  description: settings.description
}

export default (): JSX.Element => <PageReact />
