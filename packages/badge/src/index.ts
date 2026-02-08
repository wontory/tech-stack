import type { SimpleIcon } from 'simple-icons'

import { BADGE_CONFIG, COLORS, FONT_FAMILY } from '#constants'
import type { BadgeConfig } from '#types'
import {
  calculateBadgeWidth,
  calculateTextWidth,
  escapeXml,
  hexToRgb,
} from '#utils'

const generateFontStyle = (): string => `
    <style>
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');
      text {
        font-family: ${FONT_FAMILY};
      }
    </style>
  `

const generateGlowFilter = (
  floodColor: string,
  floodOpacity: number,
  stdDeviation: number,
): string => `
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${stdDeviation}" result="blur" />
      <feFlood flood-color="${floodColor}" flood-opacity="${floodOpacity}" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  `

const generateTrailingLight = (
  width: number,
  height: number,
  ox: number,
  oy: number,
  color: string,
): string => {
  const { r: cr, g: cg, b: cb } = hexToRgb(color)

  const r = BADGE_CONFIG.borderRadius
  const perimeter = 2 * (width - 2 * r) + 2 * (height - 2 * r) + 2 * Math.PI * r
  const blobCount = 3
  const blobRadius = Math.min(height, Math.max(16, Math.round(perimeter / 12)))
  const dur = Math.max(3, perimeter / 60)
  const gap = 0.3

  const path = `M${ox + r},${oy} H${ox + width - r} Q${ox + width},${oy} ${ox + width},${oy + r} V${oy + height - r} Q${ox + width},${oy + height} ${ox + width - r},${oy + height} H${ox + r} Q${ox},${oy + height} ${ox},${oy + height - r} V${oy + r} Q${ox},${oy} ${ox + r},${oy} Z`

  const gradient = `<radialGradient id="blob"><stop offset="0%" stop-color="rgb(${cr},${cg},${cb})" stop-opacity="0.7" /><stop offset="100%" stop-color="rgb(${cr},${cg},${cb})" stop-opacity="0" /></radialGradient>`

  const halfOffset = dur / 2
  const blobs = [0, halfOffset]
    .flatMap((groupDelay) =>
      Array.from({ length: blobCount }, (_, i) => {
        const delay = -(groupDelay + i * gap)
        return `<circle r="${blobRadius}" fill="url(#blob)"><animateMotion path="${path}" dur="${dur}s" repeatCount="indefinite" rotate="auto" begin="${delay}s" /></circle>`
      }),
    )
    .join('\n      ')

  return `
    <defs>
      <clipPath id="trail-clip">
        <rect x="${ox - 2}" y="${oy - 2}" width="${width + 4}" height="${height + 4}" rx="${r + 2}" />
      </clipPath>
      ${gradient}
    </defs>
    <g style="filter:blur(4px)" clip-path="url(#trail-clip)">
      ${blobs}
    </g>
  `
}

const generateShineEffect = (
  width: number,
  height: number,
  r: number,
  ox: number,
  oy: number,
): string => {
  const shineWidth = Math.round(width * 0.7)
  const skewOffset = Math.round(height * 0.36)

  return `
    <defs>
      <clipPath id="shine-clip">
        <rect x="${ox + 0.5}" y="${oy + 0.5}" width="${width - 1}" height="${height - 1}" rx="${r - 0.5}" />
      </clipPath>
      <linearGradient id="shine">
        <stop offset="0%" stop-color="white" stop-opacity="0" />
        <stop offset="25%" stop-color="white" stop-opacity="0" />
        <stop offset="40%" stop-color="white" stop-opacity="0.15" />
        <stop offset="50%" stop-color="white" stop-opacity="0.3" />
        <stop offset="60%" stop-color="white" stop-opacity="0.15" />
        <stop offset="75%" stop-color="white" stop-opacity="0" />
        <stop offset="100%" stop-color="white" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g clip-path="url(#shine-clip)">
      <g transform="skewX(-20)">
        <rect
          x="${ox}"
          y="${oy}"
          width="${shineWidth}"
          height="${height}"
          fill="url(#shine)"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-${shineWidth + skewOffset},0; -${shineWidth + skewOffset},0; ${width + skewOffset},0; ${width + skewOffset},0"
            keyTimes="0; 0.3; 0.7; 1"
            calcMode="spline"
            keySplines="0 0 1 1; 0.4 0 0.2 1; 0 0 1 1"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </g>
  `
}

const generateIcon = (
  icon: SimpleIcon,
  x: number,
  y: number,
  size: number,
  color: string,
): string => {
  return `
    <svg
      x="${x}"
      y="${y}"
      width="${size}"
      height="${size}"
      viewBox="0 0 24 24"
      fill="${color}"
      filter="url(#glow)"
      xmlns="http://www.w3.org/2000/svg"
      style="overflow: visible"
    >
      <path d="${icon.path}" />
    </svg>
  `
}

const generateText = (
  text: string,
  x: number,
  y: number,
  color: string,
  textWidth: number,
): string => {
  return `
    <text
      x="${x}"
      y="${y}"
      font-size="${BADGE_CONFIG.fontSize}"
      font-weight="500"
      fill="${color}"
      dominant-baseline="central"
      textLength="${textWidth}"
    >${escapeXml(text)}</text>
  `
}

export const generateBadgeSvg = (
  config: BadgeConfig,
  icon: SimpleIcon | null,
): string => {
  const { text, highlight } = config
  const textColor = config.textColor
    ? `#${config.textColor.replace('#', '')}`
    : '#000000'
  const iconColor = config.iconColor
    ? `#${config.iconColor.replace('#', '')}`
    : ''
  const bgRgb = config.bgColor
    ? hexToRgb(`#${config.bgColor.replace('#', '')}`)
    : null
  const gradStart = bgRgb
    ? `rgb(${Math.max(0, bgRgb.r - 40)},${Math.max(0, bgRgb.g - 40)},${Math.max(0, bgRgb.b - 40)})`
    : COLORS.gradient.start
  const gradMiddle = bgRgb
    ? `rgb(${bgRgb.r},${bgRgb.g},${bgRgb.b})`
    : COLORS.gradient.middle
  const gradEnd = bgRgb
    ? `rgb(${Math.min(255, bgRgb.r + 40)},${Math.min(255, bgRgb.g + 40)},${Math.min(255, bgRgb.b + 40)})`
    : COLORS.gradient.end
  const hasIcon = icon !== null

  const textWidth = calculateTextWidth(text)
  const badgeWidth = calculateBadgeWidth(hasIcon, textWidth)
  const badgeHeight = BADGE_CONFIG.height
  const r = BADGE_CONFIG.borderRadius

  const trailPadding = 2
  const svgWidth = badgeWidth + trailPadding * 2
  const svgHeight = badgeHeight + trailPadding * 2
  const ox = trailPadding
  const oy = trailPadding

  const iconX = ox + BADGE_CONFIG.paddingH
  const iconY = oy + (badgeHeight - BADGE_CONFIG.iconSize) / 2
  const textX = hasIcon
    ? ox +
      BADGE_CONFIG.paddingH +
      BADGE_CONFIG.iconSize +
      BADGE_CONFIG.iconTextGap
    : ox + BADGE_CONFIG.paddingH
  const textY = oy + badgeHeight / 2

  let svg = `<svg width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">`

  svg += generateFontStyle()

  if (highlight) {
    svg += generateTrailingLight(
      badgeWidth,
      badgeHeight,
      ox,
      oy,
      iconColor || (icon ? `#${icon.hex}` : COLORS.border),
    )
  }

  svg += `
    <defs>
      <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${gradStart}" />
        <stop offset="50%" stop-color="${gradMiddle}" />
        <stop offset="100%" stop-color="${gradEnd}" />
      </linearGradient>
      ${generateGlowFilter('#808080', 0.4, 3)}
    </defs>
    <rect
      x="${ox}"
      y="${oy}"
      width="${badgeWidth}"
      height="${badgeHeight}"
      rx="${r}"
      fill="url(#bg-gradient)"
    />`

  if (hasIcon && icon) {
    svg += generateIcon(
      icon,
      iconX,
      iconY,
      BADGE_CONFIG.iconSize,
      iconColor || `#${icon.hex}`,
    )
  }

  svg += generateText(text, textX, textY, textColor, textWidth)

  if (highlight) {
    svg += generateShineEffect(badgeWidth, badgeHeight, r, ox, oy)
  }

  svg += '</svg>'

  return svg
}
