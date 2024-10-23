import { Outlet } from '@tanstack/react-router'

import { SidebarProvider } from '@/components/ui/sidebar'
import HorizontalNavbar from '@/containers/Navbar/HorizontalNavBar'
import VerticalNavbar from '@/containers/Navbar/VerticalNavbar'

const WebLayout = () => {
  return (
    <SidebarProvider>
      <VerticalNavbar />
      <main className="w-full m-4">
        <HorizontalNavbar />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default WebLayout
