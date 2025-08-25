import type { Metadata } from 'next'

import { InsetLayout } from '#layouts/inset-layout'

export const metadata: Metadata = {
  title: 'badge',
}

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <InsetLayout title="Badge">{children}</InsetLayout>
}
