import { useSelector } from 'react-redux'
import { toast } from 'sonner'

import { useDeleteSubjectMutation } from '@/api/_subjectApi'
import { Button } from '@/components/ui/button'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { handleError } from '@/utils/handleError.util'

const DeleteSubject = () => {
  const dispatch = useAppDispatch()
  const data = useSelector((state: RootState) => state.modal.data)
  const [deleteSubject, { isLoading }] = useDeleteSubjectMutation()

  if (!data?.id) return null

  const handleDelete = async () => {
    try {
      const response = await deleteSubject(data.id)
      if (response.error) {
        handleError(response.error)
        return
      }
      toast.success(response.data?.message)
      dispatch(closeModal())
    } catch (error) {
      console.log(error)
    }
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

export default DeleteSubject
