import { useRef, useEffect, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export interface MeasureProps {
  observe?: boolean
  contentRect?: boolean
  externalRef?: React.MutableRefObject<any>
  documentResize?: boolean
  timeout?: number
}

export interface MeasureState {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
  documentTop: number
}

/**
 * A browser hook that binds a Resize Observer to the specified React Node and returns either
 * its `contentRect` or `getClientBoundingRect()` properties.
 *
 * @param observe - Boolean that determines whether the hook should connect the Resize Observer
 * @param contentRect - Boolean that returns the node's content rect if true, otherwise it will
 * calculate getClientBoundingRect()
 * @param externalRef - If you can't bind the output ref to your component, you can also supply
 * another React ref object to make the size calculations.
 * @param documentResize - Boolean that recalculates the measurements of a ref when the document
 * body (window) is resized
 * @param timeout - Number in milliseconds that defers the initial ref measurement.
 * Useful if a parent container has a mounting animation like the `PageTransition`.
 *
 * @todo rename `externalRef` to ref -- less confusing
 *
 * @see https://maker-ui.com/docs/hooks/#useMeasure
 *
 */
export function useMeasure(
  props?: MeasureProps
): [{ ref: React.MutableRefObject<any> }, MeasureState] {
  const observe = props?.observe || true
  const contentRect = props?.contentRect || false
  const externalRef = props?.externalRef
  const documentResize = props?.documentResize
  const timeout = props?.timeout || 0

  const localRef = useRef(null)
  const ref = externalRef || localRef

  const [bounds, set] = useState<MeasureState>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    documentTop: 0,
  })

  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]) => {
        const { top, bottom, left, right, width, height } = documentResize
          ? ref.current.getBoundingClientRect()
          : contentRect
          ? entry.contentRect
          : entry.target.getBoundingClientRect()
        const documentTop = top + document.documentElement.scrollTop
        set({ top, bottom, left, right, width, height, documentTop })
      })
  )

  useEffect(() => {
    if (observe) {
      if (ref.current) {
        setTimeout(() => {
          ro.observe(
            documentResize ? document.querySelector('body') : ref.current
          )
        }, timeout)
      }
      return () => ro.disconnect()
    }
  }, [observe, ref, ro, documentResize, timeout])
  return [{ ref }, bounds]
}
