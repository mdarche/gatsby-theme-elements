/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import {
  Layout as ThemeLayout,
  Header,
  Main,
  Topbar,
  Footer,
  WidgetArea,
  MenuToggle,
  MobileNav,
} from "gatsby-theme-elements"

const menuItems = ["Home", "About", "Source", "Contact"]

const Layout = props => (
  <ThemeLayout>
    <Topbar>Topbar content</Topbar>
    <Header>
      <div className="logo">Logo</div>
      <ul
        sx={{
          listStyle: "none",
          display: "flex",
          a: {
            p: 3,
          },
        }}
      >
        {menuItems.map(item => (
          <li key={item}>
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </ul>
      <MenuToggle />
      <MobileNav />
    </Header>
    <Main>
      {/* Todo import sidebar component and measure it */}
      <div>Sidebar</div>
      <div>{props.children}</div>
    </Main>
    <WidgetArea>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
    </WidgetArea>
    <Footer>Copyright 2019</Footer>
  </ThemeLayout>
)

export default Layout
