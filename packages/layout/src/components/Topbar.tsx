/** @jsx jsx */
import { jsx, MakerProps, ResponsiveScale } from '@maker-ui/css'
import { useEffect } from 'react'

import { MakerOptions } from '../types'
import { ErrorBoundary } from './Errors/ErrorBoundary'
import { useOptions } from '../context/OptionContext'
import { useMeasure } from '../hooks/useMeasure'
import { useLayout, useMeasurements } from '../context/LayoutContext'
import { setBreakpoint } from '../utils/helper'

interface TopbarProps extends MakerProps, React.HTMLAttributes<HTMLDivElement> {
  background?: string
  maxWidth?: ResponsiveScale
  scrollOverflow?: boolean
  sticky?: MakerOptions['topbar']['sticky']
  stickyOnMobile?: MakerOptions['topbar']['stickyOnMobile']
}

/**
 * The `Topbar` component displays content like announcements, social media icons,
 * or promotions above the page header.
 *
 * @TODO - revisit hide on mobile / sticky style conflict
 *
 * @see https://maker-ui.com/docs/layout/topbar
 */

export const Topbar = (props: TopbarProps) => {
  const { topbar, breakpoints } = useOptions()
  const [layout] = useLayout('content')
  const [bind, { height }] = useMeasure({
    observe: layout.includes('workspace'),
  })
  const { setMeasurement } = useMeasurements()

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('topbar', height)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height])

  const {
    background = 'var(--color-bg_topbar)',
    maxWidth = 'var(--maxWidth_topbar)',
    sticky = topbar.sticky,
    stickyOnMobile = topbar.stickyOnMobile,
    scrollOverflow = false,
    children,
    css,
    ...rest
  } = props

  const stickyPartial = sticky
    ? stickyOnMobile
      ? 'sticky'
      : ['relative', 'sticky']
    : !sticky && stickyOnMobile
    ? ['sticky', 'relative']
    : undefined

  return (
    <aside
      {...bind}
      id="topbar"
      breakpoints={setBreakpoint(topbar.breakpoint, breakpoints)}
      // @ts-ignore
      css={{
        background,
        top: 0,
        zIndex: 100,
        position: stickyPartial,
        display: topbar.hideOnMobile ? ['none', 'block'] : ['block'],
      }}>
      <div
        className="container"
        css={{
          margin: '0 auto',
          overflowX: scrollOverflow ? 'scroll' : null,
          whiteSpace: scrollOverflow ? 'nowrap' : null,
          maxWidth,
          ...(css as object),
        }}
        {...rest}>
        <ErrorBoundary errorKey="topbar">{children}</ErrorBoundary>
      </div>
    </aside>
  )
}

Topbar.displayName = 'Topbar'
