import type { Metadata } from 'next'

import { settings } from '@/config/settings'
import { DemosPage } from './DemosPage'

export const metadata: Metadata = {
  title: `Demos | ${settings.title}`,
  description: settings.description
}

export default (): JSX.Element => <DemosPage />
