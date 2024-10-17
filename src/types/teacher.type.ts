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
  subjects?: TeacherSubject[]
  classes?: TeacherClass[]
}

export type TeacherSubject = {
  subject_id: string
  subject_name: string
}

export type TeacherClass = {
  class_id: string
  class_name: string
  class_grade: number
}

export type TeacherReq = Omit<
  Teacher,
  'id' | 'code' | 'subjects' | 'classes'
> & {
  subjects?: string[]
  classes?: string[]
}

export type TeacherUpdateReq = TeacherReq & Pick<Teacher, 'id'>
