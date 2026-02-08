'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from 'react'

type BadgeState = {
  slug: string
  setSlug: Dispatch<SetStateAction<string>>
  text: string
  setText: Dispatch<SetStateAction<string>>
  highlight: boolean
  setHighlight: Dispatch<SetStateAction<boolean>>
  textColor: string
  setTextColor: Dispatch<SetStateAction<string>>
  iconColor: string
  setIconColor: Dispatch<SetStateAction<string>>
  bgColor: string
  setBgColor: Dispatch<SetStateAction<string>>
}

const BadgeContext = createContext<BadgeState | null>(null)

export function BadgeProvider({ children }: { children: React.ReactNode }) {
  const [slug, setSlug] = useState('')
  const [text, setText] = useState('')
  const [highlight, setHighlight] = useState(false)
  const [textColor, setTextColor] = useState('000000')
  const [iconColor, setIconColor] = useState('')
  const [bgColor, setBgColor] = useState('')

  return (
    <BadgeContext.Provider
      value={{
        slug,
        setSlug,
        text,
        setText,
        highlight,
        setHighlight,
        textColor,
        setTextColor,
        iconColor,
        setIconColor,
        bgColor,
        setBgColor,
      }}
    >
      {children}
    </BadgeContext.Provider>
  )
}

export const useBadgeState = () => {
  const context = useContext(BadgeContext)
  if (!context) {
    throw new Error('useBadgeState must be used within a BadgeProvider')
  }
  return context
}
