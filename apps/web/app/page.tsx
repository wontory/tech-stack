import { Introduction } from '#components/introduction'
import { SectionCards } from '#components/section-cards'
import { InsetLayout } from '#layouts/inset-layout'

export default function Page() {
  return (
    <InsetLayout title="Home">
      <SectionCards />
      <Introduction />
    </InsetLayout>
  )
}
