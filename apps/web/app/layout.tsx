import { SidebarInset } from '@tech-stack/ui/components/sidebar'

import '#styles/globals.css'
import { Providers } from '#app/providers'
import { AppSidebar } from '#components/app-sidebar'

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
