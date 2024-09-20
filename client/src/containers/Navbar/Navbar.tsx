import { Link } from '@tanstack/react-router'
import { LucideSchool } from 'lucide-react'

import { Separator } from '@/components/ui/separator.tsx'

import { navigation } from './navigation.tsx'

const Navbar = () => {
  return (
    <div className="flex flex-col items-center w-64 text-[#d0cde4] bg-[#2f3349]">
      <div className="text-xl font-bold flex">
        <LucideSchool />
        SchoolHub
      </div>
      <Separator />
      <nav>
        {navigation.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center mt-1 px-12 hover:bg-[#3d4056] rounded"
          >
            {item.icon({})}
            <Link to={item.link}>{item.name}</Link>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Navbar
