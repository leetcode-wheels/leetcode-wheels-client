import * as React from 'react'

import GlobalSearch from '@/components/global-search'
import useGlobalSearch, { UseGlobalSearchData } from '@/hooks/useGlobalSearch'

export type GlobalSearchContextData = UseGlobalSearchData

const globalSearchContextDefaultValues: GlobalSearchContextData = {
  commands: [],
  filteredCommands: [],
  query: '',
  open: false,
  activeCommandIndex: -1,
  triggerOpen: () => null,
  triggerClose: () => null,
  type: () => null,
}

export const GlobalSearchContext = React.createContext<GlobalSearchContextData>(
  globalSearchContextDefaultValues
)

export type GlobalSearchProviderProps = JSX.IntrinsicElements['div']

const GlobalSearchProvider: React.FC<GlobalSearchProviderProps> = ({
  children,
}) => {
  const globalSearchProps = useGlobalSearch()

  return (
    <GlobalSearchContext.Provider value={globalSearchProps}>
      {children}
      <GlobalSearch {...globalSearchProps} />
    </GlobalSearchContext.Provider>
  )
}
export default GlobalSearchProvider
