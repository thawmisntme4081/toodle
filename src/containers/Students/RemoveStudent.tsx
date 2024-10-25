import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { useRemoveStudentMutation } from '@/api/_studentApi'
import { Button } from '@/components/ui/button'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'

const RemoveStudent = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.modal.data)
  const [removeStudent, { isLoading }] = useRemoveStudentMutation()

  if (!data?.id) return null

  const handleDelete = async () => {
    const response = await removeStudent(data.id).unwrap()
    toast.success(response.message)
    dispatch(closeModal())
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={() => dispatch(closeModal())}
      >
        Cancel
      </Button>
      <Button variant="destructive" disabled={isLoading} onClick={handleDelete}>
        Delete
      </Button>
    </div>
  )
}

export default RemoveStudent
