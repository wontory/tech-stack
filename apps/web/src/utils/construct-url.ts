export const API_BASE_URL = 'http://localhost:3000' as const

export const constructOrbitUrl = (text: string, slugs: string[]): string => {
  const params = new URLSearchParams()
  if (text) params.append('text', text)
  if (slugs.length > 0) params.append('slugs', slugs.join(','))
  const queryString = params.toString().replace(/%2C/g, ',')
  return `/api/orbit${queryString ? `?${queryString}` : ''}`
}
