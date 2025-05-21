'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from 'react'

export const SlugsContext = createContext<{
  slugs: string[]
  setSlugs: Dispatch<SetStateAction<string[]>>
}>({
  slugs: [],
  setSlugs: () => {},
})

export function SlugsProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([])

  return (
    <SlugsContext.Provider value={{ slugs, setSlugs }}>
      {children}
    </SlugsContext.Provider>
  )
}

export const useSlugsState = () => {
  const slugsContext = useContext(SlugsContext)
  if (!slugsContext) {
    throw new Error('useSlugsState must be used within a SlugsProvider')
  }
  return slugsContext
}
