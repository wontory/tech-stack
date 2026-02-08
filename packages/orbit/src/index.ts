import type { SimpleIcon } from 'simple-icons'

import { COLORS, FONT_FAMILY, SVG_CONFIG } from '#constants'
import type { OrbitConfig, Point } from '#types'
import {
  calculateAnimationDuration,
  calculateCenter,
  calculateDynamicPadding,
  calculateIconSizeMultiplier,
  calculateLargestOrbitRadius,
  calculateOrbitRadius,
  calculateOuterOrbitIconSize,
  calculateSvgDimensions,
  calculateTextWidth,
  escapeXml,
} from '#utils'

const generateGradientDefs = (): string => `
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${COLORS.gradient.start}" />
        <stop offset="50%" stop-color="${COLORS.gradient.middle}" />
        <stop offset="100%" stop-color="${COLORS.gradient.end}" />
      </linearGradient>
    </defs>
  `

const generateTextStyles = (): string => `
    <style>
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');
      text {
        font-family: ${FONT_FAMILY};
      }
    </style>
  `

const generateGlowDefs = (): string => `
  <defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
      <feFlood flood-color="${COLORS.glow.floodColor}" flood-opacity="${COLORS.glow.floodOpacity}" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  `

const generateTextElement = (
  text: string,
  center: Point,
  fontSize: number,
): string => `
    <text 
      x="${center.x}" 
      y="${center.y}" 
      font-size="${fontSize}" 
      font-weight="bold" 
      text-anchor="middle" 
      dominant-baseline="middle" 
      fill="url(#gradient)"
    >${escapeXml(text)}</text>
  `

const generateTextContent = (
  text: string,
  center: Point,
  fontSize: number,
): string => `
    ${generateGradientDefs()}
    ${generateTextStyles()}
    ${generateTextElement(text, center, fontSize)}
  `

const generateOrbitCircle = (center: Point, radius: number): string => `
    <circle 
      cx="${center.x}" 
      cy="${center.y}" 
      r="${radius}" 
      fill="none" 
      stroke="${COLORS.orbit.stroke}" 
      stroke-width="${COLORS.orbit.width}"
      stroke-opacity="${COLORS.orbit.opacity}"
    />
  `

const generateOrbitsContent = (
  config: OrbitConfig,
  maxOrbits: number,
): string => {
  return Array.from({ length: maxOrbits }, (_, orbitIndex) => {
    const radius = calculateOrbitRadius(
      config.baseRadius,
      config.radiusIncrement,
      orbitIndex,
    )
    return generateOrbitCircle(config.center, radius)
  }).join('')
}

const generateIconPath = (
  center: Point,
  orbitRadius: number,
  animationId: string,
  iconIndex: number,
): string => {
  const direction = iconIndex ? -1 : 1

  return `
    <path 
      id="${animationId}" 
      d="M ${center.x + orbitRadius * direction} ${center.y} A ${orbitRadius} ${orbitRadius} 0 1 1 ${center.x + orbitRadius * -direction} ${center.y} A ${orbitRadius} ${orbitRadius} 0 1 1 ${center.x + orbitRadius * direction} ${center.y}"
      fill="none" 
      stroke="none"
    />
  `
}

const generateIconSvg = (
  icon: SimpleIcon,
  iconSize: number,
  animationId: string,
  animationDuration: number,
): string => `
    <g transform="translate(-${iconSize / 2},-${iconSize / 2})">
      <animateMotion 
        dur="${animationDuration}s" 
        repeatCount="indefinite" 
      >
        <mpath xlink:href="#${animationId}" />
      </animateMotion>
      <svg 
        width="${iconSize}" 
        height="${iconSize}" 
        viewBox="0 0 24 24" 
        fill="#${icon.hex}" 
        filter="url(#glow)"
        xmlns="http://www.w3.org/2000/svg"
        style="overflow: visible"
      >
        <path d="${icon.path}" />
      </svg>
    </g>
  `

const generateIconsForOrbit = (
  icons: SimpleIcon[],
  orbitIndex: number,
  config: OrbitConfig,
): string => {
  const orbitRadius = calculateOrbitRadius(
    config.baseRadius,
    config.radiusIncrement,
    orbitIndex,
  )
  const animationDuration = calculateAnimationDuration(
    config.baseAnimationDuration,
    config.durationIncrement,
    orbitIndex,
  )
  const iconSizeMultiplier = calculateIconSizeMultiplier(
    config.baseSizeMultiplier,
    config.sizeIncrementFactor,
    orbitIndex,
  )

  const iconsForOrbit = icons.slice(orbitIndex * 2, orbitIndex * 2 + 2)

  return iconsForOrbit
    .map((icon, iconIndex) => {
      const iconSize = SVG_CONFIG.iconBaseSize * iconSizeMultiplier
      const animationId = `orbit-${orbitIndex}-${iconIndex}`

      return (
        generateIconPath(config.center, orbitRadius, animationId, iconIndex) +
        generateIconSvg(icon, iconSize, animationId, animationDuration)
      )
    })
    .join('')
}

const generateIconsContent = (
  icons: SimpleIcon[],
  maxOrbits: number,
  config: OrbitConfig,
): string => {
  return `
      ${generateGlowDefs()}
      ${Array.from({ length: maxOrbits }, (_, orbitIndex) =>
        generateIconsForOrbit(icons, orbitIndex, config),
      ).join('')}
    `
}

export const generateOrbitSvg = (text: string, icons: SimpleIcon[]): string => {
  const maxOrbits = Math.ceil(icons.length / 2)
  const largestOrbitRadius = calculateLargestOrbitRadius(
    SVG_CONFIG.baseRadius,
    SVG_CONFIG.radiusIncrement,
    maxOrbits,
  )
  const outerOrbitIconSize = calculateOuterOrbitIconSize(
    SVG_CONFIG.iconBaseSize,
    SVG_CONFIG.baseSizeMultiplier,
    SVG_CONFIG.sizeIncrementFactor,
    maxOrbits - 1,
  )
  const padding = calculateDynamicPadding(outerOrbitIconSize)
  const svgDimensions = calculateSvgDimensions(largestOrbitRadius, padding)
  const textWidth = calculateTextWidth(text, SVG_CONFIG.fontSize)
  const textPadding = 40
  const minWidth = textWidth + textPadding * 2
  if (svgDimensions.width < minWidth) {
    svgDimensions.width = minWidth
  }
  const center = calculateCenter(svgDimensions.width, svgDimensions.height)

  const orbitConfig: OrbitConfig = {
    center,
    baseRadius: SVG_CONFIG.baseRadius,
    radiusIncrement: SVG_CONFIG.radiusIncrement,
    baseAnimationDuration: SVG_CONFIG.baseAnimationDuration,
    durationIncrement: SVG_CONFIG.durationIncrement,
    baseSizeMultiplier: SVG_CONFIG.baseSizeMultiplier,
    sizeIncrementFactor: SVG_CONFIG.sizeIncrementFactor,
  }

  const textContent = generateTextContent(text, center, SVG_CONFIG.fontSize)
  const orbitsContent = generateOrbitsContent(orbitConfig, maxOrbits)
  const iconsContent = generateIconsContent(icons, maxOrbits, orbitConfig)

  return `
      <svg width="${svgDimensions.width}" height="${svgDimensions.height}" viewBox="0 0 ${svgDimensions.width} ${svgDimensions.height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        ${orbitsContent}
        ${iconsContent}
        ${textContent}
      </svg>
    `
}
