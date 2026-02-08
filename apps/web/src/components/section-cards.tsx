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

function SectionCard({
  title,
  description,
  content,
  footer,
}: {
  title: string
  description: string
  content: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <Card className="@container/card h-full">
      <CardHeader className="relative">
        <CardDescription>{description}</CardDescription>
        <CardTitle className="font-semibold @[250px]/card:text-3xl text-2xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative flex max-h-80 flex-1 flex-col">
        {content}
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        {footer}
      </CardFooter>
    </Card>
  )
}

function OrbitCard() {
  return (
    <SectionCard
      title="Orbit"
      description="tech-stack"
      content={
        <div className="relative aspect-square size-full">
          <Image
            src="/api/orbit?text=Orbit&slugs=typescript,simpleicons,tailwindcss,nextdotjs"
            alt="Orbit"
            fill={true}
            draggable={false}
            unoptimized={true}
          />
        </div>
      }
      footer={
        <>
          <div className="flex items-center gap-2">
            <span className="line-clamp-1 font-medium">
              Orbiting icons. Stunning SVG.
            </span>
            <OrbitIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Fully customizable text & icons.
          </div>
        </>
      }
    />
  )
}

function BadgeCard() {
  return (
    <SectionCard
      title="Badge"
      description="tech-stack"
      content={
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <img
            src="/api/badge?slug=nextdotjs&text=Next.js&highlight=true"
            alt="Badge highlight"
            draggable={false}
          />
          <img
            src="/api/badge?slug=typescript&text=TypeScript"
            alt="Badge"
            draggable={false}
          />
        </div>
      }
      footer={
        <>
          <div className="flex items-center gap-2">
            <span className="line-clamp-1 font-medium">
              Stylish icon badge.
            </span>
            <RectangleHorizontalIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Selectable icon & highlight.
          </div>
        </>
      }
    />
  )
}

export function SectionCards() {
  return (
    <div className="grid @5xl/main:grid-cols-2 grid-cols-1 gap-4 px-4 **:data-[slot=card]:bg-gradient-to-t **:data-[slot=card]:from-primary/5 **:data-[slot=card]:to-card **:data-[slot=card]:shadow-xs lg:px-6 dark:**:data-[slot=card]:bg-card">
      <Link href="/orbit">
        <OrbitCard />
      </Link>
      <Link href="/badge">
        <BadgeCard />
      </Link>
    </div>
  )
}
