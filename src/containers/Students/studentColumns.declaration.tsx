import { ColumnDef } from '@tanstack/react-table'
import _ from 'lodash'

import Actions from './Actions'
import { Student } from './student.type'

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
    cell: ({ row }) => <p>{row.getValue('code')}</p>,
  },
  {
    accessorKey: 'full_name',
    header: 'Full Name',
    cell: ({ row }) => {
      const { first_name, last_name } = row.original
      return <p>{`${first_name} ${last_name.toUpperCase()}`}</p>
    },
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
    cell: ({ row }) => <p>{row.getValue('phone_number') || '_'}</p>,
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
  // {
  //   accessorKey: 'classes',
  //   header: 'Classes',
  //   cell: ({ row }) => {
  //     const classes: TeacherClass[] = row.getValue('classes')
  //     return (
  //       <p>
  //         {_.isEmpty(classes)
  //           ? '_'
  //           : classes
  //               .map((_class) => `${_class.class_grade} ${_class.class_name}`)
  //               .join(', ')}
  //       </p>
  //     )
  //   },
  // },
  {
    id: 'actions',
    header: () => <p>Actions</p>,
    cell: ({ row }) => {
      const item = row.original
      return <Actions item={item} />
    },
  },
]
