import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import moment from 'moment'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  useAddStudentMutation,
  useUpdateStudentMutation,
} from '@/api/_studentApi'
import { closeModal, TypeModalForm } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'

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
    const formattedDate = moment(data.date_of_birth).format('YYYY-MM-DD')
    const response =
      type === 'add'
        ? await addStudent({
            ...data,
            date_of_birth: formattedDate,
          }).unwrap()
        : await updateStudent({
            ...data,
            id: dataEdit?.id,
            date_of_birth: formattedDate,
          }).unwrap()

    toast.success(response.message)
    form.reset()

    dispatch(closeModal())
  }

  return { form, onSubmit, disabled: isAdding || isUpdating }
}
