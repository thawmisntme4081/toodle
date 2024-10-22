import { useGetSubjectsQuery } from '@/api/_subjectApi'
import ControlledFormField from '@/components/custom-ui/Form/ControlledFormField'
import ControlledMultiSelect from '@/components/custom-ui/Form/ControlledMultiSelect'
import CustomFormLabel from '@/components/custom-ui/Form/CustomFormLabel'
import FormActions from '@/components/custom-ui/Form/FormActions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { GENDERS } from '@/global.constant'
import { getGenderValue } from '@/utils/form.util'

import { teacherSchema } from './teacher.validation'
import { teacherFormMap } from './teacherFormMap.declaration'
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
          {teacherFormMap.map(
            ({ fieldName, type, placeholder, fieldClassName }) => {
              switch (fieldName) {
                case 'gender':
                  return (
                    <FormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName}
                      render={({ field: { onChange, value } }) => (
                        <FormItem>
                          <CustomFormLabel schema={teacherSchema} />
                          <FormControl>
                            <RadioGroup
                              onValueChange={(val) =>
                                onChange(val === GENDERS[1].value)
                              }
                              value={getGenderValue(value)}
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
                  )

                case 'subjects':
                  return (
                    <ControlledMultiSelect
                      key={fieldName}
                      control={form.control}
                      name={fieldName}
                      schema={teacherSchema}
                      fieldClassName={fieldClassName}
                      options={
                        subjects?.data.map((subject) => ({
                          label: subject.name,
                          value: subject.id,
                        })) ?? []
                      }
                      multiSelectProps={{
                        disabled,
                        placeholder,
                      }}
                    />
                  )

                default:
                  return (
                    <ControlledFormField
                      key={fieldName}
                      control={form.control}
                      name={fieldName}
                      schema={teacherSchema}
                      fieldClassName={fieldClassName}
                      inputProps={{
                        placeholder,
                        disabled,
                        type,
                        maxLength:
                          fieldName === 'phone_number' ? 10 : undefined,
                      }}
                    />
                  )
              }
            },
          )}
        </div>
        <FormActions
          disabled={disabled}
          type={type}
          reset={() => form.reset()}
        />
      </form>
    </Form>
  )
}

export default TeacherForm
