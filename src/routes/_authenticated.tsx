import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import HorizontalNavbar from '@/containers/Navbar/HorizontalNavBar'
import Navbar from '@/containers/Navbar/Navbar'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.auth
    if (!isLogged()) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: Layout,
})

function Layout() {
  return (
    <div className="flex">
      <div className="hidden lg:flex">
        <Navbar />
      </div>
      <div className="p-4 flex-1">
        <HorizontalNavbar />
        <Outlet />
      </div>
    </div>
  )
}
