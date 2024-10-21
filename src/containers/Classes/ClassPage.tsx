import { useGetClassesQuery } from '@/api/_classApi'
import CustomTable from '@/components/custom-ui/CustomTable'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'

import { columns } from './class.declaration'

const ClassPage = () => {
  const dispatch = useAppDispatch()

  const { data: classes, isLoading } = useGetClassesQuery()
  if (isLoading) return <div>Loading...</div>

  if (!classes) return null

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center py-4">
        <Button
          className="gap-2"
          onClick={() => dispatch(openModal({ name: 'class', type: 'add' }))}
        >
          <IconPlus />
          Add Class
        </Button>
      </div>
      <CustomTable data={classes.data} columns={columns} />
    </div>
  )
}

export default ClassPage
