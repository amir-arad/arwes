import type { Metadata } from 'next'

import { settings } from '@/config/settings'
import { HomePage } from './HomePage'

export const metadata: Metadata = {
  title: settings.title,
  description: settings.description
}

export default (): JSX.Element => <HomePage />
