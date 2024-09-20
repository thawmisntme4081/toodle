import { createLazyFileRoute } from '@tanstack/react-router'

import Navbar from '@/containers/Navbar/Navbar'

export const Route = createLazyFileRoute('/_authenticated/mycourse')({
  component: MyCourse,
})

function MyCourse() {
  return (
    <div className='flex'>
      <Navbar />
      <div>Hello from About!</div>
    </div>
  )
}
