import { ROLES } from '@/enums/roles.enum'

export const useRole = () => {
  const checkRole = () => {
    const getUser = localStorage.getItem('persist:auth')
    const parseUser = getUser ? JSON.parse(getUser) : null
    const userRole = parseUser.roles
    const testRole = '011'
    const check = userRole === ROLES.ADMIN ? true : false
    return check
  }

  return { checkRole }
}

export type RoleContext = ReturnType<typeof useRole>
