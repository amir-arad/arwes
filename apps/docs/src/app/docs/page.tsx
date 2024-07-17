import React from 'react'
import type { Metadata } from 'next'

import { settings } from '@/config/settings'
import { DocsPage } from './DocsPage'

export const metadata: Metadata = {
  title: `Docs | ${settings.title}`,
  description: settings.description
}

export default (): JSX.Element => <DocsPage />
