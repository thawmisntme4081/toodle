import { Link } from '@tanstack/react-router'
import { LucideSchool } from 'lucide-react'

import { Separator } from '@/components/ui/separator.tsx'

import { navigation } from './navigation.tsx'

const Navbar = () => {
  return (
    <div className="flex flex-col items-center w-64 text-[#d0cde4] bg-[#2f3349]">
      <div className="text-2xl font-bold flex gap-2 items-center">
        <LucideSchool />
        SchoolHub
      </div>
      <Separator />
      <nav>
        {navigation.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex gap-2 items-center mt-2 py-1 px-12
            hover:bg-[#3d4056] rounded text-lg"
            activeProps={{ className: 'bg-[#6b61db]' }}
          >
            <span>{item.icon({})}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Navbar
