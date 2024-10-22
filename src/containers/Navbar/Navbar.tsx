import { useEffect } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { useSelector } from 'react-redux'
import {
  Link,
  useLocation,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'

import { useLogoutMutation } from '@/api/_authApi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { IconSchool } from '@/icons'
import { RootState } from '@/redux/store'

import { MENU_GROUP } from './navigation'

const Navbar = () => {
  const router = useRouter()
  const location = useLocation()
  const navigation = useNavigate()
  const [logout, { isLoading }] = useLogoutMutation()

  const userRole = useSelector((state: RootState) => state.auth.role!)

  const navbarAuth = MENU_GROUP.flatMap((item) => item.groupItems).find(
    (item) => item.link === location.href,
  )

  useEffect(() => {
    if (navbarAuth?.hidden.includes(userRole)) {
      navigation({ to: '/dashboard' })
    }
  }, [navbarAuth, userRole, navigation])

  const handleLogOut = async () => {
    try {
      await logout()
      router.invalidate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col w-64 bg-[#2f3349] p-3 h-screen">
      <div className="text-2xl font-bold flex gap-2 items-center my-4 text-muted">
        <IconSchool />
        SchoolHub
      </div>
      <nav className="text-muted-foreground overflow-y-scroll">
        {MENU_GROUP.map((item) => (
          <Fragment key={item.groupName}>
            <h3 className="uppercase font-semibold text-sm text-muted">
              {item.groupName}
            </h3>
            <ul className="mb-4">
              {item.groupItems.map((menuItem) => (
                <li key={menuItem.link}>
                  {menuItem.link === '/logout' ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="flex gap-2 items-center mt-2 py-1 px-6 bg-transparent hover:bg-destructive hover:text-muted rounded text-lg w-full">
                          <menuItem.icon />
                          <span>{menuItem.name}</span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to sign out?
                          </DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                          <Button
                            type="button"
                            onClick={handleLogOut}
                            disabled={isLoading}
                          >
                            Sign out
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : menuItem.hidden.includes(userRole) ? null : (
                    <Link
                      to={menuItem.link}
                      className="flex gap-2 items-center mt-2 py-1 px-6 hover:bg-[#3d4056] rounded text-lg"
                      activeProps={{
                        className: 'bg-primary hover:bg-primary text-white',
                      }}
                    >
                      <menuItem.icon />
                      <span>{menuItem.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
      </nav>
    </div>
  )
}

export default Navbar
