import type { NextRequest } from 'next/server'
import type { SimpleIcon } from 'simple-icons'
import * as simpleIcons from 'simple-icons/icons'

type SimpleIconKey = keyof typeof simpleIcons

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const text = searchParams.get('text') || 'Orbit'
  const slugs = searchParams.get('slugs')
  const icons: SimpleIcon[] = []

  if (slugs) {
    for (const slug of slugs.split(',')) {
      const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}`
      if (!(iconKey in simpleIcons)) {
        return Response.json(
          { error: `Icon with slug "${slug}" not found` },
          { status: 404 },
        )
      }
      icons.push(simpleIcons[iconKey as SimpleIconKey] as SimpleIcon)
    }
  }

  const orbitSvg = generateOrbitSvg(text, icons)
  return new Response(orbitSvg, {
    headers: {
      'content-type': 'image/svg+xml',
    },
  })
}

function generateOrbitSvg(text: string, icons: SimpleIcon[]): string {
  const width = 800
  const height = 800
  const centerX = width / 2
  const centerY = height / 2

  const fontSize = 32
  const textColor = '#333333'

  const maxOrbits = Math.ceil(icons.length / 2)
  const baseRadius = 80
  const radiusIncrement = 60
  const baseAnimationDuration = 8
  const durationIncrement = 4
  const baseSizeMultiplier = 0.8
  const sizeIncrementFactor = 0.15

  let orbitsContent = ''
  let iconsContent = ''

  for (let orbitIndex = 0; orbitIndex < maxOrbits; orbitIndex++) {
    const orbitRadius = baseRadius + radiusIncrement * (orbitIndex + 1) ** 1.2
    const animationDuration = Math.max(
      5,
      baseAnimationDuration + durationIncrement * orbitIndex,
    )
    const iconSizeMultiplier =
      baseSizeMultiplier + sizeIncrementFactor * (orbitIndex + 1) ** 1.1

    orbitsContent += `
      <circle 
        cx="${centerX}" 
        cy="${centerY}" 
        r="${orbitRadius}" 
        fill="none" 
        stroke="#DDDDDD" 
        stroke-width="1" 
        stroke-dasharray="5,5"
      />
    `

    const iconsForThisOrbit = icons.slice(orbitIndex * 2, orbitIndex * 2 + 2)

    iconsForThisOrbit.forEach((icon, iconIndex) => {
      const iconSize = 24 * iconSizeMultiplier

      const animationId = `orbit-${orbitIndex}-${iconIndex}`

      iconsContent += `
        <path 
          id="${animationId}" 
          d="M ${centerX + orbitRadius} ${centerY} A ${orbitRadius} ${orbitRadius} 0 1 1 ${centerX - orbitRadius} ${centerY} A ${orbitRadius} ${orbitRadius} 0 1 1 ${centerX + orbitRadius} ${centerY}"
          fill="none" 
          stroke="none"
        />
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
    })
  }

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect width="${width}" height="${height}" fill="white" />
      ${orbitsContent}
      <text 
        x="${centerX}" 
        y="${centerY}" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        font-weight="bold" 
        text-anchor="middle" 
        dominant-baseline="middle" 
        fill="${textColor}"
      >${text}</text>
      ${iconsContent}
    </svg>
  `
}
