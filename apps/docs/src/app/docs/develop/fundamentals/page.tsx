import type { ReactElement } from 'react'
import type { Metadata } from 'next'

import { settings } from '@/config/settings'
import Content from './Content'

export const metadata: Metadata = {
  title: `Fundamentals | ${settings.title}`,
  description: settings.description
}

export default (): ReactElement => <Content />
