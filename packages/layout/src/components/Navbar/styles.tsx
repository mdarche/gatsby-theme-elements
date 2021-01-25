/**  Grid & flex justification styles for desktop */
const desktop = {
  basic: {
    areas: '"logo menu nav"',
    columns: 'auto 1fr auto',
    menuArea: 'flex-end',
  },
  'basic-left': {
    areas: '"logo menu nav"',
    columns: 'auto 1fr auto',
    menuArea: 'flex-start',
  },
  'basic-center': {
    areas: '"logo menu nav"',
    columns: 'auto 1fr auto',
    menuArea: 'center',
  },
  center: {
    areas: '"logo logo" "menu nav"',
    columns: '1fr',
    menuArea: 'center',
  },
  split: {
    areas: '"menu-split logo menu nav"',
    columns: '1fr auto 1fr',
  },
  reverse: {
    areas: '"menu logo nav"',
    columns: '1fr auto 1fr',
    navArea: 'flex-end',
  },
  minimal: {
    areas: '"logo nav"',
    columns: 'auto 1fr',
    navArea: 'flex-end',
  },
  'minimal-left': {
    areas: '"button logo nav"',
    columns: 'auto auto 1fr',
    navArea: 'flex-end',
  },
  'minimal-center': {
    areas: '"button logo nav"',
    columns: '1fr auto 1fr',
    navArea: 'flex-end',
  },
}

/**  Grid & flex justification styles for mobile */
const mobile = {
  basic: {
    areas: '"logo nav"',
    columns: 'auto 1fr',
    navArea: 'flex-end',
  },
  'basic-menu-left': {
    areas: '"button logo nav"',
    columns: 'auto auto 1fr',
    navArea: 'flex-end',
  },
  'logo-center': {
    areas: '"button logo nav"',
    columns: '1fr auto 1fr',
    navArea: 'flex-end',
  },
  'logo-center-alt': {
    areas: '"nav logo button"',
    columns: '1fr auto 1fr',
    navArea: 'flex-start',
  },
}

/**
 * Calculate grid-template-area, grid-template-columns, and grid-template-rows
 */

export function gridStyles(layout: string, mobileLayout: string): object {
  return {
    gridTemplateAreas: [mobile[mobileLayout].areas, desktop[layout].areas],
    gridTemplateColumns: [
      mobile[mobileLayout].columns,
      desktop[layout].columns,
    ],
    gridTemplateRows: ['1fr', layout !== 'center' ? '1fr' : '1fr 1fr'],
    gap: 0,
    '.nav-area': {
      ...absolutePosition(layout),
      justifyContent: [
        mobile[mobileLayout].navArea,
        desktop[layout].navArea || 'flex-start',
      ],
    },
    '.menu-area': {
      justifyContent: desktop[layout].menuArea && desktop[layout].menuArea,
    },
    '.menu-area.split': { justifyContent: 'flex-end' },
    '&.layout-center .logo-area': {
      justifyContent: 'center',
    },
    '&.layout-minimal, &.layout-minimal-left, &.layout-minimal-center': {
      '.menu-area': {
        display: 'none',
      },
    },
    '&.layout-minimal-center .button-area': {
      justifyContent: 'flex-start',
    },
    '&.m-layout-logo-center-alt .button-area': {
      justifyContent: ['flex-end', 'flex-start'],
    },
    // overflow flex-wrap vs scroll
  }
}

/**
 * Add absolute positioning to nav-area for `split` and `center` desktop layouts
 */

function absolutePosition(layout: string) {
  const abs = ['center', 'split']
  return abs.includes(layout)
    ? {
        position: ['relative', 'absolute'],
        top: 0,
        right: 0,
        height: '100%',
      }
    : null
}
