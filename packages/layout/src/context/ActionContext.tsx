import * as React from 'react'

const ActionContext = React.createContext(null)
const ActionUpdateContext = React.createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'menu': {
      return { ...state, menuActive: !state.menuActive }
    }
    case 'sideNav': {
      return { ...state, sideNavActive: !state.sideNavActive }
    }
    case 'left-panel':
      return { ...state, leftPanelActive: !state.leftPanelActive }
    case 'right-panel':
      return { ...state, rightPanelActive: !state.rightPanelActive }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export interface ActionState {
  menuActive: boolean
  sideNavActive: boolean
  leftPanelActive: boolean
  rightPanelActive: boolean
  toolbarActive: boolean
}

/**
 * The `ActionProvider` controls the showing / toggling of all compatible Maker UI
 * layout components.
 *
 * @internal usage only
 */

const ActionProvider = ({ children }) => {
  const [state, dispatch]: [ActionState, any] = React.useReducer(reducer, {
    menuActive: false,
    sideNavActive: false,
    leftPanelActive: true,
    rightPanelActive: true,
    toolbarActive: true,
  })

  return (
    <ActionContext.Provider value={state}>
      <ActionUpdateContext.Provider value={dispatch}>
        {children}
      </ActionUpdateContext.Provider>
    </ActionContext.Provider>
  )
}

/**
 * Returns the current state and a toggle function for the `MobileMenu`
 *
 * @see https://maker-ui.com/hooks/#useMenu
 */

function useMenu(): [boolean, () => void] {
  const { menuActive }: ActionState = React.useContext(ActionContext)
  const dispatch = React.useContext(ActionUpdateContext)

  if (typeof menuActive === undefined) {
    throw new Error('useMenu must be used within an Maker UI layout')
  }

  function toggleMenu() {
    dispatch({ type: 'menu' })
  }

  return [menuActive, toggleMenu]
}

/**
 * Returns the current state and a toggle function for the `SideNav`
 *
 * @see https://maker-ui.com/hooks/#useSideNav
 */

function useSideNav(): [boolean, () => void] {
  const { sideNavActive }: ActionState = React.useContext(ActionContext)
  const dispatch = React.useContext(ActionUpdateContext)

  if (typeof sideNavActive === undefined) {
    throw new Error('useSideNav must be used within an Maker UI layout')
  }

  function setSideNav() {
    dispatch({ type: 'sideNav' })
  }

  return [sideNavActive, setSideNav]
}

/**
 * Returns the current state and a toggle function for the left or right `Workspace.Panel`
 *
 * @see https://maker-ui.com/hooks/#usePanel
 */

function usePanel(panel: 'left' | 'right'): [boolean, () => void] {
  const { leftPanelActive, rightPanelActive }: ActionState = React.useContext(
    ActionContext
  )
  const dispatch = React.useContext(ActionUpdateContext)
  const togglePanel = () => dispatch({ type: `${panel}-panel` })

  return panel === 'left'
    ? [leftPanelActive, togglePanel]
    : [rightPanelActive, togglePanel]
}

export { ActionProvider, useMenu, useSideNav, usePanel }
