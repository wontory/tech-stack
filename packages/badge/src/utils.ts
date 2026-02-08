import {
  BADGE_CONFIG,
  CHAR_WIDTHS,
  CJK_CHAR_WIDTH,
  DEFAULT_CHAR_WIDTH,
} from '#constants'

const isCjk = (char: string): boolean => {
  const code = char.charCodeAt(0)
  return (
    (code >= 0x4e00 && code <= 0x9fff) ||
    (code >= 0x3400 && code <= 0x4dbf) ||
    (code >= 0xac00 && code <= 0xd7af) ||
    (code >= 0x3040 && code <= 0x30ff)
  )
}

const calculateTextWidth = (text: string): number => {
  let width = 0
  for (const char of text) {
    if (isCjk(char)) {
      width += CJK_CHAR_WIDTH
    } else {
      width += CHAR_WIDTHS[char] ?? DEFAULT_CHAR_WIDTH
    }
  }
  return Math.ceil(width)
}

const calculateBadgeWidth = (hasIcon: boolean, textWidth: number): number => {
  let width = BADGE_CONFIG.paddingH * 2 + textWidth

  if (hasIcon) {
    width += BADGE_CONFIG.iconSize
    if (textWidth > 0) {
      width += BADGE_CONFIG.iconTextGap
    }
  }

  return Math.ceil(width)
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const clean = hex.replace('#', '')
  if (clean.length < 6) return { r: 0, g: 0, b: 0 }
  return {
    r: Number.parseInt(clean.substring(0, 2), 16),
    g: Number.parseInt(clean.substring(2, 4), 16),
    b: Number.parseInt(clean.substring(4, 6), 16),
  }
}

const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export { calculateTextWidth, calculateBadgeWidth, hexToRgb, escapeXml }
