import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import _ from 'lodash'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  useAddStudentMutation,
  useUpdateStudentMutation,
} from '@/api/_studentApi'
import CustomFormLabel from '@/components/custom-ui/CustomFormLabel'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { GENDERS } from '@/global.constant'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { getBooleanValue } from '@/utils/form.util'
import { handleError } from '@/utils/handleError.util'

import { studentSchema } from './student.validation'

type Props = {
  type: 'create' | 'update'
}

const StudentForm = ({ type }: Props) => {
  const dispatch = useAppDispatch()
  const dataEdit = useSelector((state: RootState) => state.modal.data)

  const [addStudent, { isLoading: isCreating }] = useAddStudentMutation()
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation()

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      avatar: dataEdit?.avatar,
      first_name: dataEdit?.first_name ?? '',
      last_name: dataEdit?.last_name ?? '',
      email: dataEdit?.email ?? '',
      phone_number: dataEdit?.phone_number,
      address: dataEdit?.address ?? '',
      date_of_birth: dataEdit?.date_of_birth ?? '',
      gender: dataEdit?.gender,
    },
  })

  const onSubmit = async (data: z.infer<typeof studentSchema>) => {
    try {
      const formattedDate = format(data.date_of_birth, 'yyyy-MM-dd')
      const response =
        type === 'create'
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel schema={studentSchema} />
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    disabled={isCreating || isUpdating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel schema={studentSchema} />
                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    disabled={isCreating || isUpdating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <CustomFormLabel schema={studentSchema} />
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => onChange(value === 'female')}
                    value={getBooleanValue(value)}
                    className="flex items-center gap-4 h-10"
                  >
                    {GENDERS.map((item) => (
                      <FormItem
                        className="flex items-center space-x-1 space-y-0"
                        key={item.value}
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={item.value}
                            disabled={isCreating || isUpdating}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel schema={studentSchema} />
                <FormControl>
                  <Input
                    placeholder="johndoe@gmail.com"
                    {...field}
                    disabled={isCreating || isUpdating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel schema={studentSchema} />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="0987654321"
                    maxLength={10}
                    value={field.value ?? ''}
                    disabled={isCreating || isUpdating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <CustomFormLabel schema={studentSchema} />
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    disabled={isCreating || isUpdating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <CustomFormLabel schema={studentSchema} />
                <FormControl>
                  <Input {...field} disabled={isCreating || isUpdating} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <CustomFormLabel schema={studentSchema} />
                <FormControl>
                  <Input {...field} disabled={isCreating || isUpdating} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="reset"
            disabled={isCreating}
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

export default StudentForm
