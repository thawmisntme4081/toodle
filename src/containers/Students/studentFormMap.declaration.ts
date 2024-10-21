import { HTMLInputTypeAttribute } from 'react'
import { FieldName } from 'react-hook-form'
import { z } from 'zod'

import { studentSchema } from './student.validation'

type StudentForm = {
  fieldName: FieldName<z.infer<typeof studentSchema>>
  placeholder?: string
  type?: HTMLInputTypeAttribute
  fieldClassName?: string
}

export const studentFormMap: StudentForm[] = [
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
