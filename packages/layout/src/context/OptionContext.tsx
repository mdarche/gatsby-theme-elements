import * as React from 'react'
import merge from 'deepmerge'

import { MakerOptions } from '../types'
import { defaultOptions } from '../options'

export const OptionContext = React.createContext(null)
const OptionUpdateContext = React.createContext(null)

interface OptionProviderProps {
  options: MakerOptions
  children: React.ReactNode
}

/**
 * The `OptionProvider` stores all of Maker UI's client-facing
 * configurations.
 *
 * @internal usage only
 */

const OptionProvider = ({ options = {}, children }: OptionProviderProps) => {
  const [state, dispatch] = React.useState<MakerOptions>(
    merge(defaultOptions, options, {
      arrayMerge: (_, source, __) => source,
    })
  )

  return (
    <OptionContext.Provider value={state}>
      <OptionUpdateContext.Provider value={dispatch}>
        {children}
      </OptionUpdateContext.Provider>
    </OptionContext.Provider>
  )
}

/**
 * Retrieves the current Maker UI options configuration.
 *
 * @see https://maker-ui.com/hooks/#useOptions
 */

function useOptions(): MakerOptions {
  const options: MakerOptions = React.useContext(OptionContext)

  if (options === undefined) {
    throw new Error(
      'useOptions must be used within an Maker UI Layout component'
    )
  }

  return options
}

/**
 * Allows you to update the current Maker UI options configuration.
 *
 * @see https://maker-ui.com/hooks/#useOptionsUpdater
 */

function useOptionsUpdater(): React.Dispatch<
  React.SetStateAction<MakerOptions>
> {
  const dispatch = React.useContext(OptionUpdateContext)

  if (dispatch === undefined) {
    throw new Error(
      'useOptionsUpdater must be used within an Maker UI Layout component'
    )
  }

  function setOptions(options: Partial<MakerOptions>) {
    dispatch(state => merge(state, options))
  }

  return setOptions
}

export { OptionProvider, useOptions, useOptionsUpdater }
