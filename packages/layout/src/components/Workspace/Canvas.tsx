/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'

import { ErrorBoundary } from '../Errors'

export interface CanvasProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'css'> {
  background?: string | string[]
}

/**
 * The `Canvas` component constitutes the main content area for the workspace layout.
 * It will display nested children that can access values set via `WorkspaceContext`.
 *
 */

export const Canvas = ({
  background = 'var(--color-background)',
  css,
  children,
  ...props
}: CanvasProps) => {
  return (
    <div
      className="ws-canvas"
      css={{
        background,
        gridArea: 'canvas',
        ...(css as object),
      }}
      {...props}>
      <ErrorBoundary errorKey="canvas">
        <div className="container">{children}</div>
      </ErrorBoundary>
    </div>
  )
}

Canvas.displayName = 'Canvas'
