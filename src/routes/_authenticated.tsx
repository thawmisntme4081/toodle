import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import HorizontalNavbar from '@/containers/Navbar/HorizontalNavBar'
import Navbar from '@/containers/Navbar/Navbar'
import { store } from '@/redux/store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    const isLogged = store.getState().auth.isLogged

    if (!isLogged) {
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
      <div className="p-4 flex-1 overflow-hidden">
        <HorizontalNavbar />
        <Outlet />
      </div>
    </div>
  )
}
