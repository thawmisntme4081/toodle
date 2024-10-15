import { ColumnDef } from '@tanstack/react-table'
import _ from 'lodash'

import { Teacher } from '@/types/teacher.type'

import Actions from './Actions'

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <p>{row.getValue('code')}</p>,
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    cell: ({ row }) => {
      const { first_name, last_name } = row.original
      return <p>{`${first_name} ${last_name.toUpperCase()}`}</p>
    },
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
    cell: ({ row }) => <p>{row.getValue('phone_number')}</p>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <p>{row.getValue('email')}</p>,
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => {
      const genderValue = row.getValue('gender') as boolean
      return <p> {genderValue ? 'Female' : 'Male'} </p>
    },
  },
  {
    accessorKey: 'subjects',
    header: 'Subjects',
    cell: ({ row }) => {
      const subjects: string[] = row.getValue('subjects')
      return <p>{_.isEmpty(subjects) ? '_' : subjects.join(', ')}</p>
    },
  },
  {
    accessorKey: 'classes',
    header: 'Classes',
    cell: ({ row }) => {
      const classes: string[] = row.getValue('classes')
      return <p>{_.isEmpty(classes) ? '_' : classes.join(', ')}</p>
    },
  },
  {
    id: 'actions',
    header: () => <p>Actions</p>,
    cell: ({ row }) => {
      const item = row.original
      return <Actions item={item} />
    },
  },
]

export const GENDERS = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
]
