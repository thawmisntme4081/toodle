import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
} from '@/api/_teacherApi'
import { closeModal, TypeModalForm } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { handleError } from '@/utils/handleError.util'

import { TeacherSubject } from './teacher.type'
import { teacherSchema } from './teacher.validation'

export const useTeacherForm = (type: TypeModalForm) => {
  const dispatch = useAppDispatch()
  const dataEdit = useSelector((state: RootState) => state.modal.data)

  const [createTeacher, { isLoading: isAdding }] = useCreateTeacherMutation()
  const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeacherMutation()

  const form = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      avatar: dataEdit?.avatar ?? '',
      first_name: dataEdit?.first_name ?? '',
      last_name: dataEdit?.last_name ?? '',
      email: dataEdit?.email ?? '',
      phone_number: dataEdit?.phone_number ?? '',
      address: dataEdit?.address ?? '',
      date_of_birth: dataEdit?.date_of_birth
        ? new Date(dataEdit.date_of_birth)
        : undefined,
      gender: dataEdit?.gender,
      subjects:
        dataEdit?.subjects?.map(
          (subject: TeacherSubject) => subject.subject_id,
        ) ?? [],
    },
  })

  const onSubmit = async (data: z.infer<typeof teacherSchema>) => {
    const formattedDate = format(data.date_of_birth, 'yyyy-MM-dd')
    const response =
      type === 'add'
        ? await createTeacher({
            ...data,
            date_of_birth: formattedDate,
          })
        : await updateTeacher({
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
  }

  return { form, onSubmit, disabled: isAdding || isUpdating }
}
