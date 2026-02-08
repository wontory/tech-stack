import { BadgeCustomize } from '#components/badge-customize'
import { BadgePreview } from '#components/badge-preview'

export default function Page() {
  return (
    <div className="grid @5xl/main:grid-cols-2 grid-cols-1 gap-4 px-4 lg:px-6">
      <BadgePreview />
      <BadgeCustomize />
    </div>
  )
}
