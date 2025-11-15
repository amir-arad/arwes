import { Animated, Animator } from '@arwes-amir/react'

import { MobileLinks } from './MobileLinks'
import { Modal } from '../Modal'
import { Nav } from '../Nav'
import type { ReactElement } from 'react'
import { settings } from '@/config'

type MobileMenuProps = {
  isMenuOpen: boolean
  closeMenu: () => void
}

const MobileMenu = (props: MobileMenuProps): ReactElement => {
  const { isMenuOpen, closeMenu } = props

  return (
    <Animator
      root
      active={isMenuOpen}
      unmountOnExited
      unmountOnDisabled={!isMenuOpen}
      duration={{ exit: 0.4 }}
    >
      <Modal contentClassName="flex flex-col gap-6" header="Index" onClose={closeMenu}>
        <Animator combine manager="stagger">
          <div className="overflow-y-auto flex-1 flex min-w-0 min-h-0 max-h-[25rem]">
            <Nav onLink={closeMenu} />
          </div>

          <div className="flex flex-col gap-2">
            <MobileLinks />

            <Animator>
              <Animated<HTMLAnchorElement>
                as="a"
                className="flex justify-center font-cta leading-none text-size-10 text-primary-main-9"
                animated={['flicker']}
                href={`https://github.com/arwes/arwes/releases/tag/v${settings.version}`}
                target="version"
              >
                v{settings.version}
              </Animated>
            </Animator>

            <Animator>
              <Animated
                className="flex justify-center font-cta leading-none text-size-11 text-primary-main-9"
                animated={['flicker']}
              >
                {new Date(settings.deployTime).toISOString()}
              </Animated>
            </Animator>
          </div>
        </Animator>
      </Modal>
    </Animator>
  )
}

export { MobileMenu }
