import { MakerOptions } from '../types'
import { format } from './helper'

const secondPanel = (layout: string) => {
  return layout.includes('panel canvas panel')
    ? {
        '.panel:last-of-type': {
          gridArea: 'panel2',
        },
      }
    : null
}

export const getWorkspaceStyles = (
  layout: string,
  workspace: MakerOptions['workspace']
): object => {
  const styles = {
    display: 'grid',
    gridGap: 0,
    '.workspace-panel, .workspace-canvas, .workspace-toolbar': {
      overflow: 'hidden',
    },
    '.workspace-container': {
      height: '100%',
      overflowY: 'scroll',
    },
    '.workspace-canvas': {
      gridArea: 'c',
    },
    ...secondPanel(layout),
  }
  switch (layout) {
    case 'toolbar canvas':
      return {
        ...styles,
        gridTemplateRows: [`1fr`, `auto 1fr`],
        gridTemplateAreas: `"t" "c"`,
      }
    case 'toolbar panel canvas':
      return {
        ...styles,
        gridTemplateRows: [`1fr`, `auto 1fr`],
        gridTemplateColumns: t => [
          `1fr`,
          `${format(t.sizes.width_panel_left)} 1fr`,
        ],
        gridTemplateAreas: `
        "toolbar toolbar"
        "panel canvas"
        `,
      }
    case 'toolbar canvas panel':
      return {
        ...styles,
        gridTemplateRows: t => [`1fr`, `auto 1fr`],
        gridTemplateColumns: t => [
          `1fr`,
          ` 1fr ${format(t.sizes.width_panel_right)}`,
        ],
        gridTemplateAreas: `
          "toolbar toolbar"
          "canvas panel"
          `,
      }
    case 'toolbar panel canvas panel':
      return {
        ...styles,
        gridTemplateRows: ['1fr', 'auto 1fr'],
        gridTemplateColumns: t => [
          `1fr`,
          `${format(t.sizes.width_panel_left)} 1fr ${format(
            t.sizes.width_panel_right
          )}`,
        ],
        gridTemplateAreas: `
        "toolbar toolbar toolbar"
        "panel canvas panel2"
        `,
      }
    case 'canvas panel':
      return {
        ...styles,
        gridTemplateRows: `1fr`,
        gridTemplateColumns: t => [
          `1fr`,
          ` 1fr ${format(t.sizes.width_panel_right)}`,
        ],
        gridTemplateAreas: `"canvas panel"`,
      }
    case 'panel canvas panel':
      return {
        ...styles,
        gridTemplateRows: `1fr`,
        gridTemplateColumns: t => [
          `1fr`,
          `${format(t.sizes.width_panel_left)} 1fr ${format(
            t.sizes.width_panel_right
          )}`,
        ],
        gridTemplateAreas: `"panel canvas panel2"`,
      }
    case 'panel canvas':
    default:
      return {
        ...styles,
        gridTemplateRows: `1fr`,
        gridTemplateColumns: t => [
          `1fr`,
          `${format(t.sizes.width_panel_left)} 1fr`,
        ],
        gridTemplateAreas: `"panel canvas"`,
      }
  }
}
