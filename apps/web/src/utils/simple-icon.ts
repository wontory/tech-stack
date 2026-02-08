import type { SimpleIcon } from 'simple-icons'
import * as simpleIcons from 'simple-icons/icons'

type SimpleIconKey = keyof typeof simpleIcons

export function resolveSimpleIcon(slug: string): SimpleIcon | undefined {
  const key =
    `si${slug.charAt(0).toUpperCase() + slug.slice(1)}` as SimpleIconKey
  if (!(key in simpleIcons)) return undefined
  return simpleIcons[key] as SimpleIcon
}

export function colorizeIconSvg(svg: string, hex: string): string {
  return svg.replace('<svg', `<svg fill="#${hex}"`)
}
