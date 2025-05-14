import type { NextRequest } from 'next/server'
import type { SimpleIcon } from 'simple-icons'
import * as simpleIcons from 'simple-icons/icons'

import { generateOrbitSvg } from '#libs/generate-orbit-svg'

type SimpleIconKey = keyof typeof simpleIcons

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const text = searchParams.get('text') || 'Orbit'
  const slugs = searchParams.get('slugs')
  const icons: SimpleIcon[] = []

  if (slugs) {
    for (const slug of slugs.split(',')) {
      const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`
      if (!(iconKey in simpleIcons)) {
        return Response.json(
          { error: `Icon with slug "${slug}" not found` },
          { status: 404 },
        )
      }
      icons.push(simpleIcons[iconKey as SimpleIconKey] as SimpleIcon)
    }
  }

  const orbitSvg = generateOrbitSvg(text, icons)
  return new Response(orbitSvg, {
    headers: {
      'content-type': 'image/svg+xml',
    },
  })
}
