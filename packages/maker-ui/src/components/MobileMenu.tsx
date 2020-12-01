/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef, Fragment } from 'react'

import { ResponsiveScale, MakerProps, MakerOptions } from './types'
import { CollapsibleMenu, MenuButton, MenuProps } from './Menu'
import { ErrorBoundary } from './ErrorBoundary'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'
import { getTransition, fullWidth } from '../utils/helper'

interface MobileMenuProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  transition?: MakerOptions['mobileMenu']['transition']
  background?: string | string[]
  bg?: string | string[]
  width?: ResponsiveScale
  menu?: MenuProps[]
  pathname?: string
  closeButton?: MakerOptions['mobileMenu']['closeButton']
  header?: React.ReactElement
  footer?: React.ReactElement
}

/**
 * The `MobileMenu` component lets you customize a responsive overlay menu for mobile navigation.
 *
 * @todo calcluate default fill color of the close button with an accessibility color picker
 *
 * @see https://maker-ui.com/docs/layout/mobile-menu
 */

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  (props, ref) => {
    const [show, toggleMenu] = useMenu()
    const { mobileMenu } = useOptions()

    const {
      bg = 'bg_mobileMenu',
      variant = 'mobileMenu',
      background,
      closeButton,
      width = mobileMenu.width,
      transition = mobileMenu.transition,
      menu = [],
      pathname,
      header,
      footer,
      children,
      sx,
      ...rest
    } = props

    return (
      <Fragment>
        {mobileMenu.closeOnBlur && !fullWidth.includes(transition) ? (
          <Overlay show={show} toggle={toggleMenu} />
        ) : null}
        <div
          ref={ref}
          id="mobile-menu"
          sx={{
            position: 'fixed',
            bg,
            background,
            variant,
            top: 0,
            bottom: 0,
            zIndex: 100,
            willChange: 'transform, opacity',
            transition: mobileMenu.easingCurve || 'all ease .3s',
            ...getTransition(show, transition, width),
            ...sx,
          }}
          {...rest}>
          <ErrorBoundary errorKey="mobileMenu">
            {mobileMenu.showCloseButton || closeButton ? (
              <MenuButton customButton={closeButton} isCloseButton />
            ) : null}
            {header ? header : null}
            {children || (
              <CollapsibleMenu
                menu={menu}
                menuType="mobile"
                pathname={pathname}
              />
            )}
            {footer ? footer : null}
          </ErrorBoundary>
        </div>
      </Fragment>
    )
  }
)

MobileMenu.displayName = 'MobileMenu'
