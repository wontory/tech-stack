'use client'

import { Preview } from '#components/preview'
import { useOrbitState } from '#stores/orbit-context'
import { constructOrbitUrl } from '#utils/construct-orbit-url'

export function OrbitPreview() {
  const { text, slugs } = useOrbitState()

  const svgSrc = constructOrbitUrl(text, slugs)
  const mdCode = `![${text.length ? text : 'wontory'}/tech-stack@orbit](${process.env.NEXT_PUBLIC_API_BASE_URL}${svgSrc})`

  return <Preview src={svgSrc} code={mdCode} />
}
