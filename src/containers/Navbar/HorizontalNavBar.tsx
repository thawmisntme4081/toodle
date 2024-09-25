import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconBell, LucideSun } from '@/icons'

const HorizontalNavbar = () => {
  return (
    <div className="p-2 bg-white rounded flex flex-row-reverse items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <IconBell className="w-5 h-5" />
      <LucideSun className="w-5 h-5" />
    </div>
  )
}

export default HorizontalNavbar
