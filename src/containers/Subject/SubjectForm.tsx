import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
} from '@/api/_subjectApi'
import CustomFormLabel from '@/components/custom-ui/CustomFormLabel'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { handleError } from '@/utils/handleError.util'

import { subjectSchema } from './subject.validation'

type Props = {
  type: 'create' | 'update'
}

const SubjectForm = ({ type }: Props) => {
  const dispatch = useAppDispatch()
  const dataEdit = useSelector((state: RootState) => state.modal.data)

  const [createSubject, { isLoading: isCreating }] = useCreateSubjectMutation()
  const [updateSubject, { isLoading: isUpdating }] = useUpdateSubjectMutation()

  const form = useForm<z.infer<typeof subjectSchema>>({
    resolver: zodResolver(subjectSchema),
    defaultValues: { name: dataEdit?.name ?? '' },
  })

  const onSubmit = async (value: z.infer<typeof subjectSchema>) => {
    try {
      const response =
        type === 'create'
          ? await createSubject(value)
          : await updateSubject({
              id: dataEdit?.id,
              name: value.name,
            })

      if (response.error) {
        handleError(response.error)
        return
      }

      toast.success(response.data?.message)
      form.reset()

      dispatch(closeModal())
    } catch (error) {
      console.error('Failed to create or update subject:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <CustomFormLabel
                schema={subjectSchema}
                fieldName="Subject name"
              />
              <FormControl>
                <Input
                  placeholder="Subject name"
                  {...field}
                  disabled={isCreating || isUpdating}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="reset"
            disabled={isCreating || isUpdating}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isCreating || isUpdating}>
            {_.capitalize(type)}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SubjectForm
