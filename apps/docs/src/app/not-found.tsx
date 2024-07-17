import type { Metadata } from 'next'

import { settings } from '@/config/settings'

export const metadata: Metadata = {
  title: `Not Found | ${settings.title}`,
  description: settings.description
}

export default (): JSX.Element => <div>Not Found</div>
