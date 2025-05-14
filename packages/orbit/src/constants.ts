const SVG_CONFIG = {
  fontSize: 32,
  baseRadius: 80,
  radiusIncrement: 60,
  baseAnimationDuration: 8,
  durationIncrement: 4,
  baseSizeMultiplier: 0.8,
  sizeIncrementFactor: 0.15,
  iconBaseSize: 24,
  padding: 20,
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

export { SVG_CONFIG, COLORS, FONT_FAMILY }
