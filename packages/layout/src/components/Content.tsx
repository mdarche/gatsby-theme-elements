/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'

import { ErrorBoundary } from './Errors/ErrorBoundary'
import { ContentError } from './Errors/Errors'
import { useOptions } from '../context/OptionContext'
import { useLayoutDetector } from '../context/LayoutContext'
import { useLayoutStyles } from '../hooks/useLayoutStyles'
import { setBreakpoint } from '../utils/helper'

interface ContentProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {}

/**
 * The `Content` component is a wrapper that reads the contents of its
 * child nodes and updates the LayoutProvider for valid layouts or throws a development error.
 *
 * Use it to wrap everything between your `Header` and `Footer` components.
 *
 * @see https://maker-ui.com/docs/layout/content
 */

export const Content = ({ children, css, ...props }: ContentProps) => {
  const { framework, content, sideNav, breakpoints } = useOptions()
  const { layout, showError, initialRender } = useLayoutDetector(
    'content',
    children
  )
  const layoutStyles = useLayoutStyles(layout)
  const bp = layout.includes('sidenav')
    ? sideNav.breakpoint
    : content.breakpoint

  return (
    <div
      id="site-inner"
      breakpoints={setBreakpoint(bp, breakpoints)}
      css={{
        position: 'relative',
        visibility: framework === 'gatsby' && initialRender && ['hidden'],
        ...layoutStyles,
        ...(css as object),
      }}
      {...props}>
      {showError ? (
        <ContentError />
      ) : (
        <ErrorBoundary errorKey="content">{children}</ErrorBoundary>
      )}
    </div>
  )
}

Content.displayName = 'Content'
