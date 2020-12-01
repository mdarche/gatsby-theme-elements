import * as React from 'react'
import { MakerOptions } from 'maker-ui'

export const options: MakerOptions = {
  framework: 'gatsby',
  topbar: {
    maxWidth: [200, 600],
  },
  header: {
    navType: 'split',
    maxWidth: '100%',
    breakIndex: 0,
    sticky: true,
    stickyUpScroll: true,
    // stickyOnMobile: true,
    showColorButton: true,
    scrollClass: {
      className: 'scroll-test',
      scrollTop: 2000,
    },
    dropdown: {
      transition: 'fade-down',
    },
    // menuButton: (isOpen, atts) => (
    //   <button {...atts}>{isOpen ? 'yes' : 'no'}</button>
    // ),
  },
  mobileMenu: {
    width: '60vw',
    transition: 'slide-left',
    closeOnBlur: true,
    visibleOnDesktop: true,
    closeOnRouteChange: true,
    // closeButton: (isOpen, atts) => (
    //   <button {...atts} style={{ color: '#fff' }}>
    //     {isOpen ? 'yes' : 'no'}
    //   </button>
    // ),
    // customCloseButton: (isOpen, attributes) => (
    //   <button {...attributes}>{isOpen ? 'Close!' : 'Open!'}</button>
    // ),
  },
  sideNav: {
    // customToggle: (isOpen, attributes) => (
    //   <button
    //     style={{ position: 'fixed', bottom: 100, left: 20 }}
    //     {...attributes}>
    //     {isOpen ? 'close' : 'open'}
    //   </button>
    // ),
  },
  content: {
    maxWidth: 960,
    maxWidthSection: 960,
    breakIndex: 0,
  },
  footer: {
    maxWidth: [200, '100%'],
  },
  errors: {
    // logFunction: (error, errorInfo, component) => {
    //   console.log(
    //     'Coming in hot from the log function: ',
    //     error,
    //     errorInfo,
    //     component
    //   )
    // },
    showStackTrace: true,
    errorMessage: {
      content: <div>Content</div>,
      // main: <div>Main</div>,
    },
  },
}
