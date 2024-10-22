import { ROLES } from '@/enums/roles.enum'

export type User = {
  id: string
  first_name: string | null
  last_name: string
  email: string
  password: string
  is_active: boolean
  role: ROLES
}

export type LoginReq = Pick<User, 'email' | 'password'>
export type LoginRes = Omit<User, 'email' | 'password'>
