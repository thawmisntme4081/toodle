import { useGetTeachersQuery } from '@/api/_teacherApi'
import TableListLayout from '@/layouts/TableListLayout'

import { columns } from './teacherColumns.declaration'

export const TeacherPage = () => {
  const { data: teachers, isLoading } = useGetTeachersQuery()

  return (
    <TableListLayout
      name="teacher"
      data={teachers}
      columns={columns}
      isLoading={isLoading}
    />
  )
}
