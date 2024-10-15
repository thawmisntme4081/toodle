import { useSelector } from 'react-redux'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconBell, IconSun } from '@/icons'
import { RootState } from '@/redux/store'

import MobileNavbar from './MobileNavbar'

const HorizontalNavbar = () => {
  const fallBackAvatar = useSelector(
    (state: RootState) => state.auth.fallBackAvatar,
  )

  return (
    <div className="flex justify-between bg-white rounded items-center lg:flex-row-reverse">
      <MobileNavbar />
      <div className="p-2 flex items-center gap-4">
        <IconSun className="w-5 h-5" />
        <IconBell className="w-5 h-5" />
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{fallBackAvatar}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default HorizontalNavbar
