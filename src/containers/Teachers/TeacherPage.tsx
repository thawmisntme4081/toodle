import { useGetTeachersQuery } from '@/api/_teacherApi'
import CustomTable from '@/components/custom-ui/CustomTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconPlus } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'

import { columns } from './teacher.declation'

export const TeacherPage = () => {
  const dispatch = useAppDispatch()

  const { data: teachers, isLoading } = useGetTeachersQuery()

  if (isLoading) return <div>Loading...</div>

  if (!teachers) return null

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center py-4">
        <Button
          className="gap-2"
          onClick={() =>
            dispatch(openModal({ name: 'teacher', type: 'create' }))
          }
        >
          <IconPlus />
          Add Teacher
        </Button>
        <Input placeholder="Filter name..." className="max-w-sm" />
      </div>
      <CustomTable data={teachers.data} columns={columns} />
    </div>
  )
}
