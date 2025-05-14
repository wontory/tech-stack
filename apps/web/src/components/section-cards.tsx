import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@tech-stack/ui/components/card'
import { OrbitIcon, RectangleHorizontalIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function SectionCards() {
  return (
    <div className="grid @5xl/main:grid-cols-2 grid-cols-1 gap-4 px-4 **:data-[slot=card]:bg-gradient-to-t **:data-[slot=card]:from-primary/5 **:data-[slot=card]:to-card **:data-[slot=card]:shadow-xs lg:px-6 dark:**:data-[slot=card]:bg-card">
      <Link href="/orbit">
        <Card className="@container/card h-full">
          <CardHeader className="relative">
            <CardDescription>tech-stack</CardDescription>
            <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl">
              Orbit
            </CardTitle>
          </CardHeader>
          <CardContent className="relative max-h-80">
            <div className="relative aspect-square size-full">
              <Image
                src="/api/orbit?text=Orbit&slugs=typescript,simpleicons,tailwindcss,nextdotjs"
                alt="Orbit"
                fill={true}
                draggable={false}
                unoptimized={true}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="line-clamp-1 font-medium">
                Orbiting icons. Stunning SVG.
              </span>
              <OrbitIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Fully customizable text & icons.
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Link href="/badge">
        <Card className="@container/card h-full">
          <CardHeader className="relative">
            <CardDescription>tech-stack</CardDescription>
            <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl">
              Badge
            </CardTitle>
          </CardHeader>
          <CardContent className="relative flex flex-1">
            <div className="flex flex-1 items-center justify-center">
              <span className="font-medium text-muted-foreground">
                Work in progress.
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="line-clamp-1 font-medium">
                Stylish icon badge.
              </span>
              <RectangleHorizontalIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Selectable icon & highlight.
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}
