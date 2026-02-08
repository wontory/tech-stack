'use client'

import { Preview } from '#components/preview'
import { useBadgeState } from '#stores/badge-context'
import { constructBadgeUrl } from '#utils/construct-badge-url'

export function BadgePreview() {
  const { slug, text, highlight, textColor, iconColor, bgColor } =
    useBadgeState()

  const svgSrc = constructBadgeUrl(
    slug,
    text,
    highlight,
    textColor,
    iconColor,
    bgColor,
  )
  const mdCode = `![${text || 'badge'}](${process.env.NEXT_PUBLIC_API_BASE_URL}${svgSrc})`

  return <Preview src={svgSrc} code={mdCode} variant="center" />
}
