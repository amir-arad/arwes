import type { Metadata } from 'next'

import { settings } from '@/config/settings'
import { PageSolid } from './PageSolid'

export const metadata: Metadata = {
  title: `Solid | ${settings.title}`,
  description: settings.description
}

export default (): JSX.Element => <PageSolid />
