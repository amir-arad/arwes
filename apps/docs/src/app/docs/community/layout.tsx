import { type ReactNode, type ReactElement } from 'react'
import { LayoutCommunity } from './LayoutCommunity'

export default (props: { children: ReactNode }): ReactElement => (
  <LayoutCommunity>{props.children}</LayoutCommunity>
)
