'use client'

import type { SimpleIcon } from 'simple-icons'
import * as simpleIcons from 'simple-icons/icons'

import { useSlugsState } from '#stores/slugs-context'
import { TrashIcon } from 'lucide-react'

export function SelectedIcons() {
  const { slugs, setSlugs } = useSlugsState()

  const removeIcon = (index: number) => {
    setSlugs((prev) => {
      const newSlugs = [...prev]
      newSlugs.splice(index, 1)
      return newSlugs
    })
  }

  return (
    <div className="flex w-full flex-wrap gap-2">
      {slugs.length > 0 ? (
        slugs.map((slug, index) => {
          const iconKey =
            `si${slug.charAt(0).toUpperCase() + slug.slice(1)}` as keyof typeof simpleIcons
          const icon = simpleIcons[iconKey] as SimpleIcon | undefined
          if (!icon) return null
          const { svg, hex } = icon

          return (
            <button
              type="button"
              onClick={() => {
                removeIcon(index)
              }}
              // biome-ignore lint/suspicious/noArrayIndexKey: need to use index
              key={`${slug}-${index}`}
              className="group relative cursor-pointer p-2"
            >
              <div
                // biome-ignore lint/security/noDangerouslySetInnerHtml: simple-icons
                dangerouslySetInnerHTML={{
                  __html: svg.replace('<svg', `<svg fill="#${hex}"`),
                }}
                className="size-6 drop-shadow-svg transition-opacity duration-200 group-hover:opacity-50"
              />
              <TrashIcon
                className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-80"
                size={12}
              />
            </button>
          )
        })
      ) : (
        <div className="text-muted-foreground text-xs">No icons selected</div>
      )}
    </div>
  )
}
