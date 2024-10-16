import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import _ from 'lodash'
import { toast } from 'sonner'
import { z } from 'zod'

import { useGetSubjectsQuery } from '@/api/_subjectApi'
import {
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
} from '@/api/_teacherApi'
import { DateTimePicker } from '@/components/custom-ui/datetime-picker'
import { MultiSelect } from '@/components/custom-ui/MultiSelect'
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
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { handleError } from '@/utils/handleError.util'

import { GENDERS } from './teacher.declaration'
import { teacherSchema } from './teacher.validation'

type Props = {
  type: 'create' | 'update'
}

const TeacherForm = ({ type }: Props) => {
  const dispatch = useAppDispatch()
  const dataEdit = useSelector((state: RootState) => state.modal.data)

  const { data: subjects } = useGetSubjectsQuery()
  const [createTeacher, { isLoading: isCreating }] = useCreateTeacherMutation()
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
      date_of_birth: dataEdit?.date_of_birth ?? null,
      gender: dataEdit?.gender ?? '',
      subjects: dataEdit?.subjects ?? [],
    },
  })

  const onSubmit = async (data: z.infer<typeof teacherSchema>) => {
    try {
      const formattedDate = format(data.date_of_birth, 'yyyy-MM-dd')
      const response =
        type === 'create'
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
                <FormLabel>First name</FormLabel>
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
                <FormLabel>Last name</FormLabel>
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
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => onChange(value === 'female')}
                    value={form.getValues('gender') ? 'female' : 'male'}
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0987654321"
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
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <DateTimePicker
                    granularity="day"
                    placeholder="What's your birthday?"
                    displayFormat={{ hour24: 'yyyy-MM-dd' }}
                    value={field.value}
                    onChange={field.onChange}
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
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isCreating || isUpdating} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjects"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Select subject(s)</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={
                      subjects?.data.map((subject) => ({
                        label: subject.name,
                        value: subject.id,
                      })) ?? []
                    }
                    onValueChange={field.onChange}
                    // defaultValue={selectedFrameworks}
                    placeholder="Select subject(s)"
                    variant="inverted"
                    disabled={isCreating || isUpdating}
                  />
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
                <FormLabel>Avatar</FormLabel>
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

export default TeacherForm
