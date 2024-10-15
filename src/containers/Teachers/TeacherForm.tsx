import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import _ from 'lodash'
import { toast } from 'sonner'
import { z } from 'zod'

import { useGetSubjectsQuery } from '@/api/_subjectApi'
import { useCreateTeacherMutation } from '@/api/_teacherApi'
import { DateTimePicker } from '@/components/custom-ui/datetime-picker'
import MultipleSelector, {
  Option,
} from '@/components/custom-ui/multiple-select'
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
  //   const [updateTeacher, { isLoading: isUpdating }] = useUpdateSubjectMutation()
  const subject: Option[] =
    subjects?.data.map((subject) => ({
      label: subject.name,
      value: subject.id,
    })) ?? []

  const form = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      avatar: dataEdit?.avatar ?? '',
      firstName: dataEdit?.first_name ?? '',
      lastName: dataEdit?.last_name ?? '',
      email: dataEdit?.email ?? '',
      phoneNumber: dataEdit?.phone_number ?? '',
      address: dataEdit?.address ?? '',
      dateOfBirth: dataEdit?.dateOfBirth ?? null,
      gender: dataEdit?.gender ?? '',
      subjects: dataEdit?.subjects ?? [],
    },
  })

  const onSubmit = async (data: z.infer<typeof teacherSchema>) => {
    try {
      //   const response =
      //     type === 'create'
      //       ? await createTeacher(data)
      //       : await updateTeacher({
      //           id: dataEdit?.id,
      //           name: data.name,
      //         })
      const formattedDate = format(data.dateOfBirth, 'yyyy-MM-dd')
      const formattedSubjects = data.subjects.map((subject) => subject.value)

      const response =
        type === 'create'
          ? await createTeacher({
              ...data,
              subjects: formattedSubjects,
              dateOfBirth: formattedDate,
            })
          : null

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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} disabled={isCreating} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} disabled={isCreating} />
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
                    className="flex items-center gap-4 h-10"
                  >
                    {GENDERS.map((item) => (
                      <FormItem
                        className="flex items-center space-x-1 space-y-0"
                        key={item.value}
                      >
                        <FormControl>
                          <RadioGroupItem value={item.value} />
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
                    disabled={isCreating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0987654321"
                    {...field}
                    disabled={isCreating}
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
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Hanoi VietNam"
                    {...field}
                    disabled={isCreating}
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
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insert url"
                    {...field}
                    disabled={isCreating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Subject</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    disabled={!subjects}
                    options={subject}
                    placeholder="Select Subjects"
                    onChange={field.onChange}
                    hideClearAllButton
                    emptyIndicator={
                      <span className="text-center p-0 m-0">
                        No Subject found.
                      </span>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
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
                  />
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
          <Button type="submit" disabled={isCreating}>
            {_.capitalize(type)}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TeacherForm
