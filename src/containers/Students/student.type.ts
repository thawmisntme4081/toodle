export type Student = {
  id: string
  code: string
  avatar?: string
  first_name: string
  last_name: string
  phone_number?: string
  email: string
  address: string
  gender: boolean
  date_of_birth: string
}

export type StudentReq = Omit<Student, 'id' | 'code'>
export type StudentUpdateReq = StudentReq & Pick<Student, 'id'>
