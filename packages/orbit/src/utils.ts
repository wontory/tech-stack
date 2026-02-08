import { CHAR_WIDTHS, CJK_CHAR_WIDTH, DEFAULT_CHAR_WIDTH } from '#constants'
import type { Point, SvgDimensions } from '#types'

const calculateLargestOrbitRadius = (
  baseRadius: number,
  radiusIncrement: number,
  maxOrbits: number,
): number => {
  const lastOrbitIndex = maxOrbits - 1
  return calculateOrbitRadius(baseRadius, radiusIncrement, lastOrbitIndex)
}

const calculateOuterOrbitIconSize = (
  baseSize: number,
  baseMultiplier: number,
  incrementFactor: number,
  orbitIndex: number,
): number => {
  const iconSizeMultiplier = calculateIconSizeMultiplier(
    baseMultiplier,
    incrementFactor,
    orbitIndex,
  )
  return baseSize * iconSizeMultiplier
}

const calculateDynamicPadding = (outerOrbitIconSize: number): number => {
  return Math.ceil(outerOrbitIconSize * 1.2)
}

const calculateSvgDimensions = (
  largestOrbitRadius: number,
  padding: number,
): SvgDimensions => {
  const size = largestOrbitRadius * 2 + padding * 2
  return {
    width: size,
    height: size,
  }
}

const calculateCenter = (width: number, height: number): Point => ({
  x: width / 2,
  y: height / 2,
})

const calculateOrbitRadius = (
  baseRadius: number,
  radiusIncrement: number,
  orbitIndex: number,
): number => baseRadius + radiusIncrement * (orbitIndex + 1) ** 1.2

const calculateAnimationDuration = (
  baseDuration: number,
  durationIncrement: number,
  orbitIndex: number,
): number => Math.max(5, baseDuration + durationIncrement * orbitIndex)

const calculateIconSizeMultiplier = (
  baseMultiplier: number,
  incrementFactor: number,
  orbitIndex: number,
): number => baseMultiplier + incrementFactor * (orbitIndex + 1) ** 1.1

const isCjk = (char: string): boolean => {
  const code = char.charCodeAt(0)
  return (
    (code >= 0x4e00 && code <= 0x9fff) ||
    (code >= 0x3400 && code <= 0x4dbf) ||
    (code >= 0xac00 && code <= 0xd7af) ||
    (code >= 0x3040 && code <= 0x30ff)
  )
}

const calculateTextWidth = (text: string, fontSize: number): number => {
  const scale = fontSize / 12
  let width = 0
  for (const char of text) {
    if (isCjk(char)) {
      width += CJK_CHAR_WIDTH
    } else {
      width += CHAR_WIDTHS[char] ?? DEFAULT_CHAR_WIDTH
    }
  }
  return Math.ceil(width * scale)
}

const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export {
  calculateLargestOrbitRadius,
  calculateOuterOrbitIconSize,
  calculateDynamicPadding,
  calculateSvgDimensions,
  calculateCenter,
  calculateOrbitRadius,
  calculateAnimationDuration,
  calculateIconSizeMultiplier,
  calculateTextWidth,
  escapeXml,
}
