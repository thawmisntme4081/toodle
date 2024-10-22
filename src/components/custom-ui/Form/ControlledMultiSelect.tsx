import { Control, FieldValues, Path } from 'react-hook-form'
import { ZodObject } from 'zod'

import {
  MultiSelect,
  MultiSelectProps,
  Option,
} from '@/components/custom-ui/MultiSelect'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import CustomFormLabel from './CustomFormLabel'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  schema: ZodObject<any>
  options: Option[]
  customName?: string
  fieldClassName?: string
  multiSelectProps?: Omit<MultiSelectProps, 'onValueChange' | 'options'>
}

const ControlledMultiSelect = <T extends FieldValues>({
  control,
  name,
  schema,
  options,
  customName,
  fieldClassName,
  multiSelectProps,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem className={fieldClassName}>
          <CustomFormLabel schema={schema} customName={customName} />
          <FormControl>
            <MultiSelect
              {...multiSelectProps}
              defaultValue={value}
              value={value}
              onValueChange={onChange}
              options={options}
              variant="inverted"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ControlledMultiSelect
