import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import _ from 'lodash'
import { toast } from 'sonner'
import { z } from 'zod'

import { useGetSubjectsQuery } from '@/api/_subjectApi'
import { useCreateTeacherMutation } from '@/api/_teacherApi'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import MultipleSelector, { Option } from '@/components/ui/multiple-select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IconCalendar } from '@/icons'
import { cn } from '@/lib/utils'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { handleError } from '@/utils/handleError.util'

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
  // console.log(subject)

  const form = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      avatar: dataEdit?.avatar ?? '',
      first_name: dataEdit?.first_name ?? '',
      last_name: dataEdit?.last_name ?? '',
      email: dataEdit?.email ?? '',
      phone_number: dataEdit?.phone_number ?? '',
      address: dataEdit?.address ?? '',
      dateOfBirth: dataEdit?.dateOfBirth ?? null,
      gender: dataEdit?.gender ?? '',
      subjects: dataEdit?.subjects ?? [],
    },
  })

  const onSubmit = async (value: z.infer<typeof teacherSchema>) => {
    try {
      //   const response =
      //     type === 'create'
      //       ? await createTeacher(value)
      //       : await updateTeacher({
      //           id: dataEdit?.id,
      //           name: value.name,
      //         })
      const formattedDate = format(value.dateOfBirth, 'yyyy-MM-dd')
      const response =
        type === 'create'
          ? await createTeacher({
              ...value,
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
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Duy" {...field} disabled={isCreating} />
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
                    placeholder="Nguyen"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="admin@toodle.com"
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
            name="phone_number"
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value === 'female')
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                  </SelectContent>
                </Select>
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
                    {...field.value}
                    defaultOptions={subject}
                    placeholder="Select Subjects"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no Subject found.
                      </p>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'yyyy-MM-dd')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
