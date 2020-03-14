import React, { useState } from 'react'
import { Box } from 'theme-ui'
import { useSpring, animated as a } from 'react-spring'

import { useMeasure } from './helper'

const Accordion = React.forwardRef(
  (
    {
      title,
      open = false,
      indicator = 'false',
      variant = 'accordion',
      children,
      ...props
    },
    ref
  ) => {
    const [show, set] = useState(open)
    const [bind, { height: viewHeight }] = useMeasure()

    const { height } = useSpring({
      from: { height: 0 },
      to: {
        height: show ? viewHeight : 0,
      },
    })

    return (
      <Box
        ref={ref}
        variant={variant}
        {...props}
        __css={{ border: '1px solid' }}>
        <Box
          as="button"
          variant={`${variant}.toggle`}
          onClick={() => set(!show)}
          sx={{}}>
          {title}
        </Box>
        <a.div
          style={{
            willChange: 'height',
            overflow: 'hidden',
            height,
          }}>
          <Box variant={`${variant}.content`} {...bind}>
            {children}
          </Box>
        </a.div>
      </Box>
    )
  }
)

export default Accordion
