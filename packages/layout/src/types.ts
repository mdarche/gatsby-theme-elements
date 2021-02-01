import * as React from 'react'
import { Interpolation } from '@maker-ui/css'

import { mobileNavTypes, navTypes, transitionTypes } from './constants'

export type ResponsiveScale = string | number | (string | number)[]

export type ResponsiveString = string | string[]

export interface MakerProps {
  css?: Interpolation<any>
  breakpoints?: (string | number)[]
}

type ThemeColors = {
  [key: string]: {
    text?: string
    link?: string
    link_hover?: string
    primary?: string
    secondary?: string
    background?: string
    bg_topbar?: string
    bg_header?: string
    bg_dropdown?: string
    bg_mobileMenu?: string
    bg_sideNav?: string
    bg_footer?: string
    bg_toolbar?: string
    bg_panel?: string
  } & {
    [key: string]: string
  }
}

type ThemeFonts = {
  body?: string
  heading?: string
  monospace?: string
} & {
  [key: string]: string
}

/**
 * Configuration for Maker UI layout system.
 */
export interface MakerOptions {
  /**
   * SSG framework optimizations for Gatsby and NextJS.
   */
  framework?: 'gatsby' | 'next'
  /**
   * An array of screen sizes from small to large. These breakpoints are used to
   * set the default responsive sizes for all Maker UI primitives and components.
   */
  breakpoints: (string | number)[]
  fonts: ThemeFonts
  colors: ThemeColors
  linkFunction?(
    path: string,
    children: string | React.ReactElement,
    attributes: object,
    icon?: React.ReactElement
  ): React.ReactElement
  topbar: {
    maxWidth: ResponsiveScale
    sticky?: boolean
    stickyOnMobile?: boolean
    hideOnMobile?: boolean
    breakpoint: number | string
  }
  header: {
    navType: typeof navTypes[number]
    mobileNavType: typeof mobileNavTypes[number]
    maxWidth: ResponsiveScale
    sticky: boolean
    stickyOnMobile: boolean
    stickyUpScroll: boolean
    scrollClass: {
      scrollTop: number
      className: string
    }
    showColorButton: boolean
    hideColorButtonOnMobile: boolean
    hideWidgetsOnMobile: boolean
    dropdown: {
      caret: boolean | 'default' | React.ReactNode
      transition: 'scale' | 'fade' | 'fade-down' | 'fade-up'
    }
    menuOverflow: 'wrap' | 'scroll'
    menuButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    colorButton?:
      | 'default'
      | React.ReactNode
      | ((currentMode?: string, attributes?: object) => React.ReactNode)
    breakpoint: number | string
  }
  mobileMenu: {
    width: ResponsiveScale
    transition: typeof transitionTypes[number]
    easingCurve?: string
    visibleOnDesktop?: boolean
    closeButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    showCloseButton: boolean
    closeOnBlur: boolean
    closeOnRouteChange: boolean
  }
  sideNav: {
    width: ResponsiveScale
    easingCurve: string
    isHeader: boolean
    isPrimaryMobileNav: boolean
    closeOnBlur: boolean
    closeOnRouteChange: boolean
    showToggleOnMobile: boolean
    toggleButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    breakpoint: string | number
  }
  content: {
    maxWidth?: ResponsiveScale
    maxWidthSection?: ResponsiveScale
    sidebarGap?: ResponsiveScale
    deferMeasurements?: number
    breakpoint: string | number
  }
  sidebar: {
    width?: ResponsiveScale
    secondWidth?: ResponsiveScale // TODO
  }
  footer: {
    maxWidth?: ResponsiveScale
  }
  a11y: {
    skiplinks?: boolean
  }
  errors: {
    logFunction?(error: string, errorDetails: object, component: string): any
    showStackTrace?: boolean
    errorMessage?: {
      topbar?: React.ReactNode
      header?: React.ReactNode
      mobileMenu?: React.ReactNode
      content?: React.ReactNode
      main?: React.ReactNode
      sideNav?: React.ReactNode
      sidebar?: React.ReactNode
      footer?: React.ReactNode
      section?: React.ReactNode
    }
  }
  workspace: {
    canvasMaxWidth?: ResponsiveScale
    panelLeft?: PanelProps
    panelRight?: PanelProps
    dock?: {
      width?: ResponsiveScale
      hideOnMobile?: boolean
      breakpoint: string | number
    }
    breakpoint: string | number
  }
}

type PanelProps = {
  width?: ResponsiveScale
  /** `NOTE` Will cause a repaint */
  collapsible?: boolean
  collapseWidth?: ResponsiveScale
  collapseButton?:
    | 'default'
    | React.ReactNode
    | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
  defaultOpen?: boolean
  animationStyle?: 'slide' | 'scale'
}
