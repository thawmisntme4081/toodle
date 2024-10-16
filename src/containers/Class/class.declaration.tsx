import { ColumnDef } from '@tanstack/react-table'

import { Class } from '@/types/class.type'

import Actions from './Actions'

export const columns: ColumnDef<Class>[] = [
  {
    accessorKey: 'name',
    header: 'Class name',
    cell: ({ row }) => <p>{row.getValue('name')}</p>,
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
    cell: ({ row }) => <p>{row.getValue('grade')}</p>,
  },
  {
    accessorKey: 'capacity',
    header: 'Students',
    cell: ({ row }) => <p>0/{row.getValue('capacity')}</p>,
  },
  {
    accessorKey: 'supervisor',
    header: 'Supervisor',
    cell: ({ row }) => {
      const { first_name, last_name } = row.original.supervisor
      return <p>{`${first_name} ${last_name}`}</p>
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
