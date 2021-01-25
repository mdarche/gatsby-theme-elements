# Maker UI

> This project is currently under development.

> If you arrived here from the Gatsby Theme Store, Gatsby Theme Elements is no longer supported and has now become a React component library.

Build React apps with a responsive layout system powered by [Theme UI](https://theme-ui.com/).

Maker UI helps you design accessible, responsive page templates that can be customized in an infinite number of ways. Use it to quickly prototype and deploy a polished application layout so you can focus on developing great content or adding new integrations and features to your project.

Maker UI extends all of Theme UI's core features so you can easily migrate your existing theme.

[![Version][version]][npm]
![MIT License][license]

[version]: https://flat.badgen.net/npm/v/maker-ui
[npm]: https://npmjs.com/package/maker-ui
[license]: https://flat.badgen.net/badge/license/MIT/blue

https://maker-ui.com

## Templating Features

- 8 customizable header layouts
- 6 common page layouts
- Responsive header navigation
- Responsive side navigation
- Accessible dropdown menus
- Automatic skiplink and keyboard focus management
- Template component for plug-and-play layouts
- Multi-layout support
- Full Theme UI capabilities
  - Unlimited color modes
  - Responsive scales
  - Variant and `sx` prop support
  - MDX theming
  - Compatibility with any Theme UI component library

## Getting Started

```sh
npm i maker-ui
```

Maker UI uses two configuration objects and optional custom components to build your layouts. Your custom theme and options configurations determine how each layout should behave and appear.

See the documentation on how to build a theme and configure your layout options.

### Template Component

To get a site up and running in less than 5 minutes, you can use the `Template` component. Simply import and supply your theme object, options object, menu array, and logo as props:

```jsx
// basic template usage
import React from 'react'
import { Template } from 'maker-ui'

import { theme, options, menu } from './config'
import Logo from './Logo'

export default props => (
  <Template theme={theme} options={options} menu={menu} logo={<Logo />}>
    {props.children}
  </Template>
)
```

The `Template` component accepts a variety of props for custom components like a sidebar, side nav, header widgets (ie. search or social media links), footer content, and much more. Check out the [Template docs](https://maker-ui.com/docs/template) for details.

### Layout Components

If your design requires more customization or if you need conditional layouts depending on a page route or variable, you can build with Maker UI's layout components:

```jsx
// basic layout component usage
import React from 'react'
import {
  Layout,
  Header,
  Navbar,
  MobileMenu,
  Content,
  Main,
  Sidebar,
  Footer,
} from 'maker-ui'

import { theme, options, menu } from './config'
import Logo from './Logo'

const MyLayout = props => (
  <Layout theme={theme} options={options}>
    <Header>
      <Navbar logo={<Logo />} menu={menu} />
      <MobileMenu menu={menu} />
    </Header>
    <Content>
      <Main>{props.children}</Main>
      <Sidebar>Your custom sidebar component</Sidebar>
    </Content>
    <Footer>Your custom footer</Footer>
  </Layout>
)

export default MyLayout
```

All layout components can be styled with custom variants and the `sx` prop.

## Maker Components

Maker UI also has an optional package `@maker-ui/components` that exports a variety of common components you might need for your site:

- Carousel
- Accordion
- SEO and SEOProvider
- Modal
- Lightbox
- Tabs
- Announcement
- TreeMenu
- FadeBox (scroll reveal)
- Popover and Dropdown
- Spinner
- CookieNotice
- Toast and ToastProvider
- On-page search

## Documentation

- [Design a Theme](https://maker-ui.com/docs/theming)
- [Configure Options](https://maker-ui.com/docs/options)
- [Layout Components](https://maker-ui.com/docs/layout-components)
- [Template Component](https://maker-ui.com/docs/template)
- [Adding Content](https://maker-ui.com/docs/adding-content)
- [Hooks API](https://maker-ui.com/docs/hooks-api)
- [Tutorials](https://maker-ui.com/tutorials)

## Upcoming Packages/Modules

- Components
  - Search (Algolia)
  - SmartTable
  - SmartGrid
  - SubscribeForm
  - Share buttons
  - Mega dropdown menus
  - Speech Synthesis
  - PricingTable
  - ParallaxBox
  - Subheader
- Workspace layout
- i18n Provider
- Pre-built themes
- Ecommerce & payment templates
- Authentication templates

## License

The MIT License (MIT)
