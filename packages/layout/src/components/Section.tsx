/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { forwardRef } from 'react'

import { ErrorBoundary } from './Errors'

interface SectionProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  _css?: MakerProps['css']
  maxWidth?: ResponsiveScale
  container?: boolean
}

/**
 * The `Section` component creates new content sections that support full-width
 * backgrounds with custom max-width inner content.
 *
 * @see https://maker-ui.com/docs/layout/section
 */

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      maxWidth,
      background,
      color,
      container = true,
      id,
      className,
      _css, // root styles
      css, // container styles (direct parent)
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={className}
        css={{ background, color, width: '100%', ...(_css as object) }}>
        <ErrorBoundary errorKey="section">
          {container ? (
            <div
              className="container"
              css={{
                maxWidth: 'var(--maxWidth_section)',
                margin: '0 auto',
                ...(css as object),
              }}
              {...props}>
              {children}
            </div>
          ) : (
            children
          )}
        </ErrorBoundary>
      </section>
    )
  }
)

Section.displayName = 'Section'
