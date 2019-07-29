import React, { useState, useContext, useMemo } from "react"
import { errorCheck } from "../utils/helper"

// Measure Context Provider

const MeasureContext = React.createContext()

const MeasureContextProvider = ({ children }) => {
  const [metrics, measure] = useState({
    topbarHeight: 0,
    headerHeight: 0,
    sideNavWidth: 0,
    viewportX: 0,
    viewportY: 0,
  })

  const value = useMemo(() => {
    return { metrics, measure }
  }, [metrics])

  return (
    <MeasureContext.Provider value={value}>{children}</MeasureContext.Provider>
  )
}

// Usage Hooks

function useMeasurements() {
  const { metrics } = useContext(MeasureContext)
  errorCheck("useMeasurements", metrics, "MeasureContextProvider")

  return metrics
}

function measure() {
  const { measure } = useContext(MeasureContext)
  errorCheck("measure", measure)

  function setTopbarHeight(height) {
    measure(metrics => ({
      ...metrics,
      topbarHeight: height,
    }))
  }

  function setHeaderHeight(height) {
    measure(metrics => ({
      ...metrics,
      headerHeight: height,
    }))
  }

  function setSideNavWidth(width) {
    measure(metrics => ({
      ...metrics,
      sideNavWidth: width,
    }))
  }

  function setViewportXY([x, y]) {
    measure(metrics => ({
      ...metrics,
      viewportX: x,
      viewportY: y,
    }))
  }

  return { setTopbarHeight, setViewportXY, setHeaderHeight, setSideNavWidth }
}

export { MeasureContextProvider, useMeasurements, measure }
