import React from 'react'
import { Flex, Box } from 'theme-ui'

const Pagination = ({ variant, current, set, count }) => {
  let indicators = []

  for (let i = 0; i <= count - 1; i++) {
    indicators.push(
      <Box
        key={i}
        variant={`${variant}.page`}
        onClick={e => (i !== current ? set({ type: 'set', value: i }) : null)}
        className={`carousel-page ${current === i && 'active'}`}
        __css={{
          mx: 1,
          height: 10,
          width: 10,
          borderRadius: '50%',
          bg: 'rgba(0, 0, 0, 0.25)',
        }}
      />
    )
  }

  return (
    <Flex
      variant={`${variant}.pagination`}
      className="carousel-pagination"
      sx={{ position: 'absolute', alignItems: 'center', zIndex: 1 }}>
      {indicators}
    </Flex>
  )
}

export default Pagination
