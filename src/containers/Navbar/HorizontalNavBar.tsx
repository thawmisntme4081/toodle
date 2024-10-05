import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconBell, IconSun } from '@/icons'

import MobileNavbar from './MobileNavbar'

const HorizontalNavbar = () => {
  return (
    <div className="flex justify-between bg-white rounded items-center md:flex-row-reverse">
      <MobileNavbar />
      <div className="p-2 flex items-center gap-4">
        <IconSun className="w-5 h-5" />
        <IconBell className="w-5 h-5" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default HorizontalNavbar
