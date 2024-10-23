import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { IconSchool } from '@/icons'
import { RootState } from '@/redux/store'

import { MENU_GROUP } from './navigation'

const VerticalNavbar = () => {
  const location = useLocation()
  const navigation = useNavigate()

  const userRole = useSelector((state: RootState) => state.auth.role!)

  const navbarAuth = MENU_GROUP.find((item) => item.link === location.pathname)

  useEffect(() => {
    if (navbarAuth?.hidden.includes(userRole)) {
      navigation({ to: '/dashboard' })
    }
  }, [navbarAuth, userRole, navigation])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-[#2f3349]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              disabled
              className="text-2xl font-bold text-muted my-4"
            >
              <IconSchool />
              <p>SchoolHub</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[#2f3349]">
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupContent>
              {MENU_GROUP.map((item) => (
                <SidebarMenuItem key={item.link}>
                  {item.hidden.includes(userRole) ? null : (
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-[#3d4056] hover:text-muted mb-2 text-muted rounded text-lg"
                    >
                      <Link
                        to={item.link}
                        className="!h-10"
                        activeProps={{
                          className:
                            'bg-primary hover:bg-primary text-secondary',
                        }}
                      >
                        <item.icon />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default VerticalNavbar
