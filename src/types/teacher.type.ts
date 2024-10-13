export type Teacher = {
  id: string
  code: string
  avatar?: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  address?: string
  gender: boolean
  dateOfBirth: string
  subjects?: string[]
}

export type TeacherReq = Omit<Teacher, 'id' | 'code' | 'classes'>
