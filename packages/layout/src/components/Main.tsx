/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'

import { ErrorBoundary } from './Errors'

interface MainProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
}

/**
 * The `Main` component wraps your layout's main content.
 *
 * @see https://maker-ui.com/docs/layout/main
 */

export const Main = ({ background, css, children, ...props }: MainProps) => (
  <main
    id="content"
    role="main"
    css={{ background, position: 'relative', flex: 1, ...(css as object) }}
    {...props}>
    <ErrorBoundary errorKey="main">{children}</ErrorBoundary>
  </main>
)

Main.displayName = 'Main'
