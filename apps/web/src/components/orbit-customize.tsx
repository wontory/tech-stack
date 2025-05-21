import { Label } from '@tech-stack/ui/components/label'

import { Customize } from '#components/customize'
import { OrbitTextInput } from '#components/orbit-text-input'
import { SearchIcons } from '#components/search-icons'
import { SelectedIcons } from '#components/selected-icons'

export function OrbitCustomize() {
  return (
    <Customize>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="text">Text</Label>
        <OrbitTextInput id="text" />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label>Selected Icons</Label>
        <SelectedIcons />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="search">Search Icons</Label>
        <SearchIcons id="search" />
      </div>
    </Customize>
  )
}
