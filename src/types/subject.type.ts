export type Subject = {
  id: string
  name: string
  number_of_teachers?: number
}

export type SubjectReq = Pick<Subject, 'name'>
