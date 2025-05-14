import { InsetLayout } from '#layouts/inset-layout'

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <InsetLayout title="Orbit">{children}</InsetLayout>
}
