import { generateBadgeSvg } from '@tech-stack/badge'
import type { NextRequest } from 'next/server'
import { resolveSimpleIcon } from '#utils/simple-icon'

const HEX_COLOR = /^[0-9a-fA-F]{3,8}$/

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const slug = searchParams.get('slug') || ''
  const text = (searchParams.get('text') || '').slice(0, 100)
  const highlight = searchParams.get('highlight') === 'true'
  const rawTextColor = searchParams.get('textColor') || ''
  const rawIconColor = searchParams.get('iconColor') || ''
  const rawBgColor = searchParams.get('bgColor') || ''
  const textColor = HEX_COLOR.test(rawTextColor) ? rawTextColor : ''
  const iconColor = HEX_COLOR.test(rawIconColor) ? rawIconColor : ''
  const bgColor = HEX_COLOR.test(rawBgColor) ? rawBgColor : ''

  const icon = slug ? resolveSimpleIcon(slug) : undefined

  if (slug && !icon) {
    return Response.json(
      { error: `Icon with slug "${slug}" not found` },
      { status: 404 },
    )
  }

  const badgeSvg = generateBadgeSvg(
    { slug, text, highlight, textColor, iconColor, bgColor },
    icon ?? null,
  )
  return new Response(badgeSvg, {
    headers: {
      'content-type': 'image/svg+xml',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
