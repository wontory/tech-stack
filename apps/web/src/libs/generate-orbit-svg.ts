import type { SimpleIcon } from 'simple-icons'

// Constants
const SVG_CONFIG = {
  width: 800,
  height: 800,
  fontSize: 32,
  baseRadius: 80,
  radiusIncrement: 60,
  baseAnimationDuration: 8,
  durationIncrement: 4,
  baseSizeMultiplier: 0.8,
  sizeIncrementFactor: 0.15,
  iconBaseSize: 24,
} as const

const COLORS = {
  gradient: {
    start: '#6E7681',
    middle: '#8B949E',
    end: '#D1D5DA',
  },
  orbit: {
    stroke: '#6E7681',
    opacity: 0.5,
    width: 0.5,
  },
} as const

const FONT_FAMILY = `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`

// Types
type Point = {
  x: number
  y: number
}

type OrbitConfig = {
  center: Point
  baseRadius: number
  radiusIncrement: number
  baseAnimationDuration: number
  durationIncrement: number
  baseSizeMultiplier: number
  sizeIncrementFactor: number
}

// Utility functions
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

// SVG Generation functions
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
    >${text}</text>
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
): string => `
    <path 
      id="${animationId}" 
      d="M ${center.x + orbitRadius} ${center.y} A ${orbitRadius} ${orbitRadius} 0 1 1 ${center.x - orbitRadius} ${center.y} A ${orbitRadius} ${orbitRadius} 0 1 1 ${center.x + orbitRadius} ${center.y}"
      fill="none" 
      stroke="none"
    />
  `

const generateIconSvg = (
  icon: SimpleIcon,
  iconSize: number,
  animationId: string,
  animationDuration: number,
  iconIndex: number,
): string => `
    <g transform="translate(-${iconSize / 2},-${iconSize / 2})">
      <animateMotion 
        dur="${animationDuration}s" 
        repeatCount="indefinite" 
        begin="${(iconIndex * animationDuration) / 2}s"
      >
        <mpath xlink:href="#${animationId}" />
      </animateMotion>
      <svg 
        width="${iconSize}" 
        height="${iconSize}" 
        viewBox="0 0 24 24" 
        fill="#${icon.hex}" 
        xmlns="http://www.w3.org/2000/svg"
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
        generateIconPath(config.center, orbitRadius, animationId) +
        generateIconSvg(
          icon,
          iconSize,
          animationId,
          animationDuration,
          iconIndex,
        )
      )
    })
    .join('')
}

const generateIconsContent = (
  icons: SimpleIcon[],
  maxOrbits: number,
  config: OrbitConfig,
): string => {
  return Array.from({ length: maxOrbits }, (_, orbitIndex) =>
    generateIconsForOrbit(icons, orbitIndex, config),
  ).join('')
}

export const generateOrbitSvg = (text: string, icons: SimpleIcon[]): string => {
  const center = calculateCenter(SVG_CONFIG.width, SVG_CONFIG.height)
  const maxOrbits = Math.ceil(icons.length / 2)

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
      <svg width="${SVG_CONFIG.width}" height="${SVG_CONFIG.height}" viewBox="0 0 ${SVG_CONFIG.width} ${SVG_CONFIG.height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        ${orbitsContent}
        ${textContent}
        ${iconsContent}
      </svg>
    `
}
