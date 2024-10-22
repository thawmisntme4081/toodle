import ControlledFormField from '@/components/custom-ui/Form/ControlledFormField'
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
import { TypeModalForm } from '@/redux/slices/modal.slice'
import { getGenderValue } from '@/utils/form.util'

import { studentSchema } from './student.validation'
import { studentFormMap } from './studentFormMap.declaration'
import { useStudentForm } from './useStudentForm.hook'

type Props = {
  type: TypeModalForm
}

const StudentForm = ({ type }: Props) => {
  const { form, onSubmit, disabled } = useStudentForm(type)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          {studentFormMap.map(
            ({ fieldName, type, placeholder, fieldClassName }) => {
              if (fieldName === 'gender') {
                return (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={fieldName}
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <CustomFormLabel schema={studentSchema} />
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) =>
                              onChange(value === 'female')
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
              }
              return (
                <ControlledFormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  schema={studentSchema}
                  fieldClassName={fieldClassName}
                  inputProps={{
                    placeholder,
                    disabled,
                    type,
                    maxLength: fieldName === 'phone_number' ? 10 : undefined,
                  }}
                />
              )
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

export default StudentForm
