import * as React from 'react'
import { Grid, Flex } from '@maker-ui/primitives'
import { MakerProps, ResponsiveScale } from '@maker-ui/css'

import { MakerOptions } from '../../types'
import { useOptions } from '../../context/OptionContext'
import { LayoutString, useLayout } from '../../context/LayoutContext'
import { Logo } from './Logo'
import { ColorButton } from './ColorButton'
import { NavMenu, MenuButton, MenuProps } from '../Menu'
import { WidgetArea } from './WidgetArea'
import { gridStyles } from './styles'
import { setBreakpoint } from '../../utils/helper'

const edge = ['minimal-left', 'minimal-center']
const mobileEdge = ['basic-menu-left', 'logo-center', 'logo-center-alt']

export interface NavProps extends MakerProps {
  type?: MakerOptions['header']['navType']
  mobileType?: MakerOptions['header']['mobileNavType']
  logo?: React.ReactNode
  menu?: MenuProps[]
  colorButton?: MakerOptions['header']['colorButton']
  menuButton?: MakerOptions['header']['menuButton']
  navArea?: React.ReactNode
  pathname?: string
  maxWidth?: ResponsiveScale
}

/**
 * The `Navbar` component renders your layout's primary navigation in one of
 * 8 conventional styles or you can fully customize it with the `grid` prop.
 *
 * @see https://maker-ui.com/components/layout/navbar
 */

export const Navbar = (props: NavProps) => {
  const { header, mobileMenu, breakpoints } = useOptions()
  const [layout, setLayout] = useLayout('nav')
  const [mobileLayout, setMobileLayout] = useLayout('mobileNav')

  const bpArray = setBreakpoint(header.breakpoint, breakpoints)

  const {
    type,
    mobileType,
    logo,
    menu,
    navArea,
    menuButton,
    colorButton,
    maxWidth = 'var(--maxWidth_header)',
    css,
  } = props

  const mid = Math.ceil(menu.length / 2)

  React.useEffect(() => {
    if (type !== undefined && type !== layout) {
      setLayout(type)
    }

    if (mobileType !== undefined && mobileType !== mobileLayout) {
      setMobileLayout(mobileType as LayoutString) // TODO check this TS issue
    }
  }, [type, mobileType, layout, mobileLayout, setLayout, setMobileLayout])

  const wrapPartial: object | undefined =
    header.menuOverflow === 'scroll'
      ? { '.menu-area': { overflowX: 'scroll', whiteSpace: 'nowrap' } }
      : undefined

  return (
    <Grid
      className={`nav-grid layout-${layout} m-layout-${mobileLayout}`}
      breakpoints={bpArray}
      css={{
        maxWidth,
        margin: '0 auto',
        position: 'relative',
        ...gridStyles(layout, mobileLayout),
        ...wrapPartial,
        ...(css as object),
      }}>
      {edge.includes(layout) || mobileEdge.includes(mobileLayout) ? (
        <Flex
          align="center"
          className="button-area"
          breakpoints={bpArray}
          css={{
            gridArea: 'button',
            display: [
              mobileEdge.includes(mobileLayout) ? 'flex' : 'none',
              edge.includes(layout) ? 'flex' : 'none',
            ],
          }}>
          <MenuButton customButton={menuButton} visibleOnDesktop />
        </Flex>
      ) : null}
      {layout === 'split' ? (
        <Flex
          align="center"
          className="menu-area split"
          breakpoints={bpArray}
          css={{
            gridArea: 'menu-split',
            display: ['none', 'flex'],
          }}>
          <NavMenu menuItems={menu.slice(0, mid)} />
        </Flex>
      ) : null}
      <Flex align="center" className="logo-area" css={{ gridArea: 'logo' }}>
        <Logo>{logo}</Logo>
      </Flex>
      <Flex
        align="center"
        className="menu-area"
        breakpoints={bpArray}
        css={{
          gridArea: 'menu',
          display: ['none', 'flex'],
        }}>
        <NavMenu menuItems={layout === 'split' ? menu.slice(mid) : menu} />
      </Flex>
      <Flex align="center" className="nav-area" css={{ gridArea: 'nav' }}>
        <WidgetArea content={navArea} />
        <MenuButton
          customButton={menuButton}
          breakpoints={bpArray}
          css={{
            display: [
              mobileEdge.includes(mobileLayout) ? 'none' : 'block',
              layout === 'minimal' || mobileMenu.visibleOnDesktop
                ? 'block'
                : 'none',
            ],
          }}
        />
        <ColorButton isHeaderButton customButton={colorButton} />
      </Flex>
    </Grid>
  )
}

Navbar.displayName = 'Navbar'
