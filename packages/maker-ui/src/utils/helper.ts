import * as React from 'react'
import { SxStyleProp } from 'theme-ui'

import { transitionTypes } from '../utils/constants'

/**
 * Utility for adding pixel value to numbers for transitions and animations
 */

export const format = value => (isNaN(value) ? value : `${value}px`)

/**
 * Utility for mobile nav transitions that require a full-width window
 */

export const fullWidth = ['fade', 'fade-up', 'fade-down']

/**
 * Uses the nav's settings to build the appropriate transition and position.
 *
 * @param active - a boolean that determines whether or not the menu is active
 * @param type - the transition style (string)
 * @param width - the mobile menu's width specificed in the options configuration
 */

export const getTransition = (
  active: boolean,
  type: typeof transitionTypes[number],
  width: any
): React.CSSProperties => {
  const opacity = type.includes('fade') ? (active ? 1 : 0) : 1
  const visibility = active ? 'visible' : 'hidden'

  const directionX = type.includes('right')
    ? { right: 0, width, transform: active ? null : 'translateX(100%)' }
    : { left: 0, width, transform: active ? null : 'translateX(-100%)' }

  const directionY = () => {
    if (type !== 'fade') {
      const sign = type === 'fade-up' ? '' : '-'
      return { transform: !active ? `translateY(${sign}20px)` : null }
    }
    return null
  }

  const size = fullWidth.includes(type)
    ? { width: '100%', left: 0, ...directionY() }
    : directionX

  return {
    opacity,
    visibility,
    ...size,
  }
}

/**
 * Returns a randomly generated alphanumeric ID.
 *
 * @internal usage only
 *
 */

export function generateId(length: number = 5): string {
  let result = ''
  let chars = 'abcdefghijklmnopqrstuv1234567890'
  let charLength = chars.length

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength))
  }

  return result
}

/**
 * Returns a responsive array that adds `null` to all indices before the style rule begins.
 *
 * This function is used internally for layout and Maker UI components
 *
 * @param index - The theme's `breakpoints` array where the style rule should begin
 * @param array - The original responsive style array
 *
 */

export function setBreakpoint(index: number, arr: any[]): SxStyleProp {
  let i = 0

  while (i < index) {
    arr.unshift(null)
    i++
  }

  return arr
}

export function validate(obj) {
  return obj !== undefined && typeof obj === 'object' ? obj : {}
}
