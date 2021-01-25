/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'

import { WorkspaceContext } from './WorkspaceContext'
import { useOptions } from '../../context/OptionContext'
import { useLayoutDetector } from '../../context/LayoutContext'
import { getWorkspaceStyles } from '../../utils/styles-workspace'

// Dot compatible JSX children
import { Canvas } from './Canvas'
import { Toolbar } from './Toolbar'
import { Panel } from './Panel'
import { setBreakpoint } from '../../utils/helper'

interface WorkspaceProps
  extends MakerProps,
    React.HtmlHTMLAttributes<HTMLDivElement> {}

export const Workspace = ({ css, children }: WorkspaceProps) => {
  const { workspace, breakpoints } = useOptions()
  const { layout, showError } = useLayoutDetector('workspace', children)

  return (
    <WorkspaceContext>
      <div
        id="workspace"
        breakpoints={setBreakpoint(workspace.breakpoint, breakpoints)}
        css={{
          ...getWorkspaceStyles(layout, workspace),
          ...(css as object),
        }}>
        {showError ? 'Error!' : children}
      </div>
    </WorkspaceContext>
  )
}

Workspace.Canvas = Canvas
Workspace.Toolbar = Toolbar
Workspace.Panel = Panel

Workspace.displayName = 'Workspace'
