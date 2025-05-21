'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from 'react'

import { SlugsContext, SlugsProvider } from '#stores/slugs-context'

export const OrbitContext = createContext<{
  text: string
  setText: Dispatch<SetStateAction<string>>
}>({
  text: '',
  setText: () => {},
})

export function OrbitProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState('')

  return (
    <OrbitContext.Provider value={{ text, setText }}>
      <SlugsProvider>{children}</SlugsProvider>
    </OrbitContext.Provider>
  )
}

export const useOrbitState = () => {
  const orbitContext = useContext(OrbitContext)
  const slugsContext = useContext(SlugsContext)
  if (!orbitContext || !slugsContext) {
    throw new Error('useOrbitStates must be used within an OrbitProvider')
  }
  return {
    ...orbitContext,
    ...slugsContext,
  }
}
