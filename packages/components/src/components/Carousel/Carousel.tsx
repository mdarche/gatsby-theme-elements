import * as React from 'react'
import {
  Div,
  MakerProps,
  ResponsiveScale,
  mergeSelector,
  useMeasure,
} from 'maker-ui'
import { animated, useSprings, SpringConfig } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import merge from 'deepmerge'

import { clamp } from '../helper'

import { NavArrows } from './NavArrows'
import { Pagination, Position } from './Pagination'

export interface CarouselProps extends MakerProps {
  data: Object[]
  template: React.ReactElement
  height?: ResponsiveScale
  className?: string
  settings?: {
    autoPlay?: boolean
    arrows?: boolean
    arrowPadding?: ResponsiveScale
    dots?: boolean
    dotPosition?: Position
    dotPadding?: ResponsiveScale
    dotSpacing?: ResponsiveScale
    dotColorActive?: string
    dotColorMuted?: string
    infiniteScroll?: boolean
    duration?: number // milliseconds
    spinner?: React.ReactElement
    arrow?:
      | React.ReactElement
      | { prev?: React.ReactElement; next?: React.ReactElement }
    transition?: 'fade' | 'slide' | 'scale'
    fadeDuration?: number // seconds
    springConfig?: SpringConfig
  }
}

const AnimatedDiv = animated(Div)

/**
 * Use the `Carousel` component to iterate over an array of data objects or React components
 * to show an animated carousel.
 *
 * @link https://maker-ui.com/docs/components/carousel
 */

export const Carousel = ({
  data = [],
  template,
  settings = {},
  height = 500,
  className,
  css,
  ...rest
}: CarouselProps) => {
  const index = React.useRef(0)
  const carouselRef = React.useRef<any>(null)
  const [active, setActive] = React.useState(0)
  const [isPaused, setPause] = React.useState(false)
  const [, { width }] = useMeasure({ ref: carouselRef })

  /**
   * Merge user settings with defaults (bottom of file)
   */
  const {
    infiniteScroll,
    autoPlay,
    duration,
    arrows,
    arrow,
    arrowPadding,
    dots,
    dotPosition,
    dotPadding,
    dotSpacing,
    dotColorMuted,
    dotColorActive,
    transition,
    fadeDuration,
    springConfig,
  } = mergeSettings(settings)

  /**
   * React-spring slide animation
   */
  const [props, set] = useSprings(
    data.length,
    i => ({
      x: i * (width === 0 ? window.innerWidth : width),
      scale: 1,
      config: springConfig,
    }),
    [width]
  )

  /**
   * Handle drag and swipe gestures
   */
  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (down && distance > width / 2) {
        cancel(
          // @ts-ignore
          (index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            data.length - 1
          ))
        )
      }

      if (index.current > data.length - 1) {
        setActive(index.current % data.length)
      } else if (index.current < 0) {
        setActive(data.length + (index.current % data.length))
      } else {
        setActive(index.current)
      }

      set(i => {
        if (i < index.current - 1 || i > index.current + 1) {
          return { display: 'none' }
        }

        const x = (i - index.current) * width + (down ? mx : 0)
        const scale = down ? 1 - distance / width / 2 : 1
        return { x, scale }
      })
    }
  )

  /**
   * Handle external navigation from arrow buttons
   */
  const navigate = React.useCallback(
    (type: 'next' | 'previous' | 'index', idx?: number) => {
      const isFirst = index.current === 0 ? true : false
      const isLast = index.current === data.length - 1 ? true : false
      const nextIndex = type === 'next' ? index.current + 1 : index.current - 1

      function update() {
        set(i => ({
          x: (i - index.current) * width,
          scale: 1,
        }))
      }

      /**
       * Handle page indicator buttons that select a specific slide index
       */
      if (type === 'index' && idx) {
        index.current = idx
        setActive(idx)
        update()
        return
      }

      /**
       * Handle infiniteScroll if user navigates beyond the array bounds
       */
      if (infiniteScroll) {
        if (type === 'next' && isLast) {
          index.current = 0
          setActive(0)
          return update()
        }

        if (type === 'previous' && isFirst) {
          index.current = data.length - 1
          setActive(data.length - 1)
          return update()
        }
      } else {
        /**
         * Simulate a bouncing / deflection drag gesture
         */
        if ((type === 'next' && isLast) || (type === 'previous' && isFirst)) {
          set(i => ({
            x: (i - index.current) * width - (type === 'next' ? 100 : -100),
          }))
          setTimeout(() => update(), 200)
          return
        }
      }

      index.current = nextIndex
      setActive(nextIndex)
      update()
    },
    [data.length, set, infiniteScroll, width]
  )

  /**
   * Pause the autoPlay slide transition
   */
  React.useEffect(() => {
    if (autoPlay && !isPaused) {
      const auto = setTimeout(() => {
        navigate('next')
      }, duration)

      return () => clearTimeout(auto)
    }
  }, [isPaused, navigate, active, autoPlay, duration])

  /**
   * Pause the autoPlay slide transition
   */
  const pause = React.useCallback(() => setPause(true), [])

  /**
   * Resume the autoPlay slide transition and reset counter
   */
  const resume = React.useCallback(() => setPause(false), [])

  /**
   * Handle pause on focus
   */
  React.useEffect(() => {
    const ref = carouselRef.current

    if (autoPlay) {
      ref?.addEventListener(`focusin`, pause)
      ref?.addEventListener(`focusout`, resume)
    }

    return () => {
      ref?.removeEventListener(`focusin`, pause)
      ref?.removeEventListener(`focusout`, resume)
    }
  }, [pause, resume, autoPlay])

  return (
    <Div
      ref={carouselRef}
      onMouseEnter={autoPlay ? pause : undefined}
      onMouseLeave={autoPlay ? resume : undefined}
      className={mergeSelector('carousel', className)}
      css={{
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        zIndex: 0,
        height,
        ...(css as object),
        button: {
          zIndex: 100,
        },
      }}
      {...rest}>
      <Div className="slide-container">
        {props.map(({ x, scale }, i) => (
          <AnimatedDiv
            className={`slide${active === i ? ' active' : ''}`}
            {...bind()}
            key={i}
            style={
              {
                opacity: transition === 'fade' && active === i && 1,
                x: transition !== 'fade' && x,
              } as object
            }
            css={{
              position: 'absolute',
              display: 'block',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              willChange: 'transform',
              opacity: transition === 'fade' ? 0 : undefined,
              transition:
                transition === 'fade'
                  ? `opacity ${fadeDuration}s ease-in-out`
                  : undefined,
            }}>
            <AnimatedDiv
              className="slide-inner"
              style={
                {
                  scale: transition === 'scale' && scale,
                } as object
              }
              css={{
                height: '100%',
                width: '100%',
                willChange: 'transform',
              }}>
              {React.cloneElement(template, data[i])}
            </AnimatedDiv>
          </AnimatedDiv>
        ))}
      </Div>

      {arrows ? (
        <NavArrows
          navigate={navigate}
          arrow={arrow}
          arrowPadding={arrowPadding}
        />
      ) : null}
      {dots ? (
        <Pagination
          navigate={navigate}
          current={active}
          count={data.length}
          settings={{
            dotPadding,
            dotSpacing,
            dotPosition: dotPosition as Position,
            mutedColor: dotColorMuted,
            activeColor: dotColorActive,
          }}
        />
      ) : null}
    </Div>
  )
}

Carousel.displayName = 'Carousel'

/**
 * Utility that merges user settings with `Carousel` defaults.
 */

function mergeSettings(settings: CarouselProps['settings']) {
  return merge(
    {
      autoPlay: false,
      arrows: true,
      arrowPadding: 30,
      dots: true,
      dotPosition: 'bottom',
      dotPadding: 30,
      dotSpacing: 10,
      dotColorMuted: 'rgba(0, 0, 0, 0.25)',
      dotColorActive: 'red',
      infiniteScroll: false,
      hideControls: false,
      arrow: undefined,
      showControlsOnHover: false,
      duration: 6500,
      transition: 'slide',
      fadeDuration: 0.5,
      springConfig: { mass: 1, tension: 160, friction: 28 },
    },
    settings as object
  )
}
