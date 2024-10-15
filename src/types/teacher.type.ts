export type Teacher = {
  id: string
  code: string
  avatar?: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
  address?: string
  gender: boolean
  date_of_birth: string
  subjects?: string[]
}

export type TeacherReq = Omit<Teacher, 'id' | 'code'>
