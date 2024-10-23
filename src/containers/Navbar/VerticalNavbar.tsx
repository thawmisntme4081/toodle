import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'

import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
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
    <Sidebar className="flex flex-col w-64 bg-[#2f3349] p-2 h-screen">
      <SidebarHeader className="bg-[#2f3349]">
        <div className="text-2xl font-bold text-muted flex gap-2 items-center">
          <IconSchool />
          SchoolHub
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#2f3349]">
        <nav className="text-muted-foreground overflow-y-scroll">
          <ul className="mb-4">
            {MENU_GROUP.map((item) => (
              <li key={item.link}>
                {item.hidden.includes(userRole) ? null : (
                  <Link
                    to={item.link}
                    className="flex gap-2 items-center mt-2 py-1 px-6 hover:bg-[#3d4056] rounded text-lg"
                    activeProps={{
                      className: 'bg-primary hover:bg-primary text-white',
                    }}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </SidebarContent>
    </Sidebar>
  )
}

export default VerticalNavbar
