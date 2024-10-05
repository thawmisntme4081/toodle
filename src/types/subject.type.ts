export type Subject = {
  id: string
  name: string
}

export type SubjectReq = Pick<Subject, 'name'>
