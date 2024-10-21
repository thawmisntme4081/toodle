import { useGetStudentsQuery } from '@/api/_studentApi'
import TableListLayout from '@/layouts/TableListLayout'

import { columns } from './studentColumns.declaration'

export const StudentPage = () => {
  const { data: students, isLoading } = useGetStudentsQuery()

  return (
    <TableListLayout
      name="student"
      data={students}
      isLoading={isLoading}
      columns={columns}
    />
  )
}
