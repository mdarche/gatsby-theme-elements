// Typescript read-only values for consistent types
export const contentTypes = [
  'content sidebar',
  'content sidenav',
  'content',
  'sidebar content',
  'sidebar content sidebar',
  'sidenav content',
  'dock workspace',
  'workspace',
  'workspace dock',
  'page-transition',
] as const

export const workspaceTypes = [
  'panel canvas panel',
  'panel canvas',
  'canvas panel',
  'canvas',
  'toolbar panel canvas panel',
  'toolbar panel canvas',
  'toolbar canvas panel',
  'toolbar canvas',
] as const

export const navTypes = [
  'basic',
  'basic-left',
  'basic-center',
  'center',
  'split',
  'minimal',
  'minimal-left',
  'minimal-center',
  'reverse',
] as const

export const mobileNavTypes = [
  'basic',
  'basic-menu-left',
  'logo-center',
  'logo-center-alt',
] as const

export const transitionTypes = [
  'fade',
  'fade-up',
  'fade-down',
  'slide-left',
  'slide-right',
] as const
