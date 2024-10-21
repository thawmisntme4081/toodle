import { Control, FieldValues, Path } from 'react-hook-form'
import { ZodObject } from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'

import CustomFormLabel from './CustomFormLabel'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  schema: ZodObject<any>
  customName?: string
  fieldClassName?: string
  inputProps?: InputProps
}

const ControlledFormField = <T extends FieldValues>({
  control,
  name,
  schema,
  customName,
  fieldClassName,
  inputProps,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={fieldClassName}>
          <CustomFormLabel schema={schema} customName={customName} />
          <FormControl>
            <Input {...field} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ControlledFormField
