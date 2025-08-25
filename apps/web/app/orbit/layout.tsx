import type { Metadata } from 'next'

import { InsetLayout } from '#layouts/inset-layout'
import { OrbitProvider } from '#stores/orbit-context'

export const metadata: Metadata = {
  title: 'orbit',
}

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <InsetLayout title="Orbit">
      <OrbitProvider>{children}</OrbitProvider>
    </InsetLayout>
  )
}
