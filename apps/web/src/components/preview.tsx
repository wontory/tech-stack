import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@tech-stack/ui/components/card'
import Image from 'next/image'

import { CodeBlock } from '#components/code-block'

export function Preview({
  src,
  code,
  variant = 'fill',
}: {
  src: string
  code: string
  variant?: 'fill' | 'center'
}) {
  return (
    <section className="@5xl/main:order-last order-first">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          {variant === 'fill' ? (
            <div className="relative aspect-square size-full">
              <Image
                src={src}
                alt="Preview"
                fill={true}
                draggable={false}
                unoptimized={true}
              />
            </div>
          ) : (
            <div className="flex min-h-40 items-center justify-center">
              <img src={src} alt="Preview" draggable={false} />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <CodeBlock language="markdown" code={code} />
        </CardFooter>
      </Card>
    </section>
  )
}
