/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { forwardRef, Fragment } from 'react'

import { MakerOptions } from '../types'
import { CollapsibleMenu, MenuButton, MenuProps } from './Menu'
import { ErrorBoundary } from './Errors'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useMenu } from '../context/ActionContext'
import { getTransition, fullWidth } from '../utils/helper'

interface MobileMenuProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  transition?: MakerOptions['mobileMenu']['transition']
  background?: string | string[]
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
 * @see https://maker-ui.com/docs/layout/mobile-menu
 */

export const MobileMenu = forwardRef<HTMLDivElement, MobileMenuProps>(
  (props, ref) => {
    const [show, toggleMenu] = useMenu()
    const { mobileMenu } = useOptions()

    const {
      background = 'var(--color-bg_mobileMenu)',
      closeButton,
      width = 'var(--width_mobileMenu)',
      transition = mobileMenu.transition,
      menu = [],
      pathname,
      header,
      footer,
      children,
      css,
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
          className={show ? 'active' : undefined}
          css={{
            position: 'fixed',
            background,
            top: 0,
            bottom: 0,
            zIndex: 100,
            willChange: 'transform, opacity',
            transition: mobileMenu.easingCurve,
            ...getTransition(show, transition, width),
            ...(css as object),
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
