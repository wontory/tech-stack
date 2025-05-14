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

type SvgDimensions = {
  width: number
  height: number
}

export type { Point, OrbitConfig, SvgDimensions }
