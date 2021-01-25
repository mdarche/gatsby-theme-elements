import { useOptions } from '../context/OptionContext'
import { useMenu, useSideNav } from '../context/ActionContext'

export function useMakerUI() {
  const options = useOptions()

  return {
    options,
    useMenu,
    useSideNav,
  }
}
