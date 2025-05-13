import { type ClassValue, cx } from 'cva'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(cx(inputs))
}
