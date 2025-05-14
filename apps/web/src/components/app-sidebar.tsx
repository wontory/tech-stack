import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@tech-stack/ui/components/sidebar'
import { LayersIcon, OrbitIcon, RectangleHorizontalIcon } from 'lucide-react'
import Link from 'next/link'

import { NavMain } from '#components/nav-main'

const data = {
  navMain: [
    {
      title: 'Orbit',
      url: '/orbit',
      icon: OrbitIcon,
    },
    {
      title: 'Badge',
      url: '/badge',
      icon: RectangleHorizontalIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <LayersIcon />
                <span className="font-semibold text-base">tech-stack</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
