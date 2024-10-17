import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import _ from 'lodash'
import { toast } from 'sonner'
import { z } from 'zod'

import { useCreateClassMutation } from '@/api/_classApi'
import { useGetGradeQuery } from '@/api/_gradeApi'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { closeModal } from '@/redux/slices/modal.slice'
import { RootState, useAppDispatch } from '@/redux/store'
import { handleError } from '@/utils/handleError.util'

import { classSchema } from './class.validation'

type Props = {
  type: 'create' | 'update'
}

const ClassForm = ({ type }: Props) => {
  const dispatch = useAppDispatch()
  const dataEdit = useSelector((state: RootState) => state.modal.data)

  const { data: grade } = useGetGradeQuery()

  const [createClass, { isLoading: isCreating }] = useCreateClassMutation()

  const form = useForm<z.infer<typeof classSchema>>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: dataEdit?.name ?? '',
      capacity: dataEdit?.capacity ?? 0,
      grade_id: dataEdit?.grade_id ?? '',
    },
  })

  const onSubmit = async (data: z.infer<typeof classSchema>) => {
    try {
      const response = type === 'create' ? await createClass({ ...data }) : null

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class name</FormLabel>
                <FormControl>
                  <Input placeholder="Math" {...field} disabled={isCreating} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30"
                    {...field}
                    disabled={isCreating}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="grade_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your class level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {grade?.data.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

export default ClassForm