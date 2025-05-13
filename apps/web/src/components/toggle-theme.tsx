'use client'

import { Button } from '@workspace/ui/components/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      size="icon"
      className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
      variant="outline"
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
    >
      <MoonIcon className="dark:-rotate-90 rotate-0 scale-100 transition-all dark:scale-0" />
      <SunIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
