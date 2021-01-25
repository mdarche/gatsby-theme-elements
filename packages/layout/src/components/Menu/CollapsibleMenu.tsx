/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { forwardRef } from 'react'

import { MenuItem, MenuProps } from './MenuItem'
import { useOptions } from '../../context/OptionContext'
import { useMenu, useSideNav } from '../../context/ActionContext'

interface CollapsibleProps
  extends MakerProps,
    React.HTMLAttributes<HTMLUListElement> {
  menu: MenuProps[]
  menuType: string
  pathname?: string
  children?: React.ReactElement
}

/**
 * The `CollapsibleMenu` displays nested menus for the `SideNav` and `MobileMenu` components.
 * Menu items with submenus will render a show/hide arrow button next to the item label.
 *
 * Used as a default menu for `SideNav` and `MobileMenu` when child components
 * are not included and you supply a menu prop.
 *
 * @see https://maker-ui.com/docs/layout/collapsible-menu
 */

export const CollapsibleMenu = forwardRef<HTMLUListElement, CollapsibleProps>(
  ({ menu = [], menuType, pathname, css, ...props }, ref) => {
    const { mobileMenu, sideNav, linkFunction } = useOptions()
    const [, toggleMenu] = useMenu()
    const [, toggleSideNav] = useSideNav()

    const getControls = () => {
      if (menuType === 'mobile' && mobileMenu.closeOnRouteChange) {
        return { onClick: (e) => toggleMenu() }
      }

      if (menuType === 'sideNav' && sideNav.closeOnRouteChange) {
        return { onClick: (e) => toggleSideNav() }
      }

      return undefined
    }

    return (
      <ul
        ref={ref}
        className="accordion-menu"
        role="navigation"
        css={{ ...(css as object) }}
        {...props}>
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            menuControls={getControls()}
            pathname={pathname}
            linkFunction={linkFunction}
          />
        ))}
      </ul>
    )
  }
)

CollapsibleMenu.displayName = 'CollapsibleMenu'
