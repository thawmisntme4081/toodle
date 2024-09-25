import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LucideBell } from '@/icons/LucideBell'
import { LucideSun } from '@/icons/LucideSun'
import MobileNav from './MobileNav'

const HorizontalNavbar = () => {
  return (
    <div className="flex justify-between bg-white rounded items-center md:flex-row-reverse">
      <MobileNav />
      <div className="p-2 flex items-center gap-4">
        <LucideSun className="w-5 h-5" />
        <LucideBell className="w-5 h-5" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default HorizontalNavbar
