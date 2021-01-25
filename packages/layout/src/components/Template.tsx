import * as React from 'react'

import { MakerOptions } from '../types'
import { MenuProps } from './Menu'
import { Layout } from './Layout'
import { Topbar } from './Topbar'
import { Header } from './Header'
import { Navbar } from './Navbar'
import { MobileMenu } from './MobileMenu'
import { Content } from './Content'
import { Main } from './Main'
import { SideNav } from './SideNav'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'

import { navTypes, contentTypes } from '../constants'

const SiteInner = ({
  sideNav,
  sidebar,
  sidebarTwo,
  menu,
  layout,
  children,
}) => {
  switch (layout) {
    case 'content sidebar':
      return (
        <Content>
          <Main>{children}</Main>
          <Sidebar>{sidebar}</Sidebar>
        </Content>
      )
    case 'sidebar content':
      return (
        <Content>
          <Sidebar>{sidebar}</Sidebar>
          <Main>{children}</Main>
        </Content>
      )
    case 'sidebar content sidebar':
      return (
        <Content>
          <Sidebar>{sidebar}</Sidebar>
          <Main>{children}</Main>
          <Sidebar>{sidebarTwo}</Sidebar>
        </Content>
      )
    case 'content sidenav':
      return (
        <Content>
          <Main>{children}</Main>
          <SideNav menu={menu} toggleButton={sideNav[1]} pathname={sideNav[2]}>
            {sideNav[0]}
          </SideNav>
        </Content>
      )
    case 'sidenav content':
      return (
        <Content>
          <SideNav menu={menu} toggleButton={sideNav[1]} pathname={sideNav[2]}>
            {sideNav[0]}
          </SideNav>
          <Main>{children}</Main>
        </Content>
      )
    default:
      return (
        <Content>
          <Main>{children}</Main>
        </Content>
      )
  }
}

interface TemplateProps {
  theme: object
  options: MakerOptions
  components?: object
  topbar?: React.ReactNode
  headerWidgets?: React.ReactNode
  menuButton?: MakerOptions['header']['menuButton']
  colorButton?: MakerOptions['header']['colorButton']
  logo?: React.ReactNode
  menu: MenuProps[]
  mobileMenu?: string
  navType?: typeof navTypes[number]
  layoutType?: typeof contentTypes[number]
  sideNav?: React.ReactNode
  sideNavToggle?: React.ReactNode
  sidebar?: React.ReactNode
  sidebarTwo?: React.ReactNode
  footer?: React.ReactNode
  pathname?: string
  children: React.ReactNode
}

/**
 * Use the `Template` component to quickly build layouts. You can supply an assortment
 * of React elements as props and customize with your `theme` and `options` objects.
 *
 * @see https://maker-ui.com/docs/layout/template
 */

export const Template = ({
  options,
  topbar,
  headerWidgets,
  menuButton,
  colorButton,
  layoutType,
  navType,
  logo,
  menu,
  mobileMenu = 'default',
  sideNav,
  sideNavToggle,
  sidebar,
  sidebarTwo,
  footer,
  pathname,
  children,
}: TemplateProps) => {
  return (
    <Layout options={options}>
      {topbar && <Topbar>{topbar}</Topbar>}
      <Header>
        <Navbar
          type={navType}
          logo={logo}
          menu={menu}
          // widgetArea={headerWidgets}
          menuButton={menuButton}
          colorButton={colorButton}
          pathname={pathname}
        />
        {mobileMenu === 'default' ? (
          <MobileMenu menu={menu} />
        ) : React.isValidElement(mobileMenu) ? (
          <MobileMenu>{mobileMenu}</MobileMenu>
        ) : null}
      </Header>
      <SiteInner
        layout={layoutType}
        sideNav={[sideNav, sideNavToggle, pathname]}
        sidebar={sidebar}
        sidebarTwo={sidebarTwo}
        menu={menu}>
        {children}
      </SiteInner>
      {footer ? <Footer>{footer}</Footer> : null}
    </Layout>
  )
}
