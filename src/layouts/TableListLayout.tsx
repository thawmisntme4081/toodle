import { ColumnDef } from '@tanstack/react-table'
import _ from 'lodash'

import CustomTable from '@/components/custom-ui/CustomTable'
import Loading from '@/components/custom-ui/Loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IconPlus } from '@/icons'
import { openModal } from '@/redux/slices/modal.slice'
import { useAppDispatch } from '@/redux/store'
import { Response } from '@/types/response.type'

type Props<T> = {
  name: 'student' | 'teacher'
  data: Response<T[]> | undefined
  isLoading: boolean
  columns: ColumnDef<T>[]
}

const TableListLayout = <T extends Record<string, any>>({
  name,
  data: response,
  isLoading,
  columns,
}: Props<T>) => {
  const dispatch = useAppDispatch()

  if (isLoading) return <Loading />

  if (!response) return null

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center py-4">
        <Button
          className="gap-2"
          onClick={() => dispatch(openModal({ name, type: 'add' }))}
        >
          <IconPlus />
          <span>Add {_.capitalize(name)}</span>
        </Button>
        <Input placeholder="Filter name..." className="max-w-sm" />
      </div>
      <CustomTable data={response.data} columns={columns} />
    </div>
  )
}

export default TableListLayout
