import { Link } from '@tanstack/react-router'
import { LucideSchool } from 'lucide-react'

import { navigation } from './navigation.tsx'

const Navbar = () => {
  return (
    <div className="flex flex-col w-64 text-[#d0cde4] bg-[#2f3349] p-3 h-screen">
      <div className="text-2xl font-bold flex gap-2 items-center">
        <LucideSchool />
        SchoolHub
      </div>
      <nav>
        {navigation.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex gap-2 items-center mt-2 py-1 px-6
            hover:bg-[#3d4056] rounded text-lg"
            activeProps={{ className: 'bg-[#6b61db] hover:bg-[#6b61db] text-[white]' }}
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
