'use client'

import { Button } from '@tech-stack/ui/components/button'
import { SparklesIcon } from 'lucide-react'

import { useBadgeState } from '#stores/badge-context'

export function BadgeHighlightToggle() {
  const { highlight, setHighlight } = useBadgeState()

  return (
    <Button
      variant={highlight ? 'default' : 'outline'}
      size="sm"
      onClick={() => setHighlight((prev) => !prev)}
    >
      <SparklesIcon className="size-4" />
      <span>{highlight ? 'Highlight On' : 'Highlight Off'}</span>
    </Button>
  )
}
