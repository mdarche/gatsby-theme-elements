import * as React from 'react'

const WorkspaceDataContext = React.createContext(null)
const WorkspaceUpdateContext = React.createContext(null)

interface WorkspaceState {
  [key: string]: any
}

interface WorkspaceContextProps {
  children: React.ReactNode
}

/**
 * The `WorkspaceContext` provider wraps all Workspace components to allow
 * easy access to shared functions, configurations, and variables.
 *
 * @internal usage only
 */

export const WorkspaceContext = ({ children }: WorkspaceContextProps) => {
  const [state, setState] = React.useState<WorkspaceState>({})

  return (
    <WorkspaceDataContext.Provider value={state}>
      <WorkspaceUpdateContext.Provider value={setState}>
        {children}
      </WorkspaceUpdateContext.Provider>
    </WorkspaceDataContext.Provider>
  )
}

export function useWorkspace() {
  const settings: WorkspaceState = React.useContext(WorkspaceDataContext)
  const setState = React.useContext(WorkspaceUpdateContext)

  if (typeof settings === undefined) {
    throw new Error('useWorkspace must be called inside a Workspace component.')
  }

  function updateSetting(key, value) {
    setState(s => ({ ...s, [key]: value }))
  }

  return { settings, updateSetting }
}
