export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'admin' | 'teacher' | 'student' | 'parent'
}

export type SignIn = Pick<User, 'email' | 'password'>
export type CheckUserRes = Pick<User, 'id' | 'password' | 'role'>
export type PayloadToken = Omit<CheckUserRes, 'password'>
