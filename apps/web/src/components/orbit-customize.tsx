'use client'

import { Label } from '@tech-stack/ui/components/label'
import { PlusIcon } from 'lucide-react'

import { Customize } from '#components/customize'
import { IconSearch } from '#components/icon-search'
import { SelectedIcons } from '#components/selected-icons'
import { TextInput } from '#components/text-input'
import { useOrbitState } from '#stores/orbit-context'

export function OrbitCustomize() {
  const { text, setText, setSlugs } = useOrbitState()

  return (
    <Customize>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="text">Text</Label>
        <TextInput id="text" text={text} setText={setText} />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label>Selected Icons</Label>
        <SelectedIcons />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="search">Search Icons</Label>
        <IconSearch
          id="search"
          onIconClick={(iconSlug) => setSlugs((prev) => [...prev, iconSlug])}
          renderOverlay={() => (
            <PlusIcon
              className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-80"
              size={32}
            />
          )}
        />
      </div>
    </Customize>
  )
}
