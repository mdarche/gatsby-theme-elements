import * as React from 'react'
import { Link } from '@maker-ui/primitives'

import { useOptions } from '../../context/OptionContext'

/**
 * The `Logo` is used by `Navbar` to show a custom logo wrapped in a link to
 * the site's index page.
 *
 * @internal usage only
 */

export const Logo = ({ children }): React.ReactElement => {
  const { linkFunction } = useOptions()

  const attributes = {
    id: 'site-logo',
    'aria-label': 'Home page',
  }

  return linkFunction ? (
    linkFunction('/', children, attributes)
  ) : (
    <Link href="/" {...attributes} css={{ display: 'inline-flex' }}>
      {children}
    </Link>
  )
}

Logo.displayName = 'Logo'
