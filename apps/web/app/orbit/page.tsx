'use client'

import { useVirtualizer } from '@tanstack/react-virtual'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@tech-stack/ui/components/card'
import { Input } from '@tech-stack/ui/components/input'
import { Label } from '@tech-stack/ui/components/label'
import { ScrollArea } from '@tech-stack/ui/components/scroll-area'
import Image from 'next/image'
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react'
import type { SimpleIcon } from 'simple-icons'
import * as simpleIcons from 'simple-icons/icons'

import { CodeBlock } from '#components/code-block'
import { API_BASE_URL, constructOrbitUrl } from '#utils/construct-url'

const SlugsContext = createContext<{
  slugs: string[]
  setSlugs: Dispatch<SetStateAction<string[]>>
}>({
  slugs: [],
  setSlugs: () => {},
})

function SlugsProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([])

  return (
    <SlugsContext.Provider value={{ slugs, setSlugs }}>
      {children}
    </SlugsContext.Provider>
  )
}

const useSlugsState = () => {
  const slugsContext = useContext(SlugsContext)
  if (!slugsContext) {
    throw new Error('useSlugsState must be used within a SlugsProvider')
  }
  return slugsContext
}

const OrbitContext = createContext<{
  text: string
  setText: Dispatch<SetStateAction<string>>
}>({
  text: '',
  setText: () => {},
})

function OrbitProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState('')

  return (
    <OrbitContext.Provider value={{ text, setText }}>
      <SlugsProvider>{children}</SlugsProvider>
    </OrbitContext.Provider>
  )
}

const useOrbitState = () => {
  const orbitContext = useContext(OrbitContext)
  const slugsContext = useContext(SlugsContext)
  if (!orbitContext || !slugsContext) {
    throw new Error('useOrbitStates must be used within an OrbitProvider')
  }
  return {
    ...orbitContext,
    ...slugsContext,
  }
}

function PreviewSection() {
  const { text, slugs } = useOrbitState()

  const svgSrc = constructOrbitUrl(text, slugs)
  const mdCode = `![${text.length ? text : 'wontory'}/tech-stack@orbit](${API_BASE_URL}${svgSrc})`

  return (
    <section className="@5xl/main:order-last order-first">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="relative aspect-square size-full">
            <Image
              src={svgSrc}
              alt="Preview"
              fill={true}
              draggable={false}
              unoptimized={true}
            />
          </div>
        </CardContent>
        <CardFooter>
          <CodeBlock language="markdown" code={mdCode} />
        </CardFooter>
      </Card>
    </section>
  )
}

function InputText({ id }: { id: string }) {
  const { text, setText } = useOrbitState()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setText(value)
  }

  return (
    <Input
      id={id}
      type="text"
      className="w-full"
      value={text}
      onChange={handleChange}
    />
  )
}

function SelectedIcons() {
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
              className="cursor-pointer p-2 *:size-6 *:drop-shadow-[#80808066] *:drop-shadow-sm"
            />
          )
        })
      ) : (
        <div className="text-muted-foreground text-xs">No icons selected</div>
      )}
    </div>
  )
}

function SearchIcon({ id }: { id: string }) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { setSlugs } = useSlugsState()

  const filteredIcons = (Object.values(simpleIcons) as SimpleIcon[]).filter(
    (icon) => {
      const iconName = icon.title.toLowerCase()
      const iconSlug = icon.slug.toLowerCase()
      const query = searchQuery.toLowerCase()
      return iconName.includes(query) || iconSlug.includes(query)
    },
  )

  const rowVirtualizer = useVirtualizer({
    count: filteredIcons.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 0,
    overscan: 8,
    lanes: 4,
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
          className="group/list relative w-full"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
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
                onClick={() => {
                  setSlugs((prev) => {
                    return [...prev, slug]
                  })
                }}
                className="group/item absolute top-0 cursor-pointer p-4 will-change-transform"
                style={{
                  left: `${virtualRow.lane * 25}%`,
                  width: `25%`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="space-y-2 transition duration-250 group-hover/list:group-hover/item:opacity-100 group-hover/list:opacity-20">
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

function CustomizeSection() {
  return (
    <section>
      <Card className="@container/card h-full">
        <CardHeader>
          <CardTitle>Customize</CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col gap-8">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="text">Text</Label>
            <InputText id="text" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label>Selected Icons</Label>
            <SelectedIcons />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="search">Search Icon</Label>
            <SearchIcon id="search" />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default function Page() {
  return (
    <div className="grid @5xl/main:grid-cols-2 grid-cols-1 gap-4 px-4 lg:px-6">
      <OrbitProvider>
        <PreviewSection />
        <CustomizeSection />
      </OrbitProvider>
    </div>
  )
}
