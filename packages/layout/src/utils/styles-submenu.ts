import merge from 'deepmerge'

/**
 * Maker UI styles for header nav dropdown menus
 *
 * @internal usage only
 *
 */

const base = {
  opacity: 1,
  visibility: 'visible',
}

const fade = {
  transition: 'all ease .3s',
}

export const dropdownStyles = (type: string): object => {
  switch (type) {
    case 'scale':
      return {
        transform: 'scale(1, 1)',
        li: { opacity: 1, transition: 'opacity ease-in-out .2s .2s' },
      }
    case 'fade-down':
    case 'fade-up':
      return { ...base, transform: 'translateY(0)' }
    case 'fade':
    default:
      return base
  }
}

// Dropdown navigation styles

const common = {
  display: 'inline-block',
  background: 'var(--color-bg_header)',
  width: 'max-content',
  opacity: 0,
  visibility: 'hidden',
  margin: 0,
  padding: 0,
  zIndex: 1,
  listStyle: 'none',
  a: {
    width: '100%',
  },
  li: {
    display: 'block',
  },
}

const baseStyles = (type: string) => {
  switch (type) {
    case 'scale':
      return {
        ...base,
        transform: 'scale(1, 0)',
        transformOrigin: '0 0',
        transition: 'transform ease-in-out .25s',
        li: {
          opacity: 0,
          transition: 'opacity .03s ease-in-out',
        },
      }
    case 'fade-up':
      return { ...fade, transform: 'translateY(10px)' }
    case 'fade-down':
      return { ...fade, transform: 'translateY(-10px)' }
    case 'fade':
      return { ...fade, transform: 'translateY(0)' }
    default:
      return {}
  }
}

const rootMenu = {
  position: 'absolute',
  top: '99%',
  left: 0,
}

const nestedMenu = {
  position: 'fixed',
  height: '100%',
  left: '100%',
  top: 0,
}

export const getStyles = (isHeader: boolean, type: string, depth: number) => {
  const depthStyles = depth === 0 ? rootMenu : nestedMenu

  return isHeader
    ? merge.all([common, depthStyles, baseStyles(type)], {
        arrayMerge: (_, source, __) => source,
      })
    : {}
}

// Default dropdown caret

export const caretStyles = {
  content: '""',
  display: 'inline-block',
  width: 0,
  height: 0,
  marginLeft: '.4em',
  verticalAlign: '.25em',
  borderTop: '.25em solid',
  borderRight: '.25em solid transparent',
  borderLeft: '.25em solid transparent',
}
