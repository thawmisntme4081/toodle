import Navbar from '../Navbar/Navbar'
import HorizontalNavbar from '../Navbar/HorizontalNavBar'
import { Outlet } from '@tanstack/react-router'

const Layout = () => {
  return (
    <div className="flex">
      <div className="hidden md:flex">
        <Navbar />
      </div>
      <div className="p-4 flex-1">
        <HorizontalNavbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
