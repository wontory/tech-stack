'use client'

import { XIcon } from 'lucide-react'

import { useBadgeState } from '#stores/badge-context'
import { colorizeIconSvg, resolveSimpleIcon } from '#utils/simple-icon'

export function BadgeSelectedIcon() {
  const { slug, setSlug } = useBadgeState()

  if (!slug) {
    return <div className="text-muted-foreground text-xs">No icon selected</div>
  }

  const icon = resolveSimpleIcon(slug)

  if (!icon) {
    return <div className="text-muted-foreground text-xs">Icon not found</div>
  }

  const { svg, hex } = icon

  return (
    <div className="flex w-full flex-wrap gap-2">
      <button
        type="button"
        onClick={() => setSlug('')}
        className="group relative cursor-pointer p-2"
      >
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: simple-icons
          dangerouslySetInnerHTML={{
            __html: colorizeIconSvg(svg, hex),
          }}
          className="size-6 drop-shadow-svg transition-opacity duration-200 group-hover:opacity-50"
        />
        <XIcon
          className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-80"
          size={12}
        />
      </button>
    </div>
  )
}
