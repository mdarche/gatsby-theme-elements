import * as React from 'react'
import { SxStyleProp, Theme } from 'theme-ui'

import { navTypes, transitionTypes } from '../utils/constants'

export type ResponsiveScale =
  | string
  | string[]
  | number
  | number[]
  | (string | number)[]

export type ResponsiveString = string | string[]

export interface MakerProps {
  sx?: SxStyleProp
  variant?: string
}

/**
 * Alias for Maker UI theme object.
 */

export type MakerTheme = Theme

type PanelProps = {
  width?: ResponsiveScale
  collapsible?: boolean
  collapseWidth?: ResponsiveScale
  defaultOpen?: boolean
  animationStyle?: 'slide' | 'scale'
}

/**
 * Configuration for Maker UI layout system.
 *
 */

export interface MakerOptions {
  framework?: 'gatsby' | 'next'
  linkFunction?(
    path: string,
    children: string | React.ReactElement,
    attributes: object,
    icon?: React.ReactElement
  ): React.ReactElement
  topbar?: {
    maxWidth?: ResponsiveScale
    sticky?: boolean
    stickyOnMobile?: boolean
    hideOnMobile?: boolean
    bpIndex?: number
  }
  header?: {
    navType?: typeof navTypes[number]
    maxWidth?: ResponsiveScale
    sticky?: boolean
    stickyOnMobile?: boolean
    stickyUpScroll?: boolean
    scrollClass?: {
      scrollTop?: number
      className?: string
    }
    showColorButton?: boolean
    hideColorButtonOnMobile?: boolean
    hideWidgetsOnMobile?: boolean
    dropdown?: {
      caret?: boolean | 'default' | React.ReactNode
      transition?: 'scale' | 'fade' | 'fade-down' | 'fade-up'
    }
    menuButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    colorButton?:
      | 'default'
      | React.ReactNode
      | ((currentMode?: string, attributes?: object) => React.ReactNode)
    columnsDesktop?: string
    columnsMobile?: string
    bpIndex?: number
  }
  mobileMenu?: {
    width?: ResponsiveScale
    transition?: typeof transitionTypes[number]
    easingCurve?: string
    visibleOnDesktop?: boolean
    closeButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    showCloseButton?: boolean
    closeOnBlur?: boolean
    closeOnRouteChange?: boolean
  }
  sideNav?: {
    width?: ResponsiveScale
    easingCurve?: string
    isHeader?: boolean
    isPrimaryMobileNav?: boolean
    closeOnBlur?: boolean
    closeOnRouteChange?: boolean
    showToggleOnMobile?: boolean
    toggleButton?:
      | 'default'
      | React.ReactNode
      | ((isOpen?: boolean, attributes?: object) => React.ReactNode)
    bpIndex?: number
  }
  content?: {
    maxWidth?: ResponsiveScale
    maxWidthSection?: ResponsiveScale
    sidebarGap?: ResponsiveScale
    bpIndex?: number
  }
  sidebar?: {
    width?: ResponsiveScale
  }
  footer?: {
    maxWidth?: ResponsiveScale
  }
  a11y?: {
    skiplinks?: boolean
  }
  errors?: {
    logFunction?(error: string, errorDetails: object, component: string): any
    eventHandlerCatch?(error: string): any
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
  dock?: {
    width?: ResponsiveScale
    hideOnMobile?: boolean
    bpIndex?: number
  }
  workspace?: {
    canvasMaxWidth?: ResponsiveScale
    toolbarHeight?: ResponsiveScale
    bpIndex?: number
    panelLeft?: PanelProps
    panelRight?: PanelProps
  }
}
