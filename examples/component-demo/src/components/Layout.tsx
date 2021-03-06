import * as React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Footer,
  Sidebar,
  SideNav,
  Topbar,
  Workspace,
  Div,
} from 'maker-ui'
import {
  // Announcement,
  PageTransition,
  // CookieNotice,
} from '@maker-ui/components'
// import { SEOProvider } from '@maker-ui/seo'
// import { Fixed } from './Fixed'
import { options } from './options'
import { styles } from './styles'

const menu = [
  {
    label: 'Carousel',
    path: '/carousel',
    submenu: [
      { label: 'Tabs', path: '/tabs' },
      {
        label: 'Tabs',
        path: '/tabs',
        submenu: [
          { label: 'Tabs', path: '/tabs' },
          { label: 'Tabs', path: '/tabs' },
        ],
      },
    ],
  },
  { label: 'Tabs', path: '/tabs' },
  { label: 'Accordion', path: '/accordion' },
  { label: 'Generative', path: '/generative' },
  { label: 'Tree Menu', path: '/tree-menu' },
  { label: 'Modal', path: '/modal' },
  // { label: 'JSX', path: '/jsx' },
  { label: 'Lightbox', path: '/lightbox' },
  { label: 'Popover', path: '/popover' },
  { label: 'TableofContents', path: '/toc' },
  { label: 'Workspace', path: '/workspace' },
]

export default ({ children, location }) => (
  <Layout styles={styles} options={options}>
    <Topbar>Topbar content</Topbar>
    <Header className="test-header">
      <Navbar logo={'Components Demo'} menu={menu} />
      <MobileMenu center menu={menu} />
    </Header>
    {location.pathname !== '/workspace' ? (
      <>
        <Content>
          <SideNav menu={menu} />
          {/* <Sidebar>test</Sidebar> */}
          <Main>
            {/* <PageTransition id={location.pathname} type="fade-up" distance={50}>
              <> */}
            {children}
            <div style={{ height: 2000 }} />
            {/* </>
            </PageTransition> */}
          </Main>
          {/* <Sidebar>test</Sidebar> */}
        </Content>
        <Footer>Test</Footer>
      </>
    ) : (
      <Content>
        <Workspace>
          <Workspace.Toolbar>Toolbar</Workspace.Toolbar>
          {/* <Workspace.Panel>
            <Div css={{ height: 1000 }}>test</Div>
          </Workspace.Panel> */}
          <Workspace.Canvas>{children}</Workspace.Canvas>
          <Workspace.Panel>
            <Div css={{ height: 1000 }}>test</Div>
          </Workspace.Panel>
        </Workspace>
      </Content>
    )}
    {/* <CookieNotice /> */}
  </Layout>
)
