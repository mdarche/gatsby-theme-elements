/** @jsx jsx */
import { jsx } from '@maker-ui/css'

interface OverlayProps {
  show: boolean
  toggle: any
  bp?: number
  type?: string
}

/**
 * The `Overlay` component acts as an `onBlur` click toggle for closing the
 * SideNav or MobileMenu components on mobile.
 *
 * @internal usage only
 */

export const Overlay = ({ show, toggle }: OverlayProps) => {
  return (
    <div
      className={`menu-overlay${show ? ' active' : ''}`}
      role="button"
      onClick={toggle}
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.15)',
        zIndex: 100,
        willChange: 'opacity',
        transition: 'all ease .4s',
        visibility: 'hidden',
        opacity: 0,
        '&.active': {
          visibility: 'visible',
          opacity: 1,
        },
      }}
    />
  )
}

Overlay.displayName = 'Overlay'
