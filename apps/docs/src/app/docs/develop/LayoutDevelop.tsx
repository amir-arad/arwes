'use client'

import { LayoutContent, Nav } from '@/ui'

type LayoutDocsProps = {
  children?: React.ReactNode
}

const LayoutDevelop = (props: LayoutDocsProps): JSX.Element => {
  const { children } = props
  return <LayoutContent left={<Nav path="docs" />}>{children}</LayoutContent>
}

export { LayoutDevelop }
