'use client'

import { useEffect, type ReactElement } from 'react'
import { useRouter } from 'next/navigation'

const PageCommunity = (): ReactElement => {
  const router = useRouter()
  useEffect(() => router.push('/docs/community/apps'), [])
  return <></>
}

export { PageCommunity }
