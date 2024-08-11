'use client'

import { LayoutContent, Article, Nav } from '@/ui'

type LayoutDocsProps = {
  children?: React.ReactNode
}

const LayoutDevelop = (props: LayoutDocsProps): JSX.Element => {
  const { children } = props
  return (
    <LayoutContent left={<Nav path="docs" />}>
      <Article className="flex flex-col gap-6">{children}</Article>
    </LayoutContent>
  )
}

export { LayoutDevelop }
