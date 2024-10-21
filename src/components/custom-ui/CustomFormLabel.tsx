import _ from 'lodash'
import { ZodObject } from 'zod'

import { FormLabel, useFormField } from '@/components/ui/form'

type Props<T> = {
  schema: T
  fieldName?: string
}

const CustomFormLabel = <T extends ZodObject<any>>({
  schema,
  fieldName,
}: Props<T>) => {
  const { name } = useFormField()

  const isOptional = schema.shape[name].isOptional()

  return (
    <FormLabel>
      {fieldName ?? _.capitalize(_.replace(name, /_/g, ' '))}{' '}
      {!isOptional && <span className="text-destructive">*</span>}
    </FormLabel>
  )
}

export default CustomFormLabel
