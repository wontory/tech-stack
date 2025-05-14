import Image from 'next/image'

import { InsetLayout } from '#layouts/inset-layout'

export default function Page() {
  return (
    <InsetLayout title="Home">
      <h1 className="text-center font-bold text-4xl">
        <span className="text-center font-bold text-4xl text-primary">
          tech-stack
        </span>
      </h1>
      <section className="flex flex-col items-center justify-center">
        <h2 className="text-center font-bold text-2xl">
          <span className="text-center font-bold text-2xl text-primary">
            Orbit
          </span>
        </h2>
        <div className="relative aspect-square size-full max-w-4xl">
          <Image
            src="/api/orbit?title=hi&text=tech-stack&slugs=react,reactquery,framer,nextdotjs,remix"
            alt="Orbit"
            fill={true}
            draggable={false}
            unoptimized={true}
          />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center">
        <h2 className="text-center font-bold text-2xl">
          <span className="text-center font-bold text-2xl text-primary">
            Badge
          </span>
        </h2>
        <div className="mt-8">Work in progress </div>
      </section>
    </InsetLayout>
  )
}
