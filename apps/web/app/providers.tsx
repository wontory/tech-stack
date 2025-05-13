'use client'

import { SidebarProvider } from '@workspace/ui/components/sidebar'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <SidebarProvider>{children}</SidebarProvider>
    </NextThemesProvider>
  )
}
