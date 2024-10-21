import _ from 'lodash'

import { useGetSubjectsQuery } from '@/api/_subjectApi'
import CustomFormLabel from '@/components/custom-ui/Form/CustomFormLabel'
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
import { GENDERS } from '@/global.constant'
import { getBooleanValue } from '@/utils/form.util'

import { teacherSchema } from './teacher.validation'
import { useTeacherForm } from './useTeacherForm.hook'

type Props = {
  type: 'add' | 'update'
}

const TeacherForm = ({ type }: Props) => {
  const { data: subjects } = useGetSubjectsQuery()
  const { form, onSubmit, disabled } = useTeacherForm(type)

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
                  <Input placeholder="John" {...field} disabled={disabled} />
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
                  <Input placeholder="Doe" {...field} disabled={disabled} />
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
                <FormLabel>Gender</FormLabel>
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
                            disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                  <Input {...field} type="date" disabled={disabled} />
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
                  <Input {...field} disabled={disabled} />
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
                <CustomFormLabel schema={teacherSchema} />
                <FormControl>
                  <MultiSelect
                    defaultValue={field.value}
                    value={field.value}
                    onValueChange={field.onChange}
                    options={
                      subjects?.data.map((subject) => ({
                        label: subject.name,
                        value: subject.id,
                      })) ?? []
                    }
                    placeholder="Select subject(s)"
                    variant="inverted"
                    disabled={disabled}
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
                  <Input {...field} disabled={disabled} />
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
            disabled={disabled}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" disabled={disabled}>
            {_.capitalize(type)}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TeacherForm
