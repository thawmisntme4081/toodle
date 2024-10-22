import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  useAddSubjectMutation,
  useUpdateSubjectMutation,
} from '@/api/_subjectApi'
import { closeModal, TypeModalForm } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'

import { subjectSchema } from './subject.validation'

export const useSubjectForm = (type: TypeModalForm) => {
  const dispatch = useAppDispatch()
  const dataEdit = useSelector((state: RootState) => state.modal.data)

  const [addSubject, { isLoading: isAdding }] = useAddSubjectMutation()
  const [updateSubject, { isLoading: isUpdating }] = useUpdateSubjectMutation()

  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: { name: dataEdit?.name ?? '' },
  })

  const onSubmit = async (value: z.infer<typeof subjectSchema>) => {
    const response =
      type === 'add'
        ? await addSubject(value).unwrap()
        : await updateSubject({
            id: dataEdit?.id,
            name: value.name,
          }).unwrap()

    toast.success(response.message)
    form.reset()

    dispatch(closeModal())
  }

  return { form, onSubmit, disabled: isAdding || isUpdating }
}
