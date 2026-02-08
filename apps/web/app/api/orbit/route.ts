import { generateOrbitSvg } from '@tech-stack/orbit'
import type { NextRequest } from 'next/server'
import { resolveSimpleIcon } from '#utils/simple-icon'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const text = (searchParams.get('text') || '').slice(0, 100)
  const slugs = searchParams.get('slugs') || ''

  const icons = []

  if (slugs) {
    for (const slug of slugs.split(',')) {
      const icon = resolveSimpleIcon(slug)
      if (!icon) {
        return Response.json(
          { error: `Icon with slug "${slug}" not found` },
          { status: 404 },
        )
      }
      icons.push(icon)
    }
  }

  const orbitSvg = generateOrbitSvg(text, icons)
  return new Response(orbitSvg, {
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
