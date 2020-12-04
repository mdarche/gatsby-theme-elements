import * as React from 'react'
import { useThemeUI } from 'theme-ui'

import { Button } from '../Primitives'
import { MakerOptions } from '../types'
import { useOptions } from '../../context/OptionContext'
import { setBreakpoint } from '../../utils/helper'

interface ColorButtonProps {
  customButton?: MakerOptions['header']['colorButton']
}

/**
 * The `ColorButton` is used by `Navbar` to show the current color mode and let you toggle
 * to other color presets. You can also use this button anywhere within your layout.
 *
 * @see https://maker-ui.com/docs/layout/buttons/#colorButton
 */

export const ColorButton = ({ customButton }: ColorButtonProps) => {
  const { theme, colorMode, setColorMode } = useThemeUI()
  const { header } = useOptions()

  const modes: string[] = theme.colors.modes
    ? [theme.initialColorModeName].concat(Object.keys(theme.colors.modes))
    : [theme.initialColorModeName]

  const cycleMode = (): void => {
    const i = modes.indexOf(colorMode)
    const next = modes[(i + 1) % modes.length]

    setColorMode(next)
  }

  const attributes = {
    title: 'Color Mode',
    className: 'color-button',
    'aria-label': 'Toggle Color Mode',
    onClick: cycleMode,
  }

  // Use custom button from props or check header options
  const colorButton = customButton || header.colorButton

  if (modes.length === 1) {
    return null
  }

  if (header.showColorButton) {
    return typeof colorButton === 'function' ? (
      colorButton(colorMode, attributes)
    ) : (
      <Button
        {...attributes}
        variant="header.colorButton"
        sx={{
          display: header.hideColorButtonOnMobile
            ? setBreakpoint(header.bpIndex, ['none', 'block'])
            : 'block',
        }}>
        {colorButton || colorMode}
      </Button>
    )
  }
  return null
}

ColorButton.displayName = 'ColorButton'
