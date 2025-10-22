import type { ReactElement } from 'react'
import { LayoutDevelop } from './LayoutDevelop'

export default ({ children }: { children: React.ReactNode }): ReactElement => (
  <LayoutDevelop>{children}</LayoutDevelop>
)
