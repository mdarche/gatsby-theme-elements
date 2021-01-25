/** @jsx jsx */
import { jsx } from '@maker-ui/css'
import { Link } from '@maker-ui/primitives'
import { Fragment, useState, memo, isValidElement } from 'react'

import { useOptions } from '../../context/OptionContext'
import { ExpandButton } from './ExpandButton'
import {
  caretStyles,
  dropdownStyles,
  getStyles,
} from '../../utils/styles-submenu'
import { MakerOptions } from '../../types'

export interface MenuProps {
  label: string
  path: string
  classes?: string
  icon?: React.ReactElement
  newTab?: boolean
  submenu?: MenuProps[]
  openNested?: boolean
}

interface MenuItemProps {
  data: MenuProps
  caret?: MakerOptions['header']['dropdown']['caret']
  menuControls?: any
  pathname?: string
  isHeader?: boolean
  linkFunction?: MakerOptions['linkFunction']
  depth?: number
}

/**
 * Returns a menu item and nested children for `NavMenu` or `CollapsibleMenu`
 * components. This component uses recursion to create nested menus.
 *
 * @internal usage only
 *
 */

export const MenuItem = memo(
  ({
    data: {
      label,
      path,
      newTab,
      submenu,
      openNested = false,
      classes = '',
      icon,
    },
    caret = false,
    menuControls,
    pathname,
    isHeader = false,
    linkFunction,
    depth = 0,
  }: MenuItemProps) => {
    const { header } = useOptions()
    const [showNested, setNested] = useState(openNested)
    const submenuClass: string = `submenu depth-${depth}`

    const attributes = {
      className: pathname === path ? 'current' : undefined,
      target: newTab && '_blank',
      rel: newTab && 'noopener noreferrer',
      'aria-label': icon && label,
      'aria-haspopup': submenu && 'true',
      'aria-current': pathname === path && 'page',
      ...menuControls,
    }

    return (
      <li
        className={`menu-item${classes && ' ' + classes}`}
        css={
          isHeader && {
            position: 'relative',
            display: 'inline-flex',
            '&:focus-within > .submenu, &:hover > .submenu': {
              ...dropdownStyles(header.dropdown.transition),
            },
            '> a .menu-text:after':
              submenu && caret === 'default' && caretStyles,
          }
        }>
        {linkFunction ? (
          linkFunction(path, label, attributes, icon)
        ) : (
          <Link href={path} {...attributes}>
            {icon ? <span className="menu-icon">{icon}</span> : undefined}
            <span className="menu-text">{label}</span>
            {submenu && caret && isValidElement(caret) ? caret : null}
          </Link>
        )}
        {submenu && (
          <Fragment>
            {!isHeader && <ExpandButton set={setNested} show={showNested} />}
            {isHeader || (!isHeader && showNested) ? (
              <ul
                className={submenuClass}
                role="menu"
                aria-label="submenu"
                css={{
                  ...getStyles(isHeader, header.dropdown.transition, depth),
                }}>
                {submenu.map((item, index) => (
                  <MenuItem
                    key={index}
                    data={item}
                    caret={caret}
                    menuControls={menuControls}
                    pathname={pathname}
                    isHeader={isHeader}
                    depth={depth + 1}
                  />
                ))}
              </ul>
            ) : null}
          </Fragment>
        )}
      </li>
    )
  }
)

MenuItem.displayName = 'MenuItem'
