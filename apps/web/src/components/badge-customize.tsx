'use client'

import { Input } from '@tech-stack/ui/components/input'
import { Label } from '@tech-stack/ui/components/label'
import { CheckIcon } from 'lucide-react'

import { BadgeHighlightToggle } from '#components/badge-highlight-toggle'
import { BadgeSelectedIcon } from '#components/badge-selected-icon'
import { Customize } from '#components/customize'
import { IconSearch } from '#components/icon-search'
import { TextInput } from '#components/text-input'
import { useBadgeState } from '#stores/badge-context'

export function BadgeCustomize() {
  const {
    slug,
    setSlug,
    text,
    setText,
    textColor,
    setTextColor,
    iconColor,
    setIconColor,
    bgColor,
    setBgColor,
  } = useBadgeState()

  return (
    <Customize>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="text">Text</Label>
        <TextInput id="text" text={text} setText={setText} />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="bgColor">Badge Color</Label>
        <div className="flex gap-2">
          <input
            type="color"
            id="bgColor"
            value={`#${bgColor || 'CCD2D9'}`}
            onChange={(e) => setBgColor(e.target.value.replace('#', ''))}
            className="h-9 w-9 shrink-0 cursor-pointer rounded-md border"
          />
          <Input
            type="text"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value.replace('#', ''))}
            placeholder="Default"
            className="w-full"
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        <div className="grid items-center gap-2">
          <Label htmlFor="textColor">Text Color</Label>
          <div className="flex gap-2">
            <input
              type="color"
              id="textColor"
              value={`#${textColor || '000000'}`}
              onChange={(e) => setTextColor(e.target.value.replace('#', ''))}
              className="h-9 w-9 shrink-0 cursor-pointer rounded-md border"
            />
            <Input
              type="text"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value.replace('#', ''))}
              placeholder="000000"
              className="w-full"
            />
          </div>
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="iconColor">Icon Color</Label>
          <div className="flex gap-2">
            <input
              type="color"
              id="iconColor"
              value={`#${iconColor || '000000'}`}
              onChange={(e) => setIconColor(e.target.value.replace('#', ''))}
              className="h-9 w-9 shrink-0 cursor-pointer rounded-md border"
            />
            <Input
              type="text"
              value={iconColor}
              onChange={(e) => setIconColor(e.target.value.replace('#', ''))}
              placeholder="Icon default"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="grid w-full items-center gap-2">
        <Label>Highlight</Label>
        <BadgeHighlightToggle />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label>Selected Icon</Label>
        <BadgeSelectedIcon />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="search">Search Icons</Label>
        <IconSearch
          id="search"
          onIconClick={(iconSlug) => setSlug(slug === iconSlug ? '' : iconSlug)}
          isSelected={(iconSlug) => slug === iconSlug}
          renderOverlay={(selected) =>
            selected ? (
              <CheckIcon
                className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 text-primary"
                size={32}
              />
            ) : null
          }
        />
      </div>
    </Customize>
  )
}
