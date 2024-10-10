export type Teacher = {
  id: string
  code: string
  first_name: string
  last_name: string
  phoneNumber: string
  email: string
  gender: boolean
  dateOfBirth: string
  subjects: [string]
  classes: [string]
}

export type TeacherReq = Omit<Teacher, 'id'>
