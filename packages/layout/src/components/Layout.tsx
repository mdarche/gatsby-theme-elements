import * as React from 'react'
import { Global, Interpolation, ThemeProvider } from '@maker-ui/css'
import merge from 'deepmerge'

import { OptionProvider } from '../context/OptionContext'
import { ActionProvider } from '../context/ActionContext'
import { LayoutProvider } from '../context/LayoutContext'
import { Skiplinks, LinkItem } from './Skiplinks'
import { ErrorBoundary } from './Errors'
import { MakerOptions } from '../types'

import { globalStyles } from '../utils/styles'
import { colorVars, themeVars } from '../utils/css-builder'

interface LayoutProps {
  children: React.ReactNode
  options: Partial<MakerOptions>
  styles?: object
  theme?: object
  skiplinks?: LinkItem[]
}

/**
 * Wrap your application in the `Layout` component to use Maker UI.
 * @see https://maker-ui.com/docs/layout/layout
 */

export const Layout = ({
  options = {},
  styles = {},
  theme = {},
  skiplinks,
  children,
}: LayoutProps) => {
  const cssVariables = merge(
    colorVars(options.colors) as object,
    themeVars(options) as object
  )

  return (
    <ThemeProvider
      theme={
        options.breakpoints
          ? merge(theme, { breakpoints: options.breakpoints })
          : theme
      }>
      <OptionProvider options={options}>
        <LayoutProvider styles={styles}>
          <ActionProvider>
            <Global styles={cssVariables as Interpolation<any>} />
            <Global styles={globalStyles} />
            <Global styles={styles as Interpolation<any>} />
            <Skiplinks links={skiplinks} />
            <ErrorBoundary errorKey="layout">{children}</ErrorBoundary>
          </ActionProvider>
        </LayoutProvider>
      </OptionProvider>
    </ThemeProvider>
  )
}

Layout.displayName = 'MakerUI_Layout'
