'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import { Input } from '@tech-stack/ui/components/input'
import { ScrollArea } from '@tech-stack/ui/components/scroll-area'
import { useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import type { SimpleIcon } from 'simple-icons'
import * as simpleIcons from 'simple-icons/icons'

import { useSlugsState } from '#stores/slugs-context'

export function SearchIcons({ id }: { id: string }) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { setSlugs } = useSlugsState()

  const [measureRef, { width: containerWidth }] = useMeasure()

  const filteredIcons = (Object.values(simpleIcons) as SimpleIcon[]).filter(
    (icon) => {
      const iconName = icon.title.toLowerCase()
      const iconSlug = icon.slug.toLowerCase()
      const query = searchQuery.toLowerCase()
      return iconName.includes(query) || iconSlug.includes(query)
    },
  )

  const lanes = containerWidth
    ? Math.max(1, Math.floor(containerWidth / 140))
    : 4

  const rowVirtualizer = useVirtualizer({
    count: filteredIcons.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 8,
    lanes,
  })

  return (
    <>
      <Input
        id={id}
        type="text"
        className="w-full"
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value)
        }}
      />
      <ScrollArea
        className="h-204 overflow-auto rounded-md border"
        ref={parentRef}
      >
        <div
          ref={measureRef}
          className="relative w-full"
          style={{
            height: rowVirtualizer.getTotalSize(),
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const icon = filteredIcons[virtualRow.index]
            if (!icon) return null
            const { svg, hex, title, slug } = icon

            return (
              <button
                key={virtualRow.key}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                type="button"
                onClick={() => setSlugs((prev) => [...prev, slug])}
                onMouseEnter={() => setHoveredIndex(virtualRow.index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute top-0 cursor-pointer p-4 transition-opacity duration-200 will-change-transform"
                style={{
                  left: `${(virtualRow.lane / lanes) * 100}%`,
                  width: `${100 / lanes}%`,
                  transform: `translateY(${virtualRow.start}px)`,
                  opacity:
                    hoveredIndex !== null && hoveredIndex !== virtualRow.index
                      ? 0.2
                      : 1,
                }}
              >
                <div className="space-y-2">
                  <div
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: simple-icons
                    dangerouslySetInnerHTML={{
                      __html: svg.replace('<svg', `<svg fill="#${hex}"`),
                    }}
                    className="p-8 *:drop-shadow-svg"
                  />
                  <div className="*:line-clamp-1">
                    <span className="font-medium">{title}</span>
                    <p className="text-muted-foreground text-xs">{slug}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </>
  )
}
