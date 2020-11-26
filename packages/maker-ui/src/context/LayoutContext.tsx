import * as React from 'react'

import { useOptions } from './OptionContext'
import { contentTypes, workspaceTypes, navTypes } from '../utils/constants'

export const LayoutContext = React.createContext(null)

export type LayoutString =
  | typeof navTypes[number]
  | typeof contentTypes[number]
  | typeof workspaceTypes[number]

export interface LayoutState {
  layout_nav?: typeof navTypes[number]
  layout_content?: typeof contentTypes[number]
  layout_workspace?: typeof workspaceTypes[number]
  height_header?: number
  height_topbar?: number
}

/**
 * The `LayoutProvider` tracks the current site layout and important
 * runtime UI measurements.
 *
 * @internal usage only
 */

const LayoutProvider = ({ children }) => {
  const { header } = useOptions()
  const [state, dispatch] = React.useState<LayoutState>({
    layout_nav: header.navType,
    layout_content: 'content',
    layout_workspace: 'canvas',
    height_header: 0,
    height_topbar: 0,
  })

  return (
    <LayoutContext.Provider value={[state, dispatch]}>
      {children}
    </LayoutContext.Provider>
  )
}

/**
 * Retrieves and allows you to edit the current nav, content, and workspace layout
 *
 * @see https://maker-ui.com/hooks/#useLayout
 */

function useLayout(
  type: 'content' | 'workspace' | 'nav'
): [LayoutString, (layout: LayoutString) => void] {
  const [{ layout_content, layout_workspace, layout_nav }, dispatch]: [
    LayoutState,
    React.Dispatch<React.SetStateAction<LayoutState>>
  ] = React.useContext(LayoutContext)

  if (dispatch === undefined) {
    throw new Error('useLayout must be used within a Maker UI Layout component')
  }

  function setLayout(newLayout: LayoutString) {
    dispatch(state => ({ ...state, [`layout_${type}`]: newLayout }))
  }

  return type === 'workspace'
    ? [layout_workspace, setLayout]
    : type === 'nav'
    ? [layout_nav, setLayout]
    : [layout_content, setLayout]
}

/**
 * Fetches Maker UI's key layout measurements
 *
 * @internal usage only
 */

function useMeasurements() {
  const [measurements, dispatch]: [
    LayoutState,
    React.Dispatch<React.SetStateAction<LayoutState>>
  ] = React.useContext(LayoutContext)

  if (measurements === undefined) {
    throw new Error(
      'useMeasurement must be used within an Maker UI Layout component'
    )
  }

  function setMeasurement(key: 'topbar' | 'header', value: number) {
    dispatch(state => ({ ...state, [`height_${key}`]: value }))
  }

  return { measurements, setMeasurement }
}

/**
 * Reads a parent component's children and generates a formatted Maker UI layout string.
 *
 * @internal usage only
 */

function getLayoutType(
  type: 'content' | 'workspace',
  children: React.ReactNode
): string {
  let nodes: any[] = React.Children.toArray(children)
  let currentLayout

  function layoutString(val: string) {
    let v = type === 'content' ? val.replace('main', 'content') : val
    return v
      .replace(/fixed|provider|context/g, '')
      .replace(/ {2,}/g, ' ')
      .trim()
  }

  if (nodes) {
    currentLayout = layoutString(
      nodes
        .map(child =>
          child.type.displayName
            ? child.type.displayName.toLowerCase()
            : 'unknown'
        )
        .join(' ')
    )

    return currentLayout
  }
}

/**
 * Checks the current layout is compatible and updates the LayoutProvider and returns an
 * error flag
 *
 * Currently used in the `Workspace` and `Content` wrapper components
 *
 * @internal usage only
 */

function useLayoutDetector(
  type: 'content' | 'workspace',
  children: React.ReactNode
) {
  const [layout, setLayout] = useLayout(type)
  const [showError, setShowError] = React.useState(false)
  const [initialRender, setInitialRender] = React.useState(true)

  React.useEffect(() => {
    if (children) {
      const currentLayout = getLayoutType(type, children)
      const isValidLayout =
        type === 'content'
          ? contentTypes.find(v => v === currentLayout)
          : workspaceTypes.find(v => v === currentLayout)

      if (isValidLayout) {
        if (layout !== currentLayout) {
          setLayout(currentLayout as LayoutString)
          if (initialRender) setInitialRender(false)
        }
      } else {
        setShowError(true)
      }
    }
  }, [layout, setLayout, type, initialRender, children])

  return { layout, showError, initialRender }
}

export { LayoutProvider, useMeasurements, useLayout, useLayoutDetector }
