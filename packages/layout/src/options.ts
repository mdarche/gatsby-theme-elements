import { MakerOptions } from './types'

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

/**
 * Default Maker UI option configuration.
 *
 * @link `MakerOptions` in src/types.ts for complete list of properties.
 * @todo - Revisit all of these defaults
 *
 */
export const defaultOptions: RecursivePartial<MakerOptions> = {
  fonts: {
    body: 'sans-serif',
    heading: 'sans-serif',
    monospace: 'monospace',
  },
  breakpoints: ['568px', '768px', '1440px'],
  colors: {
    light: {
      link: 'red',
      link_hover: 'green',
      text: '#333',
      background: '#fff',
      primary: '#1858dc',
      secondary: '#355cac',
      accent: '#1858dc',
      muted: '#f6f6f6',
      border: '#e6e6e6',
      bg_topbar: '#355cac',
      bg_header: '#fff',
      bg_mobileMenu: 'black',
      bg_sideNav: '#eee',
      bg_footer: 'blue',
      bg_toolbar: '#fbfbfb',
    },
  },
  topbar: {
    maxWidth: 1260,
    hideOnMobile: false,
    breakpoint: 0,
  },
  header: {
    navType: 'basic',
    mobileNavType: 'basic',
    maxWidth: 1460,
    sticky: false,
    stickyOnMobile: false,
    stickyUpScroll: false,
    hideColorButtonOnMobile: false,
    hideWidgetsOnMobile: true,
    menuOverflow: 'wrap',
    dropdown: {
      caret: 'default',
      transition: 'fade',
    },
    breakpoint: 0,
  },
  mobileMenu: {
    width: '60vw',
    transition: 'slide-left',
    cssTransition: 'all ease .3s',
    visibleOnDesktop: false,
    showCloseButton: true,
    closeOnBlur: true,
    closeOnRouteChange: false,
  },
  sideNav: {
    width: [250, 300],
    isHeader: false,
    isPrimaryMobileNav: false,
    showToggleOnMobile: true,
    toggleButton: 'default',
    closeOnBlur: true,
    closeOnRouteChange: true,
    cssTransition: 'transform ease .3s',
    breakpoint: 0,
  },
  content: {
    maxWidth: 1020,
    maxWidthSection: 1020,
    sidebarGap: 30,
    deferMeasurements: 0,
    breakpoint: 0,
  },
  sidebar: {
    width: 300,
  },
  footer: {
    maxWidth: 1020,
  },
  a11y: {
    skiplinks: true,
  },
  errors: {
    showStackTrace: false,
    errorMessage: {
      sidebar: 'You must add a child component to <Sidebar />',
    },
  },
  workspace: {
    canvasMaxWidth: '100%',
    breakpoint: 0,
    panelLeft: {
      width: '.25fr',
      collapseWidth: 0,
    },
    panelRight: {
      width: 300,
      collapseWidth: 0,
    },
    dock: {
      width: 50,
      hideOnMobile: true,
      breakpoint: 0,
    },
  },
}