import { SidebarInset } from '@workspace/ui/components/sidebar'

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
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </Providers>
      </body>
    </html>
  )
}
