const SVG_CONFIG = {
  fontSize: 84,
  baseRadius: 52,
  radiusIncrement: 60,
  baseAnimationDuration: 8,
  durationIncrement: 3,
  baseSizeMultiplier: 0.8,
  sizeIncrementFactor: 0.15,
  iconBaseSize: 48,
} as const

const COLORS = {
  gradient: {
    start: '#6E7681',
    middle: '#8B949E',
    end: '#D1D5DA',
  },
  orbit: {
    stroke: '#6E7681',
    opacity: 0.33,
    width: 0.5,
  },
  glow: {
    floodColor: '#808080',
    floodOpacity: 0.4,
  },
} as const

const FONT_FAMILY = `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`

const DEFAULT_CHAR_WIDTH = 6.7
const CJK_CHAR_WIDTH = 10

const CHAR_WIDTHS: Record<string, number> = {
  ' ': 2.8,
  f: 3.4,
  i: 2.8,
  j: 2.8,
  l: 2.8,
  r: 3.8,
  t: 3.8,
  '!': 2.8,
  '.': 2.8,
  ',': 2.8,
  ':': 2.8,
  ';': 2.8,
  '|': 2.8,
  "'": 2.8,
  '-': 3.8,
  m: 10,
  w: 8.5,
  M: 8.5,
  W: 10,
  A: 7.2,
  B: 7.2,
  C: 7.2,
  D: 7.6,
  E: 6.3,
  F: 5.8,
  G: 7.6,
  H: 7.6,
  I: 2.8,
  J: 4.5,
  K: 7.2,
  L: 5.8,
  N: 7.6,
  O: 8,
  P: 6.7,
  Q: 8,
  R: 7.2,
  S: 6.7,
  T: 6.3,
  U: 7.6,
  V: 7.2,
  X: 6.7,
  Y: 6.3,
  Z: 6.7,
}

export {
  SVG_CONFIG,
  COLORS,
  FONT_FAMILY,
  DEFAULT_CHAR_WIDTH,
  CJK_CHAR_WIDTH,
  CHAR_WIDTHS,
}
