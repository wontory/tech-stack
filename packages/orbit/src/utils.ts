import type { Point, SvgDimensions } from '#types'

const calculateLargestOrbitRadius = (
  baseRadius: number,
  radiusIncrement: number,
  maxOrbits: number,
): number => {
  const lastOrbitIndex = maxOrbits - 1
  return calculateOrbitRadius(baseRadius, radiusIncrement, lastOrbitIndex)
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

export {
  calculateLargestOrbitRadius,
  calculateSvgDimensions,
  calculateCenter,
  calculateOrbitRadius,
  calculateAnimationDuration,
  calculateIconSizeMultiplier,
}
