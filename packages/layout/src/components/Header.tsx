/** @jsx jsx */
import { jsx, MakerProps } from '@maker-ui/css'
import { useEffect, useState } from 'react'

import { ErrorBoundary } from './Errors'
import { useOptions } from '../context/OptionContext'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { useMeasure } from '../hooks/useMeasure'
import { useLayout, useMeasurements } from '../context/LayoutContext'
import { setBreakpoint } from '../utils/helper'

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement>, MakerProps {
  background?: string | string[]
  sticky?: boolean
  stickyOnMobile?: boolean
  stickyUpScroll?: boolean
}

/**
 * The `Header` component stores your site logo, primary menu, mobile menu,
 * and any necessary navigation elements.
 *
 * @see https://maker-ui.com/docs/layout/header
 */

export const Header = (props: HeaderProps) => {
  const [scrollClass, setScrollClass] = useState('')
  const [initialRender, setInitialRender] = useState(true)
  const [show, setShow] = useState(true)
  const [layout] = useLayout('content')
  const { measurements, setMeasurement } = useMeasurements()
  const { framework, header, topbar, breakpoints } = useOptions()
  const activateScrollClass = header.scrollClass ? true : false

  const [bind, { height }] = useMeasure({
    observe: layout.includes('workspace'),
  })

  useEffect(() => {
    if (height !== 0) {
      setMeasurement('header', height)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height])

  useEffect(() => {
    setInitialRender(false)
  }, [])

  const {
    background = 'var(--color-bg_header)',
    sticky = header.sticky,
    stickyOnMobile = header.stickyOnMobile,
    stickyUpScroll = header.stickyUpScroll,
    children,
    css,
    ...rest
  } = props

  /**
   * Fire hook effect if stickyUpScroll === true
   */
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isDownScroll = currPos > prevPos
      const aboveLimit = currPos > 500

      if (!aboveLimit && !show) {
        setShow(true)
      }

      if (aboveLimit && isDownScroll && show) {
        setShow(false)
      }

      if (aboveLimit && !isDownScroll && !show) {
        setShow(true)
      }
    },
    350,
    stickyUpScroll
  )

  /**
   * Fire hook effect if header.scroll.toggleClass === true
   */
  useScrollPosition(
    ({ currPos }) => {
      if (activateScrollClass) {
        const { scrollTop, className } = header.scrollClass
        const isActive = currPos > scrollTop ? className : ''

        if (isActive !== scrollClass) {
          setScrollClass(isActive)
        }
      }
    },
    0,
    activateScrollClass
  )

  /**
   * Calculate responsive top value according to topbar.sticky configuration
   */
  const calculateTop = () => {
    if (topbar.sticky && !topbar.stickyOnMobile) {
      return [0, measurements.height_topbar]
    }

    if (topbar.sticky && topbar.stickyOnMobile) {
      return measurements.height_topbar
    }

    if (!topbar.sticky && topbar.stickyOnMobile) {
      return [measurements.height_topbar, 0]
    }

    return 0
  }

  /**
   * Calculate responsive header styles for header.sticky configurations
   */

  const stickyPartial = (): object => {
    if (stickyUpScroll) {
      return {
        position: 'sticky',
        top: calculateTop(),
        transition: 'transform .3s ease-in',
        '&.scroll-active': {
          transform: 'translateY(-100%)',
        },
      }
    }

    if (sticky) {
      return {
        top: calculateTop(),
        position: stickyOnMobile ? ['sticky'] : ['initial', 'sticky'],
      }
    }

    if (!sticky && stickyOnMobile) {
      return {
        top: calculateTop(),
        position: ['sticky', 'initial'],
      }
    }

    return { position: 'relative' }
  }

  return (
    <header
      {...bind}
      id="site-header"
      className={`${scrollClass}${
        stickyUpScroll && !show ? ' scroll-active' : ''
      }`}
      role="banner"
      breakpoints={setBreakpoint(header.breakpoint, breakpoints)}
      css={{
        background,
        zIndex: 100,
        visibility: framework === 'gatsby' && initialRender && ['hidden'],
        ...stickyPartial(),
        ...(css as object),
      }}
      {...rest}>
      <ErrorBoundary errorKey="header">{children}</ErrorBoundary>
    </header>
  )
}

Header.displayName = 'Header'
