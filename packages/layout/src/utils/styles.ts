import { GlobalProps } from '@emotion/react'

export const globalStyles: GlobalProps['styles'] = {
  '*': {
    boxSizing: 'border-box',
  },
  body: {
    margin: 0,
    fontFamily: 'var(--font-body)',
    color: 'var(--color-text)',
    backgroundColor: 'var(--color-background)',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: 'var(--font-heading)',
  },
  'code, pre': {
    fontFamily: 'var(--font-monospace)',
  },
  'b, strong': {
    fontWeight: 'bold',
  },
  a: {
    color: 'var(--color-link)',
    '&:hover': {
      color: 'var(--color-link_hover)',
    },
  },
}

// Optional normalize
// Optional scaling & responsive width
