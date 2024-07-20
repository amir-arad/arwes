import { Children, type ReactNode } from 'react'
import { memo, Animator, Animated, flicker, cx, styleFrameClipOctagon } from '@arwes/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { theme } from '@/config'
import {
  Dashboard as IconRoot,
  Page as IconDocs,
  Code as IconDocsDevelop,
  DesignNib as IconDocsDesign,
  Community as IconDocsCommunity,
  CollageFrame as IconDemos,
  Codepen as IconPlay,
  DashboardSpeed as IconPerf
} from 'iconoir-react'

type ListProps = {
  className?: string
  children: ReactNode
}

const List = (props: ListProps): JSX.Element => {
  const { className, children } = props
  return <ul className={cx('flex flex-col', className)}>{children}</ul>
}

type ItemProps = {
  href: string
  icon?: ReactNode
  text: ReactNode
  children?: ReactNode
  onLink: () => void
}

const Item = (props: ItemProps): JSX.Element => {
  const { href, icon, text, children, onLink } = props
  const pathname = usePathname()
  const matches = pathname.startsWith(href)
  const active = pathname === href
  return (
    <Animator combine manager="stagger">
      <Animated as="li">
        <Animator>
          <Animated animated={flicker()}>
            <Link
              className={cx(
                'flex flex-row items-center gap-2 px-4 py-2 font-cta font-light text-size-9',
                'transition-all ease-out duration-200',
                !matches && 'text-primary-main-4 hover:text-primary-high-2',
                matches && 'text-secondary-main-4 hover:text-secondary-high-2',
                active && 'bg-secondary-main-3/[0.05]'
              )}
              style={{
                clipPath: styleFrameClipOctagon({
                  leftTop: false,
                  leftBottom: false,
                  squareSize: theme.space(2)
                })
              }}
              href={href}
              onClick={onLink}
            >
              {icon}
              {text}
            </Link>
          </Animated>
        </Animator>

        {!!Children.count(children) && (
          <div className="pl-4">
            <List className="border-l border-dashed border-primary-main-9/50">{children}</List>
          </div>
        )}
      </Animated>
    </Animator>
  )
}

type MobileNavProps = {
  onLink: () => void
}

const MobileNav = memo((props: MobileNavProps): JSX.Element => {
  const { onLink } = props
  return (
    <List>
      <Item href="/" icon={<IconRoot />} text="Root" onLink={onLink}>
        <Item href="/docs" icon={<IconDocs />} text="Docs" onLink={onLink}>
          <Item href="/docs/develop" icon={<IconDocsDevelop />} text="Develop" onLink={onLink} />
          <Item href="/docs/design" icon={<IconDocsDesign />} text="Design" onLink={onLink} />
          <Item
            href="/docs/community"
            icon={<IconDocsCommunity />}
            text="Community"
            onLink={onLink}
          />
        </Item>
        <Item href="/demos" icon={<IconDemos />} text="Demos" onLink={onLink} />
        <Item href="/play" icon={<IconPlay />} text="Play" onLink={onLink} />
        <Item href="/perf" icon={<IconPerf />} text="Perf" onLink={onLink} />
      </Item>
    </List>
  )
})

export { MobileNav }
