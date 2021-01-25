/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { useEffect } from 'react'

import { ErrorBoundary } from '../Errors'
import { useMeasure } from '../../hooks/useMeasure'
import { useMeasurements } from '../../context/LayoutContext'

export interface ToolbarProps
  extends MakerProps,
    React.HTMLAttributes<HTMLDivElement> {
  background?: string | string[]
  scrollOverflow?: 'wrap' | 'scroll'
}

/**
 * The `Toolbar` component is fixed to the top of the workspace canvas and panels.
 * Use it to add helpful controls or key info to support the workspace.
 *
 */

export const Toolbar = ({
  background = 'var(--color-bg_toolbar)',
  css,
  children,
  ...props
}: ToolbarProps) => {
  const { setMeasurement } = useMeasurements()
  const [bind, { height }] = useMeasure()

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('toolbar', height)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height])

  return (
    <div
      {...bind}
      className="ws-toolbar"
      css={{
        background,
        gridArea: 'toolbar',
        overflowX: 'scroll',
        ...(css as object),
      }}
      {...props}>
      <ErrorBoundary errorKey="toolbar">{children}</ErrorBoundary>
    </div>
  )
}

Toolbar.displayName = 'Toolbar'
