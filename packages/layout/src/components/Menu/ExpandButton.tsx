import * as React from 'react'
import { Button, SVG } from '@maker-ui/primitives'

interface ExpandButtonProps {
  show: boolean
  set: (show: boolean) => void
}

/**
 * The `ExpandButton` is used in collapsible menus to open or close the
 * next group of nested menu items.
 *
 * @internal usage only
 *
 */

export const ExpandButton = ({ show, set }: ExpandButtonProps) => {
  return (
    <Button
      title="Expand Section"
      className="submenu-toggle"
      aria-expanded={show ? 'true' : 'false'}
      aria-label="Expand Section"
      onClick={() => set(!show)}
      css={{ border: 'none', background: 'transparent' }}>
      <SVG
        viewBox="0 0 16 16"
        width="12"
        height="12"
        css={{
          transition: 'transform ease .2s',
          transformOrigin: '50% 55%',
          transform: show ? 'rotate(180deg)' : null,
        }}>
        <path
          stroke="currentcolor"
          strokeWidth="2"
          fill="none"
          d="M14 6 L8 12 L2 6"
        />
      </SVG>
    </Button>
  )
}

ExpandButton.displayName = 'ExpandButton'
