import type { ReactElement } from 'react'
import type { Metadata } from 'next'

import { settings } from '@/config/settings'
import { PageHome } from './PageHome'

export const metadata: Metadata = {
  title: settings.title,
  description: settings.description
}

export default (): ReactElement => <PageHome />
