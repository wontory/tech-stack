'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from 'react'

type SlugsState = {
  slugs: string[]
  setSlugs: Dispatch<SetStateAction<string[]>>
}

export const SlugsContext = createContext<SlugsState | null>(null)

export function SlugsProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([])

  return (
    <SlugsContext.Provider value={{ slugs, setSlugs }}>
      {children}
    </SlugsContext.Provider>
  )
}

export const useSlugsState = () => {
  const context = useContext(SlugsContext)
  if (!context) {
    throw new Error('useSlugsState must be used within a SlugsProvider')
  }
  return context
}
