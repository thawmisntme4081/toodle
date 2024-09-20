import { createLazyFileRoute } from '@tanstack/react-router'

import HorizontalNavbar from '@/containers/Navbar/HorizontalNavBar'
import Navbar from '@/containers/Navbar/Navbar'

export const Route = createLazyFileRoute('/_authenticated/mycourse')({
  component: MyCourse,
})

function MyCourse() {
  return (
    <div className="flex">
      <Navbar />
      <div className="p-4 flex-1">
        <HorizontalNavbar />
        <div>Hello from About!</div>
      </div>
    </div>
  )
}
