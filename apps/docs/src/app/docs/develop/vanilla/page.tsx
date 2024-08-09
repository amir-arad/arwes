import type { Metadata } from 'next'

import { settings } from '@/config/settings'
import { PageVanilla } from './PageVanilla'

export const metadata: Metadata = {
  title: `Vanilla | ${settings.title}`,
  description: settings.description
}

export default (): JSX.Element => <PageVanilla />
