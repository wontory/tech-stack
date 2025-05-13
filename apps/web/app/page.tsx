import { Button } from '@workspace/ui/components/button'

import { InsetLayout } from '#layouts/inset-layout'

export default function Page() {
  return (
    <InsetLayout title="Home">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl">Hello World</h1>
        <Button size="sm">Button</Button>
      </div>
    </InsetLayout>
  )
}
