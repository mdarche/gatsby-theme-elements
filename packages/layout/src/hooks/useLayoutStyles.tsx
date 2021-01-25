import { useOptions } from '../context/OptionContext'
import { useMeasurements, LayoutString } from '../context/LayoutContext'
import { format } from '../utils/helper'

export function useLayoutStyles(layout: LayoutString): object {
  const { measurements } = useMeasurements()
  const { topbar, header, sideNav, workspace } = useOptions()

  /**
   * -------- Sidebar Styles --------
   */
  if (layout && layout.includes('sidebar')) {
    /** Handle row reversal on mobile so main content always appears first */
    const sidebarOrder = (): object | null => {
      if (layout === 'sidebar content') {
        return {
          '.sidebar': { gridRow: [2, 'auto'] },
        }
      }
      if (layout === 'sidebar content sidebar') {
        return {
          '.sidebar:first-of-type': {
            gridRow: [2, 'auto'],
          },
        }
      }
      return null
    }

    /**  Set grid column widths */
    const getSidebarColumns = (): string | null => {
      const width = 'var(--width_sidebar)'
      const grid =
        layout === 'sidebar content'
          ? `${width} 1fr`
          : layout === 'sidebar content sidebar'
          ? `${width} 1fr ${width}`
          : layout === 'content sidebar'
          ? `1fr ${width}`
          : null

      return grid
    }

    return {
      display: 'grid',
      gap: 'var(--gap_content)',
      maxWidth: 'var(--maxWidth_content)',
      margin: '0 auto',
      minHeight: '80vh',
      ...sidebarOrder,
      gridTemplateColumns: ['1fr', getSidebarColumns()],
    }
  }

  /**
   * -------- SideNav Styles --------
   */
  if (layout && layout.includes('sidenav')) {
    /** Determine the top value for `sidenav content` and `content sidenav` layouts */
    const calculateTop = () => {
      let top = header.sticky ? measurements.height_header : 0

      if (topbar.sticky) {
        top += measurements.height_topbar
      }

      return top
    }

    /**Determine the transform direction for toggling on mobile */
    const getTransform = width => {
      const w = Array.isArray(width) ? width[sideNav.bpIndex] : width
      const shift = layout === 'sidenav content' ? `-${w}` : w
      return `translateX(${format(shift)})`
    }

    /**
     * Check for measurements to complete before adding transition style
     * @todo Find a mobile `sidenav-content` solution for when <Header> does not exist
     */
    const getTransition = () => {
      if (!sideNav.isHeader) {
        return measurements.height_header !== 0 ? sideNav.easingCurve : null
      }
      return sideNav.easingCurve
    }

    return {
      display: 'flex',
      '#sidenav': {
        position: ['fixed', 'relative'],
        zIndex: [101, 0],
        top: 0,
        bottom: 0,
        width: 'var(--width_sideNav)',
        right: layout === 'content sidenav' && 0,
        left: layout === 'sidenav content' && 0,
        willChange: 'transform',
        transform: 'translateX(0)',
        transition: getTransition(),
        '&.hide': {
          transform: [getTransform(sideNav.width), 'none'],
        },
        '> .container': {
          position: 'sticky',
          top: [0, calculateTop()],
          height: `calc(100vh - ${calculateTop()}px)`,
          overflowY: 'auto',
        },
      },
      '#content': {
        maxWidth: 'var(--maxWidth_content)',
        margin: '0 auto',
      },
      '#toggle-sidenav': {
        right: layout === 'sidenav content' && 30,
        left: layout === 'content sidenav' && 30,
      },
    }
  }

  /**
   * -------- Workspace / Dock Styles --------
   */
  if (layout && layout.includes('workspace')) {
    return {
      display: 'flex',
      '#workspace': { flex: 1 },
      '#dock': {
        width: 'var(--width_dock)',
        display: workspace.dock.hideOnMobile ? ['none', 'block'] : ['block'],
      },
    }
  }

  /**
   * -------- Content Styles (default) --------
   */
  return {
    display: 'block',
    maxWidth: 'var(--maxWidth_content)',
    margin: '0 auto',
  }
}
