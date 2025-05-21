'use client'

import type { SimpleIcon } from 'simple-icons'
import * as simpleIcons from 'simple-icons/icons'

import { useSlugsState } from '#stores/slugs-context'

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
              // biome-ignore lint/security/noDangerouslySetInnerHtml: simple-icons
              dangerouslySetInnerHTML={{
                __html: svg.replace('<svg', `<svg fill="#${hex}"`),
              }}
              className="cursor-pointer p-2 *:size-6 *:drop-shadow-svg"
            />
          )
        })
      ) : (
        <div className="text-muted-foreground text-xs">No icons selected</div>
      )}
    </div>
  )
}
