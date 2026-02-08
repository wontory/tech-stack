const BADGE_CONFIG = {
  height: 32,
  iconSize: 16,
  paddingH: 10,
  iconTextGap: 7,
  fontSize: 12,
  borderRadius: 9,
} as const

const COLORS = {
  gradient: {
    start: '#B4BCC5',
    middle: '#CCD2D9',
    end: '#E5E8EC',
  },
  border: '#585F68',
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
  BADGE_CONFIG,
  COLORS,
  FONT_FAMILY,
  DEFAULT_CHAR_WIDTH,
  CJK_CHAR_WIDTH,
  CHAR_WIDTHS,
}
