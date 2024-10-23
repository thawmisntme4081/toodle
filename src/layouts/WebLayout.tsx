import { Outlet } from '@tanstack/react-router'

import { SidebarProvider } from '@/components/ui/sidebar'
import HorizontalNavbar from '@/containers/Navbar/HorizontalNavBar'
import VerticalNavbar from '@/containers/Navbar/VerticalNavbar'

const WebLayout = () => {
  return (
    <SidebarProvider>
      <VerticalNavbar />
      <div className="flex flex-col w-full m-4">
        <HorizontalNavbar />
        <Outlet />
      </div>
    </SidebarProvider>
  )
}

export default WebLayout
