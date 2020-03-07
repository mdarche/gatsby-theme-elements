import React from 'react'
import { Box, Grid } from 'theme-ui'
import { Generate, BoxG, ImageG } from '@elements-ui/generative'

// Example 1 - Random grid items

const data = [
  { text: '1' },
  { text: '2' },
  { text: '3' },
  { text: '4' },
  { text: '5' },
  { text: '6' },
  { text: '7' },
  { text: '8' },
]

const Card = ({ text }) => (
  <Box
    sx={{
      textAlign: 'center',
      p: 40,
      fontSize: 5,
      bg: '#f7f7f7',
      border: '1px solid',
    }}>
    {text}
  </Box>
)

// Example 2 - Random components

const Component1 = () => <Box sx={{ bg: '#ffd2a4' }}>Custom Component 1</Box>
const Component2 = () => <Box sx={{ bg: '#d3d3ff' }}>Custom Component 2</Box>
const Component3 = () => <Box sx={{ bg: '#aaffaa' }}>Custom Component 3</Box>

const componentData = [<Component1 />, <Component2 />, <Component3 />]

// Example 3 - Random image

const imageData = [
  {
    url:
      'https://images.unsplash.com/photo-1583468323330-9032ad490fed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80',
    alt: 'flower',
  },
  {
    url:
      'https://images.unsplash.com/photo-1583549323543-7ae855a78d6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    alt: 'Food',
  },
  {
    url:
      'https://images.unsplash.com/photo-1583384991428-d3dca43177f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    alt: 'dunes',
  },
]

// Example 4 - Random style object

const styles = {
  fontFamily: ['body', 'serif', 'monospace'],
  color: ['tomato', 'green', 'violet'],
  bg: ['#ffc4c4', '#cac4ff', '#c4fffa'],
  p: [30, 50, 120],
  fontSize: [18, 25, 36],
  borderRadius: [0, 10, 5],
}

const GenerativePage = () => (
  <React.Fragment>
    <h2>Example 1</h2>
    <Grid gap="30px" columns={[2, 4]}>
      <Generate data={data}>
        <Card />
      </Generate>
    </Grid>
    <h2>Example 2</h2>
    <Grid
      gap="30px"
      columns={[1, 3]}
      sx={{ my: 80, textAlign: 'center', div: { p: 20 } }}>
      <Generate data={componentData} />
    </Grid>
    <h2>Example 3</h2>
    <ImageG src={imageData} />
    <h2>Example 4</h2>
    <BoxG
      styles={styles}
      sx={{ display: 'inline-flex', justifyContent: 'center' }}>
      My styles are randomly generated on each component mount
    </BoxG>
  </React.Fragment>
)

export default GenerativePage
