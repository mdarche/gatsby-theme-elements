import * as React from 'react'
import { MakerOptions } from 'maker-ui'
import Link from 'next/link'

export const options: MakerOptions = {
  header: {
    navType: 'basic',
    sticky: true,
    stickyOnMobile: true,
    dropdown: {
      transition: 'fade-down',
    },
    bpIndex: 0,
  },
  linkFunction: (path, children, attributes) => (
    <Link href={path}>
      <a {...attributes}>{children}</a>
    </Link>
  ),
}
