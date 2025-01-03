export type Class = {
  id: string
  name: string
  capacity: number
  grade: number
  total_students: number
  supervisor: Supervisor
}

type Supervisor = {
  supervisor_id: string
  first_name: string
  last_name: string
}

export type UpdateClassReq = Omit<
  Class,
  'grade' | 'supervisor' | 'total_students'
>

export type ClassReq = Pick<Class, 'name' | 'capacity'> & {
  grade_id: string
}
