import * as React from 'react'
import { SVG, Button, ButtonProps } from '@maker-ui/primitives'

import { useOptions } from '../../context/OptionContext'
import { useMenu, useSideNav } from '../../context/ActionContext'
import { setBreakpoint } from '../../utils/helper'

interface MenuButtonProps extends ButtonProps {
  isCloseButton?: boolean
  customButton?:
    | 'default'
    | React.ReactNode
    | ((isOpen?: string, attributes?: object) => React.ReactNode)
  visibleOnDesktop?: boolean
  'aria-expanded'?: boolean
}

/**
 * The `MenuButton` controls opening / closing the `MobileMenu`. It is included
 * inside the Navbar component but can be used anywhere inside your layout.
 *
 * @see https://maker-ui.com/docs/layout/buttons/#menuButton
 */

export const MenuButton = ({
  customButton,
  visibleOnDesktop,
  isCloseButton,
  css,
}: MenuButtonProps) => {
  const [menu, toggleMenu] = useMenu()
  const [sideMenu, toggleSideMenu] = useSideNav()
  const { header, sideNav, breakpoints } = useOptions()

  // Use custom button from props or check header / mobileMenu options
  const menuButton = customButton || header.menuButton

  const visibility = visibleOnDesktop
    ? !sideNav.isPrimaryMobileNav
      ? 'block'
      : 'none'
    : ['block', 'none']

  const conditionalAttributes = sideNav.isPrimaryMobileNav
    ? { 'aria-expanded': sideMenu ? true : false, onClick: toggleSideMenu }
    : { 'aria-expanded': menu ? true : false, onClick: toggleMenu }

  const attributes = {
    title: 'Menu',
    className: 'menu-button',
    'aria-label': 'Toggle Menu',
    ...conditionalAttributes,
  }

  return typeof menuButton === 'function' ? (
    menuButton(sideNav.isPrimaryMobileNav ? sideMenu : menu, attributes)
  ) : (
    <Button
      {...attributes}
      breakpoints={setBreakpoint(header.breakpoint, breakpoints)}
      css={{
        display: visibility,
        margin: 0,
        border: 'none',
        background: 'none',
        svg: { margin: '0 auto' },
        ...(css as object),
      }}>
      {menuButton || (
        <SVG
          viewBox="0 0 24 24"
          css={{
            display: 'block',
            margin: 0,
            height: isCloseButton ? 35 : 27,
          }}>
          {isCloseButton ? (
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          ) : (
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          )}
        </SVG>
      )}
    </Button>
  )
}

MenuButton.displayName = 'MenuButton'
