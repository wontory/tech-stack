import type { Metadata } from 'next'

import { InsetLayout } from '#layouts/inset-layout'
import { BadgeProvider } from '#stores/badge-context'

export const metadata: Metadata = {
  title: 'badge',
}

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <InsetLayout title="Badge">
      <BadgeProvider>{children}</BadgeProvider>
    </InsetLayout>
  )
}
