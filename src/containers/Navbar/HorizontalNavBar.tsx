import { useSelector } from 'react-redux'
import { PopoverContent } from '@radix-ui/react-popover'
import { Link } from '@tanstack/react-router'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { IconBell, IconSun } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'

import { MENU_POPOVER } from './navigation'

const HorizontalNavbar = () => {
  const dispatch = useAppDispatch()

  const fallBackAvatar = useSelector(
    (state: RootState) => state.auth.fallBackAvatar,
  )

  return (
    <div className="flex justify-between bg-white rounded items-center">
      <SidebarTrigger className="ml-2" />
      <div className="p-2 flex items-center gap-4">
        <IconSun className="w-5 h-5" />
        <IconBell className="w-5 h-5" />
        <Popover>
          <PopoverTrigger asChild className="cursor-pointer">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{fallBackAvatar}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="bg-white rounded m-4 z-50 p-2">
            <ul>
              {MENU_POPOVER.map((item) => (
                <li key={item.link}>
                  {item.name === 'Logout' ? (
                    <button
                      onClick={() =>
                        dispatch(openModal({ name: 'logout', type: 'delete' }))
                      }
                      className="flex gap-2 items-center mt-2 py-1 px-6 bg-transparent hover:bg-destructive hover:text-muted rounded text-lg w-full border-none"
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.link}
                      className="flex gap-2 items-center mt-2 py-1 px-6 hover:bg-[#f3f4f6] rounded text-lg"
                    >
                      <item.icon />
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default HorizontalNavbar
