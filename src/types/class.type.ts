import { Grade } from './grade.type'

export type Class = {
  id: string
  name: string
  capacity: number
  grade: number
  supervisor: Supervisor
}

type Supervisor = {
  supervisor_id: string
  first_name: string
  last_name: string
}

export type ClassReq = Pick<Class, 'name' | 'capacity'> | Pick<Grade, 'id'>
