/**
 * Loosely based on n8tb1t's https://github.com/n8tb1t/use-scroll-position
 */

import { useRef, useEffect } from 'react'

const isBrowser = typeof window !== 'undefined'

function getScrollPosition(): number {
  if (!isBrowser) return 0
  const position = document.body.getBoundingClientRect()

  return Math.abs(position.top)
}

/**
 * A browser hook that returns the user's current and previous scroll position via callback
 *
 * @param effect - A callback function that shows the user's previous and current positions
 * @param wait - The timeout delay for obtaining new position values
 * @param active - A boolean that determines if the effect should be run
 *
 * @see https://maker-ui.com/docs/hooks/#useScrollPosition
 *
 */
export function useScrollPosition(
  effect: (props: { prevPos: number; currPos: number }) => void,
  wait: number,
  active: boolean
): void {
  const position = useRef(getScrollPosition())

  useEffect(() => {
    /**
     * Exit if run on server or if the effect is not active
     */
    if (!active || !isBrowser) return

    let throttleTimeout = null

    const callBack = () => {
      const currPos = getScrollPosition()
      effect({ prevPos: position.current, currPos })
      position.current = currPos
      throttleTimeout = null
    }

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [effect, wait, active])
}
