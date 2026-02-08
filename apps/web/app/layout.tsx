import { SidebarInset } from '@tech-stack/ui/components/sidebar'
import type { Metadata } from 'next'

import '#styles/globals.css'
import { Providers } from '#app/providers'
import { AppSidebar } from '#components/app-sidebar'

export const metadata: Metadata = {
  title: {
    template: 'tech-stack/%s',
    default: 'tech-stack',
  },
  description:
    'Create animated SVG icons for GitHub profiles and project documentation. Generate customizable orbit animations and badges using Simple Icons library.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <AppSidebar variant="inset" />
          <SidebarInset className="md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0">
            {children}
          </SidebarInset>
        </Providers>
      </body>
    </html>
  )
}
