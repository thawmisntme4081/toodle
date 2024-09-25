import { Fragment } from 'react/jsx-runtime'
import { Link, useNavigate } from '@tanstack/react-router'

import { useAuth } from '@/hooks/useAuth.hook'
import { LucideSchool } from '@/icons'

import { MENU_GROUP } from './navigation'

const Navbar = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleLogOut = () => {
    signOut()
    navigate({ to: '/' })
  }

  return (
    <div className="flex flex-col w-64 bg-[#2f3349] p-3 h-screen">
      <div className="text-2xl font-bold flex gap-2 items-center my-4 text-muted">
        <LucideSchool />
        SchoolHub
      </div>
      <nav className="text-muted-foreground">
        {MENU_GROUP.map((item) => (
          <Fragment key={item.groupName}>
            <h3 className="uppercase font-semibold text-sm text-muted">
              {item.groupName}
            </h3>
            <ul className="mb-4">
              {item.groupItems.map((menuItem) => (
                <li key={menuItem.link}>
                  {menuItem.link === '/logout' ? (
                    <button
                      className="flex gap-2 items-center mt-2 py-1 px-6 bg-transparent hover:bg-destructive hover:text-muted rounded text-lg w-full"
                      onClick={handleLogOut}
                    >
                      <menuItem.icon />
                      <span>{menuItem.name}</span>
                    </button>
                  ) : (
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
