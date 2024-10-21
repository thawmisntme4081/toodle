import { HTMLInputTypeAttribute } from 'react'
import { FieldName } from 'react-hook-form'
import { z } from 'zod'

import { teacherSchema } from './teacher.validation'

type TeacherForm = {
  fieldName: FieldName<z.infer<typeof teacherSchema>>
  placeholder?: string
  type?: HTMLInputTypeAttribute
  fieldClassName?: string
}

export const teacherFormMap: TeacherForm[] = [
  {
    fieldName: 'first_name',
    placeholder: 'John',
  },
  {
    fieldName: 'last_name',
    placeholder: 'Doe',
  },
  {
    fieldName: 'gender',
  },
  {
    fieldName: 'email',
    placeholder: 'johndoe@gmail.com',
  },
  {
    fieldName: 'phone_number',
    placeholder: '0987654321',
  },
  {
    fieldName: 'date_of_birth',
    type: 'date',
  },
  {
    fieldName: 'address',
    fieldClassName: 'col-span-full',
  },
  {
    fieldName: 'avatar',
    fieldClassName: 'col-span-full',
  },
]
