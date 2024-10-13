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
  dateOfBirth: string
  subjects?: string[]
}

export type TeacherReq = {
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
