import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { useDeleteTeacherMutation } from '@/api/_teacherApi'
import { Button } from '@/components/ui/button'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'

const DeleteTeacher = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.modal.data)
  const [deleteTeacher, { isLoading }] = useDeleteTeacherMutation()

  if (!data?.id) return null

  const handleDelete = async () => {
    const response = await deleteTeacher(data.id).unwrap()
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

export default DeleteTeacher
