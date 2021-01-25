/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { Button } from '@maker-ui/primitives'

import { MakerOptions } from '../types'
import { ErrorBoundary } from './Errors/ErrorBoundary'
import { MenuProps } from './Menu'

import { CollapsibleMenu } from './Menu'
import { Overlay } from './Overlay'
import { useOptions } from '../context/OptionContext'
import { useSideNav } from '../context/ActionContext'
import { setBreakpoint } from '../utils/helper'

const Container = ({ isHeader, ...props }) =>
  isHeader ? <header {...props} /> : <div {...props} />

interface SideNavProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  toggleButton?: MakerOptions['sideNav']['toggleButton']
  menu?: MenuProps[]
  pathname?: string
  header?: React.ReactElement
  footer?: React.ReactElement
}

/**
 * The `SideNav` component creates a side navigation panel alongside the page's main
 * content. It can be toggled open or closed on mobile or it can serve as the page's
 * primary <header> tag.
 *
 * @see https://maker-ui.com/docs/layout/sidenav
 */

export const SideNav = ({
  background = 'var(--color-bg_sideNav)',
  toggleButton,
  menu,
  pathname,
  header,
  footer,
  css,
  children,
  ...props
}: SideNavProps) => {
  const [active, setActive] = useSideNav()
  const { sideNav, breakpoints } = useOptions()

  const customButton = toggleButton || sideNav.toggleButton

  const toggleAttributes = {
    id: 'toggle-sidenav',
    title: 'Toggle side navigation',
    'aria-label': 'Toggle side navigation',
    onClick: setActive,
    breakpoints: setBreakpoint(sideNav.breakpoint, breakpoints),
  }

  return (
    <ErrorBoundary errorKey="sideNav">
      {sideNav.closeOnBlur ? (
        <Overlay show={active} toggle={setActive} />
      ) : null}
      <Container
        isHeader={sideNav.isHeader}
        id="sidenav"
        className={!active ? 'hide' : null}
        css={{
          background,
          ...(css as object),
        }}
        {...props}>
        <div className="container">
          {header ? header : null}
          {children ? children : null}
          {menu ? (
            <CollapsibleMenu
              menu={menu}
              menuType="sideNav"
              pathname={pathname}
            />
          ) : null}
          {footer ? footer : null}
        </div>
      </Container>
      {typeof customButton === 'function' ? (
        customButton(active, toggleAttributes)
      ) : sideNav.showToggleOnMobile ? (
        <Button
          {...toggleAttributes}
          css={{
            position: 'fixed',
            display: ['inline-block', 'none'],
            bottom: 30,
            zIndex: 100,
          }}>
          {customButton === 'default'
            ? active
              ? 'close'
              : 'open'
            : customButton}
        </Button>
      ) : null}
    </ErrorBoundary>
  )
}

SideNav.displayName = 'SideNav'
