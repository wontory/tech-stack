export const constructBadgeUrl = (
  slug: string,
  text: string,
  highlight: boolean,
  textColor: string,
  iconColor: string,
  bgColor: string,
): string => {
  const params = new URLSearchParams()
  if (slug) params.append('slug', slug)
  if (text) params.append('text', text)
  if (highlight) params.append('highlight', 'true')
  if (textColor) params.append('textColor', textColor)
  if (iconColor) params.append('iconColor', iconColor)
  if (bgColor) params.append('bgColor', bgColor)
  const queryString = params.toString()
  return `/api/badge${queryString ? `?${queryString}` : ''}`
}
