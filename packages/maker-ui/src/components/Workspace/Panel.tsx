/** @jsx jsx */
import { jsx } from '@emotion/react'
import { useEffect } from 'react'

import { MakerProps } from '../../types'
import { ErrorBoundary } from '../Errors'
import { useMeasure } from '../../hooks/useMeasure'
import { useMeasurements } from '../../context/LayoutContext'

export interface PanelProps
  extends MakerProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'css'> {
  background?: string | string[]
}

/**
 * The `Panel` component is positioned on one or either side of the workspace
 * canvas and lets you control settings with `WorkspaceContext`.
 *
 */

export const Panel = ({
  background = 'var(--color-bg_panel)',
  css,
  children,
  ...props
}: PanelProps) => {
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
      className="ws-panel"
      css={{
        background,
        gridArea: 'panel',
        ...(css as object),
      }}
      {...props}>
      <ErrorBoundary errorKey="toolbar">{children}</ErrorBoundary>
    </div>
  )
}

Panel.displayName = 'Panel'
