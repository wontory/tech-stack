import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@tech-stack/ui/components/card'

export function Customize({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Card className="@container/card h-full">
        <CardHeader>
          <CardTitle>Customize</CardTitle>
        </CardHeader>
        <CardContent className="relative flex flex-col gap-8">
          {children}
        </CardContent>
      </Card>
    </section>
  )
}
