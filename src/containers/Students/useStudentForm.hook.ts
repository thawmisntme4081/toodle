import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  useAddStudentMutation,
  useUpdateStudentMutation,
} from '@/api/_studentApi'
import { closeModal, TypeModalForm } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { handleError } from '@/utils/handleError.util'

import { studentSchema } from './student.validation'

export const useStudentForm = (type: TypeModalForm) => {
  const dispatch = useAppDispatch()
  const dataEdit = useSelector((state: RootState) => state.modal.data)

  const [addStudent, { isLoading: isAdding }] = useAddStudentMutation()
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation()

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      avatar: dataEdit?.avatar ?? '',
      first_name: dataEdit?.first_name ?? '',
      last_name: dataEdit?.last_name ?? '',
      email: dataEdit?.email ?? '',
      phone_number: dataEdit?.phone_number ?? '',
      address: dataEdit?.address ?? '',
      date_of_birth: dataEdit?.date_of_birth ?? '',
      gender: dataEdit?.gender,
    },
  })

  const onSubmit = async (data: z.infer<typeof studentSchema>) => {
    try {
      const formattedDate = format(data.date_of_birth, 'yyyy-MM-dd')
      const response =
        type === 'add'
          ? await addStudent({
              ...data,
              date_of_birth: formattedDate,
            })
          : await updateStudent({
              ...data,
              id: dataEdit?.id,
              date_of_birth: formattedDate,
            })

      if (response?.error) {
        handleError(response.error)
        return
      }

      toast.success(response?.data?.message)
      form.reset()

      dispatch(closeModal())
    } catch (error) {
      console.error('Failed to create or update subject:', error)
    }
  }

  return { form, onSubmit, disabled: isAdding || isUpdating }
}
