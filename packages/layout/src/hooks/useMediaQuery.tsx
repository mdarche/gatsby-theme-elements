import { useOptions } from '../context/OptionContext'
import { format } from '../utils/helper'
import merge from 'deepmerge'

type LayoutKey =
  | 'topbar'
  | 'header'
  | 'mobileMenu'
  | 'sideNav'
  | 'sidebar'
  | 'content'
  | 'workspace'

export const useMediaQuery = (type?: LayoutKey) => {
  const options = useOptions()

  /**
   * @param {string} att - the target css attribute
   * @param {array} values - an array of responsive values
   * @param {string | number} bp - index of the theme's `breakpoints` array where the
   * mobile style rule should begin or a specific breakpoint
   * @param {array} bpArray - an optional / alternate set of breakpoints
   * */

  function mediaQuery(
    att: string,
    values: number[] | string[] | (number | string)[],
    breakpoint?: string | number,
    bpArray?: number[] | string[] | (number | string)[]
  ) {
    let bp = breakpoint
    const mqs = bpArray || options.breakpoints

    if (bp === undefined && type) {
      bp = options[type]['bpIndex']
    }

    let styles = {}
    styles[att] = values[0]

    if (typeof bp === 'string') {
      /** Handle specific breakpoint */
      styles[`@media (min-width: ${bp})`] = { [att]: format(values[1]) }
    } else {
      /** Handle breakpoint array */
      let i = 0
      while (i < values.length - 1) {
        styles[`@media (min-width: ${format(mqs[bp + i])})`] = {
          [att]: values[i + 1],
        }
        i++
      }
    }
    return styles
  }

  /**
   * @param {object} css - an Emotion CSS object
   * @todo create a type for this
   * */

  function parseStyles(
    css: any | object = {},
    breakpoints?: (string | number)[]
  ) {
    let output = {}

    const bps = breakpoints ? breakpoints : options.breakpoints

    for (const [key, value] of Object.entries(css)) {
      let styles = {}

      if (Array.isArray(value)) {
        styles[key] = value[0]
        let i = 0
        while (i < value.length - 1) {
          styles[`@media (min-width: ${format(bps[i])})`] = {
            [key]: value[i + 1],
          }
          i++
        }
        output = merge(styles, output)
      } else {
        output[key] = value
      }
    }
    return output
  }

  return { mediaQuery, parseStyles }
}
