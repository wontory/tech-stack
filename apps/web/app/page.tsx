import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@tech-stack/ui/components/card'
import { SectionCards } from '#components/section-cards'
import { InsetLayout } from '#layouts/inset-layout'

export default function Page() {
  return (
    <InsetLayout title="Home">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <Card className="@container/card">
          <CardHeader>
            <CardTitle>README.md</CardTitle>
          </CardHeader>
          <CardContent className='className="px-2 pt-4 sm:px-6 sm:pt-6"'>
            <div className="flex flex-col gap-6">
              <h1 className="font-bold text-3xl">Welcome to tech-stack</h1>
              <p className="text-muted-foreground">
                This project is an animated SVG generator based on Simple Icons,
                allowing users to create dynamic and visually engaging icons for
                their projects. <br />
                By utilizing a library of icons from Simple Icons, the tool
                generates customizable animated SVGs that can be easily embedded
                into GitHub README.md files or used in project documentation.
              </p>
              <p className="text-muted-foreground">
                Current features include: <br />
                <ul className="list-inside list-disc pt-2 pl-2">
                  <li>
                    Orbit: A rotating animation effect that adds movement to
                    icons.
                  </li>
                  <li>
                    Badge (WIP): A feature currently under development, designed
                    to create custom badge-style SVGs.
                  </li>
                </ul>
              </p>
              <p className="text-muted-foreground">
                These SVGs can be used to enhance the visual appeal of a GitHub
                profile, showcase technologies in use, or represent achievements
                and milestones in project documentation. The project aims to
                provide an easy-to-use tool for developers and designers looking
                to add personalized, animated elements to their online profiles
                and project pages.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </InsetLayout>
  )
}
