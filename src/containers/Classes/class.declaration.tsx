import { ColumnDef } from '@tanstack/react-table'

import Actions from './Actions'
import { Class } from './class.type'

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
      const { supervisor_id, first_name, last_name } = row.original.supervisor
      return <p>{supervisor_id ? `${first_name} ${last_name}` : '_'}</p>
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
